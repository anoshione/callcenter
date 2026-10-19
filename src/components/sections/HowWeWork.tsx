import React from 'react';
import { Search, Compass, GraduationCap, Rocket, TrendingUp } from 'lucide-react';
import { site } from '../../content/site';
import { Section } from '../layout/Section';
import { SectionHeader } from '../ui/SectionHeader';
import { Reveal } from '../ui/Reveal';

export const HowWeWork: React.FC = () => {
  const { steps, eyebrow, title, subtitle } = site.howWeWork;

  const iconMap: Record<string, React.ReactNode> = {
    Search: <Search className="h-5 w-5" />,
    Compass: <Compass className="h-5 w-5" />,
    GraduationCap: <GraduationCap className="h-5 w-5" />,
    Rocket: <Rocket className="h-5 w-5" />,
    TrendingUp: <TrendingUp className="h-5 w-5" />,
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
                className="relative overflow-hidden flex flex-col items-start justify-between gap-20 p-24 md:p-28 xl:p-32 rounded-16 border border-grey-3/80 bg-gradient-to-b from-white via-surface to-grey-1/90 shadow-[var(--shadow-card-crisp)] hover:shadow-[var(--shadow-card-crisp-hover)] transition-all duration-base hover:-translate-y-1.5 w-full group"
              >
                {/* Animated top-left corner-to-full border stroke */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none rounded-16 z-20"
                  fill="none"
                >
                  <rect
                    x="1.5"
                    y="1.5"
                    width="calc(100% - 3px)"
                    height="calc(100% - 3px)"
                    rx="15"
                    pathLength="100"
                    className="process-card-stroke"
                  />
                </svg>
                {/* Background oversized numeral watermark visual matching GetStarted */}
                <span
                  className="pointer-events-none absolute -bottom-3 -right-1 font-mono text-[76px] font-black text-secondary/[0.09] select-none leading-none group-hover:text-secondary/[0.18] transition-colors"
                  aria-hidden="true"
                >
                  {st.number}
                </span>

                <div className="relative z-10 flex flex-col justify-between h-full w-full">
                  <div>
                    {/* Top Row: Process Icon (replaced the left number item) */}
                    <div className="flex items-center justify-start w-full mb-5">
                      <div className="flex h-11 w-11 items-center justify-center rounded-12 bg-primary/5 border border-primary/15 text-primary group-hover:bg-primary group-hover:text-surface group-hover:border-primary transition-all duration-base shadow-xs">
                        {iconMap[st.iconName] || <Rocket className="h-5 w-5" />}
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
