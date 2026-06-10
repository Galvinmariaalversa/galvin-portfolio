'use client';

import React, { useEffect, useRef } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'fade' | 'left' | 'right' | 'scale';
  style?: React.CSSProperties;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  variant = 'fade',
  style,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  }, []);

  const variantClass =
    variant === 'left'
      ? 'reveal-left'
      : variant === 'right'
      ? 'reveal-right'
      : variant === 'scale'
      ? 'reveal-scale'
      : 'reveal';

  return (
    <div
      ref={elementRef}
      className={`${variantClass} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};
export default ScrollReveal;
