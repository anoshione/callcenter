import React from 'react';
import { Award, UserCheck, BarChart3, Sliders, ShieldCheck } from 'lucide-react';
import { site } from '../../content/site';
import { Section } from '../layout/Section';
import { Eyebrow } from '../ui/Eyebrow';
import { Reveal } from '../ui/Reveal';

export const About: React.FC = () => {
  const renderPropIcon = (name: string, className: string) => {
    switch (name) {
      case 'UserCheck':
        return <UserCheck className={className} />;
      case 'BarChart3':
        return <BarChart3 className={className} />;
      case 'Sliders':
        return <Sliders className={className} />;
      case 'ShieldCheck':
        return <ShieldCheck className={className} />;
      default:
        return <UserCheck className={className} />;
    }
  };

  return (
    <Section
      id="about"
      variant="surface"
      padded={false}
      overflowHidden={false}
      className="pt-16 sm:pt-20 md:pt-24 lg:pt-28 !mb-32"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 md:gap-16 xl:gap-24 items-start">
        {/* Left Text Content (6 cols) */}
        <div className="lg:col-span-6 flex flex-col items-start pt-1 sm:pt-2">
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

          {/* Quick value props list with dedicated, crisp visual badges */}
          <Reveal direction="up" delayMs={200} className="w-full">
            <div className="flex flex-col gap-8 w-full">
              {site.about.valueProps?.map((prop, idx) => (
                <div key={idx} className="flex items-center gap-8 text-16 text-primary font-medium group">
                  <span className="flex w-[32px] h-[32px] min-w-[32px] min-h-[32px] items-center justify-center rounded-8 bg-secondary/12 border border-secondary/25 text-secondary-active shadow-xs transition-[background-color,color,border-color] duration-base group-hover:bg-secondary group-hover:text-surface group-hover:border-secondary shrink-0">
                    {renderPropIcon(prop.iconName, 'w-[18px] h-[18px] min-w-[18px] min-h-[18px] stroke-[2]')}
                  </span>
                  <span className="leading-snug">{prop.title}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right Visual: Single big image of Modern Call Center Operations Floor with 1-line tag on top-right */}
        <div className="lg:col-span-6 relative flex justify-end items-start w-full pt-1 sm:pt-2">
          <Reveal direction="left" delayMs={200} className="relative w-full">
            <div className="relative w-full">
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-24 overflow-hidden border border-white/80 shadow-2xl group">
                <img
                  src="/assets/about-operations-main.jpg"
                  alt={`${site.brand.name} Call Center Operations Floor`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-slow"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent pointer-events-none" />

                {/* 1-line transparent blurred tag with rounded corner on top-left of the image */}
                <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-20 flex items-center gap-2.5 sm:gap-3 pl-12 pr-20 py-1.5 sm:py-2 sm:pl-16 sm:pr-24 rounded-full bg-white/85 backdrop-blur-md border border-white/90 shadow-md pointer-events-auto transition-transform duration-base hover:scale-105">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary/15 text-secondary-active shrink-0 shadow-xs">
                    <Award className="w-3.5 h-3.5 stroke-[2.2]" />
                  </div>
                  <span className="font-bold text-14 sm:text-15 text-primary leading-none">
                    {site.about.proofBadge.value}
                  </span>
                  <span className="text-12 sm:text-13 font-medium text-text-2 leading-none whitespace-nowrap">
                    {site.about.proofBadge.label}
                  </span>
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
