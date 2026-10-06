import React, { useEffect, useRef, useState } from 'react';

export interface RevealProps {
  children: React.ReactNode;
  delayMs?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
  as?: React.ElementType;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  delayMs = 0,
  direction = 'up',
  className = '',
  as: Component = 'div',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only trigger once
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getTransformStyle = () => {
    if (isVisible) return 'translate-x-0 translate-y-0 opacity-100';

    switch (direction) {
      case 'up':
        return 'translate-y-4 opacity-0';
      case 'down':
        return '-translate-y-4 opacity-0';
      case 'left':
        return 'translate-x-4 opacity-0';
      case 'right':
        return '-translate-x-4 opacity-0';
      case 'none':
      default:
        return 'opacity-0';
    }
  };

  return (
    <Component
      ref={elementRef}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={`transition-all duration-slow ease-out-custom will-change-[transform,opacity] ${getTransformStyle()} ${className}`}
    >
      {children}
    </Component>
  );
};
