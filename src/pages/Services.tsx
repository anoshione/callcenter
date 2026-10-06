import React from 'react';
import { PageShell } from '../components/layout/PageShell';
import { Section } from '../components/layout/Section';
import { PageBanner } from '../components/layout/PageBanner';
import { HowWeWork } from '../components/sections/HowWeWork';
import { GetStarted } from '../components/sections/GetStarted';
import { Faq } from '../components/sections/Faq';
import { Contact } from '../components/sections/Contact';
import { Button } from '../components/ui/Button';
import { Check } from 'lucide-react';
import { site } from '../content/site';

export const Services: React.FC = () => {
  return (
    <PageShell
      title="Our Services"
      description="Explore our full suite of enterprise call center and customer support solutions, from frontline omnichannel care to specialized technical desks."
    >
      <PageBanner
        id="services-hero"
        eyebrow="Tailored Call Center Solutions"
        title="Bespoke Services Engineered for Scale"
        subtitle="We adapt directly to your tooling, volume patterns, and compliance requirements without rigid pre-packaged pricing."
        backgroundImage="/assets/banners/services-banner.jpg"
      />

      <Section id="services-list" variant="surface" padded={false}>
        <div className="flex flex-col gap-32">
          {site.services.map((srv, index) => (
            <div
              key={srv.id}
              id={srv.slug}
              className={`flex flex-col lg:flex-row lg:items-stretch gap-24 md:gap-32 p-24 md:p-32 rounded-16 border border-grey-3 shadow-sm ${
                index % 2 === 1 ? 'lg:flex-row-reverse bg-grey-1' : 'bg-surface'
              }`}
            >
              <div className="w-full lg:w-1/2 flex items-center">
                <img
                  src={srv.image}
                  alt={srv.title}
                  className="w-full h-auto aspect-[4/3] rounded-16 border border-grey-3 object-cover shadow-sm"
                  width="600"
                  height="450"
                  loading="lazy"
                />
              </div>
              <div className="w-full lg:w-1/2 flex flex-col justify-between gap-6 lg:gap-0">
                {/* 1. Title section */}
                <div>
                  <span className="text-12 sm:text-13 font-bold tracking-wider uppercase text-secondary-active block mb-2">
                    {srv.eyebrow}
                  </span>
                  <h2 className="text-28 sm:text-32 font-bold text-primary leading-tight tracking-tight">
                    {srv.title}
                  </h2>
                  <p className="text-15 sm:text-16 text-text-2 leading-relaxed mt-2.5">
                    {srv.description}
                  </p>
                </div>

                {/* 2. Core Operational Deliverables Content Section */}
                <div className="pt-20 border-t border-grey-3/70 lg:my-auto">
                  <h3 className="text-12 font-bold text-primary uppercase tracking-wider mb-3.5">
                    Core Operational Deliverables:
                  </h3>
                  <ul className="flex flex-col gap-3 text-14 text-text">
                    {srv.pointers.map((p, i) => (
                      <li key={i} className="flex items-center gap-2.5">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary/15 text-secondary-active shrink-0">
                          <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                        </span>
                        <span className="leading-snug">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. Action CTA Button */}
                <div className="pt-2">
                  <Button
                    href={`#contact?service=${srv.slug}`}
                    variant="primary"
                    withArrow
                  >
                    {srv.title}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Our Proven Process */}
      <HowWeWork />

      {/* Steps to Get Started */}
      <GetStarted />

      {/* Contact Proposal Form */}
      <Contact />

      {/* Frequently Asked Questions */}
      <Faq />
    </PageShell>
  );
};
