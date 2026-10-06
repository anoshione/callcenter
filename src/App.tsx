import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { Gallery } from './pages/Gallery';
import { DevKit } from './pages/DevKit';

/**
 * Handles smooth scrolling to hash anchors (e.g. /#contact, /services#customer-support)
 * or scrolls to top on route navigation.
 */
const ScrollManager: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Strip potential query parameters from hash (e.g. #contact?service=customer-support -> #contact)
      const cleanHash = hash.split('?')[0];
      try {
        const element = document.querySelector(cleanHash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      } catch {
        // Fallback for non-standard selector
        const id = cleanHash.replace(/^#/, '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname, hash]);

  return null;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/dev/kit" element={<DevKit />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
