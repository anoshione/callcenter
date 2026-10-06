import React from 'react';
import { Panel, PanelVariant } from './Panel';
import { Container } from './Container';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  variant?: PanelVariant;
  className?: string;
  panelClassName?: string;
  containerClassName?: string;
  padded?: boolean;
  overflowHidden?: boolean;
  fullWidthContent?: boolean;
  children: React.ReactNode;
}

/**
 * Standard semantic page Section combining Panel with responsive Container.
 */
export const Section: React.FC<SectionProps> = ({
  id,
  variant = 'surface',
  className = '',
  panelClassName = '',
  containerClassName = '',
  padded = true,
  overflowHidden = true,
  fullWidthContent = false,
  children,
  ...props
}) => {
  return (
    <section id={id} className={`w-full mb-[var(--space-section-gap)] last:mb-[var(--space-section-gap)] ${className}`} {...props}>
      <Panel
        variant={variant}
        padded={padded}
        overflowHidden={overflowHidden}
        className={panelClassName}
      >
        {fullWidthContent ? (
          children
        ) : (
          <Container className={containerClassName}>{children}</Container>
        )}
      </Panel>
    </section>
  );
};
