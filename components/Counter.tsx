'use client';

import React, { useEffect, useState, useRef } from 'react';

interface CounterProps {
  target: number;
  duration?: number;
}

export const Counter: React.FC<CounterProps> = ({ target, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime: number | null = null;

          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = progress * (2 - progress);
            
            setCount(Math.floor(ease * target));

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(target);
            }
          };

          requestAnimationFrame(animate);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  }, [target, duration]);

  return <span ref={elementRef}>{count}</span>;
};

export default Counter;
