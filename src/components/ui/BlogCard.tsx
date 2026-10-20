import React from 'react';
import { Button } from './Button';

/**
 * Blog card mirroring the ServiceCard anatomy:
 * framed rounded image on top, content body below, CTA pinned to the bottom.
 * In place of the service pointers: the blog excerpt text. Single CTA.
 */
export interface BlogCardProps {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  ctaLabel?: string;
  className?: string;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  slug,
  title,
  date,
  excerpt,
  image,
  ctaLabel = 'Read Blog',
  className = '',
}) => {
  return (
    <div
      className={`group relative flex flex-col h-full rounded-20 bg-surface text-text border border-grey-3/80 overflow-hidden shadow-[var(--shadow-card-crisp)] hover:shadow-[var(--shadow-card-crisp-hover)] transition-all duration-base hover:-translate-y-1 ${className}`}
    >
      {/* Framed Media: small even padding around the card framing the photo (8px / 10px), fully rounded */}
      <div className="relative p-8 sm:p-[10px] w-full">
        <div className="relative w-full aspect-[16/10] overflow-hidden rounded-16 bg-grey-2 shadow-xs">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-base group-hover:scale-104"
            width="600"
            height="375"
            loading="lazy"
          />
        </div>
      </div>

      {/* Content Body: title, excerpt, date before the CTA */}
      <div className="relative z-10 px-20 sm:px-24 pt-16 sm:pt-20 pb-20 sm:pb-24 flex flex-col flex-1">
        <h3 className="text-20 md:text-22 font-bold text-primary leading-snug mb-3.5">
          {title}
        </h3>

        {/* Blog text (same slot the service pointers occupy) */}
        <p className="text-14 text-text leading-relaxed line-clamp-3">
          {excerpt}
        </p>

        {/* Date just above the pinned CTA */}
        <div className="mt-auto pt-20">
          <p className="text-12 text-text-2 mb-12">{date}</p>
          <Button
            to={`/blog/${slug}`}
            variant="primary"
            size="sm"
            className="w-full whitespace-nowrap text-center justify-center px-16 sm:px-20"
          >
            {ctaLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
