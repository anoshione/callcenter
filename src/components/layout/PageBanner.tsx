import React from 'react';
import { Orbs } from '../ui/Orbs';

export interface PageBannerProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Standard page banner component for inner pages:
 * - Background photo banner that fades to solid primary navy under the navbar.
 * - Semi-transparent primary color overlay ensuring 100% text readability.
 * - Background starts from the top with 12px padding (pt-3 px-3) like homepage hero.
 * - Content text starts 100px under the floating navbar (pt-[184px]).
 * - 100px bottom padding on the background and content (pb-100).
 */
export const PageBanner: React.FC<PageBannerProps> = ({
  id,
  eyebrow,
  title,
  subtitle,
  backgroundImage = '/assets/banners/about-banner.jpg',
  className = '',
  children,
}) => {
  return (
    <section id={id} className={`w-full px-3 pt-3 bg-surface mb-[var(--space-section-gap)] ${className}`}>
      {/* Background container starting 12px from top & sides, 100px bottom padding */}
      <div className="relative w-full overflow-hidden rounded-16 bg-primary text-surface shadow-md pt-[184px] pb-100 text-center">
        {/* Background photo layer with smooth top fade to primary color & semi-transparent overlay */}
        {backgroundImage && (
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
            <img
              src={backgroundImage}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover object-center filter saturate-[0.85] contrast-[1.05] scale-105"
            />
            {/* Semi-transparent primary color layer so texts are properly visible */}
            <div className="absolute inset-0 bg-primary/75" />

            {/* Top gradient fade into solid primary color so image is not cropped under navbar */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/80 to-transparent h-64 sm:h-80" />

            {/* Subtle bottom grounding vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent" />
          </div>
        )}

        <Orbs preset="banner" count={2} />
        <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 xl:px-16 flex flex-col gap-4">
          {children ? (
            children
          ) : (
            <>
              {eyebrow && (
                <span className="text-14 font-medium text-secondary uppercase tracking-wider">
                  {eyebrow}
                </span>
              )}
              {title && (
                <h1 className="text-36 md:text-48 xl:text-56 font-medium text-surface leading-tight">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="text-16 md:text-20 text-grey-2 leading-relaxed">
                  {subtitle}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageBanner;
