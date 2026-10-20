import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2, Target, MapPin, Star } from 'lucide-react';
import { site } from '../../content/site';
import { Button } from '../ui/Button';

/**
 * Parses numeric and non-numeric portions of a stat string (e.g. "98%" -> num: 98, suffix: "%")
 */
const parseStatValue = (val: string) => {
  const match = val.match(/(\d+)/);
  if (!match) return { num: 0, prefix: '', suffix: val };
  const num = parseInt(match[1], 10);
  const parts = val.split(match[1]);
  return {
    num,
    prefix: parts[0] || '',
    suffix: parts[1] || '',
  };
};

/**
 * Animated count-up component for stat values
 */
const StatCounter: React.FC<{ value: string; shouldStart: boolean }> = ({ value, shouldStart }) => {
  const { num, prefix, suffix } = parseStatValue(value);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCurrent(num);
      return;
    }

    let startTime: number | null = null;
    let animId: number;
    const duration = 2000; // 2 seconds ease-out animation

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.floor(ease * num));

      if (progress < 1) {
        animId = requestAnimationFrame(animate);
      } else {
        setCurrent(num);
      }
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [shouldStart, num]);

  return (
    <span>
      {prefix}
      {current.toLocaleString()}
      {suffix}
    </span>
  );
};

export const Hero: React.FC = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
      {/* Hero Banner Panel - holds background image, transparent-white progressive fade, and hero typography */}
      <div className="relative w-full min-h-[700px] sm:min-h-[760px] md:min-h-[820px] xl:min-h-[840px] rounded-24 xl:rounded-32 overflow-hidden bg-surface border border-grey-3/80 shadow-sm flex flex-col justify-center">

        {/* Call Center Background Image with agent in secondary green blazer.
            Whole image is visible edge-to-edge across the entire hero banner. */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden">
          <img
            src="/assets/hero-banner-agent-clean.jpg"
            alt="Customer service representative in emerald green blazer on a call"
            className="w-full h-full object-cover object-[center_right]"
            loading="eager"
          />
        </div>

        {/* Mobile Progressive Overlay (< md): gentle vertical fade so text is legible */}
        <div
          className="block md:hidden absolute inset-0 pointer-events-none z-10 backdrop-blur-sm"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.90) 0%, rgba(255,255,255,0.78) 50%, rgba(255,255,255,0.35) 80%, rgba(255,255,255,0) 100%)',
          }}
        />

        {/* Desktop Progressive Scrim (md+):
            - Whole image is fully visible edge-to-edge
            - Uniform lightened transparency keeps the left section airy but legible
            - Smoothly fades out to 0% by ~64%, keeping the agent 100% crisp, unblurred, and luminous */}
        <div
          className="hidden md:block absolute inset-0 pointer-events-none z-10 backdrop-blur-[8px]"
          style={{
            background: 'linear-gradient(to right, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.45) 34%, rgba(255, 255, 255, 0.30) 44%, rgba(255, 255, 255, 0.08) 54%, rgba(255, 255, 255, 0) 64%)',
            maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 35%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0) 64%)',
            WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 35%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0) 64%)',
          }}
        />

        {/* Top-Right Decorative Dot Matrix */}
        <div
          className="absolute top-8 right-8 hidden xl:grid grid-cols-6 gap-3 opacity-25 pointer-events-none z-10"
          aria-hidden="true"
        >
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="h-1.5 w-1.5 rounded-full bg-primary" />
          ))}
        </div>

        {/* Subtle Digital Acoustic Waves Background */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          viewBox="0 0 1440 840"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M-50 678 C 100 668, 220 694, 360 706 C 520 718, 720 686, 1020 664 C 1220 650, 1380 674, 1550 666"
            stroke="var(--color-primary)"
            strokeOpacity="0.25"
            strokeWidth="1.5"
          />
          <path
            d="M-50 696 C 100 686, 220 712, 360 724 C 520 736, 720 704, 1020 682 C 1220 668, 1380 692, 1550 684"
            stroke="var(--color-primary)"
            strokeOpacity="0.35"
            strokeWidth="1.5"
          />
          <path
            d="M-50 714 C 100 704, 220 730, 360 742 C 520 754, 720 722, 1020 700 C 1220 686, 1380 710, 1550 702"
            stroke="var(--color-secondary)"
            strokeOpacity="0.45"
            strokeWidth="1.5"
          />
        </svg>

        {/* Hero Main Content Area inside 1440px Container */}
        <div className="relative z-20 w-full mx-auto max-w-[var(--container-max)] px-6 md:px-12 xl:px-16 pt-48 sm:pt-56 md:pt-64 xl:pt-72 pb-32 sm:pb-40 md:pb-48 xl:pb-56 flex flex-col justify-center">
          <div className="max-w-2xl xl:max-w-3xl flex flex-col items-start">
            {/* H1 Heading (dark navy, bold, multi-line) */}
            <h1 className="text-32 sm:text-40 md:text-52 xl:text-64 font-bold tracking-tight text-primary leading-[1.12]">
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

            {/* Action Buttons: 48px height, symmetrical padding with 16px gap */}
            <div className="relative flex flex-wrap items-center gap-16 mt-32">
              <Button
                href={site.hero.primaryCta.href}
                variant="primary"
                withArrow
                className="relative z-10 shadow-sm"
              >
                {site.hero.primaryCta.label}
              </Button>

              <Button
                to={site.hero.secondaryCta.href}
                variant="outline"
                className="relative z-10 backdrop-blur-[2px] bg-white/40 hover:bg-primary hover:text-surface transition-all"
              >
                {site.hero.secondaryCta.label}
              </Button>
            </div>
          </div>
        </div>
      </div>

        {/* Floating Glass Stats Bar positioned overlapping the bottom edge of the banner panel:
            same glass recipe as the navbar (--glass-bg + blur-md token); ~half the bar's height
            hangs over the hero panel edge */}
      <div
        ref={statsRef}
        className="relative z-30 mx-auto w-full max-w-[var(--container-max)] px-4 md:px-8 -mt-56"
      >
        <div className="rounded-16 py-16 lg:py-20 px-16 sm:px-24 lg:px-28 border border-glass-border shadow-md bg-glass-bg backdrop-blur-md relative overflow-hidden">
          {/* Subtle dotted matrix texture under the stats bar content */}
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
                  <span className="text-28 md:text-34 font-bold text-primary leading-tight group-hover:text-primary transition-colors tracking-tight">
                    <StatCounter value={stat.value} shouldStart={hasStarted} />
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
