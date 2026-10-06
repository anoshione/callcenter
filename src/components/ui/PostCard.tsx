import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { BlogPost } from '../../content/site';

export interface PostCardProps {
  post: BlogPost;
  variant?: 'standard' | 'featured' | 'compact';
  className?: string;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  variant = 'standard',
  className = '',
}) => {
  if (variant === 'featured') {
    return (
      <article
        className={`flex flex-col rounded-16 border border-grey-3 bg-surface overflow-hidden shadow-sm hover:shadow-md transition-all duration-base group ${className}`}
      >
        <div className="aspect-[16/10] w-full overflow-hidden bg-grey-2 relative">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-base group-hover:scale-104"
            width="800"
            height="500"
            loading="lazy"
          />
          <div className="absolute top-4 left-4 rounded-round bg-primary/90 backdrop-blur-md px-3.5 py-1 text-12 font-medium text-surface">
            Featured Insight
          </div>
        </div>

        <div className="flex flex-col flex-1 px-20 py-16 md:px-24 md:py-16 gap-12 justify-between">
          <div>
            <div className="flex items-center gap-4 text-12 text-text-2 mb-1">
              <span className="font-bold text-secondary-active uppercase tracking-wider">
                {post.category}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {post.readTime}
              </span>
            </div>

            <h3 className="text-20 md:text-24 font-medium text-primary group-hover:text-secondary-active transition-colors leading-snug">
              <Link to={`/blog/${post.slug}`}>{post.title}</Link>
            </h3>
          </div>

          <p className="my-auto py-1 text-14 md:text-15 text-text leading-relaxed">
            {post.excerpt}
          </p>

          <div className="pt-2.5 border-t border-grey-3 flex items-center justify-between text-13">
            <span className="text-grey-5">{post.author.name}</span>
            <Link
              to={`/blog/${post.slug}`}
              className="font-medium text-primary flex items-center gap-1 group-hover:text-secondary-active transition-colors"
            >
              Read full article <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article
        className={`flex flex-col sm:flex-row gap-16 p-12 sm:px-16 sm:py-12 rounded-16 border border-grey-3 bg-surface hover:shadow-md transition-all duration-base group ${className}`}
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

        <div className="flex flex-col justify-between flex-1 py-1">
          <div>
            <span className="text-12 font-bold uppercase tracking-wider text-secondary-active">
              {post.category}
            </span>
            <h4 className="text-16 font-medium text-primary group-hover:text-secondary-active transition-colors mt-1 leading-snug">
              <Link to={`/blog/${post.slug}`}>{post.title}</Link>
            </h4>
          </div>

          <p className="my-auto py-1 text-12 text-text-2 leading-relaxed">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between text-12 text-grey-5 pt-2 border-t border-grey-3">
            <span>{post.readTime}</span>
            <Link to={`/blog/${post.slug}`} className="text-primary font-medium hover:underline">
              Read &rarr;
            </Link>
          </div>
        </div>
      </article>
    );
  }

  // Standard Post Card
  return (
    <article
      className={`flex flex-col rounded-16 border border-grey-3 bg-surface overflow-hidden hover:shadow-md transition-all duration-base group ${className}`}
    >
      <div className="aspect-[16/10] overflow-hidden bg-grey-2">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-base"
          width="800"
          height="480"
          loading="lazy"
        />
      </div>

      <div className="flex flex-col flex-1 px-20 py-16 md:px-24 md:py-16 gap-12 justify-between">
        <div>
          <div className="flex items-center justify-between text-12 text-text-2 mb-2">
            <span className="font-bold text-secondary-active uppercase tracking-wider">
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readTime}
            </span>
          </div>

          <h3 className="text-20 font-medium text-primary group-hover:text-secondary-active transition-colors leading-snug">
            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
          </h3>
        </div>

        <p className="my-auto py-1 text-14 text-text leading-relaxed">
          {post.excerpt}
        </p>

        <div className="pt-3 border-t border-grey-3 flex items-center justify-between text-12 text-grey-5">
          <span>{post.author.name}</span>
          <span>{post.date}</span>
        </div>
      </div>
    </article>
  );
};
