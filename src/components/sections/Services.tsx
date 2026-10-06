import React from 'react';
import { Headphones, PhoneCall, MessageSquare } from 'lucide-react';
import { site } from '../../content/site';
import { SectionHeader } from '../ui/SectionHeader';
import { ServiceCard } from '../ui/ServiceCard';
import { Button } from '../ui/Button';
import { Orbs } from '../ui/Orbs';
import { Reveal } from '../ui/Reveal';

export const Services: React.FC = () => {
  return (
    <section id="services" className="w-full py-0 px-3 bg-surface mb-[var(--space-section-gap)]">
      <div className="relative overflow-hidden rounded-16 bg-primary px-6 md:px-12 xl:px-16 py-32 shadow-md w-full">
        {/* Background orbs & subtle pattern */}
        <Orbs preset="subtle" count={2} />

        {/* Decorative faint background vector icons at ~3.5% opacity per DESIGN.md section 6 */}
        <div className="absolute top-12 left-10 pointer-events-none text-surface/[0.035] -rotate-12 select-none" aria-hidden="true">
          <Headphones className="w-80 h-80" />
        </div>
        <div className="absolute top-1/2 -right-16 -translate-y-1/2 pointer-events-none text-surface/[0.035] rotate-12 select-none" aria-hidden="true">
          <PhoneCall className="w-80 h-80" />
        </div>
        <div className="absolute -bottom-16 left-1/3 pointer-events-none text-surface/[0.03] rotate-6 select-none" aria-hidden="true">
          <MessageSquare className="w-72 h-72" />
        </div>

        <div className="mx-auto w-full max-w-[var(--container-max)] relative z-10 flex flex-col">
          {/* Section Header (Centered, 14px top/bottom, 28px middle, 32px gap to content) */}
          <SectionHeader
            onNavy
            eyebrow="Our Core Expertise"
            title="Enterprise Contact Center & Call Center Solutions"
            subtitle="Bespoke frontline support, multi-tiered technical helpdesks, and compliant back-office operations tailored directly to your customer workflows."
          />

          {/* 6 Service Cards Grid (3 per row) */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-24 xl:gap-32">
            {site.services.slice(0, 6).map((service, index) => (
              <Reveal
                key={service.id}
                direction="up"
                delayMs={60 * (index % 3)}
                className="flex"
              >
                <ServiceCard
                  id={service.id}
                  slug={service.slug}
                  title={service.title}
                  eyebrow={service.eyebrow}
                  description={service.description}
                  pointers={service.pointers}
                  image={service.image}
                  ctaText={`Discuss ${service.title}`}
                  className="w-full"
                />
              </Reveal>
            ))}
          </div>

          {/* View all services footer bar */}
          <Reveal direction="up" delayMs={100} className="flex items-center justify-center pt-6">
            <Button to="/services" variant="outline" onNavy>
              Explore In-Depth Service Specifications
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Services;
