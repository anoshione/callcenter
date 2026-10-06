import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  withArrow?: boolean;
  onNavy?: boolean;
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  href?: string;
  to?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  withArrow = false,
  onNavy = false,
  disabled = false,
  children,
  className = '',
  as: asProp,
  href,
  to,
  type = 'button',
  ...restProps
}) => {
  const Component: React.ElementType = asProp || (to ? Link : href ? 'a' : 'button');
  const isInteractive = !disabled && !isLoading;

  // Unified padding across all button sizes: strictly 12px top & bottom (py-12) and 16px sides (px-16)
  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'text-14',
    md: 'text-16',
    lg: 'text-16',
  };

  // Base 2-state variant styles:
  // - If default is filled -> on hover becomes stroked (outline)
  // - If default is stroked -> on hover becomes filled
  const getVariantStyles = (): string => {
    switch (variant) {
      case 'primary':
        if (onNavy) {
          // Default: Filled white on navy -> Hover: Stroked white
          return 'bg-surface text-primary border border-surface hover:bg-transparent hover:text-surface hover:border-surface active:bg-surface/10 disabled:bg-surface/40 disabled:text-primary/40 disabled:border-transparent';
        }
        // Default: Filled navy -> Hover: Stroked navy
        return 'bg-primary text-surface border border-primary hover:bg-transparent hover:text-primary hover:border-primary active:bg-primary/10 disabled:bg-primary-disabled disabled:border-primary-disabled disabled:text-surface';

      case 'secondary':
        if (onNavy) {
          // Default: Filled green on navy -> Hover: Stroked green
          return 'bg-secondary text-primary font-bold border border-secondary hover:bg-transparent hover:text-secondary hover:border-secondary active:bg-secondary/10 disabled:bg-secondary-disabled disabled:border-secondary-disabled';
        }
        // Default: Filled green -> Hover: Stroked green
        return 'bg-secondary text-primary font-bold border border-secondary hover:bg-transparent hover:text-primary hover:border-secondary active:bg-secondary/10 disabled:bg-secondary-disabled disabled:border-secondary-disabled';

      case 'outline':
        if (onNavy) {
          // Default: Stroked white on navy -> Hover: Filled white
          return 'border border-surface bg-transparent text-surface hover:bg-surface hover:text-primary hover:border-surface active:bg-surface/90 disabled:border-surface/20 disabled:text-surface/40';
        }
        // Default: Stroked navy -> Hover: Filled navy
        return 'border border-primary bg-transparent text-primary hover:bg-primary hover:text-surface hover:border-primary active:bg-primary-active disabled:border-grey-3 disabled:text-grey-4';

      case 'link':
        // Default: Stroked navy -> Hover: Filled navy
        return 'border border-primary bg-transparent text-primary hover:bg-primary hover:text-surface hover:border-primary active:bg-primary-active disabled:border-grey-3 disabled:text-grey-4';

      default:
        return '';
    }
  };

  const buttonSpecificProps = Component === 'button'
    ? {
        type,
        disabled: disabled || isLoading,
        'aria-busy': isLoading,
      }
    : {
        ...(to ? { to } : {}),
        ...(href ? { href } : {}),
        'aria-disabled': disabled || isLoading ? true : undefined,
      };

  return (
    <Component
      className={`relative inline-flex items-center justify-center gap-2.5 rounded-round font-medium py-12 px-16 transition-all duration-base ease-out-custom select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 ${
        sizeStyles[size]
      } ${getVariantStyles()} ${
        isInteractive ? 'active:scale-[0.98]' : 'cursor-not-allowed opacity-75'
      } group ${className}`}
      {...buttonSpecificProps}
      {...restProps}
    >
      {/* Loading spinner */}
      {isLoading ? (
        <span className="flex items-center gap-2">
          <Loader2 size={18} className="animate-spin shrink-0" />
          <span>{children}</span>
        </span>
      ) : (
        <>
          <span>{children}</span>
          {withArrow && (
            <ArrowRight
              size={20}
              strokeWidth={2}
              className="shrink-0 transition-transform duration-base ease-out-custom group-hover:translate-x-1"
            />
          )}
        </>
      )}
    </Component>
  );
};

export default Button;
