import React, { useState } from 'react';
import { PageShell } from '../components/layout/PageShell';
import { Section } from '../components/layout/Section';
import { PageBanner } from '../components/layout/PageBanner';
import { Faq } from '../components/sections/Faq';
import { Contact } from '../components/sections/Contact';
import { Button } from '../components/ui/Button';
import { Lightbox, LightboxItem } from '../components/ui/Lightbox';
import { site } from '../content/site';

export const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredItems = selectedCategory === 'All'
    ? site.gallery.items
    : site.gallery.items.filter((item) => item.category === selectedCategory);

  const lightboxItems: LightboxItem[] = filteredItems.map((item) => ({
    src: item.image,
    title: item.title,
    category: item.category,
  }));

  return (
    <PageShell
      title="Facility & Culture Gallery"
      description={`Take a visual tour inside ${site.brand.name}'s modern contact facilities, training labs, and secure operational hubs.`}
    >
      <PageBanner
        id="gallery-hero"
        eyebrow={site.gallery.eyebrow}
        title={site.gallery.title}
        subtitle={site.gallery.subtitle}
        backgroundImage="/assets/banners/gallery-banner.jpg"
      />

      <Section id="gallery-grid" variant="surface" padded={false}>
        <div className="flex flex-col gap-32">
          {/* Category filter pills with 2-state logic */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {site.gallery.categories.map((cat) => (
              <Button
                key={cat}
                type="button"
                size="sm"
                variant={selectedCategory === cat ? 'primary' : 'outline'}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Grid of gallery items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setLightboxIndex(idx);
                  setLightboxOpen(true);
                }}
                className="group relative overflow-hidden rounded-16 border border-grey-3 bg-grey-2 shadow-sm text-left cursor-pointer transition-all duration-base hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                aria-label={`View photo: ${item.title}`}
              >
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-base group-hover:scale-105"
                    width="600"
                    height="450"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-primary/95 via-primary/50 to-transparent p-24 md:p-28 xl:p-32 opacity-0 group-hover:opacity-100 transition-opacity duration-base">
                  <span className="text-12 sm:text-13 font-bold uppercase tracking-wider text-secondary">
                    {item.category}
                  </span>
                  <h3 className="text-18 md:text-20 font-bold text-surface mt-2 leading-snug">
                    {item.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </Section>

      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={lightboxItems}
        currentIndex={lightboxIndex}
        onNavigate={setLightboxIndex}
      />

      {/* Contact Proposal Form */}
      <Contact />

      {/* Frequently Asked Questions */}
      <Faq />
    </PageShell>
  );
};
