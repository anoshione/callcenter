import React from 'react';
import { Building2, Shield, Radio, Activity, Compass, Zap } from 'lucide-react';
import { site, PartnerItem } from '../../content/site';
import { Section } from '../layout/Section';
import { SectionHeader } from '../ui/SectionHeader';
import { Marquee } from '../ui/Marquee';

export const Partners: React.FC = () => {
  const { row1, row2, eyebrow, title } = site.partners;

  const getPartnerIcon = (category: string) => {
    switch (category) {
      case 'Technology':
      case 'Software':
        return <Zap className="h-5 w-5 text-secondary" />;
      case 'Supply Chain':
      case 'Transportation':
        return <Compass className="h-5 w-5 text-secondary" />;
      case 'Healthcare':
      case 'Life Sciences':
        return <Activity className="h-5 w-5 text-secondary" />;
      case 'Finance':
      case 'Fintech':
        return <Shield className="h-5 w-5 text-secondary" />;
      case 'Telecom':
        return <Radio className="h-5 w-5 text-secondary" />;
      default:
        return <Building2 className="h-5 w-5 text-secondary" />;
    }
  };

  const renderCard = (p: PartnerItem, key: string) => (
    <div
      key={key}
      className="flex items-center gap-3.5 rounded-16 border border-grey-3 bg-surface px-16 py-12 shadow-sm transition-all duration-base hover:border-secondary hover:shadow-md cursor-default group flex-shrink-0"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-16 bg-grey-1 group-hover:bg-secondary/15 transition-colors">
        {getPartnerIcon(p.category)}
      </div>
      <div className="flex flex-col">
        <span className="text-16 font-bold tracking-tight text-primary group-hover:text-secondary-active transition-colors">
          {p.name}
        </span>
        <span className="text-12 text-grey-5 font-medium">{p.category}</span>
      </div>
    </div>
  );

  return (
    <Section id="partners" variant="surface" fullWidthContent padded={false}>
      <div className="flex flex-col overflow-hidden">
        {/* Section Header (Centered, 14px top/bottom, 28px middle, 32px gap to content) */}
        <div className="px-4">
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            subtitle="Empowering scale-ups and Fortune 500 enterprises with resilient 24/7 customer service and support infrastructure."
          />
        </div>

        {/* Marquee Rows with 16px gap between rows */}
        <div className="flex flex-col gap-4">
          {/* Marquee Row 1 (Left to Right / standard) */}
          <Marquee direction="left" pauseOnHover fadeEdges className="py-1">
            {row1.map((p, i) => renderCard(p, `r1-${p.id}-${i}`))}
          </Marquee>

          {/* Marquee Row 2 (Right to Left / reverse) */}
          <Marquee direction="right" pauseOnHover fadeEdges className="py-1">
            {row2.map((p, i) => renderCard(p, `r2-${p.id}-${i}`))}
          </Marquee>
        </div>
      </div>
    </Section>
  );
};

export default Partners;
