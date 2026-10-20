import React, { useState } from 'react';
import { Headphones, MessageSquare } from 'lucide-react';
import { site } from '../../content/site';
import { Section } from '../layout/Section';
import { Container } from '../layout/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { Button } from '../ui/Button';
import { BlogCard } from '../ui/BlogCard';
import { Orbs } from '../ui/Orbs';
import { Reveal } from '../ui/Reveal';
import { Lightbox, LightboxItem } from '../ui/Lightbox';

export const BlogGallery: React.FC = () => {
  const posts = site.blogs.posts;
  const blogCards = posts.slice(0, 3);
  const galleryItems = site.gallery.items.slice(0, 6);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const lightboxItems: LightboxItem[] = galleryItems.map((item) => ({
    src: item.image,
    title: item.title,
    category: item.category,
  }));

  const renderGalleryCard = (item: (typeof galleryItems)[0], originalIdx: number) => {
    if (!item) return null;
    return (
      <Reveal key={item.id} direction="up" delayMs={originalIdx * 60} className="flex w-full">
        <button
          type="button"
          onClick={() => {
            setLightboxIndex(originalIdx);
            setLightboxOpen(true);
          }}
          className="group relative overflow-hidden rounded-16 border border-grey-3 bg-surface shadow-sm w-full text-left cursor-pointer transition-all duration-base hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
          aria-label={`View photo: ${item.title}`}
        >
          <div className="aspect-[4/3] w-full overflow-hidden bg-grey-2">
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover transition-transform duration-base group-hover:scale-105"
              width="600"
              height="450"
              loading="lazy"
            />
          </div>
          {/* Hover Caption Overlay with generous side and bottom padding */}
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-primary/95 via-primary/50 to-transparent p-24 md:p-28 xl:p-32 opacity-0 group-hover:opacity-100 transition-opacity duration-base">
            <span className="text-12 sm:text-13 font-bold uppercase tracking-wider text-secondary">
              {item.category}
            </span>
            <h4 className="text-18 md:text-20 font-bold text-surface mt-2 leading-snug">
              {item.title}
            </h4>
          </div>
        </button>
      </Reveal>
    );
  };

  return (
    <Section id="blogs-gallery" variant="surface" padded={false} fullWidthContent className="px-3">
      <div className="flex flex-col gap-[var(--space-section-gap)]">
        {/* ================= Part 1: Blog Insights (navy panel, mirrors Services) ================= */}
        {/* Navy background panel: full-bleed (12px frame inset), content gutters from Container */}
        <div className="relative overflow-hidden rounded-16 bg-primary py-32 shadow-md w-full">
          {/* Background orbs & subtle pattern */}
          <Orbs preset="subtle" count={2} />

          {/* Decorative faint background vector icons at ~3.5% opacity per DESIGN.md section 6 */}
          <div className="absolute top-12 left-10 pointer-events-none text-surface/[0.035] -rotate-12 select-none" aria-hidden="true">
            <Headphones className="w-80 h-80" />
          </div>
          <div className="absolute -bottom-16 right-8 pointer-events-none text-surface/[0.03] rotate-12 select-none" aria-hidden="true">
            <MessageSquare className="w-72 h-72" />
          </div>

          {/* Standard content container: max-w 1440, centered, --page-pad gutters */}
          <Container className="relative z-10 flex flex-col">
          {/* Section Header (Centered, on navy) */}
          <SectionHeader
            onNavy
            eyebrow={site.blogs.eyebrow}
            title={site.blogs.title}
            subtitle={site.blogs.subtitle}
          />

          {/* 3 Blog Cards in the ServiceCard style */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-24 xl:gap-32">
            {blogCards.map((post, i) => (
              <Reveal key={post.id} direction="up" delayMs={i * 60} className="h-full">
                <BlogCard
                  slug={post.slug}
                  title={post.title}
                  date={post.date}
                  excerpt={post.excerpt}
                  image={post.image}
                />
              </Reveal>
            ))}
          </div>

          {/* See More: take visitors to the blogs page (same recipe as the Services See More) */}
          <div className="flex justify-center mt-32">
            <Button to="/blog" variant="outline" onNavy withArrow>
              See More
            </Button>
          </div>
          </Container>
        </div>

        {/* ================= Part 2: Facility Gallery (in the standard 1440 container) ================= */}
        <Container>
          <div className="flex flex-col">
          {/* Section Header (Centered, 14px top/bottom, 28px middle, 32px gap to content) */}
          <SectionHeader
            eyebrow={site.gallery.eyebrow}
            title={site.gallery.title}
            subtitle={site.gallery.subtitle}
          />

          {/* Symmetric Grid: 3 columns x 2 rows (desktop), 2 columns (tablet), 1 column (mobile) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-24 xl:gap-32">
            {galleryItems.map((item, idx) => renderGalleryCard(item, idx))}
          </div>

          {/* Centered View All Gallery Button at the bottom of the section (matching blog section) */}
          <div className="flex justify-center mt-32">
            <Button to="/gallery" variant="primary" withArrow>
              View All Gallery
            </Button>
          </div>
          </div>
        </Container>
      </div>

      {/* Lightbox Preview Modal */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={lightboxItems}
        currentIndex={lightboxIndex}
        onNavigate={setLightboxIndex}
      />
    </Section>
  );
};

export default BlogGallery;
