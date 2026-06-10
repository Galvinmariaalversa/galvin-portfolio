'use client';

import { useEffect, useState } from 'react';

export const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      setIsFading(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 500);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      id="loader"
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-darkBg transition-all duration-500 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-t-purple-500 border-r-blue-500 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        <span className="mt-4 text-sm font-medium text-gray-400 tracking-wider">LOADING GALVIN J...</span>
      </div>
    </div>
  );
};

export default Preloader;
