import React from 'react';

export type OrbsPreset = 'hero' | 'banner' | 'corner' | 'subtle';

export interface OrbsProps {
  preset?: OrbsPreset;
  count?: 1 | 2 | 3;
  className?: string;
}

/**
 * Reusable Orbs component implementing DESIGN.md section 6:
 * Max 3 orbs per panel.
 * Uses --orb-green, --orb-navy, --orb-light.
 * Never animates blur radius; handles reduced motion gracefully.
 */
export const Orbs: React.FC<OrbsProps> = ({
  preset = 'subtle',
  count = 2,
  className = '',
}) => {
  // Clamp count to max 3
  const effectiveCount = Math.min(Math.max(1, count), 3);

  const renderOrbs = () => {
    switch (preset) {
      case 'hero':
        return (
          <>
            <div
              className="pointer-events-none absolute -top-24 -left-24 h-[440px] w-[440px] rounded-full bg-secondary/25 blur-[var(--blur-orb)] animate-orb will-change-transform"
              aria-hidden="true"
            />
            {effectiveCount >= 2 && (
              <div
                className="pointer-events-none absolute top-1/3 -right-24 h-[480px] w-[480px] rounded-full bg-text-2/40 blur-[var(--blur-orb)] animate-orb will-change-transform"
                style={{ animationDelay: '-12s' }}
                aria-hidden="true"
              />
            )}
            {effectiveCount === 3 && (
              <div
                className="pointer-events-none absolute bottom-0 left-1/3 h-[360px] w-[360px] rounded-full bg-surface/10 blur-[var(--blur-orb)] animate-orb will-change-transform"
                style={{ animationDelay: '-24s' }}
                aria-hidden="true"
              />
            )}
          </>
        );

      case 'banner':
        return (
          <>
            <div
              className="pointer-events-none absolute -top-20 -left-12 h-64 w-64 rounded-full bg-secondary/20 blur-[var(--blur-orb)]"
              aria-hidden="true"
            />
            {effectiveCount >= 2 && (
              <div
                className="pointer-events-none absolute -bottom-20 -right-12 h-64 w-64 rounded-full bg-surface/10 blur-[var(--blur-orb)]"
                aria-hidden="true"
              />
            )}
          </>
        );

      case 'corner':
        return (
          <>
            <div
              className="pointer-events-none absolute -top-16 -right-16 h-72 w-72 rounded-full bg-secondary/20 blur-[var(--blur-orb)]"
              aria-hidden="true"
            />
            {effectiveCount >= 2 && (
              <div
                className="pointer-events-none absolute -bottom-16 -left-16 h-72 w-72 rounded-full bg-text-2/20 blur-[var(--blur-orb)]"
                aria-hidden="true"
              />
            )}
          </>
        );

      case 'subtle':
      default:
        return (
          <>
            <div
              className="pointer-events-none absolute top-0 right-1/4 h-80 w-80 rounded-full bg-secondary/10 blur-[var(--blur-orb)]"
              aria-hidden="true"
            />
            {effectiveCount >= 2 && (
              <div
                className="pointer-events-none absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-text-2/15 blur-[var(--blur-orb)]"
                aria-hidden="true"
              />
            )}
          </>
        );
    }
  };

  return <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>{renderOrbs()}</div>;
};
