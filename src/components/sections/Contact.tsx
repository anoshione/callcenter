import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Youtube, ArrowUpRight, CheckCircle2, AlertCircle, ChevronDown } from 'lucide-react';
import { site } from '../../content/site';
import { submitContact, ContactFormData } from '../../lib/submitContact';
import { SectionHeader } from '../ui/SectionHeader';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';

export const Contact: React.FC = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  // Helper to extract service parameter from query string (?service=...) or hash (/#contact?service=...)
  const getServiceFromUrl = useCallback((): string => {
    const fromSearch = searchParams.get('service');
    if (fromSearch) return fromSearch;

    if (location.hash && location.hash.includes('?')) {
      const hashQuery = location.hash.split('?')[1];
      const params = new URLSearchParams(hashQuery);
      return params.get('service') || '';
    }

    return '';
  }, [searchParams, location.hash]);

  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    service: getServiceFromUrl(),
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  // Update selected service if search param or hash changes
  useEffect(() => {
    const currentService = getServiceFromUrl();
    if (currentService) {
      setFormData((prev) => ({ ...prev, service: currentService }));
    }
  }, [getServiceFromUrl]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setStatusMessage('');

    try {
      const res = await submitContact(formData);
      setStatus('success');
      setStatusMessage(res.message);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        service: '',
        message: '',
      });
    } catch (err: unknown) {
      setStatus('error');
      setStatusMessage(err instanceof Error ? err.message : 'Submission failed. Please try again.');
    }
  };

  return (
    <section
      id="contact"
      className="w-full py-0 px-3 bg-surface"
      style={{ marginBottom: 'var(--space-section-gap)' }}
    >
      {/* Container: header sits OUTSIDE the white card, card follows with 32px gap */}
      <div className="mx-auto w-full max-w-[var(--container-max)] flex flex-col">
        <Reveal direction="up" delayMs={50}>
          {/* Section Header - outside the card */}
          <SectionHeader
            eyebrow={site.contact.eyebrow}
            title={site.contact.title}
            subtitle={site.contact.description}
          />
        </Reveal>

        {/* White contact card (32px below the header via SectionHeader's mb-32) */}
        <Reveal direction="up" delayMs={120}>
        <div className="relative overflow-hidden rounded-32 bg-white border border-grey-3/60 shadow-md w-full p-16 sm:p-24 md:p-28 -mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 lg:gap-32 items-stretch">
                {/* Left Visual Panel: brand placeholder image with our contact information */}
                <div className="lg:col-span-6 relative overflow-hidden rounded-24 shadow-md flex flex-col justify-center aspect-[4/5] min-h-[540px] sm:aspect-[16/10] lg:aspect-auto lg:min-h-0">
                  <img
                    src={site.contact.visualImage}
                    alt={site.contact.visualAlt}
                    className="absolute inset-0 w-full h-full object-cover"
                    width="720"
                    height="900"
                    loading="lazy"
                  />

                  {/* Legibility scrim (navy, derived from --color-primary) */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(to bottom, color-mix(in srgb, var(--color-primary) 8%, transparent) 0%, color-mix(in srgb, var(--color-primary) 45%, transparent) 48%, color-mix(in srgb, var(--color-primary) 88%, transparent) 100%)',
                    }}
                    aria-hidden="true"
                  />

                  {/* Our information only (no cards) */}
                  <div className="relative z-10 w-full p-24 sm:p-28 flex flex-col gap-24">

                {/* Direct Contact Details */}
                <div className="relative z-10 flex flex-col gap-24 text-15">
                  <div className="flex items-start gap-16 group/item">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-12 bg-white/10 text-white shadow-xs">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="block text-12 font-medium text-white/70">Direct Line</span>
                      <a
                        href={`tel:${site.contact.phone.replace(/[^0-9+]/g, '')}`}
                        className="text-16 md:text-17 font-bold text-white hover:text-grey-1 transition-colors mt-0.5 block"
                      >
                        {site.contact.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-16 group/item">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-12 bg-white/10 text-white shadow-xs">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="block text-12 font-medium text-white/70">Inquiries & Proposals</span>
                      <a
                        href={`mailto:${site.contact.email}`}
                        className="text-16 md:text-17 font-bold text-white hover:text-grey-1 transition-colors mt-0.5 block"
                      >
                        {site.contact.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-16 group/item">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-12 bg-white/10 text-white shadow-xs">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="block text-12 font-medium text-white/70">Operations Center</span>
                      <span className="text-15 text-white/90 font-medium mt-0.5 block leading-relaxed">{site.contact.address}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-16 group/item">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-12 bg-white/10 text-white shadow-xs">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="block text-12 font-medium text-white/70">Availability</span>
                      <span className="text-15 text-white/90 font-medium mt-0.5 block">{site.contact.hours}</span>
                    </div>
                  </div>
                </div>

                {/* Socials (double the detail-row spacing above it) */}
                <div className="relative z-10 pt-24">
                  <div className="flex items-center gap-16">
                    {site.contact.socials.map((s) => {
                      const getIcon = () => {
                        switch (s.platform.toLowerCase()) {
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
                        <a
                          key={s.platform}
                          href={s.href}
                          target="_blank"
                          rel="noreferrer"
                          className="flex h-10 w-10 items-center justify-center rounded-12 bg-white/10 border border-white/25 text-white shadow-xs hover:bg-white/20 hover:-translate-y-0.5 transition-all duration-base"
                          aria-label={`Follow on ${s.platform}`}
                        >
                          {getIcon()}
                        </a>
                      );
                    })}
                  </div>
                </div>
                  </div>
                </div>

                {/* Right Form Column (7 cols), +16px top/bottom breathing room */}
                <div className="lg:col-span-6 flex flex-col justify-center py-16">
                  {status === 'success' ? (
                  <div className="my-auto flex flex-col items-center text-center p-32 gap-20 bg-grey-1/80 rounded-16 border border-secondary/30">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/20 text-secondary-active">
                      <CheckCircle2 className="h-9 w-9" />
                    </div>
                    <h3 className="text-24 font-bold text-primary">Inquiry Sent Successfully</h3>
                    <p className="text-15 text-text-2 max-w-md leading-relaxed">{statusMessage}</p>
                    <Button
                      variant="primary"
                      size="md"
                      onClick={() => setStatus('idle')}
                      className="mt-4"
                    >
                      Send Another Inquiry
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-24">
                    {status === 'error' && (
                      <div className="flex items-center gap-12 rounded-16 bg-error/10 border border-error/20 p-16 text-14 text-error">
                        <AlertCircle className="h-5 w-5 flex-shrink-0" />
                        <span>{statusMessage}</span>
                      </div>
                    )}

                    <div className="flex flex-col gap-20">
                      {/* Full Name */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="fullName" className="text-14 font-medium text-text">
                          Full Name <span className="text-error">*</span>
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="e.g. Sarah Jenkins"
                          className="rounded-16 border border-grey-3 bg-white hover:border-grey-4 focus:bg-white focus:border-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/25 shadow-xs transition-all px-16 py-16 text-15 text-text placeholder:text-grey-4"
                        />
                      </div>

                      {/* Email */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-14 font-medium text-text">
                          Work Email <span className="text-error">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="e.g. sarah@company.com"
                          className="rounded-16 border border-grey-3 bg-white hover:border-grey-4 focus:bg-white focus:border-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/25 shadow-xs transition-all px-16 py-16 text-15 text-text placeholder:text-grey-4"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-20">
                      {/* Phone */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="phone" className="text-14 font-medium text-text">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="e.g. +1 (555) 019-2834"
                          className="rounded-16 border border-grey-3 bg-white hover:border-grey-4 focus:bg-white focus:border-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/25 shadow-xs transition-all px-16 py-16 text-15 text-text placeholder:text-grey-4"
                        />
                      </div>

                      {/* Service Selection */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="service" className="text-14 font-medium text-text">
                          Service of Interest
                        </label>
                        <div className="relative w-full">
                          <select
                            id="service"
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className="w-full appearance-none rounded-16 border border-grey-3 bg-white hover:border-grey-4 focus:bg-white focus:border-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/25 shadow-xs transition-all pl-16 pr-48 py-16 text-15 text-text cursor-pointer"
                          >
                            <option value="">Select a service</option>
                            {site.services.map((srv) => (
                              <option key={srv.slug} value={srv.slug}>
                                {srv.title}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute right-16 top-1/2 -translate-y-1/2 text-grey-5 flex items-center justify-center">
                            <ChevronDown size={18} strokeWidth={2.25} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="message" className="text-14 font-medium text-text">
                        Operational Requirements & Scope <span className="text-error">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Describe your current team size, expected call/ticket volume, hours needed, or CRM tools..."
                        className="rounded-16 border border-grey-3 bg-white hover:border-grey-4 focus:bg-white focus:border-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/25 shadow-xs transition-all px-16 py-16 text-15 text-text placeholder:text-grey-4 resize-none"
                      />
                    </div>

                    <div className="pt-8 flex justify-center">
                      <Button
                        type="submit"
                        isLoading={status === 'submitting'}
                        variant="primary"
                        className="w-full sm:w-auto px-32 shadow-sm"
                      >
                        Send Proposal
                      </Button>
                    </div>
                  </form>
                )}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
    </section>
  );
};

export default Contact;
