import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, User } from 'lucide-react';
import { PageShell } from '../components/layout/PageShell';
import { Section } from '../components/layout/Section';
import { PageBanner } from '../components/layout/PageBanner';
import { Faq } from '../components/sections/Faq';
import { Contact } from '../components/sections/Contact';
import { site } from '../content/site';

export const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = site.blogs.posts.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const relatedPosts = site.blogs.posts.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <PageShell
      title={post.title}
      description={post.excerpt}
    >
      <PageBanner id="post-header">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-14 text-secondary hover:underline self-center mb-2"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Insights</span>
        </Link>
        <span className="text-14 font-medium text-secondary uppercase tracking-wider">
          {post.category}
        </span>
        <h1 className="text-32 md:text-48 xl:text-56 font-medium text-surface leading-tight">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-14 text-grey-2">
          <span className="flex items-center gap-2">
            <User className="h-5 w-5 text-secondary" />
            {post.author.name} ({post.author.role})
          </span>
          <span className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-secondary" />
            {post.date}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-secondary" />
            {post.readTime}
          </span>
        </div>
      </PageBanner>

      <Section id="post-content" variant="surface">
        <div className="max-w-3xl mx-auto py-8">
          <div className="aspect-[16/9] w-full rounded-16 overflow-hidden mb-32 shadow-sm">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
              width="800"
              height="450"
            />
          </div>

          <div className="prose max-w-none flex flex-col gap-6 text-16 md:text-20 text-text leading-relaxed">
            {post.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Related Posts */}
          <div className="mt-16 pt-12 border-t border-grey-3">
            <h3 className="text-24 font-bold text-primary mb-6">Related Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/blog/${rel.slug}`}
                  className="p-6 rounded-16 bg-grey-1 border border-grey-3 hover:shadow-md transition-shadow group flex flex-col gap-2"
                >
                  <span className="text-12 font-medium text-secondary-active">{rel.category}</span>
                  <h4 className="text-18 font-bold text-primary group-hover:text-secondary-active transition-colors">
                    {rel.title}
                  </h4>
                  <span className="text-12 text-grey-5 mt-auto pt-2">{rel.readTime}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Frequently Asked Questions */}
      <Faq />

      {/* Contact Proposal Form */}
      <Contact />
    </PageShell>
  );
};
