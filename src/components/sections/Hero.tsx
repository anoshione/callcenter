import React from 'react';
import { CheckCircle2, Target, MapPin, Star } from 'lucide-react';
import { site } from '../../content/site';
import { Button } from '../ui/Button';

export const Hero: React.FC = () => {
  const renderStatIcon = (name: string, className: string) => {
    switch (name) {
      case 'CheckCircle2':
        return <CheckCircle2 className={className} />;
      case 'Target':
        return <Target className={className} />;
      case 'MapPin':
        return <MapPin className={className} />;
      case 'Star':
        return <Star className={className} />;
      default:
        return <CheckCircle2 className={className} />;
    }
  };

  return (
    <div className="relative w-full px-3 pt-3 mb-[var(--space-section-gap)]">
      {/* Hero Banner Container with 12px top and side padding from viewport, rounded corners */}
      <div className="relative w-full min-h-[680px] xl:min-h-[760px] rounded-16 overflow-hidden bg-grey-1 border border-grey-3/80 shadow-sm flex flex-col justify-between">

        {/* Right-side Agent Photography */}
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[62%] xl:w-[58%] h-full pointer-events-none select-none overflow-hidden">
          <img
            src="/assets/hero-banner-agent.jpg"
            alt="Customer service representative with headset smiling in office"
            className="w-full h-full object-cover object-[center_right]"
            loading="eager"
          />
          {/* Subtle horizontal gradient overlays for smooth seamless blend */}
          <div className="absolute inset-0 bg-gradient-to-r from-grey-1 via-grey-1/90 lg:via-grey-1/25 to-transparent" />
          <div className="absolute inset-y-0 left-0 w-full lg:w-[50%] bg-gradient-to-r from-grey-1 to-transparent" />
        </div>

        {/* Top-Right Decorative Dot Matrix (matching reference) */}
        <div
          className="absolute top-8 right-8 hidden xl:grid grid-cols-6 gap-3 opacity-30 pointer-events-none"
          aria-hidden="true"
        >
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="h-1.5 w-1.5 rounded-full bg-primary" />
          ))}
        </div>

        {/* Subtle Digital Acoustic Waves Background */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1440 680"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Wave 1: Slate Navy - flows across the upper portion of the About Us button */}
          <path
            d="M-50 460 C 100 450, 220 476, 360 488 C 520 500, 720 468, 1020 446 C 1220 432, 1380 456, 1550 448"
            stroke="var(--color-primary)"
            strokeOpacity="0.4"
            strokeWidth="1.5"
          />
          {/* Wave 2: Primary Navy - flows directly through the center of the About Us button */}
          <path
            d="M-50 478 C 100 468, 220 492, 360 502 C 520 514, 720 482, 1020 460 C 1220 446, 1380 470, 1550 462"
            stroke="var(--color-primary)"
            strokeOpacity="0.6"
            strokeWidth="1.5"
          />
          {/* Wave 3: Secondary Emerald Green - flows across the lower portion of the About Us button */}
          <path
            d="M-50 496 C 100 486, 220 508, 360 518 C 520 528, 720 496, 1020 474 C 1220 460, 1380 484, 1550 476"
            stroke="var(--color-secondary)"
            strokeOpacity="0.75"
            strokeWidth="1.5"
          />
        </svg>

        {/* Hero Main Content Area inside 1440px Container */}
        <div className="relative z-10 w-full mx-auto max-w-[var(--container-max)] px-6 md:px-12 xl:px-16 pt-52 md:pt-56 xl:pt-60 pb-28 md:pb-36 flex flex-col justify-center">
          <div className="max-w-2xl xl:max-w-3xl flex flex-col items-start">
            {/* H1 Heading (dark navy, bold, multi-line) */}
            <h1 className="text-40 sm:text-48 md:text-56 xl:text-64 font-bold tracking-tight text-primary leading-[1.12]">
              {site.hero.titleLine1}
              <span className="block mt-1 sm:mt-2">{site.hero.titleLine2}</span>
              {site.hero.titleHighlight && (
                <span className="block mt-1 sm:mt-2">{site.hero.titleHighlight}</span>
              )}
            </h1>

            {/* Subtitle / Lead Paragraph */}
            <p className="text-16 md:text-18 text-text-2 leading-relaxed mt-6 max-w-lg font-normal">
              {site.hero.description}
            </p>

            {/* Action Buttons: 48px height, 16px text, symmetrical padding with 32px gap */}
            <div className="relative flex flex-wrap items-center gap-4 mt-32">
              {/* Primary Navy Pill Button with prominent visible Arrow Icon and 2-state toggle */}
              <Button
                href={site.hero.primaryCta.href}
                variant="primary"
                withArrow
                className="relative z-10"
              >
                {site.hero.primaryCta.label}
              </Button>

              {/* Relative wrapper for the transparent About Us button with decorative lines flowing directly through its background */}
              <div className="relative inline-flex items-center">
                {/* Visual lines cutting directly behind the About Us button to highlight transparency */}
                <svg
                  className="absolute -left-12 -right-16 top-1/2 -translate-y-1/2 h-16 pointer-events-none -z-0 overflow-visible"
                  viewBox="0 0 240 60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  {/* Primary Navy Wave Line passing behind the button */}
                  <path
                    d="M-30 38 C 20 24, 60 48, 120 30 C 170 16, 210 40, 270 24"
                    stroke="var(--color-primary)"
                    strokeOpacity="0.45"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  {/* Secondary Emerald Green Wave Line passing behind the button */}
                  <path
                    d="M-20 26 C 30 12, 70 36, 130 18 C 180 6, 220 28, 280 14"
                    stroke="var(--color-secondary)"
                    strokeOpacity="0.8"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>

                {/* Outline Pill Button - transparent with backdrop-filter so passing lines are clearly visible */}
                <Button
                  to={site.hero.secondaryCta.href}
                  variant="outline"
                  className="relative z-10 backdrop-blur-[2px] bg-surface/20 hover:bg-primary hover:text-surface transition-all"
                >
                  {site.hero.secondaryCta.label}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Glass Stats Bar (overlapping bottom edge of banner, matching reference) */}
      <div className="relative -mt-16 md:-mt-20 z-20 mx-auto w-full max-w-[var(--container-max)] px-4 md:px-8">
        <div className="rounded-16 py-20 lg:py-24 px-16 sm:px-24 lg:px-28 border border-glass-border shadow-md bg-glass-bg backdrop-blur-sm relative overflow-hidden">
          {/* Subtle dotted matrix texture under the whole bar content */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.08] select-none" aria-hidden="true">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="stats-inner-dots" width="16" height="16" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="var(--color-primary)" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#stats-inner-dots)" />
            </svg>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y divide-black/20 lg:divide-y-0 lg:divide-x lg:divide-black/25 relative z-10">
            {site.hero.stats.map((stat, i) => (
              <div
                key={i}
                className="relative py-4 sm:py-5 lg:py-2 pl-32 pr-24 sm:pr-28 flex items-center gap-16 group transition-all duration-base hover:-translate-y-0.5"
              >
                {/* 48px Card Style Icon Box on the left as illustrated */}
                <div className="relative z-10 flex h-[48px] w-[48px] min-w-[48px] items-center justify-center rounded-12 bg-primary/5 border border-primary/15 text-primary group-hover:bg-primary group-hover:text-surface group-hover:border-primary shadow-xs transition-all duration-base flex-shrink-0">
                  {renderStatIcon(stat.iconName, 'w-6 h-6 stroke-[2]')}
                </div>

                {/* Two lines: Value & Label */}
                <div className="flex flex-col justify-center relative z-10 min-w-0">
                  {/* TODO verify: placeholder stat claim */}
                  <span className="text-28 md:text-34 font-bold text-primary leading-tight group-hover:text-primary transition-colors tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-13 md:text-14 text-text-2 font-medium mt-0.5 leading-snug">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
