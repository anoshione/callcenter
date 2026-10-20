import React from 'react';
import { Headphones, PhoneCall } from 'lucide-react';
import { site } from '../../content/site';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';
import { CardCornerGradient } from '../ui/CardCornerGradient';

export const CtaBanner: React.FC = () => {
  return (
    <section id="cta-banner" className="w-full py-0 px-3 bg-surface mt-20 sm:mt-24 md:mt-32 lg:mt-36 mb-[var(--space-section-gap)]">
      <div className="mx-auto w-full max-w-[var(--container-max)]">
        <Reveal direction="up" delayMs={50}>
          {/* Main White Card Container */}
          <div className="relative overflow-visible rounded-24 bg-white border border-grey-3/80 shadow-xl shadow-primary/[0.04] px-6 sm:px-10 lg:px-14 py-14 sm:py-16 md:py-20 lg:py-22 min-h-[190px] md:min-h-[220px] lg:min-h-[240px] flex flex-col justify-center">
            <CardCornerGradient size="md" variant="secondary" />

            {/* Decorative faint background vector icons at ~2.5% opacity per DESIGN.md */}
            <div className="absolute top-4 right-44 pointer-events-none text-primary/[0.025] -rotate-12 select-none" aria-hidden="true">
              <Headphones className="w-52 h-52" />
            </div>
            <div className="absolute -bottom-10 right-16 pointer-events-none text-primary/[0.025] rotate-12 select-none" aria-hidden="true">
              <PhoneCall className="w-52 h-52" />
            </div>

            {/* Desktop / Tablet Agent Cutout - lowered and cropped at bottom to match reference */}
            <div className="hidden md:flex absolute bottom-0 left-6 sm:left-10 lg:left-14 w-[250px] sm:w-[280px] lg:w-[310px] h-[290px] sm:h-[315px] lg:h-[335px] overflow-hidden pointer-events-none z-20 items-start justify-center">
              <img
                src="/assets/agent-call-cutout.png"
                alt="Call Center Support Representative"
                className="w-full h-full object-cover object-top select-none drop-shadow-md"
                loading="lazy"
              />
            </div>

            {/* Mobile Agent Cutout Pop-up - lowered and cropped cleanly */}
            <div className="flex md:hidden relative -mt-12 sm:-mt-14 w-[190px] sm:w-[220px] h-[210px] sm:h-[235px] overflow-hidden mx-auto mb-6 pointer-events-none z-20 items-start justify-center">
              <img
                src="/assets/agent-call-cutout.png"
                alt="Call Center Support Representative"
                className="w-full h-full object-cover object-top select-none drop-shadow-md"
                loading="lazy"
              />
            </div>

            {/* Content: Put the text AFTER the person with generous vertical padding */}
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 md:pl-[280px] sm:md:pl-[310px] lg:pl-[350px] xl:pl-[380px]">
              <div className="flex flex-col justify-center text-center md:text-left max-w-2xl">
                <h2 className="text-24 sm:text-28 md:text-30 lg:text-32 font-medium text-primary leading-tight tracking-tight">
                  {site.ctaBanner.headline}
                </h2>
                <p className="text-15 sm:text-16 text-text-2 mt-2.5 leading-relaxed">
                  {site.ctaBanner.subhead}
                </p>
              </div>

              <div className="flex-shrink-0 self-center flex items-center">
                <Button
                  variant="primary"
                  href={site.ctaBanner.ctaHref}
                  withArrow
                  className="shadow-sm"
                >
                  {site.ctaBanner.ctaLabel}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default CtaBanner;
