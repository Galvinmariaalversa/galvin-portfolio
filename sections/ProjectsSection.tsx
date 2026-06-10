'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { Project } from '@/types';

interface ProjectItem extends Project {
  id: number;
  accentColor: string;
  reverse?: boolean;
}

export const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filterButtons = [
    { label: 'All Projects', value: 'all' },
    { label: 'Websites / Landing Pages', value: 'website' },
    { label: 'Web Applications', value: 'webapp' },
  ];

  const projects: ProjectItem[] = [
    {
      id: 1,
      title: 'IRCTC Train Ticket Booking Portal',
      category: 'webapp',
      categoryName: 'Web Application',
      description: 'A frontend mockup simulating the train ticket booking flow, focusing on clean user interface design and responsive layouts.',
      tags: ['HTML5', 'Tailwind CSS', 'JavaScript'],
      image: '/assets/irctc.png',
      liveUrl: 'https://irctc-nextgen-simulation.vercel.app/',
      githubUrl: 'https://github.com/Galvinmariaalversa/irctc-nextgen-simulation',
      accentColor: 'purple',
    },
    {
      id: 2,
      title: 'IronPulse Fitness Platform',
      category: 'website',
      categoryName: 'Landing Page',
      description: 'A responsive landing page for a gym featuring static BMI calculators, schedules, and modern dark-mode layouts to demonstrate UI skills.',
      tags: ['HTML5', 'Tailwind CSS', 'Bootstrap', 'JavaScript'],
      image: '/assets/gyms.png',
      liveUrl: 'https://iron-pulse-fitness-landing-page.vercel.app/',
      githubUrl: 'https://github.com/Galvinmariaalversa/IronPulse-Fitness-landing-page',
      accentColor: 'blue',
      reverse: true,
    },
    {
      id: 3,
      title: 'TastyTown Food Ordering Platform',
      category: 'webapp',
      categoryName: 'Web Application',
      description: 'A frontend food ordering interface featuring a dynamic shopping cart simulation, table reservations forms, and a responsive mobile-first layout.',
      tags: ['HTML5', 'Tailwind CSS', 'JavaScript'],
      image: '/assets/tastytown.png',
      liveUrl: 'https://tasty-town-food-ordering-q467.vercel.app/',
      githubUrl: 'https://github.com/Galvinmariaalversa/TastyTown-Food-Ordering',
      accentColor: 'pink',
    },
  ];

  const filteredProjects = projects.filter(
    (project) => activeFilter === 'all' || project.category === activeFilter
  );

  const hoverColorMap: Record<string, string> = {
    purple: 'hover:bg-purple-500 hover:text-white',
    blue: 'hover:bg-blue-500 hover:text-white',
    pink: 'hover:bg-pink-500 hover:text-white',
  };

  const glowColorMap: Record<string, string> = {
    purple: 'bg-purple-500/10',
    blue: 'bg-blue-500/10',
    pink: 'bg-pink-500/10',
  };

  const textColorMap: Record<string, string> = {
    purple: 'text-purple-400',
    blue: 'text-blue-400',
    pink: 'text-pink-400',
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-16" variant="fade">
          <span className="text-xs font-bold text-purple-400 uppercase tracking-widest px-3 py-1 rounded-full bg-purple-500/10">Portfolio</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white mt-4 mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            A showcase of my recent frontend projects, demonstrating clean code structure and responsive UI design.
          </p>
        </ScrollReveal>

        {/* Dynamic Category Filtering Buttons */}
        <ScrollReveal className="flex flex-wrap justify-center gap-3 mb-16" variant="fade">
          {filterButtons.map((btn) => {
            const isActive = activeFilter === btn.value;
            return (
              <button
                key={btn.value}
                onClick={() => setActiveFilter(btn.value)}
                className={`filter-btn px-5 py-2.5 rounded-full text-xs font-semibold border transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white border-transparent shadow-lg shadow-purple-500/15'
                    : 'bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {btn.label}
              </button>
            );
          })}
        </ScrollReveal>

        {/* Project Showcase Cards List */}
        <div className="space-y-16 lg:space-y-24">
          {filteredProjects.map((project) => {
            const hoverBtnClass = hoverColorMap[project.accentColor] || '';
            const glowClass = glowColorMap[project.accentColor] || '';
            const textClass = textColorMap[project.accentColor] || '';

            return (
              <div
                key={project.id}
                className={`project-card grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center transition-all duration-500 ${
                  project.reverse ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Preview Image */}
                <div 
                  className={`lg:col-span-6 group relative rounded-2xl overflow-hidden border border-gray-800 bg-gray-900 aspect-video shadow-xl ${
                    project.reverse ? 'lg:order-2' : ''
                  }`}
                >
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 ${glowClass}`}></div>
                  <Image
                    src={project.image}
                    alt={`${project.title} Mockup`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Info Details */}
                <div 
                  className={`lg:col-span-6 flex flex-col items-start ${
                    project.reverse ? 'lg:order-1' : ''
                  }`}
                >
                  <span className={`text-xs font-bold uppercase tracking-wider mb-2 ${textClass}`}>
                    {project.categoryName}
                  </span>
                  <h3 className="text-2xl font-bold font-heading text-white mb-4">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium rounded-lg bg-white/5 border border-white/5 text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-4">
                    <a
                      href={project.liveUrl}
                      target={project.liveUrl !== '#' ? '_blank' : undefined}
                      rel={project.liveUrl !== '#' ? 'noopener noreferrer' : undefined}
                      className={`px-5 py-2.5 rounded-full text-xs font-semibold bg-white text-darkBg transition-all duration-300 inline-flex items-center gap-1.5 ${hoverBtnClass}`}
                    >
                      Live Demo <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={project.githubUrl}
                      target={project.githubUrl !== '#' ? '_blank' : undefined}
                      rel={project.githubUrl !== '#' ? 'noopener noreferrer' : undefined}
                      className="px-5 py-2.5 rounded-full text-xs font-semibold border border-gray-800 text-gray-400 hover:text-white hover:border-gray-600 bg-white/5 backdrop-blur-sm transition-all inline-flex items-center gap-1.5"
                    >
                      Source Code <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
