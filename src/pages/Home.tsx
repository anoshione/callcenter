import React from 'react';
import { PageShell } from '../components/layout/PageShell';
import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { CtaBanner } from '../components/sections/CtaBanner';
import { Services } from '../components/sections/Services';
import { Partners } from '../components/sections/Partners';
import { Team } from '../components/sections/Team';
import { HowWeWork } from '../components/sections/HowWeWork';
import { GetStarted } from '../components/sections/GetStarted';
import { BlogGallery } from '../components/sections/BlogGallery';
import { Contact } from '../components/sections/Contact';
import { Faq } from '../components/sections/Faq';
import { Reviews } from '../components/sections/Reviews';
import { site } from '../content/site';

export const Home: React.FC = () => {
  return (
    <PageShell
      title="Premier Call Center & BPO Solutions"
      description={site.hero.description}
    >
      {/* 1. Hero with floating glass stats bar */}
      <Hero />

      {/* 2. About Us */}
      <About />

      {/* 3. CTA Banner */}
      <CtaBanner />

      {/* 4. Our Services (all 8 cards with pointers and CTAs) */}
      <Services />

      {/* 5. How We Work (5 delivery stages) */}
      <HowWeWork />

      {/* 6. Partners (2 anti-directional marquee rows) */}
      <Partners />

      {/* 7. Client Reviews & Testimonials */}
      <Reviews />

      {/* 8. Our Team (4 at once carousel) */}
      <Team />

      {/* 9. Steps to Get Started (4 connected timeline steps) */}
      <GetStarted />

      {/* 10. Blogs and Gallery (featured post + stacked pair & facility masonry with Lightbox) */}
      <BlogGallery />

      {/* 11. FAQ (8 items, 2 columns) */}
      <Faq />

      {/* 12. Contact Us (glass proposal form & operational channels) */}
      <Contact />
    </PageShell>
  );
};

export default Home;
