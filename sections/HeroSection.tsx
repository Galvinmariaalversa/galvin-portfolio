'use client';

import React from 'react';
import Image from 'next/image';
import { FolderGit, Mail, Code2, Smartphone, Layers, GitBranch } from 'lucide-react';
import ParticleCanvas from '@/components/ParticleCanvas';
import Counter from '@/components/Counter';
import ScrollReveal from '@/components/ScrollReveal';

export const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden">
      {/* Floating Gradient Blobs */}
      <div className="blob-container">
        <div className="blob blob-purple"></div>
        <div className="blob blob-blue"></div>
      </div>

      {/* Particle Background Canvas */}
      <ParticleCanvas />

      {/* ── HERO ARTWORK — absolutely positioned, outside grid flow ── */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block overflow-hidden">

        {/* Glow 1 — Large purple ambient */}
        <div
          className="animate-pulse-glow-1"
          style={{
            position: 'absolute',
            right: '-100px',
            top: 'calc(50% + 20px)',
            transform: 'translateY(-52%)',
            width: '1000px',
            height: '1000px',
            background: 'radial-gradient(circle at center, rgba(124,58,237,0.50) 0%, transparent 65%)',
            filter: 'blur(250px)',
          }}
        />

        {/* Glow 2 — Blue offset */}
        <div
          className="animate-pulse-glow-2"
          style={{
            position: 'absolute',
            right: '0px',
            top: 'calc(50% + 20px)',
            transform: 'translateY(-50%)',
            width: '750px',
            height: '750px',
            background: 'radial-gradient(circle at center, rgba(59,130,246,0.40) 0%, transparent 65%)',
            filter: 'blur(180px)',
          }}
        />

        {/* Glow 3 — Violet atmospheric */}
        <div
          className="animate-pulse-glow-1"
          style={{
            position: 'absolute',
            right: '-140px',
            top: 'calc(50% + 20px)',
            transform: 'translateY(-50%)',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle at center, rgba(167,139,250,0.30) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />

        {/* Floating elements and avatar wrapped relative to a single container to prevent drift */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[720px] h-[720px] xl:w-[850px] xl:h-[850px] 2xl:w-[980px] 2xl:h-[980px]"
        >
          {/* Artwork Image */}
          <Image
            src="/assets/latest_avatar.png"
            alt="Developer Illustration"
            width={1100}
            height={1100}
            priority
            className="absolute right-[-40px] xl:right-[-60px] 2xl:right-[-80px] top-1/2 -translate-y-1/2 w-[620px] xl:w-[750px] 2xl:w-[880px] max-w-none h-auto object-contain select-none"
          />

          {/* Card 1 — Core Stack Badge */}
          <div
            className="absolute animate-float-1 glass-premium rounded-2xl p-3 xl:p-4 flex items-center gap-3 w-48 xl:w-56 border border-purple-500/20 pointer-events-auto"
            style={{ left: '60px', top: '22%' }}
          >
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Code2 className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="text-[10px] text-gray-500 font-semibold tracking-wider uppercase">Core Stack</div>
              <div className="text-sm text-white font-bold font-heading">React • Next.js • JS</div>
            </div>
          </div>

          {/* Card 2 — Responsive Design Card */}
          <div
            className="absolute animate-float-2 glass-premium rounded-2xl p-3 xl:p-4 flex items-center gap-3 w-48 xl:w-56 border border-blue-500/20 pointer-events-auto"
            style={{ right: '50px', top: '15%' }}
          >
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] text-gray-500 font-semibold tracking-wider uppercase">Design Pattern</div>
              <div className="text-sm text-white font-bold font-heading">Responsive Design</div>
              <div className="text-[10px] text-gray-400">Mobile First Dev</div>
            </div>
          </div>

          {/* Card 3 — Styling Frameworks Card */}
          <div
            className="absolute animate-float-3 glass-premium rounded-2xl p-3 xl:p-4 flex items-center gap-3 w-48 xl:w-56 border border-purple-500/20 pointer-events-auto"
            style={{ left: '40px', bottom: '22%' }}
          >
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] text-gray-500 font-semibold tracking-wider uppercase">Styling</div>
              <div className="text-sm text-white font-bold font-heading">Tailwind • Bootstrap</div>
            </div>
          </div>

          {/* Card 4 — Version Control Card */}
          <div
            className="absolute animate-float-1 glass-premium rounded-2xl p-3 xl:p-4 flex items-center gap-3 w-44 xl:w-52 border border-blue-500/20 pointer-events-auto"
            style={{ right: '80px', bottom: '15%', animationDelay: '1.5s' }}
          >
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <GitBranch className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] text-gray-500 font-semibold tracking-wider uppercase">Version Control</div>
              <div className="text-sm text-white font-bold font-heading">Git • GitHub</div>
            </div>
          </div>

        </div>
      </div>

      {/* ── HERO CONTENT — grid, left side only ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

        {/* Left content */}
        <ScrollReveal className="lg:col-span-7 flex flex-col items-start text-left" variant="fade">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Available for Freelance Work
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white leading-[1.15] mb-6 tracking-tight">
            Frontend Developer Building{' '}
            <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-blue-400 text-transparent bg-clip-text">
              Responsive, User-Friendly
            </span>{' '}
            Websites
          </h1>

          {/* Subheadline */}
          <p className="text-gray-400 text-base sm:text-lg mb-8 max-w-xl leading-relaxed">
            I build clean, modern, and fully responsive websites that focus on usability, clean code, and seamless layout across all devices.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-12">
            <a
              href="#projects"
              className="px-7 py-3.5 rounded-full text-sm font-semibold bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:opacity-95 transition-all duration-300 inline-flex items-center gap-2"
            >
              View My Work <FolderGit className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="px-7 py-3.5 rounded-full text-sm font-semibold border border-gray-800 text-gray-300 hover:text-white hover:border-gray-600 bg-white/5 backdrop-blur-sm transition-all duration-300 inline-flex items-center gap-2"
            >
              Contact Me <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-6 sm:gap-10 border-t border-gray-900 pt-8 w-full max-w-lg">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold font-heading text-white flex items-center">
                <Counter target={4} />
              </div>
              <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">Personal Projects</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold font-heading text-white flex items-center">
                <Counter target={100} />%
              </div>
              <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">Responsive Design</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold font-heading text-white flex items-center">
                Clean
              </div>
              <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">Code Quality</div>
            </div>
          </div>
        </ScrollReveal>

        {/* Right spacer — keeps text from overlapping artwork on desktop */}
        <div className="hidden lg:block lg:col-span-5" aria-hidden="true" />
      </div>
    </section>
  );
};

export default HeroSection;
