import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Youtube, ArrowUpRight, CheckCircle2, AlertCircle, ChevronDown, Send } from 'lucide-react';
import { site } from '../../content/site';
import { submitContact, ContactFormData } from '../../lib/submitContact';
import { SectionHeader } from '../ui/SectionHeader';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';
import { CardCornerGradient } from '../ui/CardCornerGradient';

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
      {/* Outer panel with Google Map background from https://maps.app.goo.gl/R3Ldi2NzX2cpvKsR9 */}
      <div className="relative overflow-hidden rounded-32 py-16 md:py-20 px-6 md:px-12 xl:px-16 shadow-md w-full">
        {/* Background Map Container with sharp visibility (no blur) and top white shade */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <img
            src="/assets/clean-contact-map.jpg"
            alt="Operations Center Location Map"
            className="w-full h-full object-cover object-center"
          />

          {/* Top white shade: clean luminous gradient protecting header text legibility while letting the map stay crisp and recognizable below */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.96) 0%, rgba(255, 255, 255, 0.88) 18%, rgba(255, 255, 255, 0.45) 38%, rgba(255, 255, 255, 0.12) 65%, rgba(255, 255, 255, 0.22) 100%)',
            }}
          />
        </div>

        {/* Form Content Structure */}
        <div className="mx-auto w-full max-w-[var(--container-max)] relative z-10 flex flex-col">
          <Reveal direction="up" delayMs={50}>
            {/* Section Header (Centered, 14px top/bottom, 28px middle, 32px gap to content) */}
            <SectionHeader
              eyebrow={site.contact.eyebrow}
              title={site.contact.title}
              subtitle={site.contact.description}
            />

            {/* Unified Wrapper Container wrapping both Left Details & Right Form */}
            <div className="relative overflow-hidden rounded-24 xl:rounded-32 bg-white/85 backdrop-blur-xl border border-white/90 shadow-2xl p-6 sm:p-8 md:p-10 xl:p-12 transition-all duration-base group">
              <CardCornerGradient size="lg" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 xl:gap-12 items-stretch relative z-10">
                {/* Left Info Column (5 cols) */}
                <div className="lg:col-span-5 flex flex-col justify-between gap-32 p-2 sm:p-4 md:p-6 relative">
                  {/* Background Paperplane Send Watermark Visual on Left Info Side extending under form */}
                  <div className="pointer-events-none absolute -bottom-12 lg:-bottom-20 -right-48 lg:-right-64 select-none text-secondary/[0.08] transition-transform duration-slow group-hover:scale-105 z-0" aria-hidden="true">
                    <Send className="w-56 h-56 sm:w-72 sm:h-72 stroke-[1.25]" />
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-22 md:text-26 font-bold text-primary">
                      Contact Us
                    </h3>
                  </div>

                {/* Direct Contact Details */}
                <div className="relative z-10 flex flex-col gap-24 text-15">
                  <div className="flex items-start gap-16 group/item">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-12 bg-secondary/10 border border-secondary/20 text-secondary-active shadow-xs group-hover/item:bg-secondary group-hover/item:text-primary transition-all duration-base">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="block text-12 text-grey-5 font-medium">Direct Line</span>
                      <a
                        href={`tel:${site.contact.phone.replace(/[^0-9+]/g, '')}`}
                        className="text-16 md:text-17 font-bold text-primary hover:text-secondary-active transition-colors mt-0.5 block"
                      >
                        {site.contact.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-16 group/item">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-12 bg-secondary/10 border border-secondary/20 text-secondary-active shadow-xs group-hover/item:bg-secondary group-hover/item:text-primary transition-all duration-base">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="block text-12 text-grey-5 font-medium">Inquiries & Proposals</span>
                      <a
                        href={`mailto:${site.contact.email}`}
                        className="text-16 md:text-17 font-bold text-primary hover:text-secondary-active transition-colors mt-0.5 block"
                      >
                        {site.contact.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-16 group/item">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-12 bg-secondary/10 border border-secondary/20 text-secondary-active shadow-xs group-hover/item:bg-secondary group-hover/item:text-primary transition-all duration-base">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="block text-12 text-grey-5 font-medium">Operations Center</span>
                      <span className="text-15 text-text font-medium mt-0.5 block leading-relaxed">{site.contact.address}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-16 group/item">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-12 bg-secondary/10 border border-secondary/20 text-secondary-active shadow-xs group-hover/item:bg-secondary group-hover/item:text-primary transition-all duration-base">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="block text-12 text-grey-5 font-medium">Availability</span>
                      <span className="text-15 text-text font-medium mt-0.5 block">{site.contact.hours}</span>
                    </div>
                  </div>
                </div>

                {/* Socials */}
                <div className="relative z-10 pt-2">
                  <div className="flex items-center gap-20">
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
                          className="flex h-10 w-10 items-center justify-center rounded-12 bg-white text-primary border border-grey-3/80 shadow-md hover:shadow-lg hover:border-primary/40 hover:text-secondary-active hover:-translate-y-0.5 transition-all duration-base"
                          aria-label={`Follow on ${s.platform}`}
                        >
                          {getIcon()}
                        </a>
                      );
                    })}
                  </div>
                </div>
                </div>

                {/* Right Form Container (7 cols) - Nested Container Card for Proposal Form */}
                <div className="lg:col-span-7 relative z-10 overflow-hidden rounded-20 xl:rounded-24 bg-gradient-to-br from-surface/90 via-grey-1/80 to-surface/85 backdrop-blur-xl border border-grey-3/80 shadow-md p-6 sm:p-8 xl:p-10 flex flex-col justify-between transition-all duration-base group/form">
                  <CardCornerGradient size="md" />

                  <div className="relative z-10 flex flex-col h-full justify-between">
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
                    <div>
                      <h3 className="text-22 md:text-26 font-bold text-primary">
                        Request a Custom Proposal
                      </h3>
                    </div>

                    {status === 'error' && (
                      <div className="flex items-center gap-12 rounded-16 bg-error/10 border border-error/20 p-16 text-14 text-error">
                        <AlertCircle className="h-5 w-5 flex-shrink-0" />
                        <span>{statusMessage}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-20">
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
                          className="rounded-16 border border-grey-3 bg-white hover:border-grey-4 focus:bg-white focus:border-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/25 shadow-xs transition-all px-16 py-12 text-15 text-text placeholder:text-grey-4"
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
                          className="rounded-16 border border-grey-3 bg-white hover:border-grey-4 focus:bg-white focus:border-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/25 shadow-xs transition-all px-16 py-12 text-15 text-text placeholder:text-grey-4"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-20">
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
                          className="rounded-16 border border-grey-3 bg-white hover:border-grey-4 focus:bg-white focus:border-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/25 shadow-xs transition-all px-16 py-12 text-15 text-text placeholder:text-grey-4"
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
                            className="w-full appearance-none rounded-16 border border-grey-3 bg-white hover:border-grey-4 focus:bg-white focus:border-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/25 shadow-xs transition-all pl-16 pr-48 py-12 text-15 text-text cursor-pointer"
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
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Describe your current team size, expected call/ticket volume, hours needed, or CRM tools..."
                        className="rounded-16 border border-grey-3 bg-white hover:border-grey-4 focus:bg-white focus:border-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/25 shadow-xs transition-all px-16 py-12 text-15 text-text placeholder:text-grey-4 resize-none"
                      />
                    </div>

                    <div className="pt-8 flex justify-end">
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
          </div>
        </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
