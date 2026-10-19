import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Headphones, MessageSquare } from 'lucide-react';
import { site } from '../../content/site';
import { Section } from '../layout/Section';
import { Container } from '../layout/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { Button } from '../ui/Button';
import { Orbs } from '../ui/Orbs';
import { Reveal } from '../ui/Reveal';
import { Lightbox, LightboxItem } from '../ui/Lightbox';

export const BlogGallery: React.FC = () => {
  const posts = site.blogs.posts;
  const featuredPost = posts[0];
  const latestPosts = posts.slice(1, 5);
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

          {/* Main Grid: Left Featured Glass Card (~60%), Right Latest Posts (4 items) (~40%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 xl:gap-32 items-stretch">
            {/* Featured Post (left side, 7 cols) */}
            {featuredPost && (
              <Reveal direction="up" delayMs={50} className="lg:col-span-7 flex h-full">
                <article className="group relative w-full min-h-[380px] sm:min-h-[420px] lg:min-h-[460px] rounded-24 overflow-hidden border border-white/10 bg-grey-2 shadow-sm hover:shadow-lg transition-all duration-base flex flex-col justify-end">
                  {/* Background Image */}
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-slow group-hover:scale-105"
                    width="800"
                    height="540"
                    loading="lazy"
                  />

                  {/* Frosted progressive scrim starting above the text area with translucent blur */}
                  <div
                    className="relative z-10 w-full px-20 sm:px-24 md:px-28 pt-48 sm:pt-64 pb-16 sm:pb-20 flex flex-col justify-end"
                    style={{
                      background: 'linear-gradient(to top, color-mix(in srgb, var(--color-primary) 80%, transparent) 0%, color-mix(in srgb, var(--color-primary) 70%, transparent) 40%, color-mix(in srgb, var(--color-primary) 45%, transparent) 70%, color-mix(in srgb, var(--color-primary) 12%, transparent) 90%, transparent 100%)',
                      backdropFilter: 'blur(var(--blur-md))',
                      WebkitBackdropFilter: 'blur(var(--blur-md))',
                      maskImage: 'linear-gradient(to top, black 0%, black 75%, transparent 100%)',
                      WebkitMaskImage: 'linear-gradient(to top, black 0%, black 75%, transparent 100%)',
                    }}
                  >
                    {/* Featured Title starting at the selected bottom area */}
                    <h3 className="text-18 sm:text-20 md:text-22 xl:text-24 font-bold text-surface leading-snug mb-6 sm:mb-8 group-hover:text-secondary transition-colors">
                      <Link to={`/blog/${featuredPost.slug}`}>
                        {featuredPost.title}
                      </Link>
                    </h3>

                    {/* Featured Meta */}
                    <div className="flex items-center gap-8 text-12 sm:text-13 text-surface/80 font-normal">
                      <span>{featuredPost.date}</span>
                      <span>•</span>
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                </article>
              </Reveal>
            )}

            {/* Right Column: Latest post heading + 4 compact horizontal items (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full pt-8 lg:pt-0">
              {/* Column Header */}
              <div className="flex items-center justify-between mb-16 sm:mb-20">
                <h3 className="text-22 sm:text-24 font-bold text-surface tracking-tight">
                  Latest post
                </h3>
              </div>

              {/* 4 Stacked Items */}
              <div className="flex flex-col justify-between flex-1 gap-12 sm:gap-16">
                {latestPosts.map((post, i) => (
                  <Reveal key={post.id} direction="up" delayMs={60 * (i + 1)}>
                    <article className="group flex items-center gap-14 sm:gap-16 p-6 sm:p-8 rounded-16 hover:bg-white/[0.06] transition-all duration-base cursor-pointer">
                      <Link
                        to={`/blog/${post.slug}`}
                        className="w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] rounded-14 sm:rounded-16 overflow-hidden flex-shrink-0 bg-grey-2 border border-white/20 shadow-xs block"
                      >
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-base group-hover:scale-110"
                          width="64"
                          height="64"
                          loading="lazy"
                        />
                      </Link>

                      <div className="flex flex-col justify-center min-w-0 flex-1">
                        <h4 className="text-14 sm:text-15 font-semibold text-surface leading-snug group-hover:text-secondary transition-colors line-clamp-2 mb-4">
                          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                        </h4>
                        <div className="flex items-center gap-6 text-12 text-surface/70 font-normal">
                          <span>{post.date}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          {/* Centered View All Posts Button at the bottom of the section */}
          <div className="flex justify-center mt-32">
            <Button to="/blog" variant="outline" onNavy withArrow>
              View All Posts
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
