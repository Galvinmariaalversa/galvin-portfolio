'use client';

import React from 'react';
import { BookOpen, Cpu, Layout, Wrench, Smartphone, Layers, GitBranch } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

export const SkillsSection = () => {
  const frontendTechnologies = [
    'HTML5',
    'CSS3',
    'JavaScript (ES6+)',
    'React.js',
    'Next.js',
    'TypeScript',
  ];

  const stylingFrameworks = [
    'Tailwind CSS',
    'Bootstrap',
    'Responsive Design',
    'Mobile First'
  ];

  const developmentTools = [
    'Git',
    'GitHub',
    'VS Code',
    'Figma'
  ];

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-darkGray/30 border-y border-gray-900/50">
      {/* Background Animated Blobs */}
      <div className="blob-container">
        <div className="blob blob-purple opacity-10" style={{ top: '-10%', left: '-10%', width: '300px', height: '300px' }} />
        <div className="blob blob-blue opacity-10" style={{ bottom: '-10%', right: '-10%', width: '400px', height: '400px' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-16" variant="fade">
          <span className="text-xs font-bold text-purple-400 uppercase tracking-widest px-3 py-1 rounded-full bg-purple-500/10">My Stack</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white mt-4 mb-4">
            Skills & Expertise
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            A stack of modern frontend technologies, styling frameworks, and developer tools I use to build responsive websites.
          </p>
        </ScrollReveal>

        {/* Skills Categories Grid */}
        <ScrollReveal variant="fade" className="w-full mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            
            {/* Core Stack Column */}
            <div className="glass-card p-6 sm:p-8 rounded-2xl flex flex-col justify-between hover:border-purple-500/20 transition-all duration-300">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/10 shadow-[0_0_15px_rgba(139,92,246,0.1)]">
                    <Cpu className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold font-heading text-white">Core Languages</h3>
                    <span className="text-[11px] text-purple-400/80 font-medium">Foundations</span>
                  </div>
                </div>
                <p className="text-gray-400 text-xs sm:text-sm mb-6 leading-relaxed">
                  The fundamental web technologies I use to build clean, interactive, and semantically correct client-side logic.
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {frontendTechnologies.map((skill) => (
                    <span 
                      key={skill} 
                      className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/5 text-gray-300 text-xs sm:text-sm font-medium hover:bg-purple-500/10 hover:border-purple-500/30 hover:text-white transition-all duration-300 select-none cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Styling Frameworks Column */}
            <div className="glass-card p-6 sm:p-8 rounded-2xl flex flex-col justify-between hover:border-blue-500/20 transition-all duration-300">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                    <Layout className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold font-heading text-white">Styling & Layout</h3>
                    <span className="text-[11px] text-blue-400/80 font-medium">Visual Design</span>
                  </div>
                </div>
                <p className="text-gray-400 text-xs sm:text-sm mb-6 leading-relaxed">
                  Modern styling frameworks and methodologies I employ to engineer responsive, mobile-first, and polished layouts.
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {stylingFrameworks.map((skill) => (
                    <span 
                      key={skill} 
                      className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/5 text-gray-300 text-xs sm:text-sm font-medium hover:bg-blue-500/10 hover:border-blue-500/30 hover:text-white transition-all duration-300 select-none cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Tools Column */}
            <div className="glass-card p-6 sm:p-8 rounded-2xl flex flex-col justify-between hover:border-cyan-500/20 transition-all duration-300">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                    <Wrench className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold font-heading text-white">Tools & Workflow</h3>
                    <span className="text-[11px] text-cyan-400/80 font-medium">Development Flow</span>
                  </div>
                </div>
                <p className="text-gray-400 text-xs sm:text-sm mb-6 leading-relaxed">
                  Development platforms, version control, and design applications essential for a productive workflow.
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {developmentTools.map((skill) => (
                    <span 
                      key={skill} 
                      className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/5 text-gray-300 text-xs sm:text-sm font-medium hover:bg-cyan-500/10 hover:border-cyan-500/30 hover:text-white transition-all duration-300 select-none cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </ScrollReveal>

        {/* Currently Learning Horizontal Banner */}
        <ScrollReveal variant="fade" className="w-full">
          <div className="glass-premium rounded-2xl p-6 sm:p-8 border border-purple-500/15 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
            
            {/* Background Glow */}
            <div className="absolute right-[-50px] top-[-50px] w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center gap-4 relative z-10">
              <span className="p-3.5 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/10 flex items-center justify-center">
                <BookOpen className="w-6 h-6 animate-pulse" />
              </span>
              <div>
                <h3 className="text-lg font-bold font-heading text-white flex items-center gap-2">
                  Currently Exploring
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
                  Deepening expertise in advanced React patterns, performance optimization, and server-side rendering with Next.js App Router.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 relative z-10 shrink-0">
              <span className="px-5 py-2.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-white text-sm sm:text-base font-bold shadow-[0_0_20px_rgba(139,92,246,0.15)] select-none">
                Next.js App Router
              </span>
            </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

export default SkillsSection;

