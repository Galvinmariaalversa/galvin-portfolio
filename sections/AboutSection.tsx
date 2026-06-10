'use client';

import React from 'react';
import TerminalMockup from '@/components/TerminalMockup';
import ScrollReveal from '@/components/ScrollReveal';

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-darkGray/30 border-y border-gray-900/50">
      <div className="blob-container">
        <div className="blob blob-pink"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Side: Custom Terminal Mockup */}
          <ScrollReveal className="lg:col-span-5" variant="left">
            <TerminalMockup />
          </ScrollReveal>

          {/* Right Side: Bio & Details */}
          <ScrollReveal className="lg:col-span-7 flex flex-col items-start" variant="right">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest px-3 py-1 rounded-full bg-purple-500/10 mb-4">About Me</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white mb-6">
              Crafting Highly Interactive & Fast Websites
            </h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              I am a frontend developer focused on building responsive, clean, and fast web interfaces. I specialize in turning design concepts into functional, user-friendly websites using HTML, Tailwind CSS, and JavaScript.
            </p>
            <p className="text-gray-400 mb-8 leading-relaxed">
              As a BSc Computer Science graduate from <strong>Madras Christian College</strong> (Class of 2026), I combine academic fundamentals with hands-on practice. My focus is on writing maintainable code, optimizing user experience, and continuously learning new technologies to build better web products.
            </p>

            {/* Currently Learning Grid */}
            <div className="w-full border-t border-gray-900 pt-8 mb-8">
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Currently Learning & Mastering</h3>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/5 border border-purple-500/15">
                  <svg className="w-5 h-5 text-[#61DAFB]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 14c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-10C5.37 4 0 9.37 0 16s5.37 12 12 12 12-5.37 12-12S18.63 4 12 4zm0 22c-5.52 0-10-4.48-10-10S6.48 6 12 6s10 4.48 10 10-4.48 10-10 10z" />
                  </svg>
                  <span className="text-sm text-gray-200 font-semibold">React.js</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/5 border border-blue-500/15">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 14.5h-2v-5h2v5zm0-6.5h-2V8h2v2z" />
                  </svg>
                  <span className="text-sm text-gray-200 font-semibold">Next.js</span>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <a
                href="#contact"
                className="px-6 py-3 rounded-full text-xs font-semibold bg-white text-darkBg hover:bg-purple-500 hover:text-white transition-all duration-300"
              >
                Start a Project
              </a>
              <a
                href="#services"
                className="px-6 py-3 rounded-full text-xs font-semibold border border-gray-800 text-gray-400 hover:text-white hover:border-gray-600 transition-all"
              >
                Let&apos;s Discuss Your Project
              </a>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
