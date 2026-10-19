import React, { useRef, useState, useEffect } from 'react';
import { TrendingUp, Handshake, Lightbulb, Rocket } from 'lucide-react';
import { site } from '../../content/site';
import { Section } from '../layout/Section';
import { SectionHeader } from '../ui/SectionHeader';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';

interface InfographicCardProps {
  isTypeA: boolean;
  isPrimary: boolean;
  stepNumber: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const InfographicCard: React.FC<InfographicCardProps> = ({
  isTypeA,
  isPrimary,
  stepNumber,
  title,
  description,
  icon,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 560, h: 220 });

  useEffect(() => {
    if (!containerRef.current) return;
    const update = () => {
      if (containerRef.current) {
        setDims({
          w: containerRef.current.offsetWidth,
          h: containerRef.current.offsetHeight,
        });
      }
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const { w, h } = dims;
  const strokeClass = isPrimary ? 'text-primary' : 'text-secondary';
  const titleClass = isPrimary ? 'text-primary' : 'text-secondary-active';

  // Geometry tokens matching reference: 84px diameter true circle
  const cr = 42; // Circle radius
  const r = 26;  // Corner radius

  if (isTypeA) {
    // Card 1 & 3: Top-right number, bottom-right curl
    const cx = Math.max(r + cr + 10, w - 56);
    const cy = h - 2.5 - cr; // Exact tangent to bottom edge (h - 2.5)
    const dottedStartX = cx - 75;
    const dottedEndX = cx - 26;

    // Unbroken continuous vector stroke with mathematically exact 270-degree circle
    const pathD = `
      M ${dottedStartX} 2.5
      L ${r} 2.5
      A ${r} ${r} 0 0 0 2.5 ${r}
      L 2.5 ${h - r}
      A ${r} ${r} 0 0 0 ${r} ${h - 2.5}
      L ${cx} ${h - 2.5}
      A ${cr} ${cr} 0 1 0 ${cx - cr} ${cy}
    `.trim();

    return (
      <div
        ref={containerRef}
        className={`group relative w-full min-h-[220px] flex flex-col justify-center transition-transform duration-base hover:-translate-y-1 pl-36 sm:pl-48 pr-[100px] sm:pr-[125px] py-28 sm:py-32 ${strokeClass}`}
      >
        {/* Continuous SVG Vector Frame */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
          viewBox={`0 0 ${w} ${h}`}
          fill="none"
          aria-hidden="true"
        >
          {/* Main Continuous Stroke */}
          <path
            d={pathD}
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Dotted line leading to Number */}
          <line
            x1={dottedStartX}
            y1="2.5"
            x2={dottedEndX}
            y2="2.5"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="1 8"
          />

          {/* Typographic Outlined Number matching reference DIN / Bahnschrift / Montserrat font */}
          <text
            x={cx}
            y={54}
            fontFamily="'Bahnschrift', 'DIN Alternate', 'Montserrat', var(--font-family), sans-serif"
            fontWeight="bold"
            fontSize="60"
            fill="var(--color-surface)"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            textAnchor="middle"
          >
            {stepNumber}
          </text>
        </svg>

        {/* Large prominent icon centered inside circle */}
        <div
          className="absolute flex items-center justify-center text-current pointer-events-none transition-transform duration-base group-hover:scale-110"
          style={{
            left: cx - 24,
            top: cy - 24,
            width: 48,
            height: 48,
          }}
          aria-hidden="true"
        >
          {icon}
        </div>

        {/* Card Content with bold Montserrat heading and clean typography */}
        <div className="relative z-10 max-w-[420px]">
          <h3 className={`font-montserrat font-extrabold text-20 sm:text-22 md:text-24 uppercase tracking-normal mb-2 leading-snug ${titleClass}`}>
            {title}
          </h3>
          <p className="text-15 md:text-16 text-text-2 leading-relaxed font-normal">
            {description}
          </p>
        </div>
      </div>
    );
  }

  // Type B: Card 2 & 4: Top-left curl, bottom-left number
  const cx = 56;
  const cy = 2.5 + cr; // Exact tangent to top line (2.5)
  const dottedStartX = cx + 26;
  const dottedEndX = cx + 75;

  // Unbroken continuous vector stroke with mathematically exact 270-degree circle
  const pathD = `
    M ${cx + cr} ${cy}
    A ${cr} ${cr} 0 1 1 ${cx} 2.5
    L ${w - r} 2.5
    A ${r} ${r} 0 0 1 ${w - 2.5} ${r}
    L ${w - 2.5} ${h - r}
    A ${r} ${r} 0 0 1 ${w - r} ${h - 2.5}
    L ${dottedEndX} ${h - 2.5}
  `.trim();

  return (
    <div
      ref={containerRef}
      className={`group relative w-full min-h-[220px] flex flex-col justify-center transition-transform duration-base hover:-translate-y-1 pl-[100px] sm:pl-[125px] pr-36 sm:pr-48 py-28 sm:py-32 ${strokeClass}`}
    >
      {/* Continuous SVG Vector Frame */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        viewBox={`0 0 ${w} ${h}`}
        fill="none"
        aria-hidden="true"
      >
        {/* Main Continuous Stroke */}
        <path
          d={pathD}
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Dotted line leading to Number */}
        <line
          x1={dottedEndX}
          y1={h - 2.5}
          x2={dottedStartX}
          y2={h - 2.5}
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="1 8"
        />

        {/* Typographic Outlined Number sitting on bottom line matching reference font */}
        <text
          x={cx}
          y={h - 2.5}
          fontFamily="'Bahnschrift', 'DIN Alternate', 'Montserrat', var(--font-family), sans-serif"
          fontWeight="bold"
          fontSize="60"
          fill="var(--color-surface)"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          textAnchor="middle"
        >
          {stepNumber}
        </text>
      </svg>

      {/* Large prominent icon centered inside circle */}
      <div
        className="absolute flex items-center justify-center text-current pointer-events-none transition-transform duration-base group-hover:scale-110"
        style={{
          left: cx - 24,
          top: cy - 24,
          width: 48,
          height: 48,
        }}
        aria-hidden="true"
      >
        {icon}
      </div>

      {/* Card Content with bold Montserrat heading and clean typography */}
      <div className="relative z-10 max-w-[420px]">
        <h3 className={`font-montserrat font-extrabold text-20 sm:text-22 md:text-24 uppercase tracking-normal mb-2 leading-snug ${titleClass}`}>
          {title}
        </h3>
        <p className="text-15 md:text-16 text-text-2 leading-relaxed font-normal">
          {description}
        </p>
      </div>
    </div>
  );
};

export const GetStarted: React.FC = () => {
  const { steps, eyebrow, title, subtitle, ctaLabel, ctaHref } = site.getStarted;

  const iconList = [
    <TrendingUp key="trending-up" style={{ width: 36, height: 36 }} strokeWidth={2.2} />,
    <Handshake key="handshake" style={{ width: 36, height: 36 }} strokeWidth={2.2} />,
    <Lightbulb key="lightbulb" style={{ width: 36, height: 36 }} strokeWidth={2.2} />,
    <Rocket key="rocket" style={{ width: 36, height: 36 }} strokeWidth={2.2} />,
  ];

  return (
    <Section id="get-started" variant="surface" padded={false} className="pb-16 sm:pb-24">
      <div className="flex flex-col">
        {/* Section Header */}
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
        />

        {/* 2x2 Infographic Grid matching reference screenshot with zero white background */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full">
          {steps.map((item, idx) => {
            const isPrimary = idx % 2 === 0;
            const isTypeA = idx === 0 || idx === 2; // Card 1 & 3 (Left side: top number, bottom-right curl)
            const numberVal = idx + 1;
            const icon = iconList[idx] || <TrendingUp style={{ width: 36, height: 36 }} strokeWidth={2.2} />;

            return (
              <Reveal key={item.step} direction="up" delayMs={idx * 80} className="flex">
                <InfographicCard
                  isTypeA={isTypeA}
                  isPrimary={isPrimary}
                  stepNumber={numberVal}
                  title={item.title}
                  description={item.description}
                  icon={icon}
                />
              </Reveal>
            );
          })}
        </div>

        {/* Centered CTA - same pattern as the other section footers */}
        <div className="flex justify-center mt-32">
          <Button href={ctaHref} variant="primary" withArrow>
            {ctaLabel}
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default GetStarted;
