import React from 'react';
import { Check } from 'lucide-react';
import { Eyebrow } from './Eyebrow';
import { Button } from './Button';

export interface ServiceCardProps {
  id: string;
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  pointers: string[];
  image: string;
  ctaText?: string;
  onCtaClick?: () => void;
  className?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  slug,
  title,
  eyebrow,
  description,
  pointers,
  image,
  ctaText,
  className = '',
}) => {
  return (
    <div
      className={`group relative flex flex-col justify-between rounded-16 bg-surface text-text border border-grey-3 overflow-hidden shadow-sm hover:shadow-md transition-all duration-base hover:-translate-y-1 ${className}`}
    >
      {/* Top Media */}
      <div className="aspect-[16/10] w-full overflow-hidden bg-grey-2 relative">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-base group-hover:scale-104"
          width="600"
          height="375"
          loading="lazy"
        />
      </div>

      {/* Content Body with generous padding */}
      <div className="flex flex-col flex-1 p-24 md:p-32 gap-5 justify-between">
        <div>
          <Eyebrow variant="card" className="mb-2">
            {eyebrow}
          </Eyebrow>

          <h3 className="text-24 md:text-28 font-medium text-primary leading-tight">
            {title}
          </h3>

          <p className="text-15 md:text-16 text-text-2 leading-relaxed mt-3">
            {description}
          </p>

          {/* Key Deliverables Pointers */}
          <div className="mt-24 pt-6 border-t border-grey-3">
            <span className="text-12 font-bold uppercase tracking-wider text-primary block mb-3.5">
              Included Deliverables:
            </span>
            <ul className="flex flex-col gap-3">
              {pointers.map((pointer, idx) => (
                <li key={idx} className="flex items-start gap-3 text-14 text-text leading-snug">
                  <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-secondary/15 text-secondary-active mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                  </span>
                  <span>{pointer}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pinned Bottom CTA - standardized 48px height, 16px text, 2-state hover */}
        <div className="pt-6 mt-4 border-t border-grey-3">
          <Button
            href={`/#contact?service=${slug}`}
            variant="primary"
            className="w-full"
          >
            {ctaText || `Discuss ${title}`}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
