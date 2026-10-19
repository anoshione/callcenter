import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight, Headphones, PhoneCall } from 'lucide-react';
import { site } from '../../content/site';
import { Orbs } from '../ui/Orbs';

/** 0..1 smoothstep with clamped edges (continuous emphasis ramp) */
const smooth01 = (t: number) => {
  const c = t < 0 ? 0 : t > 1 ? 1 : t;
  return c * c * (3 - 2 * c);
};

type InlineStyleKey = 'transform' | 'opacity' | 'zIndex' | 'borderColor' | 'boxShadow';

/** Writes an inline style only when the value actually changed (60fps-friendly rAF loop) */
const setIfChanged = (
  card: HTMLElement,
  cache: string[],
  slot: number,
  key: InlineStyleKey,
  value: string
) => {
  if (cache[slot] === value) return;
  cache[slot] = value;
  card.style[key] = value;
};

export const Testimonials: React.FC = () => {
  if (!site.sections.testimonials) {
    return null;
  }

  const { items, title, subtitle, trustScore } = site.testimonials;
  const count = items.length;

  const [activeDotIndex, setActiveDotIndex] = useState<number>(0);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollXRef = useRef<number>(0);
  const targetScrollXRef = useRef<number | null>(null);
  const pauseUntilRef = useRef<number>(0);
  const isHoveredRef = useRef<boolean>(false);
  const focusWithinRef = useRef<boolean>(false);
  const touchStartXRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);

  // Per-card cache of the last written inline styles, so the rAF loop only touches
  // the DOM when a value actually changed (composite-only work at 60fps).
  const lastStylesRef = useRef<Array<string[] | undefined>>([]);

  // Responsive stride (card width + gap), measured from the real card so the
  // breakpoint sizes live in one place (the card width classes).
  const getStride = useCallback(() => {
    if (typeof window === 'undefined') return 370;
    const first = cardRefs.current[0];
    const width =
      first?.offsetWidth ||
      (window.innerWidth < 640 ? 290 : window.innerWidth < 1024 ? 320 : 340);
    // 24px ring gap between cards (var(--space-24))
    return width + 24;
  }, []);

  // Update card positions, zoom (scale), translateY, and styles based on distance from center.
  // All emphasis values are CONTINUOUS functions of the distance (no binary transitions) so the
  // animation is smooth at any frame rate, and every write is cached to keep the loop composite-only.
  const updateCards = useCallback(
    (offset: number) => {
      const stride = getStride();
      const totalStride = count * stride;
      let closestIdx = 0;
      let minAbsDist = Infinity;

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const cache = (lastStylesRef.current[i] ||= []);

        let dist = ((i * stride - offset) % totalStride + totalStride) % totalStride;
        if (dist > totalStride / 2) {
          dist -= totalStride;
        }

        const absDist = Math.abs(dist);
        if (absDist < minAbsDist) {
          minAbsDist = absDist;
          closestIdx = i;
        }

        // Closeness normalized between 0 (far) and 1 (exact middle)
        const norm = Math.max(0, 1 - absDist / (stride * 0.95));
        const ease = Math.sin((norm * Math.PI) / 2);

        // Continuous 0..1 ramp for the active-card emphasis (was a binary ease > 0.8 switch
        // combined with a CSS transition chasing rAF writes, which flashed a ring at the corners)
        const t = smooth01((ease - 0.8) / 0.2);

        // Zoom scale: active/middle zooms in to ~1.06, outer cards zoom out to ~0.92
        const scale = 0.92 + 0.14 * ease;
        // Overhang drop-down: active/middle drops down 42px to overlap container bottom
        const translateY = 42 * ease;
        // Opacity: smooth ramp to the outer edges (was a hard 0.35/0.8 cliff at ~1.8 strides)
        const normO = Math.max(0, 1 - absDist / (stride * 1.9));
        const easeO = Math.sin((normO * Math.PI) / 2);
        const opacity = 0.35 + 0.65 * easeO;

        // Border width is fixed at 1px (class) and only its colour crossfades:
        // grey-3 at rest -> secondary at dead center. No 1px/2px width pop.
        setIfChanged(card, cache, 0, 'transform',
          `translate3d(calc(-50% + ${dist.toFixed(1)}px), ${translateY.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`);
        setIfChanged(card, cache, 1, 'opacity', opacity.toFixed(2));
        setIfChanged(card, cache, 2, 'zIndex', String(Math.round(10 + 20 * ease)));
        setIfChanged(card, cache, 3, 'borderColor',
          `color-mix(in srgb, var(--color-secondary) ${Math.round(t * 100)}%, var(--color-grey-3))`);
        // Continuous elevation: rest shadow -> active shadow, both derived from brand tokens
        setIfChanged(card, cache, 4, 'boxShadow',
          `0 ${(10 + 15 * t).toFixed(1)}px ${(25 + 25 * t).toFixed(1)}px ${(-10 * t).toFixed(1)}px ` +
          `color-mix(in srgb, var(--color-primary) ${Math.round(6 + 10 * t)}%, transparent), ` +
          `0 0 0 3px color-mix(in srgb, var(--color-secondary) ${Math.round(15 * t)}%, transparent)`);
      });

      setActiveDotIndex((prev) => (prev === closestIdx ? prev : closestIdx));
    },
    [count, getStride]
  );

  // Smoothly target and glide a specific card to dead center
  const scrollToCard = useCallback(
    (targetIdx: number) => {
      const stride = getStride();
      const totalStride = count * stride;
      const targetOffset = targetIdx * stride;

      let diff = (targetOffset - scrollXRef.current) % totalStride;
      if (diff > totalStride / 2) diff -= totalStride;
      if (diff < -totalStride / 2) diff += totalStride;

      const target = scrollXRef.current + diff;
      pauseUntilRef.current = performance.now() + 2500;

      // Under reduced motion there is no animation loop, so jump instantly instead
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        scrollXRef.current = target;
        lastTimeRef.current = 0;
        updateCards(target);
      } else {
        targetScrollXRef.current = target;
      }
    },
    [count, getStride, updateCards]
  );

  const handlePrev = useCallback(() => {
    const stride = getStride();
    const cur = Math.round(scrollXRef.current / stride);
    scrollToCard((cur - 1 + count) % count);
  }, [count, getStride, scrollToCard]);

  const handleNext = useCallback(() => {
    const stride = getStride();
    const cur = Math.round(scrollXRef.current / stride);
    scrollToCard((cur + 1) % count);
  }, [count, getStride, scrollToCard]);

  // Main continuous animation loop (Right to Left flow)
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    // Reduced motion: static layout, navigation still works via instant jumps in scrollToCard
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Initial positioning
    updateCards(scrollXRef.current);

    if (reducedMotion) {
      return;
    }

    // Hover pause only for devices with a real hover-capable pointer, so taps on touch
    // screens cannot leave the carousel permanently paused without a matching mouseleave.
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    // Sticky track of focus inside the panel. focusout fires between descendants (focus moving
    // from card A to card B), so only clear the flag when focus actually leaves the panel —
    // otherwise the flow would stutter once per Tab stop (the focus/blur resume flicker).
    const handleFocusIn = () => {
      focusWithinRef.current = true;
    };
    const handleFocusOut = (e: FocusEvent) => {
      const to = e.relatedTarget as Node | null;
      if (!to || !panel.contains(to)) {
        focusWithinRef.current = false;
      }
    };
    panel.addEventListener('focusin', handleFocusIn);
    panel.addEventListener('focusout', handleFocusOut);

    let running = false;

    const startLoop = () => {
      if (running) return;
      running = true;
      lastTimeRef.current = 0; // prevents a large dt spike after wake-up
      animFrameRef.current = requestAnimationFrame(animate);
    };

    const stopLoop = () => {
      running = false;
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
    };

    const isPausedNow = () => {
      if (focusWithinRef.current) return true;
      if (!canHover) return false;
      // A wheel scroll can move this panel under a stationary pointer without firing any
      // mouseenter (the exact "hovering won't stop it" gap), so also consult the live :hover chain.
      return isHoveredRef.current || panel.matches(':hover');
    };

    const animate = (currentTime: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = currentTime;
      }
      // Clamp so returning from a background tab never super-charges the flow
      const dt = Math.min(currentTime - lastTimeRef.current, 64);
      lastTimeRef.current = currentTime;

      if (targetScrollXRef.current !== null) {
        // Frame-rate-independent exponential glide (a fixed 0.08/frame was 2x fast on 144Hz)
        const target = targetScrollXRef.current;
        const alpha = 1 - Math.exp(-(dt / 1000) * 7);
        scrollXRef.current += (target - scrollXRef.current) * alpha;
        if (Math.abs(target - scrollXRef.current) < 0.5) {
          scrollXRef.current = target;
          targetScrollXRef.current = null;
        }
        updateCards(scrollXRef.current);
      } else if (!isPausedNow() && performance.now() > pauseUntilRef.current) {
        // Continuous smooth flow: cards advance from right to left at ~45px/second
        scrollXRef.current += dt * 0.045;
        updateCards(scrollXRef.current);
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    // Hibernate the loop while the section is offscreen: continuous rAF updates for a
    // carousel nobody can see waste main-thread budget and wake the compositor.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0 }
    );
    observer.observe(panel);

    const handleResize = () => {
      updateCards(scrollXRef.current);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      stopLoop();
      observer.disconnect();
      panel.removeEventListener('focusin', handleFocusIn);
      panel.removeEventListener('focusout', handleFocusOut);
      window.removeEventListener('resize', handleResize);
    };
  }, [updateCards]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  };

  // Touch swipe support for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    isHoveredRef.current = true;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current !== null) {
      const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
      if (deltaX > 40) {
        handlePrev();
      } else if (deltaX < -40) {
        handleNext();
      }
    }
    touchStartXRef.current = null;
    isHoveredRef.current = false;
  };

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
  };

  return (
    <section id="reviews" className="w-full py-0 px-3 bg-surface mb-[var(--space-section-gap)]">
      <span id="testimonials" className="sr-only" aria-hidden="true" />

      {/* Outer Panel with soft background, rounded-32, and subtle atmosphere */}
      <div
        ref={panelRef}
        className="relative overflow-hidden rounded-32 bg-grey-1 border border-grey-3/50 px-4 sm:px-8 md:px-12 lg:px-16 pt-16 sm:pt-20 md:pt-24 pb-32 sm:pb-40 md:pb-48 shadow-sm w-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeyDown}
        aria-roledescription="carousel"
        aria-label="Customer Reviews and Testimonials"
      >
        {/* Soft atmospheric orbs (max 2 per blur guidelines) */}
        <Orbs preset="subtle" count={2} />

        {/* Faint decorative background outline icons (DESIGN.md section 6) */}
        <div
          className="absolute top-10 left-8 pointer-events-none text-primary/[0.03] -rotate-12 select-none"
          aria-hidden="true"
        >
          <Headphones className="w-64 h-64" />
        </div>
        <div
          className="absolute -bottom-10 right-8 pointer-events-none text-primary/[0.03] rotate-12 select-none"
          aria-hidden="true"
        >
          <PhoneCall className="w-72 h-72" />
        </div>

        <div className="mx-auto w-full max-w-[var(--container-max)] relative z-10 flex flex-col items-center">
          {/* Giant Watermark Quotation Mark in Upper Left (vector visual, kept) */}
          <div
            className="absolute top-6 left-6 sm:top-8 sm:left-10 text-[100px] sm:text-[130px] md:text-[150px] font-serif leading-none text-primary/[0.04] select-none pointer-events-none"
            aria-hidden="true"
          >
            “
          </div>

          {/* Stage Header */}
          <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto mt-8 sm:mt-12 md:mt-16 mb-6 sm:mb-8">
              <h2 className="text-28 sm:text-36 md:text-40 font-bold text-primary tracking-tight mb-3">
                {title}
              </h2>

              {/* Decorative Accent Underline Bar & Dot (Signature from Pinterest pin) */}
              <div className="inline-flex items-center gap-2 mb-4" aria-hidden="true">
                <span className="w-20 sm:w-24 h-1 bg-secondary rounded-full" />
                <span className="w-3 sm:w-3.5 h-1 bg-secondary rounded-full" />
              </div>

              {subtitle && (
                <p className="text-14 sm:text-15 text-text-2 max-w-xl mx-auto leading-relaxed mb-4">
                  {subtitle}
                </p>
              )}

              {/* Trust Score Header Pill */}
              {trustScore && (
                <div className="inline-flex items-center gap-2 rounded-full bg-white border border-grey-3/80 pl-16 pr-20 py-8 text-primary shadow-xs text-13 mt-1">
                  <div className="flex text-star gap-0.5" aria-label="5 stars">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        fill="currentColor"
                        className="w-[14px] h-[14px] fill-star text-star"
                      />
                    ))}
                  </div>
                  <span className="font-bold text-primary">
                    {trustScore.rating} / {trustScore.scale}
                  </span>
                  <span className="text-grey-4">·</span>
                  <span className="text-text-2 font-medium">{trustScore.reviewCount}</span>
                  {trustScore.retentionRate && (
                    <>
                      <span className="text-grey-4 hidden sm:inline">·</span>
                      <span className="text-secondary-active font-medium hidden sm:inline">
                        {trustScore.retentionRate}
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Continuous Flow Carousel Viewport */}
            <div
              className="relative w-full h-[410px] sm:h-[440px] md:h-[460px] z-20 overflow-visible"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {items.map((item, idx) => (
                <div
                  key={item.id}
                  ref={(el) => (cardRefs.current[idx] = el)}
                  onClick={() => scrollToCard(idx)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View review by ${item.author}`}
                  className="absolute top-0 left-1/2 border border-grey-3 w-[290px] sm:w-[320px] md:w-[340px] h-[375px] sm:h-[405px] md:h-[425px] rounded-24 sm:rounded-32 p-24 sm:p-28 flex flex-col items-center text-center bg-white cursor-pointer select-none will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                >
                  {/* Top Circular Portrait Image */}
                  <div className="w-[60px] h-[60px] sm:w-[68px] sm:h-[68px] rounded-full overflow-hidden border-2 border-white bg-grey-2 shadow-sm shrink-0 mb-3 pointer-events-none">
                    <img
                      src={item.image}
                      alt={item.author}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Author Name */}
                  <h3 className="text-17 sm:text-18 font-medium text-primary tracking-tight leading-snug">
                    {item.author}
                  </h3>

                  {/* Role & Company / Category */}
                  <div className="text-12 font-medium text-secondary-active mt-0.5 mb-2.5">
                    {item.company}
                    {item.serviceCategory && ` · ${item.serviceCategory}`}
                  </div>

                  {/* Star Rating */}
                  <div
                    className="flex items-center gap-1 text-star mb-3"
                    aria-label={`${item.rating || 5} out of 5 stars`}
                  >
                    {[...Array(item.rating || 5)].map((_, starIdx) => (
                      <Star
                        key={starIdx}
                        fill="currentColor"
                        className="w-[14px] h-[14px] fill-star text-star"
                      />
                    ))}
                  </div>

                  {/* Quote Text with Inner Flanking Watermark Quote Marks */}
                  <div className="relative w-full my-auto px-16 sm:px-20 flex flex-col justify-center">
                    <span
                      className="absolute -top-3.5 -left-1 font-serif text-32 sm:text-36 text-secondary/30 select-none pointer-events-none leading-none"
                      aria-hidden="true"
                    >
                      “
                    </span>
                    <blockquote className="text-13 sm:text-14 text-text-2 leading-relaxed italic line-clamp-4 relative z-10">
                      {item.quote.replace('\n\n', ' ')}
                    </blockquote>
                    <span
                      className="absolute -bottom-5.5 -right-1 font-serif text-32 sm:text-36 text-secondary/30 select-none pointer-events-none leading-none"
                      aria-hidden="true"
                    >
                      ”
                    </span>
                  </div>

                  {/* Highlight Badge if present */}
                  {item.highlight && (
                    <div className="mt-auto pt-2">
                      <span className="inline-block text-11 font-medium text-primary/75 bg-grey-1 border border-grey-3/70 rounded-full px-16 py-4">
                        {item.highlight}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

          {/* Controls Bar: Prev Button, Indicator Dots, Next Button */}
          <div
            className="flex items-center justify-center gap-4 sm:gap-6 mt-20 sm:mt-24 md:mt-28 z-30"
            role="toolbar"
            aria-label="Carousel navigation controls"
          >
            {/* Prev Arrow Button */}
            <button
              type="button"
              onClick={handlePrev}
              className="w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] min-w-[44px] min-h-[44px] rounded-full bg-white text-primary border border-grey-3 hover:border-secondary hover:text-secondary hover:scale-105 active:scale-95 shadow-sm flex items-center justify-center transition-all duration-base cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-[20px] h-[20px]" />
            </button>

            {/* Indicator Dots */}
            <div
              className="flex items-center gap-2"
              role="tablist"
              aria-label="Review indicators"
            >
              {items.map((it, dotIdx) => {
                const isActive = dotIdx === activeDotIndex;
                return (
                  <button
                    key={it.id}
                    type="button"
                    onClick={() => scrollToCard(dotIdx)}
                    className={`h-[10px] rounded-full transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary ${
                      isActive
                        ? 'w-[32px] bg-secondary shadow-sm shadow-secondary/40'
                        : 'w-[10px] bg-grey-3 hover:bg-grey-4'
                    }`}
                    aria-label={`View review by ${it.author} (${dotIdx + 1} of ${count})`}
                    aria-selected={isActive}
                  />
                );
              })}
            </div>

            {/* Next Arrow Button */}
            <button
              type="button"
              onClick={handleNext}
              className="w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] min-w-[44px] min-h-[44px] rounded-full bg-white text-primary border border-grey-3 hover:border-secondary hover:text-secondary hover:scale-105 active:scale-95 shadow-sm flex items-center justify-center transition-all duration-base cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
              aria-label="Next review"
            >
              <ChevronRight className="w-[20px] h-[20px]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Reviews = Testimonials;
export default Testimonials;
