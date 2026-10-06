import React, { useState } from 'react';
import { HelpCircle, Plus, Minus } from 'lucide-react';
import { site } from '../../content/site';
import { Section } from '../layout/Section';
import { SectionHeader } from '../ui/SectionHeader';

export const Faq: React.FC = () => {
  const { items, eyebrow, title, subtitle } = site.faqs;

  const col1Items = items.filter((item) => item.column === 1);
  const col2Items = items.filter((item) => item.column === 2);

  const [openCol1, setOpenCol1] = useState<string | null>(col1Items[0]?.id || null);
  const [openCol2, setOpenCol2] = useState<string | null>(col2Items[0]?.id || null);

  const toggleCol1 = (id: string) => {
    setOpenCol1((prev) => (prev === id ? null : id));
  };

  const toggleCol2 = (id: string) => {
    setOpenCol2((prev) => (prev === id ? null : id));
  };

  const renderFaqItem = (
    item: (typeof items)[0],
    isOpen: boolean,
    onToggle: () => void
  ) => (
    <div
      key={item.id}
      className="flex flex-col rounded-16 border border-grey-3 bg-surface overflow-hidden transition-all duration-base shadow-sm"
    >
      <button
        id={`faq-question-${item.id}`}
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.id}`}
        className="flex items-center justify-between gap-16 p-6 md:p-7 text-left w-full hover:bg-grey-1/70 transition-colors group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
      >
        <div className="flex items-center gap-12">
          <HelpCircle className="h-5 w-5 text-secondary flex-shrink-0" />
          <span className="text-16 font-medium text-primary group-hover:text-secondary-active transition-colors">{item.question}</span>
        </div>

        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-16 bg-grey-2 text-primary transition-colors group-hover:bg-primary group-hover:text-surface">
          {isOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
        </div>
      </button>

      {/* CSS Grid 0fr -> 1fr smooth height animation */}
      <div
        id={`faq-answer-${item.id}`}
        role="region"
        aria-labelledby={`faq-question-${item.id}`}
        className={`grid transition-[grid-template-rows] duration-base ease-out-custom ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-6 md:px-7 pb-6 md:pb-7 pt-2 text-15 text-text-2 leading-relaxed border-t border-grey-3/50">
            {item.answer}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Section id="faq" variant="surface" padded={false}>
      <div className="flex flex-col">
        {/* Section Header (Centered, 14px top/bottom, 28px middle, 32px gap to content) */}
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
        />

        {/* 2 Columns of FAQs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">
          {/* Column 1 */}
          <div className="flex flex-col gap-16">
            {col1Items.map((item) =>
              renderFaqItem(item, openCol1 === item.id, () => toggleCol1(item.id))
            )}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-16">
            {col2Items.map((item) =>
              renderFaqItem(item, openCol2 === item.id, () => toggleCol2(item.id))
            )}
          </div>
        </div>
      </div>
    </Section>
  );
};
