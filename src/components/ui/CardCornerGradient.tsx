import React from 'react';

interface CardCornerGradientProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'secondary' | 'primary';
}

export const CardCornerGradient: React.FC<CardCornerGradientProps> = ({
  className = '',
  size = 'md',
  variant = 'secondary',
}) => {
  // Explicit pixel dimensions so spacing token scale (where 48=48px) does not constrain the blur spread
  const sizeMap = {
    sm: 'w-[140px] h-[140px] -top-[40px] -right-[40px]',
    md: 'w-[200px] h-[200px] -top-[60px] -right-[60px]',
    lg: 'w-[280px] h-[280px] -top-[80px] -right-[80px]',
  }[size];

  const gradientClass =
    variant === 'primary'
      ? 'from-primary/35 via-primary/14 to-transparent'
      : 'from-secondary/25 via-secondary/8 to-transparent';

  return (
    <div
      className={`pointer-events-none absolute ${sizeMap} rounded-full bg-gradient-to-br ${gradientClass} blur-xl select-none z-0 ${className}`}
      aria-hidden="true"
    />
  );
};

export default CardCornerGradient;
