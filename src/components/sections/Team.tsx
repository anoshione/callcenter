import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { site } from '../../content/site';
import { Section } from '../layout/Section';
import { SectionHeader } from '../ui/SectionHeader';
import { TeamCard } from '../ui/TeamCard';
import { Reveal } from '../ui/Reveal';

export const Team: React.FC = () => {
  const { members, eyebrow, title, subtitle } = site.team;
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScrollState = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    const cardWidth = clientWidth / (window.innerWidth >= 1024 ? 4 : window.innerWidth >= 640 ? 2 : 1);
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(index, members.length - 1));
  };

  useEffect(() => {
    checkScrollState();
    const el = carouselRef.current;
    if (!el) return;

    el.addEventListener('scroll', checkScrollState, { passive: true });
    window.addEventListener('resize', checkScrollState);
    return () => {
      el.removeEventListener('scroll', checkScrollState);
      window.removeEventListener('resize', checkScrollState);
    };
  }, [members.length]);

  const scrollByCard = (direction: 'prev' | 'next') => {
    if (!carouselRef.current) return;
    const { clientWidth } = carouselRef.current;
    const scrollDelta = direction === 'next' ? clientWidth * 0.75 : -clientWidth * 0.75;
    carouselRef.current.scrollBy({ left: scrollDelta, behavior: 'smooth' });
  };

  return (
    <Section id="team" variant="surface" padded={false}>
      <div className="flex flex-col">
        {/* Section Header (Centered, 14px top/bottom, 28px middle, 32px gap to content) */}
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
        />

        {/* Responsive Scroll-Snap Carousel: 4 on desktop, 2 on tablet, 1 on mobile */}
        <div
          ref={carouselRef}
          tabIndex={0}
          role="region"
          aria-label="Team members carousel"
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') {
              e.preventDefault();
              scrollByCard('prev');
            } else if (e.key === 'ArrowRight') {
              e.preventDefault();
              scrollByCard('next');
            }
          }}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded-16 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {members.map((member, i) => (
            <div
              key={member.id}
              className="snap-start flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] flex"
            >
              <Reveal direction="up" delayMs={i * 60} className="w-full flex">
                <TeamCard member={member} className="w-full" />
              </Reveal>
            </div>
          ))}
        </div>

        {/* Carousel Controls & Pagination Dots */}
        <div className="flex items-center justify-center gap-6 pt-4">
          <button
            type="button"
            onClick={() => scrollByCard('prev')}
            disabled={!canScrollLeft}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-grey-3 bg-surface text-primary hover:border-secondary hover:text-secondary-active active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-base shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            aria-label="Previous team members"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center justify-center gap-2" aria-hidden="true">
            {members.map((_, idx) => (
              <span
                key={idx}
                className={`h-2 rounded-full transition-all duration-base ${
                  idx === activeIndex
                    ? 'w-6 bg-secondary'
                    : 'w-2 bg-grey-3'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollByCard('next')}
            disabled={!canScrollRight}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-grey-3 bg-surface text-primary hover:border-secondary hover:text-secondary-active active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-base shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            aria-label="Next team members"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </Section>
  );
};

export default Team;
