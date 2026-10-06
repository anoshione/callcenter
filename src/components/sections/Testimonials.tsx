import React, { useState, useEffect } from 'react';
import { Quote, Star, Headphones, PhoneCall } from 'lucide-react';
import { site } from '../../content/site';
import { SectionHeader } from '../ui/SectionHeader';
import { CardCornerGradient } from '../ui/CardCornerGradient';
import { Orbs } from '../ui/Orbs';

export const Testimonials: React.FC = () => {
  if (!site.sections.testimonials) {
    return null;
  }

  const { items, eyebrow, title, subtitle } = site.testimonials;
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Auto-cycle through reviews one by one faster (3.2s, pauses on mouse hover)
  useEffect(() => {
    if (isPaused || items.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isPaused, items.length]);

  // Current featured big review and the next two reviews in the queue
  const featuredItem = items[activeIndex];
  const smallItem1 = items[(activeIndex + 1) % items.length];
  const smallItem2 = items[(activeIndex + 2) % items.length];

  const handleSelectReview = (targetIndex: number) => {
    setActiveIndex(targetIndex);
  };

  return (
    <section id="reviews" className="w-full py-0 px-3 bg-surface mb-[var(--space-section-gap)]">
      <span id="testimonials" className="sr-only" aria-hidden="true" />
      <div
        className="relative overflow-hidden rounded-16 bg-primary px-6 md:px-12 xl:px-16 py-20 sm:py-24 md:py-32 shadow-md w-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Background orbs (max 2 per panel per blur rules) */}
        <Orbs preset="subtle" count={2} />

        {/* Decorative faint background vector icons at ~4% opacity per DESIGN.md section 6 */}
        <div className="absolute top-12 left-10 pointer-events-none text-surface/[0.035] -rotate-12 select-none" aria-hidden="true">
          <Headphones className="w-72 h-72" />
        </div>
        <div className="absolute -bottom-16 right-8 pointer-events-none text-surface/[0.035] rotate-12 select-none" aria-hidden="true">
          <PhoneCall className="w-80 h-80" />
        </div>

        <div className="mx-auto w-full max-w-[var(--container-max)] relative z-10 flex flex-col">
          {/* Section Header (Centered, 14px top/bottom, 28px middle, 32px gap to content) */}
          <SectionHeader
            onNavy
            eyebrow={eyebrow}
            title={title}
            subtitle={subtitle}
          />

          {/* Trust Score Header Pill */}
          {site.testimonials.trustScore && (
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 -mt-20 mb-32 text-13">
              <div className="inline-flex items-center gap-2 rounded-full bg-surface/10 backdrop-blur-md border border-white/15 px-16 py-8 text-surface shadow-xs">
                <div className="flex text-star gap-0.5" aria-label="5 stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} fill="currentColor" className="h-3.5 w-3.5 fill-star text-star" />
                  ))}
                </div>
                <span className="font-bold text-surface">
                  {site.testimonials.trustScore.rating} / {site.testimonials.trustScore.scale}
                </span>
                <span className="text-grey-3">·</span>
                <span className="text-grey-2">{site.testimonials.trustScore.reviewCount}</span>
              </div>
            </div>
          )}

          {/* Reviews Grid Layout: 1 Featured Big Card (50% width) + 2 Interactive Small Cards (50% width) */}
          {featuredItem && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-32 items-stretch">
              {/* Featured Big Card (50% width) - Stable outer card, transforming inner content */}
              <div className="flex flex-col">
                <div
                  className="h-full relative overflow-hidden rounded-16 bg-gradient-to-b from-white via-surface to-grey-1/90 border border-white/60 border-t-[3px] border-t-secondary p-24 sm:p-28 xl:p-32 shadow-2xl transition-all duration-base flex flex-col justify-between group"
                >
                  {/* Subtle top border sheen sweep on cycle change */}
                  <div key={`sheen-${featuredItem.id}`} className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden pointer-events-none">
                    <div className="w-full h-full bg-gradient-to-r from-transparent via-secondary to-transparent animate-review-sheen" />
                  </div>

                  {/* Watermark quote symbol in background */}
                  <div className="pointer-events-none absolute -bottom-8 -right-6 text-secondary/[0.06] select-none" aria-hidden="true">
                    <Quote className="w-48 h-48 rotate-180" />
                  </div>

                  {/* Top-right corner gradient */}
                  <CardCornerGradient size="lg" />

                  {/* Transforming inner content (smooth slide & scale transform without blinking card shell) */}
                  <div
                    key={`featured-content-${featuredItem.id}`}
                    className="animate-review-featured relative z-10 flex flex-col sm:flex-row gap-20 lg:gap-20 xl:gap-24 items-start sm:items-stretch h-full"
                  >
                    {/* Portrait Image container: widened to ~270px matching reference preview */}
                    <div className="relative w-full sm:w-60 md:w-64 lg:w-[270px] xl:w-[280px] h-64 sm:h-auto rounded-12 overflow-hidden bg-grey-2 border border-grey-3 flex-shrink-0 shadow-sm">
                      <img
                        key={`featured-img-${featuredItem.id}`}
                        src={featuredItem.image}
                        alt={featuredItem.author}
                        className="w-full h-full object-cover animate-review-photo"
                        loading="lazy"
                      />
                    </div>

                    {/* Content block: adjusted typography and spacing to complement wider image */}
                    <div className="flex-1 flex flex-col justify-between w-full min-w-0">
                      {/* Top Meta: Stars, Service Category Eyebrow, and Large Quote Icon Visual */}
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex flex-col gap-1.5 min-w-0">
                          <div className="flex text-star gap-1" aria-label={`${featuredItem.rating || 5} out of 5 stars`}>
                            {[...Array(featuredItem.rating || 5)].map((_, i) => (
                              <Star key={i} fill="currentColor" className="h-4.5 w-4.5 fill-star text-star" />
                            ))}
                          </div>
                          {featuredItem.serviceCategory && (
                            <span className="text-12 font-normal uppercase tracking-wider text-secondary-active">
                              {featuredItem.serviceCategory}
                            </span>
                          )}
                        </div>
                        <Quote
                          strokeWidth={1.5}
                          className="w-[88px] h-[88px] sm:w-[98px] sm:h-[98px] xl:w-[108px] xl:h-[108px] text-secondary/30 group-hover:text-secondary/55 transition-colors shrink-0 -mt-3 -mr-2 pointer-events-none select-none"
                        />
                      </div>

                      {/* Editorial Testimonial Quote in Two Sentences with Line Break Gap, Vertically Centered */}
                      <blockquote className="my-auto py-2.5 text-15 sm:text-16 md:text-16 xl:text-17 text-primary/95 leading-relaxed font-normal italic flex flex-col gap-2.5">
                        {featuredItem.quote.split('\n\n').map((paragraph, pIdx, arr) => (
                          <p key={pIdx}>
                            {pIdx === 0 && '“'}
                            {paragraph}
                            {pIdx === arr.length - 1 && '”'}
                          </p>
                        ))}
                      </blockquote>

                      {/* Author info */}
                      <div className="pt-14 sm:pt-16 border-t border-grey-3/80 flex items-center">
                        <span className="text-17 sm:text-18 font-bold text-primary block leading-tight">
                          {featuredItem.author}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Supporting Small Cards (50% width, Stacked) - Click to turn into big card */}
              <div className="flex flex-col gap-20 lg:gap-24 justify-between">
                {/* Small Card 1 (Upcoming in cycle) */}
                {smallItem1 && (
                  <div
                    onClick={() => handleSelectReview((activeIndex + 1) % items.length)}
                    className="h-full relative overflow-hidden rounded-16 bg-gradient-to-b from-white via-surface to-grey-1/90 border border-white/60 border-t-[3px] border-t-secondary/60 hover:border-secondary hover:border-t-secondary p-20 sm:p-24 shadow-md hover:shadow-xl transition-all duration-base flex flex-col justify-between group cursor-pointer hover:-translate-y-1"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSelectReview((activeIndex + 1) % items.length);
                      }
                    }}
                    aria-label={`Promote review by ${smallItem1.author} to featured view`}
                  >
                    {/* Top-right corner gradient */}
                    <CardCornerGradient size="md" />

                    {/* Transforming inner content */}
                    <div
                      key={`small-1-content-${smallItem1.id}`}
                      className="animate-review-small-1 relative z-10 flex flex-col justify-between h-full"
                    >
                      <div>
                        {/* Card Top Row: Rating & Quote Icon */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <div className="flex text-star gap-0.5" aria-label="5 stars">
                            {[...Array(smallItem1.rating || 5)].map((_, i) => (
                              <Star key={i} fill="currentColor" className="h-3.5 w-3.5 fill-star text-star" />
                            ))}
                          </div>

                          <Quote className="h-5 w-5 text-secondary/35 group-hover:text-secondary transition-colors flex-shrink-0" />
                        </div>

                        {/* Quote snippet */}
                        <blockquote className="text-14 sm:text-15 text-text-2 leading-relaxed italic mb-16 sm:mb-20 line-clamp-4">
                          "{smallItem1.quote.replace('\n\n', ' ')}"
                        </blockquote>
                      </div>

                      {/* Author row with avatar */}
                      <div className="pt-16 sm:pt-20 border-t border-grey-3/80 flex items-center gap-3.5">
                        <div className="h-11 w-11 rounded-full overflow-hidden bg-grey-2 border border-grey-3 flex-shrink-0 shadow-xs">
                          <img
                            src={smallItem1.image}
                            alt={smallItem1.author}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="min-w-0">
                          <span className="text-15 font-bold text-primary block leading-tight">
                            {smallItem1.author}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Small Card 2 (Next in cycle) */}
                {smallItem2 && (
                  <div
                    onClick={() => handleSelectReview((activeIndex + 2) % items.length)}
                    className="h-full relative overflow-hidden rounded-16 bg-gradient-to-b from-white via-surface to-grey-1/90 border border-white/60 border-t-[3px] border-t-secondary/60 hover:border-secondary hover:border-t-secondary p-20 sm:p-24 shadow-md hover:shadow-xl transition-all duration-base flex flex-col justify-between group cursor-pointer hover:-translate-y-1"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSelectReview((activeIndex + 2) % items.length);
                      }
                    }}
                    aria-label={`Promote review by ${smallItem2.author} to featured view`}
                  >
                    {/* Top-right corner gradient */}
                    <CardCornerGradient size="md" />

                    {/* Transforming inner content */}
                    <div
                      key={`small-2-content-${smallItem2.id}`}
                      className="animate-review-small-2 relative z-10 flex flex-col justify-between h-full"
                    >
                      <div>
                        {/* Card Top Row: Rating & Quote Icon */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <div className="flex text-star gap-0.5" aria-label="5 stars">
                            {[...Array(smallItem2.rating || 5)].map((_, i) => (
                              <Star key={i} fill="currentColor" className="h-3.5 w-3.5 fill-star text-star" />
                            ))}
                          </div>

                          <Quote className="h-5 w-5 text-secondary/35 group-hover:text-secondary transition-colors flex-shrink-0" />
                        </div>

                        {/* Quote snippet */}
                        <blockquote className="text-14 sm:text-15 text-text-2 leading-relaxed italic mb-16 sm:mb-20 line-clamp-4">
                          "{smallItem2.quote.replace('\n\n', ' ')}"
                        </blockquote>
                      </div>

                      {/* Author row with avatar */}
                      <div className="pt-16 sm:pt-20 border-t border-grey-3/80 flex items-center gap-3.5">
                        <div className="h-11 w-11 rounded-full overflow-hidden bg-grey-2 border border-grey-3 flex-shrink-0 shadow-xs">
                          <img
                            src={smallItem2.image}
                            alt={smallItem2.author}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="min-w-0">
                          <span className="text-15 font-bold text-primary block leading-tight">
                            {smallItem2.author}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Dotted Cycle Navigation Visual Indicator Bar */}
          <div
            className="flex items-center justify-center gap-2.5 pt-8 mt-4"
            role="tablist"
            aria-label="Review cycle indicators"
          >
            {items.map((it, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={it.id}
                  type="button"
                  onClick={() => handleSelectReview(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary ${
                    isActive
                      ? 'w-8 bg-secondary shadow-sm shadow-secondary/50'
                      : 'w-2.5 bg-surface/30 hover:bg-surface/60'
                  }`}
                  aria-label={`View review by ${it.author} (${idx + 1} of ${items.length})`}
                  aria-selected={isActive}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export const Reviews = Testimonials;
export default Testimonials;
