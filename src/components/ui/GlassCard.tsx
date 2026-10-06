import React from 'react';

export type GlassVariant = 'light' | 'dark' | 'strong';
export type GlassBlur = 'sm' | 'md' | 'lg' | 'xl';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: GlassVariant;
  blur?: GlassBlur;
  children: React.ReactNode;
  className?: string;
  bordered?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  variant = 'light',
  blur = 'lg',
  children,
  className = '',
  bordered = true,
  ...props
}) => {
  const variantStyles: Record<GlassVariant, string> = {
    light: 'bg-glass-bg text-text',
    dark: 'bg-glass-bg-dark text-surface',
    strong: 'bg-glass-bg-strong text-text',
  };

  const borderStyles: Record<GlassVariant, string> = {
    light: 'border border-glass-border',
    dark: 'border border-glass-border-dark',
    strong: 'border border-glass-border',
  };

  const blurStyles: Record<GlassBlur, string> = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl',
  };

  return (
    <div
      className={`rounded-16 ${variantStyles[variant]} ${
        bordered ? borderStyles[variant] : ''
      } ${blurStyles[blur]} shadow-sm transition-all duration-base ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
