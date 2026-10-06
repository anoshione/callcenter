import React from 'react';
import { Eyebrow } from './Eyebrow';

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  onNavy?: boolean;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  onNavy = false,
  className = '',
}) => {
  const alignStyles = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left';

  return (
    <div className={`flex flex-col max-w-3xl gap-2 mb-32 ${alignStyles} ${className}`}>
      {eyebrow && (
        <Eyebrow variant="section" onNavy={onNavy} className="text-14">
          {eyebrow}
        </Eyebrow>
      )}

      <h2
        className={`text-28 font-medium leading-tight tracking-tight ${
          onNavy ? 'text-surface' : 'text-primary'
        }`}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`text-14 leading-normal max-w-2xl ${
            onNavy ? 'text-grey-2' : 'text-text-2'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
