import { useState, useEffect } from 'react';

export const useActiveSection = (sectionIds: string[], options?: IntersectionObserverInit) => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const observerOptions = options || {
      threshold: 0.3,
      rootMargin: '-20% 0px -60% 0px',
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
      observer.disconnect();
    };
  }, [sectionIds, options]);

  return activeSection;
};
