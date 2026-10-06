import React from 'react';
import { PageShell } from '../components/layout/PageShell';
import { Section } from '../components/layout/Section';
import { PageBanner } from '../components/layout/PageBanner';
import { HowWeWork } from '../components/sections/HowWeWork';
import { GetStarted } from '../components/sections/GetStarted';
import { Faq } from '../components/sections/Faq';
import { Contact } from '../components/sections/Contact';
import { Button } from '../components/ui/Button';
import { site } from '../content/site';

export const Services: React.FC = () => {
  return (
    <PageShell
      title="Our Services"
      description="Explore our full suite of enterprise BPO and contact center solutions, from frontline omnichannel care to specialized technical desks."
    >
      <PageBanner
        id="services-hero"
        eyebrow="Tailored BPO Solutions"
        title="Bespoke Services Engineered for Scale"
        subtitle="We adapt directly to your tooling, volume patterns, and compliance requirements without rigid pre-packaged pricing."
      />

      <Section id="services-list" variant="surface" padded={false}>
        <div className="flex flex-col gap-32">
          {site.services.map((srv, index) => (
            <div
              key={srv.id}
              id={srv.slug}
              className={`flex flex-col lg:flex-row items-center gap-24 md:gap-32 p-24 md:p-32 rounded-16 border border-grey-3 shadow-sm ${
                index % 2 === 1 ? 'lg:flex-row-reverse bg-grey-1' : 'bg-surface'
              }`}
            >
              <div className="w-full lg:w-1/2">
                <img
                  src={srv.image}
                  alt={srv.title}
                  className="w-full h-auto aspect-[4/3] rounded-16 border border-grey-3 object-cover shadow-sm"
                  width="600"
                  height="450"
                  loading="lazy"
                />
              </div>
              <div className="w-full lg:w-1/2 flex flex-col gap-4">
                <div>
                  <span className="text-14 font-medium text-secondary-active uppercase">
                    {srv.eyebrow}
                  </span>
                </div>
                <h2 className="text-28 font-medium text-primary leading-tight tracking-tight">
                  {srv.title}
                </h2>
                <p className="text-16 text-text-2 leading-relaxed">
                  {srv.description}
                </p>
                <div className="my-2 pt-2 border-t border-grey-3/70">
                  <h3 className="text-13 font-bold text-primary uppercase tracking-wider mb-3">
                    Core Operational Deliverables:
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-14 text-text">
                    {srv.pointers.map((p, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary/15 text-secondary-active text-12 font-bold shrink-0">
                          &#10003;
                        </span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-2">
                  <Button
                    href={`#contact?service=${srv.slug}`}
                    variant="primary"
                    withArrow
                  >
                    Request Proposal for {srv.title}
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

      {/* Frequently Asked Questions */}
      <Faq />

      {/* Contact Proposal Form */}
      <Contact />
    </PageShell>
  );
};
