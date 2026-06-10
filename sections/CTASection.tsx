'use client';

import React from 'react';
import { Zap } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

export const CTASection = () => {
  return (
    <section className="py-16 relative overflow-hidden px-6">
      <ScrollReveal 
        className="max-w-5xl mx-auto rounded-3xl overflow-hidden glass-panel border border-white/5 relative z-10 shadow-2xl p-8 sm:p-12 md:p-16 flex flex-col items-center text-center bg-gradient-to-br from-purple-500/10 via-[#111827]/40 to-blue-500/10"
        variant="scale"
      >
        {/* Blob overlay inside card */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-500 rounded-full filter blur-[80px] opacity-20 pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-blue-500 rounded-full filter blur-[80px] opacity-20 pointer-events-none"></div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white mb-4 max-w-2xl leading-tight">
          Let&apos;s Build Your Next Website
        </h2>
        <p className="text-gray-400 text-sm sm:text-base mb-8 max-w-xl leading-relaxed">
          Whether you need a business website, landing page, or personal portfolio, let&apos;s create a clean, responsive web experience that meets your project goals.
        </p>
        
        <a 
          href="#contact" 
          className="px-8 py-4 rounded-full text-sm font-semibold bg-white text-darkBg hover:bg-purple-500 hover:text-white transition-all duration-300 shadow-xl shadow-white/5 inline-flex items-center gap-2"
        >
          Start a Project <Zap className="w-4 h-4" />
        </a>
      </ScrollReveal>
    </section>
  );
};

export default CTASection;
