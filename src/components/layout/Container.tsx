import React from 'react';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

/**
 * Standard content container:
 * Max width 1440px, centered, padded with responsive --page-pad.
 * Resolves to 1440px with 240px margins at 1920px canvas width.
 */
export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  as: Component = 'div',
  ...props
}) => {
  return (
    <Component
      className={`mx-auto w-full max-w-[var(--container-max)] px-[var(--page-pad)] ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};
