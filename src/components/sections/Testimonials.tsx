import React, { useState, useEffect } from 'react';
import { Quote, Star, Headphones, PhoneCall, ArrowUpRight } from 'lucide-react';
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
                <div className="flex text-secondary gap-0.5" aria-label="5 stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-secondary text-secondary" />
                  ))}
                </div>
                <span className="font-bold text-surface">
                  {site.testimonials.trustScore.rating} / {site.testimonials.trustScore.scale}
                </span>
                <span className="text-grey-3">·</span>
                <span className="text-grey-2">{site.testimonials.trustScore.reviewCount}</span>
              </div>
              <div className="hidden sm:inline-flex items-center gap-2 rounded-full bg-surface/10 backdrop-blur-md border border-white/15 px-16 py-8 text-grey-2 shadow-xs">
                <span className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
                <span>{site.testimonials.trustScore.retentionRate}</span>
              </div>
            </div>
          )}

          {/* Reviews Grid Layout: 1 Featured Big Card (Left 7 cols) + 2 Interactive Small Cards (Right 5 cols) */}
          {featuredItem && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 lg:gap-32 items-stretch">
              {/* Featured Big Card (Left 7 Cols) - Stable outer card, transforming inner content */}
              <div className="lg:col-span-7 flex flex-col">
                <div
                  className="h-full relative overflow-hidden rounded-16 bg-gradient-to-b from-white via-surface to-grey-1/90 border border-white/60 border-t-[3px] border-t-secondary p-24 sm:p-32 shadow-2xl transition-all duration-base flex flex-col justify-between group"
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
                    className="animate-review-featured relative z-10 flex flex-col sm:flex-row gap-20 md:gap-24 items-start sm:items-stretch h-full"
                  >
                    {/* Portrait Image container */}
                    <div className="relative w-full sm:w-52 md:w-56 lg:w-60 h-64 sm:h-auto rounded-12 overflow-hidden bg-grey-2 border border-grey-3 flex-shrink-0 shadow-sm">
                      <img
                        key={`featured-img-${featuredItem.id}`}
                        src={featuredItem.image}
                        alt={featuredItem.author}
                        className="w-full h-full object-cover animate-review-photo"
                        loading="lazy"
                      />
                    </div>

                    {/* Content block */}
                    <div className="flex-1 flex flex-col justify-between w-full">
                      <div>
                        {/* Stars & Big Quote Icon */}
                        <div className="flex items-center justify-between gap-3 mb-4">
                          <div className="flex text-secondary gap-1" aria-label={`${featuredItem.rating || 5} out of 5 stars`}>
                            {[...Array(featuredItem.rating || 5)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                            ))}
                          </div>
                          <Quote className="h-7 w-7 text-secondary/35 group-hover:text-secondary transition-colors" />
                        </div>

                        {/* Testimonial Quote */}
                        <blockquote className="text-15 sm:text-16 md:text-17 text-text leading-relaxed font-normal italic mb-6">
                          "{featuredItem.quote}"
                        </blockquote>
                      </div>

                      {/* Author info & highlight metric */}
                      <div className="pt-4 border-t border-grey-3/80 flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <span className="text-16 sm:text-18 font-bold text-primary block leading-tight">
                            {featuredItem.author}
                          </span>
                          <span className="text-13 text-grey-5 block mt-0.5">
                            {featuredItem.role}, <strong className="font-medium text-text-2">{featuredItem.company}</strong>
                          </span>
                        </div>
                        {featuredItem.highlight && (
                          <div className="inline-flex items-center gap-1.5 rounded-full bg-secondary/10 px-12 py-4 border border-secondary/25">
                            <span className="text-12 font-bold text-secondary-active">{featuredItem.highlight}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Supporting Small Cards (Right 5 Cols, Stacked) - Click to turn into big card */}
              <div className="lg:col-span-5 flex flex-col gap-20 lg:gap-24 justify-between">
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
                        {/* Card Top Row: Rating, "Click to view" hint, Quote Icon */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <div className="flex text-secondary gap-0.5" aria-label="5 stars">
                            {[...Array(smallItem1.rating || 5)].map((_, i) => (
                              <Star key={i} className="h-3.5 w-3.5 fill-secondary text-secondary" />
                            ))}
                          </div>

                          <div className="flex items-center gap-1.5 text-11 font-medium text-secondary-active opacity-60 group-hover:opacity-100 transition-opacity">
                            <span>Next review</span>
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </div>

                          <Quote className="h-5 w-5 text-secondary/35 group-hover:text-secondary transition-colors flex-shrink-0" />
                        </div>

                        {/* Quote snippet */}
                        <blockquote className="text-14 sm:text-15 text-text-2 leading-relaxed italic mb-4 line-clamp-3">
                          "{smallItem1.quote}"
                        </blockquote>
                      </div>

                      {/* Author row with avatar */}
                      <div className="pt-4 border-t border-grey-3/80 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="h-11 w-11 rounded-full overflow-hidden bg-grey-2 border border-grey-3 flex-shrink-0 shadow-xs">
                            <img
                              src={smallItem1.image}
                              alt={smallItem1.author}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          <div className="min-w-0">
                            <span className="text-15 font-bold text-primary block leading-tight truncate">
                              {smallItem1.author}
                            </span>
                            <span className="text-12 text-grey-5 block truncate mt-0.5">
                              {smallItem1.role}, {smallItem1.company}
                            </span>
                          </div>
                        </div>
                        {smallItem1.highlight && (
                          <span className="hidden sm:inline-flex text-11 font-semibold text-secondary-active bg-secondary/10 px-8 py-4 rounded-full border border-secondary/20 flex-shrink-0">
                            {smallItem1.highlight}
                          </span>
                        )}
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
                        {/* Card Top Row: Rating, "Click to view" hint, Quote Icon */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <div className="flex text-secondary gap-0.5" aria-label="5 stars">
                            {[...Array(smallItem2.rating || 5)].map((_, i) => (
                              <Star key={i} className="h-3.5 w-3.5 fill-secondary text-secondary" />
                            ))}
                          </div>

                          <div className="flex items-center gap-1.5 text-11 font-medium text-secondary-active opacity-60 group-hover:opacity-100 transition-opacity">
                            <span>Up next</span>
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </div>

                          <Quote className="h-5 w-5 text-secondary/35 group-hover:text-secondary transition-colors flex-shrink-0" />
                        </div>

                        {/* Quote snippet */}
                        <blockquote className="text-14 sm:text-15 text-text-2 leading-relaxed italic mb-4 line-clamp-3">
                          "{smallItem2.quote}"
                        </blockquote>
                      </div>

                      {/* Author row with avatar */}
                      <div className="pt-4 border-t border-grey-3/80 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="h-11 w-11 rounded-full overflow-hidden bg-grey-2 border border-grey-3 flex-shrink-0 shadow-xs">
                            <img
                              src={smallItem2.image}
                              alt={smallItem2.author}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          <div className="min-w-0">
                            <span className="text-15 font-bold text-primary block leading-tight truncate">
                              {smallItem2.author}
                            </span>
                            <span className="text-12 text-grey-5 block truncate mt-0.5">
                              {smallItem2.role}, {smallItem2.company}
                            </span>
                          </div>
                        </div>
                        {smallItem2.highlight && (
                          <span className="hidden sm:inline-flex text-11 font-semibold text-secondary-active bg-secondary/10 px-8 py-4 rounded-full border border-secondary/20 flex-shrink-0">
                            {smallItem2.highlight}
                          </span>
                        )}
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
