import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { site } from '../../content/site';
import { Section } from '../layout/Section';
import { SectionHeader } from '../ui/SectionHeader';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';
import { Lightbox, LightboxItem } from '../ui/Lightbox';

export const BlogGallery: React.FC = () => {
  const posts = site.blogs.posts;
  const featuredPost = posts[0];
  const stackedPosts = posts.slice(1, 3);
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
      <Reveal key={item.id} direction="up" delayMs={originalIdx * 60} className="flex">
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
    <Section id="blogs-gallery" variant="surface" padded={false}>
      <div className="flex flex-col gap-[var(--space-section-gap)]">
        {/* ================= Part 1: Blog Insights ================= */}
        <div className="flex flex-col">
          {/* Section Header (Centered, 14px top/bottom, 28px middle, 32px gap to content) */}
          <SectionHeader
            eyebrow={site.blogs.eyebrow}
            title={site.blogs.title}
            subtitle={site.blogs.subtitle}
          />

          {/* Featured Post (left half) + Stacked Pair & View All button (right half) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 xl:gap-32 items-stretch">
            {/* Featured Post (left half, 50% width) */}
            {featuredPost && (
              <Reveal direction="up" delayMs={50} className="flex h-full">
                <article className="flex flex-col rounded-16 border border-grey-3 bg-surface overflow-hidden shadow-sm hover:shadow-md transition-all duration-base group w-full justify-between">
                  <div>
                    <div className="aspect-[16/10] w-full overflow-hidden bg-grey-2 relative">
                      <img
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover transition-transform duration-base group-hover:scale-104"
                        width="800"
                        height="500"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <div className="p-6 md:p-7 flex flex-col justify-between flex-1 gap-4">
                    <div>
                      <div className="text-12 mb-2">
                        <span className="font-bold text-secondary-active uppercase tracking-wider">
                          {featuredPost.category}
                        </span>
                      </div>

                      <h3 className="text-22 md:text-26 font-bold text-primary group-hover:text-secondary-active transition-colors leading-snug">
                        <Link to={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
                      </h3>

                      <p className="text-14 md:text-15 text-text-2 leading-relaxed mt-2.5">
                        {featuredPost.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-12 text-grey-5 pt-3.5 border-t border-grey-3">
                      <span className="font-medium text-text-2">{featuredPost.author.name}</span>
                      <Link
                        to={`/blog/${featuredPost.slug}`}
                        className="text-primary font-medium hover:text-secondary-active transition-colors flex items-center gap-1"
                      >
                        <span>Read full story</span> &rarr;
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            )}

            {/* Stacked Pair + View All Button (right half, 50% width) */}
            <div className="flex flex-col gap-6 md:gap-7 h-full">
              {stackedPosts.map((post, i) => (
                <Reveal key={post.id} direction="up" delayMs={100 * (i + 1)} className="flex-1 flex">
                  <article
                    className="flex flex-col sm:flex-row gap-5 p-6 md:p-7 rounded-16 border border-grey-3 bg-surface hover:shadow-md transition-all duration-base group w-full flex-1"
                  >
                    <div className="sm:w-2/5 aspect-[4/3] rounded-12 overflow-hidden bg-grey-2 flex-shrink-0">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-base group-hover:scale-105"
                        width="300"
                        height="225"
                        loading="lazy"
                      />
                    </div>

                    <div className="flex flex-col justify-between flex-1 py-0.5">
                      <div>
                        <span className="text-12 font-bold uppercase tracking-wider text-secondary-active">
                          {post.category}
                        </span>
                        <h4 className="text-17 md:text-18 font-medium text-primary group-hover:text-secondary-active transition-colors line-clamp-2 mt-1.5 leading-snug">
                          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                        </h4>
                        <p className="text-13 md:text-14 text-text-2 line-clamp-2 mt-2 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-12 text-grey-5 pt-3.5 border-t border-grey-3">
                        <span className="font-medium text-text-2">{post.author.name}</span>
                        <Link to={`/blog/${post.slug}`} className="text-primary font-medium hover:text-secondary-active transition-colors flex items-center gap-1">
                          <span>Read</span> &rarr;
                        </Link>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}

              {/* View All Articles button spanning the full width of the smaller cards column */}
              <Reveal direction="up" delayMs={200} className="w-full">
                <Button to="/blog" variant="outline" className="w-full justify-center">
                  View All Articles
                </Button>
              </Reveal>
            </div>
          </div>
        </div>

        {/* ================= Part 2: Facility Gallery ================= */}
        <div className="flex flex-col">
          {/* Section Header (Centered, 14px top/bottom, 28px middle, 32px gap to content) */}
          <SectionHeader
            eyebrow={site.gallery.eyebrow}
            title={site.gallery.title}
            subtitle={site.gallery.subtitle}
          />

          {/* 3 Staggered Columns: Col 1 at 0px, Col 2 at 32px down, Col 3 at 64px down with button at top right */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-24 xl:gap-32 items-start">
            {/* Column 1 */}
            <div className="flex flex-col gap-24">
              {renderGalleryCard(galleryItems[0], 0)}
              {renderGalleryCard(galleryItems[3], 3)}
            </div>

            {/* Column 2 (Starts 32px down) */}
            <div className="flex flex-col gap-24 lg:pt-[var(--space-32)]">
              {renderGalleryCard(galleryItems[1], 1)}
              {renderGalleryCard(galleryItems[4], 4)}
            </div>

            {/* Column 3 (Starts 64px down, with View All Gallery button in top-right blank space) */}
            <div className="flex flex-col gap-24">
              {/* Top-Right Button in the 64px offset area on desktop */}
              <div className="hidden lg:flex justify-end items-center h-[var(--space-64)]">
                <Button to="/gallery" variant="outline">
                  View All Gallery
                </Button>
              </div>
              {renderGalleryCard(galleryItems[2], 2)}
              {renderGalleryCard(galleryItems[5], 5)}
            </div>
          </div>

          {/* Fallback button below photos on mobile / tablet */}
          <Reveal direction="up" delayMs={150} className="flex lg:hidden justify-center pt-8">
            <Button to="/gallery" variant="outline">
              View All Gallery
            </Button>
          </Reveal>
        </div>
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
