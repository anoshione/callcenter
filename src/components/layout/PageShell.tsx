import React, { useEffect, useRef, useState } from 'react';
import { Nav } from './Nav';
import { Footer } from './Footer';
import { GridOverlay } from './GridOverlay';
import { site } from '../../content/site';

export interface PageShellProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

/**
 * PageShell manages:
 * 1. Global clean layout canvas (1920px max context with 1440px container).
 * 2. Sticky navigation transition past scroll sentinel.
 * 3. Accessible skip link.
 * 4. Dev-only GridOverlay (toggle with G).
 * 5. Dynamic document title & meta tags.
 */
export const PageShell: React.FC<PageShellProps> = ({
  children,
  title,
  description,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Update document title and meta description
  useEffect(() => {
    const fullTitle = title
      ? `${title} | ${site.brand.name}`
      : `${site.brand.name} | Premier Call Center & Customer Support`;
    document.title = fullTitle;

    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);
    }
  }, [title, description]);

  // IntersectionObserver for sticky nav
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting && entry.boundingClientRect.top <= 0);
      },
      {
        threshold: 0,
        rootMargin: '0px 0px 0px 0px',
      }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-surface text-text selection:bg-secondary selection:text-primary relative">
      {/* Accessible skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[99999] focus:rounded-8 focus:bg-primary focus:px-5 focus:py-2.5 focus:text-surface focus:shadow-md"
      >
        Skip to main content
      </a>

      {/* Dev-only layout grid overlay (toggle with G, excluded in prod) */}
      {import.meta.env.DEV && <GridOverlay />}

      {/* Sentinel for sticky nav transition */}
      <div ref={sentinelRef} className="h-px w-full pointer-events-none absolute top-16" aria-hidden="true" />

      {/* Top Navigation */}
      <Nav isScrolled={isScrolled} />

      {/* Main Content Area - all page heroes and banners start from top with pt-3 px-3 */}
      <main id="main-content" className="flex flex-col w-full">
        {children}
      </main>

      {/* Footer - primary container with 12px edge padding */}
      <div className="w-full pb-3 px-3 bg-surface">
        <Footer />
      </div>
    </div>
  );
};

export default PageShell;
