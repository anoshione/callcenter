import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { site } from '../../content/site';
import { Button } from '../ui/Button';

interface NavProps {
  isScrolled?: boolean;
}

export const Nav: React.FC<NavProps> = ({ isScrolled = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile drawer when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = site.nav.links;
  // Button always stays "Explore Our Services", never switches on scroll
  const ctaButton = site.nav.ctaTop;

  const handleLinkClick = (href: string, e: React.MouseEvent) => {
    if (href.includes('#')) {
      const id = href.split('#')[1].split('?')[0];
      const element = document.getElementById(id);
      if (element) {
        e.preventDefault();
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `#${id}`);
        return;
      }
    }
  };

  return (
    <>
      {/*
        Architecture: fixed shell at top-0. Two layers inside:
        1. Background (absolute) — morphs shape from pill to full-width. Only this animates.
        2. Content (relative, z-10) — never moves. Always at pt-6 > max-w-container > px-3 > p-12.
        This separation means content stays pixel-perfect static during transitions.
      */}
      <header
        role="banner"
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none h-[96px]"
      >
        {/* ── Morphing background layer ── */}
        <div
          aria-hidden="true"
          style={{
            left: isScrolled
              ? '0px'
              : 'max(var(--space-12), calc((100% - var(--container-max)) / 2 + var(--space-12)))',
            right: isScrolled
              ? '0px'
              : 'max(var(--space-12), calc((100% - var(--container-max)) / 2 + var(--space-12)))',
            top: isScrolled ? '0px' : 'var(--space-24)',
            height: isScrolled
              ? 'calc(var(--space-24) + var(--space-48) + var(--space-24))'
              : 'calc(var(--space-12) + var(--space-48) + var(--space-12))',
          }}
          className={`absolute z-0 bg-glass-bg backdrop-blur-md shadow-sm pointer-events-auto nav-bg-morph ${
            isScrolled
              ? 'rounded-none border-0 border-b border-glass-border'
              : 'rounded-round border border-glass-border'
          }`}
        />

        {/* ── Content layer — moves up 12px when scrolled with 24px top/bottom padding ── */}
        <div
          style={{
            paddingTop: isScrolled ? 'var(--space-12)' : 'var(--space-24)',
            transition: 'padding-top 700ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
          className="relative z-10"
        >
          <div className="mx-auto max-w-[var(--container-max)] px-3">
            <div className="p-12 flex items-center justify-between pointer-events-auto">

              {/* Logo & Brand */}
              <Link
                to="/"
                className="flex items-center gap-3 text-primary group select-none pl-1"
                aria-label={`${site.brand.name} Home`}
              >
                <img
                  src="/logo.png"
                  alt={site.brand.name}
                  className="h-10 w-10 object-contain transition-transform duration-base group-hover:scale-105"
                />
                <div className="flex flex-col">
                  <span className="text-18 sm:text-20 font-bold tracking-tight text-primary leading-tight">
                    {site.brand.name}
                  </span>
                  <span className="text-12 text-text-2 hidden sm:inline-block font-normal">
                    {site.brand.tagline}
                  </span>
                </div>
              </Link>

              {/* Desktop Nav Links */}
              <nav
                aria-label="Main Navigation"
                className="hidden xl:flex items-center gap-16 xl:gap-20 text-15 font-medium"
              >
                {navLinks.map((item) => {
                  const isActive = item.href.includes('#')
                    ? location.pathname === '/' && location.hash === item.href.substring(item.href.indexOf('#'))
                    : location.pathname === item.href && !location.hash;

                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={(e) => handleLinkClick(item.href, e)}
                      className={`px-6 py-2.5 rounded-round transition-colors duration-fast whitespace-nowrap ${
                        isActive
                          ? 'text-primary font-bold bg-white/50 shadow-xs'
                          : 'text-text hover:text-primary hover:bg-white/30'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              {/* Right Action Button & Mobile Hamburger */}
              <div className="flex items-center gap-3">
                {/* Explore Our Services button with unified 2-state and standardized padding */}
                <Button
                  to={ctaButton.href}
                  variant="primary"
                  className="hidden sm:inline-flex"
                >
                  {ctaButton.label}
                </Button>

                {/* Mobile menu toggle */}
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen((prev) => !prev)}
                  className="xl:hidden flex h-10 w-10 items-center justify-center rounded-round bg-grey-2 text-primary hover:bg-grey-3 transition-colors"
                  aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={mobileMenuOpen}
                  aria-controls="mobile-nav-drawer"
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>

            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-50 flex flex-col bg-surface/98 backdrop-blur-xl pt-24 px-8 pb-8 xl:hidden animate-fade-in"
        >
          <div className="flex justify-between items-center pb-6 border-b border-grey-3">
            <Link
              to="/"
              className="flex items-center gap-3 text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              <img
                src="/logo.png"
                alt={site.brand.name}
                className="h-8 w-8 object-contain"
              />
              <span className="text-18 font-bold text-primary">{site.brand.name}</span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-round bg-grey-2 text-primary"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-4 text-18 font-medium mt-6">
            {navLinks.map((item) => {
              const isActive = item.href.includes('#')
                ? location.pathname === '/' && location.hash === item.href.substring(item.href.indexOf('#'))
                : location.pathname === item.href && !location.hash;

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleLinkClick(item.href, e);
                  }}
                  className={`py-3 border-b border-grey-3 ${
                    isActive ? 'text-secondary font-bold' : 'text-primary'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-6">
              <Button
                to={ctaButton.href}
                variant="primary"
                className="w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                {ctaButton.label}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Nav;
