import React from 'react';
import { Target, Compass, HeartHandshake, ShieldCheck, GraduationCap, Lock } from 'lucide-react';
import { PageShell } from '../components/layout/PageShell';
import { Section } from '../components/layout/Section';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Team } from '../components/sections/Team';
import { BlogGallery } from '../components/sections/BlogGallery';
import { Faq } from '../components/sections/Faq';
import { Contact } from '../components/sections/Contact';
import { PageBanner } from '../components/layout/PageBanner';
import { CardCornerGradient } from '../components/ui/CardCornerGradient';
import { site } from '../content/site';

export const About: React.FC = () => {
  return (
    <PageShell
      title="About Us"
      description={`Learn more about ${site.brand.name}, our mission, vision, operational standards, leadership team, and facility culture.`}
    >
      {/* About Hero Header */}
      <PageBanner
        id="about-hero"
        title={site.about.title}
        subtitle={site.about.mission}
      />

      {/* Mission & Vision Section */}
      <Section id="mission-vision" variant="surface" panelClassName="relative overflow-hidden py-16 md:py-24">
        <div className="relative z-10 flex flex-col">
          {/* Centered Section Header with Foundation & Philosophy (32px gap to content) */}
          <div className="flex flex-col items-center text-center mx-auto max-w-3xl mb-32">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-[1.5px] bg-secondary-active/50 rounded-full" />
              <span className="text-12 sm:text-13 font-semibold uppercase tracking-widest text-secondary-active">
                Foundation &amp; Philosophy
              </span>
              <span className="w-8 h-[1.5px] bg-secondary-active/50 rounded-full" />
            </div>
            <h2 className="text-32 sm:text-36 md:text-40 font-bold text-primary tracking-tight leading-tight mb-3">
              Mission &amp; Vision
            </h2>
            <p className="text-15 sm:text-16 text-text-2 max-w-2xl leading-relaxed">
              Guiding principles driving dependable customer care, operational excellence, and enterprise-grade SLA transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 xl:gap-32 items-stretch">
            {/* Mission Card (Green Secondary Accent) */}
            <div className="relative overflow-hidden flex flex-col p-32 rounded-16 bg-white border border-grey-3/80 border-t-[3px] border-t-secondary shadow-sm hover:shadow-lg transition-all duration-base hover:-translate-y-1 group w-full">
              {/* Background watermark icon visual in bottom right (visual accent, text floats on top) */}
              <div className="pointer-events-none absolute -bottom-12 -right-12 select-none opacity-25 group-hover:opacity-40 transition-opacity z-0" aria-hidden="true">
                <Target className="w-[260px] h-[260px] stroke-[1] text-secondary" />
              </div>

              {/* Subtle top-right corner gradient in secondary green */}
              <CardCornerGradient size="md" variant="secondary" />

              <div className="relative z-10 flex flex-col w-full">
                {/* Card Header: Icon Box + Eyebrow & Title */}
                <div className="flex items-center gap-20 mb-20 w-full">
                  <div className="flex h-64 w-64 items-center justify-center rounded-16 bg-secondary/20 border border-secondary/40 text-primary shadow-xs group-hover:bg-secondary group-hover:scale-105 transition-all duration-base shrink-0">
                    <Target className="w-32 h-32 stroke-[2.2] text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-12 font-bold tracking-widest uppercase text-secondary-active">
                      {site.about.missionEyebrow || 'Core Purpose'}
                    </span>
                    <h3 className="text-28 sm:text-32 md:text-36 font-bold text-primary leading-tight mt-1">
                      Our Mission
                    </h3>
                  </div>
                </div>

                <div className="h-[1px] w-full bg-grey-3/70 mb-24" />

                {/* Body Text: spans full width with 32px padding from card edges, floating over bottom-right accent */}
                <div className="flex flex-col gap-16 text-15 sm:text-16 text-text-2 leading-relaxed w-full">
                  <p>
                    To pioneer world-class customer support across voice, live chat, and omnichannel ticketing, securing <strong className="font-semibold text-primary">100% SLA-backed execution</strong> directly integrated into our clients' CRM ecosystems with <strong className="font-semibold text-primary">complete operational transparency</strong> and real-time dashboard reporting.
                  </p>
                  <p>
                    We are dedicated to delivering consistent <strong className="font-semibold text-primary">99.4% first contact resolution</strong> benchmarks with zero hidden overhead, while maintaining <strong className="font-semibold text-primary">rigorous quality calibration</strong>, continuous frontline coaching, and empathetic, human-first resolution.
                  </p>
                </div>
              </div>
            </div>

            {/* Vision Card (Navy Primary Accent) */}
            <div className="relative overflow-hidden flex flex-col p-32 rounded-16 bg-white border border-grey-3/80 border-t-[3px] border-t-primary shadow-sm hover:shadow-lg transition-all duration-base hover:-translate-y-1 group w-full">
              {/* Background watermark icon visual in bottom right (visual accent, text floats on top) */}
              <div className="pointer-events-none absolute -bottom-12 -right-12 select-none opacity-20 group-hover:opacity-35 transition-opacity z-0" aria-hidden="true">
                <Compass className="w-[260px] h-[260px] stroke-[1] text-primary" />
              </div>

              {/* Subtle top-right corner gradient in primary navy */}
              <CardCornerGradient size="md" variant="primary" />

              <div className="relative z-10 flex flex-col w-full">
                {/* Card Header: Icon Box + Eyebrow & Title */}
                <div className="flex items-center gap-20 mb-20 w-full">
                  <div className="flex h-64 w-64 items-center justify-center rounded-16 bg-primary/10 border border-primary/25 text-primary shadow-xs group-hover:bg-primary group-hover:text-surface group-hover:scale-105 transition-all duration-base shrink-0">
                    <Compass className="w-32 h-32 stroke-[2.2]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-12 font-bold tracking-widest uppercase text-text-2">
                      {site.about.visionEyebrow || 'Long-Term Horizon'}
                    </span>
                    <h3 className="text-28 sm:text-32 md:text-36 font-bold text-primary leading-tight mt-1">
                      Our Vision
                    </h3>
                  </div>
                </div>

                <div className="h-[1px] w-full bg-grey-3/70 mb-24" />

                {/* Body Text: spans full width with 32px padding from card edges, floating over bottom-right accent */}
                <div className="flex flex-col gap-16 text-15 sm:text-16 text-text-2 leading-relaxed w-full">
                  <p>
                    To establish our operations as the industry's foremost benchmark for <strong className="font-semibold text-primary">ethical, secure, and human-first contact center outsourcing</strong>, setting the standard for <strong className="font-semibold text-primary">data security compliance</strong>, empathetic customer care, and partner protection.
                  </p>
                  <p>
                    By harmonizing skilled frontline specialists with modern omnichannel workflows, round-the-clock coverage, and strict quality control, we envision creating <strong className="font-semibold text-primary">frictionless customer experiences</strong> and <strong className="font-semibold text-primary">exponential brand loyalty</strong> for every partner organization.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Core Values */}
      <Section id="values" variant="grey-1" panelClassName="py-12 md:py-16">
        <div className="flex flex-col">
          <SectionHeader
            eyebrow="Our Core Principles"
            title="The Values That Drive Every Customer Touchpoint"
            subtitle="Our operating philosophy anchors quality, continuous calibration, and client transparency in every agent workflow."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20 xl:gap-24">
            {site.about.values.map((val, i) => {
              const num = `0${i + 1}`;
              const valueIcons = [
                <HeartHandshake key="empathy" className="h-5 w-5 text-primary" />,
                <ShieldCheck key="accountability" className="h-5 w-5 text-primary" />,
                <GraduationCap key="training" className="h-5 w-5 text-primary" />,
                <Lock key="security" className="h-5 w-5 text-primary" />,
              ];

              return (
                <div
                  key={i}
                  className="relative overflow-hidden flex flex-col items-start justify-between gap-20 p-24 md:p-28 xl:p-32 rounded-16 border border-grey-3/80 border-t-[3px] border-t-primary/70 hover:border-primary hover:border-t-primary bg-gradient-to-b from-white via-surface to-grey-1/90 shadow-md hover:shadow-xl transition-all duration-base hover:-translate-y-1.5 w-full group"
                >
                  {/* Background oversized numeral watermark visual */}
                  <span className="pointer-events-none absolute -bottom-3 -right-1 font-mono text-[76px] font-black text-primary/[0.07] select-none leading-none group-hover:text-primary/[0.15] transition-colors" aria-hidden="true">
                    {num}
                  </span>

                  {/* Subtle top-right corner gradient using primary brand navy */}
                  <CardCornerGradient size="md" variant="primary" />

                  <div className="relative z-10 flex flex-col justify-between h-full w-full">
                    <div>
                      {/* Top Row: Number Badge & Principle Icon */}
                      <div className="flex items-center justify-between w-full mb-5">
                        <div className="flex h-11 w-11 items-center justify-center rounded-12 font-mono text-14 font-bold bg-primary/5 border border-primary/15 text-primary group-hover:bg-primary group-hover:text-surface group-hover:border-primary transition-all duration-base shadow-xs">
                          {num}
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-12 bg-primary/5 border border-primary/10 text-primary group-hover:bg-primary/10 transition-colors">
                          {valueIcons[i] || <ShieldCheck className="h-5 w-5 text-primary" />}
                        </div>
                      </div>

                      <h3 className="text-19 md:text-20 font-bold text-primary group-hover:text-primary transition-colors mb-2.5 leading-snug">
                        {val.title}
                      </h3>

                      <p className="text-14 md:text-15 text-text-2 leading-relaxed">
                        {val.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Historical Milestones */}
      <Section id="milestones" variant="surface" padded={false}>
        <div className="flex flex-col">
          <SectionHeader
            eyebrow="Company History"
            title="Milestones of Growth & Service"
            subtitle="A decade of continuous innovation, facility expansion, and trusted partnerships worldwide."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {site.about.milestones.map((m, idx) => (
              <div
                key={idx}
                className="flex flex-col p-6 rounded-16 bg-grey-1 border border-grey-3 gap-2"
              >
                {/* TODO verify: placeholder milestone date */}
                <span className="font-mono text-24 font-bold text-secondary-active">
                  {m.year}
                </span>
                <h3 className="text-18 font-bold text-primary">{m.title}</h3>
                <p className="text-14 text-text-2 leading-relaxed">{m.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Leadership Team */}
      <Team />

      {/* Insights & Facility Gallery */}
      <BlogGallery />

      {/* Frequently Asked Questions */}
      <Faq />

      {/* Contact Proposal Form */}
      <Contact />
    </PageShell>
  );
};

export default About;
