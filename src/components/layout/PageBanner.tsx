import React from 'react';
import { Orbs } from '../ui/Orbs';

export interface PageBannerProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Standard page banner component for inner pages:
 * - Background starts from the top with 12px padding (pt-3 px-3) like the homepage hero banner.
 * - Content text starts 100px under the floating navbar (pt-[184px]).
 * - 32px bottom padding on the background and content (pb-32) matching homepage background sections.
 */
export const PageBanner: React.FC<PageBannerProps> = ({
  id,
  eyebrow,
  title,
  subtitle,
  className = '',
  children,
}) => {
  return (
    <section id={id} className={`w-full px-3 pt-3 bg-surface mb-[var(--space-section-gap)] ${className}`}>
      {/* Background container starting 12px from top & sides, 32px bottom padding */}
      <div className="relative w-full overflow-hidden rounded-16 bg-primary text-surface shadow-md pt-[184px] pb-32 text-center">
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
