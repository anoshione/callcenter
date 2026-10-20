import React from 'react';
import { Phone, Search, FileText, Rocket } from 'lucide-react';
import { site } from '../../content/site';
import { Section } from '../layout/Section';
import { SectionHeader } from '../ui/SectionHeader';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';

/**
 * Arrow fill + number tint ramps, derived 100% from brand tokens via color-mix
 * (light -> dark navy, mirroring the reference infographic's blue progression).
 */
const arrowFill = (strength: number) =>
  `color-mix(in srgb, var(--color-primary) ${strength}%, var(--color-surface))`;

const numberFill = (strength: number) =>
  `color-mix(in srgb, var(--color-primary) ${strength}%, var(--color-surface))`;

interface ArrowStepProps {
  stepNumber: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  fillStrength: number;
  numberStrength: number;
}

/** One numbered arrow column: big tinted number, arrow band with white icon, uppercase title, body copy */
const ArrowStep: React.FC<ArrowStepProps> = ({
  stepNumber,
  title,
  description,
  icon,
  fillStrength,
  numberStrength,
}) => {
  const ARROW_HEAD = 30;

  return (
    <div className="relative flex flex-col">
      {/* Soft vertical "paper" shadow at the column's left edge (reference look) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-48 bottom-16 w-8 blur-sm opacity-40 rounded-8"
        style={{
          background:
            'linear-gradient(to bottom, color-mix(in srgb, var(--color-primary) 25%, transparent), transparent 82%)',
        }}
      />

      {/* Big tinted step number above the arrow band */}
      <span
        className="relative z-10 font-montserrat font-extrabold text-28 md:text-32 leading-none tracking-wide"
        style={{ color: numberFill(numberStrength) }}
      >
        {stepNumber}
      </span>

      {/* Arrow band with white line icon near the head */}
      <div
        className="relative z-10 mt-4 h-56 w-full"
        style={{
          background: arrowFill(fillStrength),
          clipPath: `polygon(0 0, calc(100% - ${ARROW_HEAD}px) 0, 100% 50%, calc(100% - ${ARROW_HEAD}px) 100%, 0 100%)`,
        }}
      >
        <span
          aria-hidden="true"
          className="absolute top-1/2 -translate-y-1/2 text-surface"
          style={{ right: ARROW_HEAD + 20 }}
        >
          {icon}
        </span>
      </div>

      {/* Uppercase bold title + supporting copy */}
      <h3 className="relative z-10 mt-14 font-montserrat font-extrabold uppercase text-13 md:text-14 text-primary tracking-wide leading-snug">
        {title}
      </h3>
      <p className="relative z-10 mt-6 text-13 md:text-14 text-text-2 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export const GetStarted: React.FC = () => {
  const { steps, eyebrow, title, subtitle, ctaLabel, ctaHref } = site.getStarted;

  // Navy ramp (light -> dark) per step, matching the reference's blue progression
  const ramp = [
    { fill: 40, number: 72 },
    { fill: 62, number: 84 },
    { fill: 84, number: 96 },
    { fill: 100, number: 100 },
  ];

  const icons = [
    <Phone key="phone" size={20} strokeWidth={2.2} aria-hidden="true" />,
    <Search key="search" size={20} strokeWidth={2.2} aria-hidden="true" />,
    <FileText key="file" size={20} strokeWidth={2.2} aria-hidden="true" />,
    <Rocket key="rocket" size={20} strokeWidth={2.2} aria-hidden="true" />,
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

        {/* Arrow Infographic in a bordered, rounded panel (consistent with the design system) */}
        <Reveal direction="up" delayMs={80}>
          <div className="relative w-full rounded-24 xl:rounded-32 border border-grey-3/70 bg-white shadow-sm px-16 sm:px-24 md:px-32 py-24 sm:py-32 md:py-40">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-24 lg:gap-24 w-full">
              {steps.map((item, idx) => {
                const tone = ramp[idx] || ramp[ramp.length - 1];
                return (
                  <Reveal
                    key={item.step}
                    direction="up"
                    delayMs={60 * idx}
                    className="flex"
                  >
                    <ArrowStep
                      stepNumber={item.step}
                      title={item.title}
                      description={item.description}
                      icon={icons[idx] || icons[0]}
                      fillStrength={tone.fill}
                      numberStrength={tone.number}
                    />
                  </Reveal>
                );
              })}
            </div>
          </div>
        </Reveal>

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
