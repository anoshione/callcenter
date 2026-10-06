import React from 'react';
import { Check, Award } from 'lucide-react';
import { CardCornerGradient } from '../ui/CardCornerGradient';
import { site } from '../../content/site';
import { Section } from '../layout/Section';
import { Eyebrow } from '../ui/Eyebrow';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';

export const About: React.FC = () => {
  return (
    <Section id="about" variant="surface" padded={false} overflowHidden={false} className="pb-10 sm:pb-14">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 md:gap-16 xl:gap-24 items-center">
        {/* Left Text Content (6 cols) */}
        <div className="lg:col-span-6 flex flex-col items-start">
          {/* Header Title (Eyebrow + H2) with exact 32px gap to content */}
          <div className="flex flex-col items-start gap-2 mb-32">
            <Reveal direction="up" delayMs={50}>
              <Eyebrow variant="section" className="text-14">
                {site.about.eyebrow}
              </Eyebrow>
            </Reveal>

            <Reveal direction="up" delayMs={100}>
              <h2 className="text-28 font-medium text-primary leading-tight tracking-tight">
                {site.about.title}
              </h2>
            </Reveal>
          </div>

          {/* Body Paragraphs Content with 32px gap to checklist */}
          <Reveal direction="up" delayMs={150}>
            <div className="flex flex-col gap-3 text-14 text-text-2 leading-normal mb-32">
              {site.about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>

          {/* Quick value props list in 1 column with 32px gap to button */}
          <Reveal direction="up" delayMs={200} className="w-full mb-32">
            <div className="flex flex-col gap-3 w-full">
              <div className="flex items-center gap-3 text-15 text-text font-medium">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary/15 text-secondary-active flex-shrink-0">
                  <Check className="h-4 w-4 stroke-[2.5]" />
                </span>
                <span>Dedicated Account Supervisors</span>
              </div>
              <div className="flex items-center gap-3 text-15 text-text font-medium">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary/15 text-secondary-active flex-shrink-0">
                  <Check className="h-4 w-4 stroke-[2.5]" />
                </span>
                <span>Real-Time SLA Dashboards</span>
              </div>
              <div className="flex items-center gap-3 text-15 text-text font-medium">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary/15 text-secondary-active flex-shrink-0">
                  <Check className="h-4 w-4 stroke-[2.5]" />
                </span>
                <span>Continuous Agent Calibration</span>
              </div>
              <div className="flex items-center gap-3 text-15 text-text font-medium">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary/15 text-secondary-active flex-shrink-0">
                  <Check className="h-4 w-4 stroke-[2.5]" />
                </span>
                <span>ISO & SOC 2 Ready Security</span>
              </div>
            </div>
          </Reveal>

          <Reveal direction="up" delayMs={250}>
            <div>
              <Button to={site.about.learnMoreHref} variant="primary">
                Learn More About Us
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Right Visual: Single big image with floating glass stat card */}
        <div className="lg:col-span-6 relative flex justify-center items-center">
          <Reveal direction="left" delayMs={200} className="relative w-full max-w-lg lg:max-w-xl">
            <div className="relative w-full pb-10 sm:pb-12">
              {/* Single Big Image: Modern Call Center Operations Floor */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/12] rounded-24 overflow-hidden border border-white/80 shadow-2xl group">
                <img
                  src="/assets/about-operations-main.jpg"
                  alt={`${site.brand.name} Call Center Operations Floor`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-slow"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Single Floating Stat Card in our style placed at bottom right */}
              <div className="absolute -bottom-6 right-4 sm:-bottom-8 sm:right-8 z-20">
                <div className="relative overflow-hidden flex items-center gap-16 p-16 sm:p-20 rounded-16 bg-white/95 backdrop-blur-xl border border-white/80 shadow-2xl transition-all duration-base hover:-translate-y-1 group">
                  <CardCornerGradient size="sm" variant="secondary" />
                  <div className="relative z-10 flex h-[48px] w-[48px] min-w-[48px] items-center justify-center rounded-12 bg-secondary/15 text-secondary-active flex-shrink-0 shadow-xs">
                    <Award className="h-6 w-6 stroke-[2]" />
                  </div>
                  <div className="relative z-10 flex flex-col pr-4">
                    <span className="font-bold text-24 sm:text-28 text-primary leading-none">
                      {site.about.proofBadge.value}
                    </span>
                    <span className="text-13 sm:text-14 font-medium text-text-2 mt-1 leading-snug">
                      {site.about.proofBadge.label}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
};

export default About;
