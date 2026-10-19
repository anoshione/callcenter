import React from 'react';
import { Link } from 'react-router-dom';
import { PageShell } from '../components/layout/PageShell';
import { Section } from '../components/layout/Section';
import { PageBanner } from '../components/layout/PageBanner';
import { Reveal } from '../components/ui/Reveal';
import { Faq } from '../components/sections/Faq';
import { Contact } from '../components/sections/Contact';
import { site } from '../content/site';

export const Blog: React.FC = () => {
  const posts = site.blogs.posts;
  const featuredPost = posts[0];
  const latestPosts = posts.slice(1, 5);
  const remainingPosts = posts.slice(5);

  return (
    <PageShell
      title="Articles & Insights"
      description="Read our latest insights, case studies, and practical guides on contact center optimization and customer experience."
    >
      {/* Blog Page Hero Banner */}
      <PageBanner
        id="blog-hero"
        eyebrow={site.blogs.eyebrow}
        title={site.blogs.title}
        subtitle={site.blogs.subtitle}
        backgroundImage="/assets/banners/blog-banner.jpg"
      />

      {/* Main Blog Feed Section - Matching Home Page Style & Spacing */}
      <Section id="blog-feed" variant="surface" padded={false} overflowHidden={false} panelClassName="pb-32 lg:pb-48">
        <div className="flex flex-col gap-24 xl:gap-32">
          {/* Main Grid: Left Featured Glass Card (~60%), Right Latest Posts (4 items) (~40%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 xl:gap-32 items-stretch">
            {/* Featured Post (left side, 7 cols) */}
            {featuredPost && (
              <Reveal direction="up" delayMs={50} className="lg:col-span-7 flex h-full">
                <article className="group relative w-full min-h-[380px] sm:min-h-[420px] lg:min-h-[460px] rounded-24 overflow-hidden border border-grey-3/80 bg-grey-2 shadow-sm hover:shadow-lg transition-all duration-base flex flex-col justify-end">
                  {/* Background Image */}
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-slow group-hover:scale-105"
                    width="800"
                    height="540"
                    loading="lazy"
                  />

                  {/* Compact Bottom Frosted Scrim - only covers bottom strip so ~75% of the photo is completely clear */}
                  <div
                    className="relative z-10 px-20 py-16 sm:px-24 sm:py-20 md:px-28 md:py-22 bg-gradient-to-t from-primary/95 via-primary/85 to-transparent backdrop-blur-md flex flex-col justify-end"
                    style={{
                      maskImage: 'linear-gradient(to top, black 0%, black 70%, transparent 100%)',
                      WebkitMaskImage: 'linear-gradient(to top, black 0%, black 70%, transparent 100%)',
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
                <h3 className="text-22 sm:text-24 font-bold text-primary tracking-tight">
                  Latest post
                </h3>
              </div>

              {/* 4 Stacked Items */}
              <div className="flex flex-col justify-between flex-1 gap-12 sm:gap-16">
                {latestPosts.map((post, i) => (
                  <Reveal key={post.id} direction="up" delayMs={60 * (i + 1)}>
                    <article className="group flex items-center gap-14 sm:gap-16 p-6 sm:p-8 rounded-16 hover:bg-grey-1 transition-all duration-base cursor-pointer">
                      <Link
                        to={`/blog/${post.slug}`}
                        className="w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] rounded-14 sm:rounded-16 overflow-hidden flex-shrink-0 bg-grey-2 border border-grey-3/70 shadow-xs block"
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
                        <h4 className="text-14 sm:text-15 font-semibold text-primary leading-snug group-hover:text-secondary-active transition-colors line-clamp-2 mb-4">
                          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                        </h4>
                        <div className="flex items-center gap-6 text-12 text-grey-5 font-normal">
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

          {/* Remaining Articles Grid (3-column layout matching Home card style) */}
          {remainingPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24 xl:gap-32">
              {remainingPosts.map((post, i) => (
                <Reveal key={post.id} direction="up" delayMs={60 * (i + 1)} className="flex h-full">
                  <article className="flex flex-col rounded-16 border border-grey-3 bg-surface overflow-hidden shadow-sm hover:shadow-md transition-all duration-base group w-full justify-between">
                    <div>
                      <div className="aspect-[16/10] w-full overflow-hidden bg-grey-2 relative">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-base group-hover:scale-104"
                          width="800"
                          height="500"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    <div className="px-20 py-16 md:px-24 md:py-16 flex flex-col justify-between flex-1 gap-12">
                      <div>
                        <div className="text-12 mb-1">
                          <span className="font-bold text-secondary-active uppercase tracking-wider">
                            {post.category}
                          </span>
                        </div>

                        <h3 className="text-18 md:text-20 font-bold text-primary group-hover:text-secondary-active transition-colors leading-snug">
                          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                        </h3>
                      </div>

                      <p className="my-auto py-1 text-14 text-text-2 leading-relaxed">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between text-12 text-grey-5 pt-2.5 border-t border-grey-3">
                        <span className="font-medium text-text-2">{post.author.name}</span>
                        <Link
                          to={`/blog/${post.slug}`}
                          className="text-primary font-medium hover:text-secondary-active transition-colors flex items-center gap-1"
                        >
                          <span>Read full story</span> &rarr;
                        </Link>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </Section>

      {/* Contact Proposal Form */}
      <Contact />

      {/* Frequently Asked Questions */}
      <Faq />
    </PageShell>
  );
};

export default Blog;
