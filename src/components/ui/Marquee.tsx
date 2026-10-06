import React from 'react';

export interface MarqueeProps {
  children: React.ReactNode;
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  fadeEdges?: boolean;
  className?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({
  children,
  direction = 'left',
  pauseOnHover = true,
  fadeEdges = true,
  className = '',
}) => {
  const animClass = direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse';
  const maskStyle = fadeEdges
    ? '[mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]'
    : '';

  return (
    <div className={`relative w-full overflow-hidden ${maskStyle} ${className}`}>
      <div
        className={`${animClass} gap-6 py-2 ${
          pauseOnHover ? 'hover:[animation-play-state:paused]' : ''
        }`}
      >
        {children}
        {/* Duplicate children for seamless infinite loop */}
        {children}
      </div>
    </div>
  );
};
