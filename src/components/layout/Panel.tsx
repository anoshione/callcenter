import React from 'react';

export type PanelVariant = 'surface' | 'grey-1' | 'primary' | 'transparent';

export interface PanelProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  variant?: PanelVariant;
  className?: string;
  as?: React.ElementType;
  padded?: boolean;
  overflowHidden?: boolean;
}

/**
 * Architectural Panel:
 * Only primary colored sections have the rounded background container look (rounded-16).
 * Light/white sections flow seamlessly without artificial rounded borders.
 */
export const Panel: React.FC<PanelProps> = ({
  children,
  variant = 'surface',
  className = '',
  as: Component = 'div',
  padded = true,
  overflowHidden = true,
  ...props
}) => {
  const isPrimary = variant === 'primary';

  const variantStyles: Record<PanelVariant, string> = {
    surface: 'bg-surface text-text',
    'grey-1': 'bg-grey-1 text-text',
    primary: 'bg-primary text-surface rounded-16 shadow-md',
    transparent: 'bg-transparent text-text',
  };

  const roundedStyle = isPrimary ? 'rounded-16' : '';
  const overflowStyle = overflowHidden ? 'overflow-hidden' : '';
  const paddingStyles = padded ? (isPrimary ? 'py-12 md:py-16' : 'py-0') : '';

  return (
    <Component
      className={`relative w-full ${roundedStyle} ${overflowStyle} ${variantStyles[variant]} ${paddingStyles} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Panel;
