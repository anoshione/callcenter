import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, ArrowUpRight } from 'lucide-react';
import { site } from '../../content/site';
import { Panel } from './Panel';
import { Container } from './Container';
import { Orbs } from '../ui/Orbs';

export const Footer: React.FC = () => {
  const renderSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook':
        return <Facebook className="h-5 w-5" />;
      case 'twitter':
      case 'twitter / x':
        return <Twitter className="h-5 w-5" />;
      case 'instagram':
        return <Instagram className="h-5 w-5" />;
      case 'youtube':
        return <Youtube className="h-5 w-5" />;
      default:
        return <ArrowUpRight className="h-5 w-5" />;
    }
  };

  return (
    <footer role="contentinfo" className="w-full">
      <Panel variant="primary" padded={false} className="py-16 md:py-24 px-6 md:px-12 xl:px-16 relative overflow-hidden rounded-16 shadow-md">
        {/* Subtle decorative background glow orbs */}
        <Orbs preset="corner" count={2} />

        <Container className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-surface/10">
            {/* Brand Column (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <Link
                to="/"
                className="flex items-center gap-3 text-surface group focus-visible:rounded-8"
                aria-label={`${site.brand.name} Home`}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-12 bg-white p-1.5 shadow-sm transition-transform duration-base group-hover:scale-105">
                  <img
                    src="/logo.png"
                    alt={site.brand.name}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div>
                  <span className="text-20 font-bold tracking-tight text-surface block leading-tight">
                    {site.brand.name}
                  </span>
                  <span className="text-12 text-grey-3">
                    {site.brand.tagline}
                  </span>
                </div>
              </Link>

              <p className="text-14 leading-relaxed text-grey-2 max-w-md">
                {site.footer.brandBlurb}
              </p>

              {/* Social links */}
              <div className="flex items-center gap-3 pt-2">
                {site.contact.socials.map((s) => (
                  <a
                    key={s.platform}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-16 bg-surface/10 text-surface hover:bg-secondary hover:text-primary transition-all duration-fast"
                    aria-label={`Follow on ${s.platform}`}
                  >
                    {renderSocialIcon(s.platform)}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links (3 cols) */}
            <div className="lg:col-span-3 flex flex-col">
              <h4 className="text-16 font-medium text-surface tracking-wide uppercase mb-5">
                Navigation
              </h4>
              <ul className="flex flex-col justify-between flex-1 text-14 text-grey-2 gap-3.5 lg:gap-0">
                {site.nav.links.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className="hover:text-secondary transition-colors duration-fast inline-block py-1"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Details (4 cols) */}
            <div className="lg:col-span-4 flex flex-col">
              <h4 className="text-16 font-medium text-surface tracking-wide uppercase mb-5">
                Operations & Contact
              </h4>
              <div className="flex flex-col justify-between flex-1 gap-6 text-14 text-grey-2">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-12 text-grey-3 mb-1">Phone Support</span>
                    <a
                      href={`tel:${site.contact.phone.replace(/[^0-9+]/g, '')}`}
                      className="hover:text-surface text-surface font-medium"
                    >
                      {site.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-12 text-grey-3 mb-1">Email Inquiries</span>
                    <a
                      href={`mailto:${site.contact.email}`}
                      className="hover:text-surface text-surface font-medium"
                    >
                      {site.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-12 text-grey-3 mb-1">Global Headquarters</span>
                    <span className="leading-relaxed block">{site.contact.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 text-center sm:text-left text-12 text-grey-3">
            <p>
              &copy; {new Date().getFullYear()} {site.footer.copyrightText}
            </p>
          </div>
        </Container>
      </Panel>
    </footer>
  );
};
