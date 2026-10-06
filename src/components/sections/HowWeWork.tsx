import React from 'react';
import { Search, Compass, GraduationCap, Rocket, TrendingUp } from 'lucide-react';
import { site } from '../../content/site';
import { Section } from '../layout/Section';
import { SectionHeader } from '../ui/SectionHeader';
import { Reveal } from '../ui/Reveal';
import { CardCornerGradient } from '../ui/CardCornerGradient';

export const HowWeWork: React.FC = () => {
  const { steps, eyebrow, title, subtitle } = site.howWeWork;

  const iconMap: Record<string, React.ReactNode> = {
    Search: <Search className="h-5 w-5 text-primary" />,
    Compass: <Compass className="h-5 w-5 text-primary" />,
    GraduationCap: <GraduationCap className="h-5 w-5 text-primary" />,
    Rocket: <Rocket className="h-5 w-5 text-primary" />,
    TrendingUp: <TrendingUp className="h-5 w-5 text-primary" />,
  };

  return (
    <Section id="how-we-work" variant="surface" padded={false} overflowHidden={false} className="pb-12 sm:pb-16">
      <div className="flex flex-col">
        {/* Section Header (Centered, 14px top/bottom, 28px middle, 32px gap to content) */}
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
        />

        {/* 5 Process Stage Cards - Styled after GetStarted with primary color accents */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-20 xl:gap-24 relative pb-8 px-1">
          {steps.map((st, idx) => (
            <Reveal
              key={st.number}
              direction="up"
              delayMs={idx * 80}
              className="flex"
            >
              <div
                className="relative overflow-hidden flex flex-col items-start justify-between gap-20 p-24 md:p-28 xl:p-32 rounded-16 border border-grey-3/80 border-t-[3px] border-t-primary/70 hover:border-primary hover:border-t-primary bg-gradient-to-b from-white via-surface to-grey-1/90 shadow-md hover:shadow-xl transition-all duration-base hover:-translate-y-1.5 w-full group"
              >
                {/* Background oversized numeral watermark visual matching GetStarted */}
                <span
                  className="pointer-events-none absolute -bottom-3 -right-1 font-mono text-[76px] font-black text-secondary/[0.09] select-none leading-none group-hover:text-secondary/[0.18] transition-colors"
                  aria-hidden="true"
                >
                  {st.number}
                </span>

                {/* Subtle top-right corner gradient with primary navy glow */}
                <CardCornerGradient size="md" variant="primary" />

                <div className="relative z-10 flex flex-col justify-between h-full w-full">
                  <div>
                    {/* Top Row: Step Number Badge & Process Icon */}
                    <div className="flex items-center justify-between w-full mb-5">
                      <div className="flex h-11 w-11 items-center justify-center rounded-12 font-mono text-14 font-bold bg-primary/5 border border-primary/15 text-primary group-hover:bg-primary group-hover:text-surface group-hover:border-primary transition-all duration-base shadow-xs">
                        {st.number}
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-12 bg-primary/5 border border-primary/10 text-primary group-hover:bg-primary/10 transition-colors">
                        {iconMap[st.iconName] || <Rocket className="h-5 w-5 text-primary" />}
                      </div>
                    </div>

                    <h3 className="text-19 md:text-20 font-bold text-primary group-hover:text-primary transition-colors mb-2.5 leading-snug">
                      {st.title}
                    </h3>

                    <p className="text-14 md:text-15 text-text-2 leading-relaxed">
                      {st.description}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default HowWeWork;
