import React from 'react';
import { site } from '../../content/site';
import { Button } from '../ui/Button';
import { Orbs } from '../ui/Orbs';
import { Reveal } from '../ui/Reveal';

export const CtaBanner: React.FC = () => {
  return (
    <section id="cta-banner" className="w-full py-0 px-3 bg-surface mb-[var(--space-section-gap)]">
      <div className="mx-auto w-full max-w-[var(--container-max)]">
        <Reveal direction="up" delayMs={50}>
          <div className="relative overflow-hidden rounded-16 bg-primary px-8 sm:px-12 md:px-14 py-32 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Background Orbs */}
            <Orbs preset="banner" count={2} />

            <div className="relative z-10 max-w-2xl text-center md:text-left flex flex-col justify-center">
              <h2 className="text-28 font-medium text-surface leading-tight tracking-tight">
                {site.ctaBanner.headline}
              </h2>
              <p className="text-14 sm:text-15 text-grey-2 mt-2 leading-relaxed">
                {site.ctaBanner.subheadLine1 && site.ctaBanner.subheadLine2 ? (
                  <>
                    <span className="block">{site.ctaBanner.subheadLine1}</span>
                    <span className="block">{site.ctaBanner.subheadLine2}</span>
                  </>
                ) : (
                  site.ctaBanner.subhead
                )}
              </p>
            </div>

            <div className="relative z-10 flex-shrink-0 self-center flex items-center">
              <Button
                variant="secondary"
                href={site.ctaBanner.ctaHref}
                onNavy
              >
                {site.ctaBanner.ctaLabel}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default CtaBanner;
