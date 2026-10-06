import React from 'react';
import { site } from '../../content/site';
import { SectionHeader } from '../ui/SectionHeader';
import { Button } from '../ui/Button';
import { Orbs } from '../ui/Orbs';
import { Reveal } from '../ui/Reveal';
import { CardCornerGradient } from '../ui/CardCornerGradient';

export const GetStarted: React.FC = () => {
  const { steps, eyebrow, title, subtitle, ctaLabel, ctaHref } = site.getStarted;

  return (
    <section id="get-started" className="w-full py-0 px-3 bg-surface mb-[var(--space-section-gap)]">
      <div className="relative overflow-hidden rounded-16 bg-primary px-6 md:px-12 xl:px-16 py-32 shadow-md w-full">
        {/* Background orbs & subtle atmosphere */}
        <Orbs preset="subtle" count={2} />

        <div className="mx-auto w-full max-w-[var(--container-max)] relative z-10 flex flex-col">
          {/* Section Header (Centered, 14px top/bottom, 28px middle, 32px gap to content, onNavy) */}
          <SectionHeader
            onNavy
            eyebrow={eyebrow}
            title={title}
            subtitle={subtitle}
          />

          {/* Timeline Grid: Narrower cards with wide, spacious gaps and animated progression flow */}
          <div className="w-full mb-32">
            <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-32 lg:gap-48 xl:gap-64">
              {steps.map((item, idx) => (
                <Reveal
                  key={item.step}
                  direction="up"
                  delayMs={idx * 80}
                  className="flex relative"
                >
                  <div
                    className={`relative z-10 flex flex-col items-start justify-between gap-20 p-24 md:p-28 xl:p-32 rounded-16 overflow-hidden border border-t-[3px] shadow-md hover:shadow-xl transition-all duration-base hover:-translate-y-1.5 w-full group ${
                      idx === 3
                        ? 'bg-gradient-to-b from-[#E6F4EF] via-white to-[#DCF0E8] border-secondary border-t-secondary shadow-xl ring-2 ring-secondary/30'
                        : 'bg-gradient-to-b from-white via-surface to-[#F0F7F4] border-white/60 border-t-secondary/60 hover:border-secondary hover:border-t-secondary'
                    } ${
                      idx === 0
                        ? 'animate-step-card-1'
                        : idx === 1
                        ? 'animate-step-card-2'
                        : idx === 2
                        ? 'animate-step-card-3'
                        : 'animate-step-card-4'
                    }`}
                  >
                    {/* Background oversized numeral watermark visual */}
                    <span className="pointer-events-none absolute -bottom-3 -right-1 font-mono text-[76px] font-black text-secondary/[0.09] select-none leading-none group-hover:text-secondary/[0.18] transition-colors" aria-hidden="true">
                      {item.step}
                    </span>

                    {/* Subtle top-right corner gradient */}
                    <CardCornerGradient size="md" />

                    {/* Step indicator with synchronized progression pulse */}
                    <div
                      className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-12 font-mono text-14 font-bold shadow-xs transition-all duration-base ${
                        idx === 3
                          ? 'bg-secondary text-primary border border-secondary shadow-sm'
                          : 'bg-primary/5 border border-primary/15 text-primary group-hover:bg-secondary/15 group-hover:text-secondary-active group-hover:border-secondary/30'
                      } ${
                        idx === 0
                          ? 'animate-step-badge-1'
                          : idx === 1
                          ? 'animate-step-badge-2'
                          : idx === 2
                          ? 'animate-step-badge-3'
                          : 'animate-step-badge-4'
                      }`}
                    >
                      {item.step}
                    </div>

                    <div className="relative z-10">
                      <h3 className="text-19 md:text-20 font-bold text-primary group-hover:text-secondary-active transition-colors mb-2 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-14 md:text-15 text-text-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Subtle, elegant progress track spanning the wide gap between steps on desktop */}
                  {idx < steps.length - 1 && (
                    <div
                      className="hidden lg:flex absolute top-[52px] right-[-48px] xl:right-[-64px] -translate-y-1/2 w-48 xl:w-64 items-center justify-center pointer-events-none z-20"
                      aria-hidden="true"
                    >
                      {/* Track */}
                      <div className="w-full h-[2px] bg-white/15 relative overflow-hidden rounded-full">
                        {/* Flowing Light Beam */}
                        <div
                          className={`absolute inset-y-0 w-full rounded-full bg-gradient-to-r from-transparent via-secondary to-transparent ${
                            idx === 0
                              ? 'animate-step-beam-1'
                              : idx === 1
                              ? 'animate-step-beam-2'
                              : 'animate-step-beam-3'
                          }`}
                        />
                      </div>
                    </div>
                  )}
                </Reveal>
              ))}
            </div>
          </div>

          {/* Consultative Scoping Callout & CTA */}
          <Reveal direction="up" delayMs={200}>
            <div className="relative overflow-hidden w-full rounded-16 bg-gradient-to-r from-white via-surface to-[#F0F7F4] border border-white/60 py-20 md:py-24 px-28 md:px-48 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left shadow-xl group">
              {/* Dotted texture fading smoothly to the right */}
              <div
                className="absolute left-0 top-0 bottom-0 w-full max-w-xl bg-[radial-gradient(var(--color-secondary)_1.5px,transparent_1.5px)] [background-size:16px_16px] opacity-25 pointer-events-none"
                style={{
                  maskImage: 'linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.8) 40%, rgba(0, 0, 0, 0) 100%)',
                  WebkitMaskImage: 'linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.8) 40%, rgba(0, 0, 0, 0) 100%)',
                }}
                aria-hidden="true"
              />

              <CardCornerGradient size="lg" />

              <div className="max-w-xl relative z-10">
                <h4 className="text-20 md:text-22 font-bold text-primary leading-snug">
                  No generic pricing tiers. No guesswork.
                </h4>
                <p className="text-14 md:text-15 text-text-2 mt-2 leading-relaxed">
                  Every partnership begins with understanding your unique requirements. We quote transparently after our discovery session.
                </p>
              </div>

              <div className="flex-shrink-0 relative z-10">
                <Button variant="secondary" href={ctaHref}>
                  {ctaLabel}
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default GetStarted;
