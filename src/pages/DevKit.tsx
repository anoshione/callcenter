import React, { useState } from 'react';
import { PageShell } from '../components/layout/PageShell';
import { Section } from '../components/layout/Section';
import { PageBanner } from '../components/layout/PageBanner';
import { Button } from '../components/ui/Button';
import { Eyebrow } from '../components/ui/Eyebrow';
import { SectionHeader } from '../components/ui/SectionHeader';
import { ServiceCard } from '../components/ui/ServiceCard';
import { GlassCard } from '../components/ui/GlassCard';
import { Orbs } from '../components/ui/Orbs';
import { InputField, SelectField, TextareaField } from '../components/ui/Field';
import { Accordion } from '../components/ui/Accordion';
import { Marquee } from '../components/ui/Marquee';
import { TeamCard } from '../components/ui/TeamCard';
import { PostCard } from '../components/ui/PostCard';
import { Lightbox, LightboxItem } from '../components/ui/Lightbox';
import { Reveal } from '../components/ui/Reveal';
import { site } from '../content/site';

export const DevKit: React.FC = () => {
  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const sampleLightboxItems: LightboxItem[] = [
    { src: '/assets/placeholders/gallery-1.svg', title: 'Main Operations Floor', category: 'Operations' },
    { src: '/assets/placeholders/gallery-2.svg', title: 'Simulation Lab', category: 'Training' },
    { src: '/assets/placeholders/gallery-3.svg', title: 'Telephony Monitoring Hub', category: 'Technology' },
  ];

  return (
    <PageShell
      title="UI Kit & Component Primitives"
      description="Design system primitives, typography roles, and interactive components verified against design tokens."
    >
      {/* DevKit Header */}
      <PageBanner
        id="devkit-hero"
        eyebrow="Phase 1 Verification"
        title="Design System Primitives Kit"
        subtitle="Interactive playground displaying all component states, variants, and validation tokens."
      />

      {/* 1. Buttons */}
      <Section id="devkit-buttons" variant="surface" className="py-12">
        <div className="flex flex-col gap-8">
          <SectionHeader
            align="left"
            eyebrow="Interactive Elements"
            title="Button System"
            subtitle="Pill geometry with micro-interactions, responsive sizing, and WCAG AA contrast compliance."
          />

          <div className="flex flex-col gap-6 p-8 rounded-16 border border-grey-3 bg-grey-1">
            <h3 className="text-18 font-bold text-primary">Standard Light Surface Variants</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary" size="md">Primary (Navy)</Button>
              <Button variant="primary" size="lg" withArrow>Primary Large &rarr;</Button>
              <Button variant="secondary" size="md">Secondary (Green)</Button>
              <Button variant="secondary" size="lg" withArrow>Secondary Large &rarr;</Button>
              <Button variant="outline" size="md">Outline</Button>
              <Button variant="link" size="md">Link Variant &rarr;</Button>
            </div>

            <h3 className="text-18 font-bold text-primary pt-4 border-t border-grey-3">Interactive States (Loading & Disabled)</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary" isLoading>Submitting...</Button>
              <Button variant="secondary" isLoading>Processing...</Button>
              <Button variant="primary" disabled>Primary Disabled</Button>
              <Button variant="secondary" disabled>Secondary Disabled</Button>
              <Button variant="outline" disabled>Outline Disabled</Button>
            </div>
          </div>

          {/* On Navy Dark Variant */}
          <div className="p-8 rounded-16 bg-primary text-surface flex flex-col gap-4">
            <h3 className="text-18 font-bold text-surface">Buttons On Navy / Glass Backgrounds</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="secondary" size="md" withArrow>Secondary Green &rarr;</Button>
              <Button variant="outline" onNavy size="md">Outline Glass Border</Button>
              <Button variant="outline" onNavy size="lg" withArrow>Outline Large &rarr;</Button>
            </div>
          </div>
        </div>
      </Section>

      {/* 2. Eyebrows & Section Headers */}
      <Section id="devkit-headings" variant="grey-1" className="py-12">
        <div className="flex flex-col gap-8">
          <SectionHeader
            align="left"
            eyebrow="Typography Hierarchy"
            title="Eyebrows & Section Headers"
            subtitle="Standardized typographic roles for consistent visual rhythm."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-16 bg-surface border border-grey-3 flex flex-col gap-4">
              <h4 className="text-16 font-bold text-primary">Light Surface Eyebrows</h4>
              <Eyebrow variant="section">Section Eyebrow (500, Secondary-Active)</Eyebrow>
              <Eyebrow variant="card">Card Eyebrow (300, Slate-Navy Text-2)</Eyebrow>
            </div>

            <div className="p-8 rounded-16 bg-primary text-surface flex flex-col gap-4">
              <h4 className="text-16 font-bold text-surface">Dark Surface Eyebrows</h4>
              <Eyebrow variant="section" onNavy>Section Eyebrow On Navy (500, Secondary)</Eyebrow>
              <Eyebrow variant="card" onNavy>Card Eyebrow On Navy (300, Light Muted)</Eyebrow>
            </div>
          </div>
        </div>
      </Section>

      {/* 3. GlassCard & Orbs */}
      <Section id="devkit-glass" variant="primary" panelClassName="py-16 relative overflow-hidden">
        <Orbs preset="corner" count={2} />
        <div className="relative z-10 flex flex-col gap-8">
          <SectionHeader
            onNavy
            align="left"
            eyebrow="Depth & Blur System"
            title="Glass Surfaces & Ambient Orbs"
            subtitle="Multi-layered depth with hardware-accelerated transforms and strict 3-orb caps."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassCard variant="dark" blur="lg" className="p-8 flex flex-col gap-3">
              <span className="text-14 font-bold text-secondary uppercase">Glass Dark</span>
              <h3 className="text-20 font-bold text-surface">Frosted Navy Scrim</h3>
              <p className="text-14 text-grey-2">
                Uses <code>--glass-bg-dark</code> with <code>--glass-border-dark</code> and 32px blur.
              </p>
            </GlassCard>

            <GlassCard variant="light" blur="lg" className="p-8 flex flex-col gap-3 bg-surface/90 text-text">
              <span className="text-14 font-bold text-secondary-active uppercase">Glass Light</span>
              <h3 className="text-20 font-bold text-primary">Floating Surface</h3>
              <p className="text-14 text-text-2">
                Uses <code>--glass-bg</code> with <code>--glass-border</code> on bright panels.
              </p>
            </GlassCard>

            <GlassCard variant="strong" blur="md" className="p-8 flex flex-col gap-3 bg-surface/95 text-text">
              <span className="text-14 font-bold text-secondary-active uppercase">Glass Strong</span>
              <h3 className="text-20 font-bold text-primary">Sticky Nav Scrim</h3>
              <p className="text-14 text-text-2">
                Uses <code>--glass-bg-strong</code> with 16px blur for high-contrast stickied navigation.
              </p>
            </GlassCard>
          </div>
        </div>
      </Section>

      {/* 4. Form Primitives */}
      <Section id="devkit-forms" variant="surface" className="py-12">
        <div className="flex flex-col gap-8">
          <SectionHeader
            align="left"
            eyebrow="Input & Validation"
            title="Form Primitives"
            subtitle="Accessible form controls with explicit focus rings and multi-modal error/success feedback."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 rounded-16 bg-grey-1 border border-grey-3">
            {/* Default State */}
            <div className="flex flex-col gap-4">
              <h4 className="text-16 font-bold text-primary">Default State</h4>
              <InputField
                label="Full Name"
                name="demo-name"
                placeholder="e.g. Elena Rostova"
                required
              />
              <SelectField
                label="Support Channel"
                name="demo-select"
                placeholder="Choose channel..."
                options={[
                  { label: 'Inbound Call Center', value: 'inbound' },
                  { label: 'Live Chat & Email', value: 'chat' },
                ]}
              />
              <TextareaField
                label="Brief Description"
                name="demo-text"
                placeholder="Your operational goals..."
                rows={3}
              />
            </div>

            {/* Error State */}
            <div className="flex flex-col gap-4">
              <h4 className="text-16 font-bold text-error">Error State</h4>
              <InputField
                label="Work Email"
                name="demo-email-err"
                value="invalid-email@"
                status="error"
                message="Please provide a valid business email."
                required
              />
              <SelectField
                label="Required Department"
                name="demo-sel-err"
                status="error"
                message="Please choose an operational department."
                options={[{ label: 'Operations', value: 'ops' }]}
              />
              <TextareaField
                label="Detailed Notes"
                name="demo-text-err"
                status="error"
                message="Description must be at least 20 characters."
                rows={3}
              />
            </div>

            {/* Success & Disabled */}
            <div className="flex flex-col gap-4">
              <h4 className="text-16 font-bold text-success">Success & Disabled</h4>
              <InputField
                label="Direct Phone"
                name="demo-phone-succ"
                value="+1 (800) 555-0199"
                status="success"
                message="Phone format verified."
              />
              <InputField
                label="Read-only Account ID"
                name="demo-disabled"
                value="ACC-948210"
                disabled
              />
              <Button variant="primary" className="mt-auto">Test Form Action</Button>
            </div>
          </div>
        </div>
      </Section>

      {/* 5. Accordion */}
      <Section id="devkit-accordion" variant="grey-1" className="py-12">
        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
          <SectionHeader
            eyebrow="Interactive Component"
            title="Accordion Primitive"
            subtitle="Smooth CSS grid expansion (0fr &rarr; 1fr) with accessible keyboard navigation."
          />

          <Accordion
            defaultOpenId="acc-1"
            items={[
              {
                id: 'acc-1',
                title: 'How do you ensure service level agreement (SLA) adherence?',
                content:
                  'We deploy real-time supervisor dashboards, automatic call distribution (ACD) overflow routing, and daily quality scorecard audits to maintain first-contact resolution rates above 98%.',
              },
              {
                id: 'acc-2',
                title: 'What is your procedure for handling sudden call volume surges?',
                content:
                  'Our elastic workforce model allows us to activate cross-trained reserve specialists within minutes, preventing dropped calls or lengthy queue delays.',
              },
              {
                id: 'acc-3',
                title: 'Can you integrate directly with our proprietary helpdesk and CRM?',
                content:
                  'Yes. Our technical team supports secure REST APIs, role-based single sign-on (SSO), and custom webhook synchronization with your internal systems.',
              },
            ]}
          />
        </div>
      </Section>

      {/* 6. Marquee */}
      <Section id="devkit-marquee" variant="surface" fullWidthContent className="py-12">
        <div className="flex flex-col gap-6">
          <div className="px-6 max-w-3xl mx-auto text-center">
            <SectionHeader
              eyebrow="Continuous Animation"
              title="Marquee Primitive"
              subtitle="Dual direction continuous loops with hover-to-pause and edge fade masks."
            />
          </div>

          <Marquee direction="left">
            {site.partners.row1.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-3 rounded-16 border border-grey-3 bg-surface px-6 py-3.5 shadow-sm"
              >
                <span className="text-16 font-bold text-primary">{p.name}</span>
                <span className="text-12 text-grey-5">{p.category}</span>
              </div>
            ))}
          </Marquee>

          <Marquee direction="right">
            {site.partners.row2.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-3 rounded-16 border border-grey-3 bg-grey-1 px-6 py-3.5 shadow-sm"
              >
                <span className="text-16 font-bold text-primary">{p.name}</span>
                <span className="text-12 text-grey-5">{p.category}</span>
              </div>
            ))}
          </Marquee>
        </div>
      </Section>

      {/* 7. ServiceCard, TeamCard, PostCard */}
      <Section id="devkit-cards" variant="grey-1" className="py-12">
        <div className="flex flex-col gap-10">
          <SectionHeader
            align="left"
            eyebrow="Card Primitives"
            title="Domain Cards Showcase"
            subtitle="Tokens-driven layouts matching screenshot anatomy with pinned CTAs and elevated micro-interactions."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* ServiceCard */}
            <div>
              <h4 className="text-16 font-bold text-primary mb-4">ServiceCard</h4>
              <ServiceCard {...site.services[0]} />
            </div>

            {/* TeamCard */}
            <div>
              <h4 className="text-16 font-bold text-primary mb-4">TeamCard</h4>
              <TeamCard member={site.team.members[0]} />
            </div>

            {/* PostCard */}
            <div>
              <h4 className="text-16 font-bold text-primary mb-4">PostCard (Standard)</h4>
              <PostCard post={site.blogs.posts[0]} />
            </div>
          </div>
        </div>
      </Section>

      {/* 8. Lightbox & Reveal */}
      <Section id="devkit-modal" variant="surface" className="py-12">
        <div className="flex flex-col items-center text-center gap-6 max-w-2xl mx-auto">
          <SectionHeader
            eyebrow="Modal & Scroll FX"
            title="Lightbox & Reveal Primitives"
            subtitle="Accessible image viewer with focus restoration and lightweight IntersectionObserver reveals."
          />

          <Reveal direction="up" delayMs={100}>
            <div className="p-8 rounded-16 bg-grey-1 border border-grey-3 flex flex-col items-center gap-4">
              <p className="text-14 text-text-2">
                Click below to launch the modal Lightbox with arrow key navigation and Esc support.
              </p>
              <Button
                variant="primary"
                size="lg"
                onClick={() => {
                  setLightboxIndex(0);
                  setLightboxOpen(true);
                }}
              >
                Launch Image Lightbox Preview
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Active Lightbox Instance */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={sampleLightboxItems}
        currentIndex={lightboxIndex}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </PageShell>
  );
};

export default DevKit;
