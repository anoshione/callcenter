import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpenId?: string;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultOpenId,
  className = '',
}) => {
  const [openIds, setOpenIds] = useState<string[]>(
    defaultOpenId ? [defaultOpenId] : []
  );

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={`flex flex-col gap-3 w-full ${className}`}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        const contentId = `accordion-content-${item.id}`;
        const headerId = `accordion-header-${item.id}`;

        return (
          <div
            key={item.id}
            className="flex flex-col rounded-16 border border-grey-3 bg-surface overflow-hidden transition-all duration-base shadow-sm"
          >
            <button
              id={headerId}
              type="button"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={contentId}
              className="flex items-center justify-between gap-4 p-5 text-left w-full hover:bg-grey-1 transition-colors group"
            >
              <div className="flex items-center gap-3">
                {item.icon && (
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-16 bg-grey-1 border border-grey-3 text-secondary">
                    {item.icon}
                  </div>
                )}
                <span className="text-16 font-bold text-primary group-hover:text-secondary-active transition-colors">
                  {item.title}
                </span>
              </div>

              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-16 bg-grey-2 text-primary transition-colors">
                {isOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
              </div>
            </button>

            {/* CSS Grid 0fr -> 1fr smooth height animation */}
            <div
              id={contentId}
              role="region"
              aria-labelledby={headerId}
              className={`grid transition-[grid-template-rows] duration-base ease-out-custom ${
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-5 pt-1 text-14 text-text-2 leading-relaxed border-t border-grey-3/50">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
