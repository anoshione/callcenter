import React from 'react';
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

        <div className="mx-auto w-full max-w-[var(--container-max)] relative z-10 flex flex-col">
          {/* Section Header (Centered, 14px top/bottom, 28px middle, 32px gap to content) */}
          <SectionHeader
            onNavy
            eyebrow="Our Core Expertise"
            title="Enterprise Contact Center & BPO Solutions"
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
