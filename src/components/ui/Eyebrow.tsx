import React from 'react';

export type EyebrowVariant = 'section' | 'card';

export interface EyebrowProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: EyebrowVariant;
  onNavy?: boolean;
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export const Eyebrow: React.FC<EyebrowProps> = ({
  variant = 'section',
  onNavy = false,
  children,
  className = '',
  as: Component = 'span',
  ...props
}) => {
  const getStyles = () => {
    if (variant === 'section') {
      return onNavy
        ? 'text-14 font-medium uppercase tracking-wider text-secondary'
        : 'text-14 font-medium uppercase tracking-wider text-secondary-active';
    }
    // Card eyebrow (14/16, weight 300)
    return onNavy
      ? 'text-14 font-light text-grey-2'
      : 'text-14 font-light text-text-2';
  };

  return (
    <Component className={`block leading-tight ${getStyles()} ${className}`} {...props}>
      {children}
    </Component>
  );
};
