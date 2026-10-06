import React, { useEffect, useState } from 'react';

/**
 * Dev-only GridOverlay:
 * Matches Figma layout grid settings:
 * 12 columns, stretch, margin 240px (at 1920px), gutter 24px, 10% opacity.
 * Press 'G' to toggle visibility.
 * Completely disabled/unrendered in production builds.
 */
export const GridOverlay: React.FC = () => {
  if (!import.meta.env.DEV) {
    return null;
  }

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input or textarea
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      if (e.key === 'g' || e.key === 'G') {
        setVisible((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] flex justify-center"
      aria-hidden="true"
    >
      <div className="mx-auto flex h-full w-full max-w-[var(--container-max)] px-[var(--page-pad)]">
        <div className="grid h-full w-full grid-cols-4 md:grid-cols-8 xl:grid-cols-12 gap-[var(--space-16)] md:gap-[var(--space-24)]">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className={`h-full flex flex-col justify-between border-x border-[rgba(0,0,0,0.06)] bg-[rgba(0,0,0,0.07)] text-[10px] text-[rgba(0,0,0,0.4)] ${
                i >= 4 ? 'hidden md:flex' : ''
              } ${i >= 8 ? 'md:hidden xl:flex' : ''}`}
            >
              <span className="p-1 font-mono font-medium">{i + 1}</span>
              <span className="p-1 font-mono font-medium">{i + 1}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="fixed bottom-4 right-4 rounded-round bg-primary px-3 py-1 text-12 font-medium text-surface shadow-md">
        Grid active (Press G to toggle)
      </div>
    </div>
  );
};
