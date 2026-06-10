'use client';

import React from 'react';
import ScrollReveal from '@/components/ScrollReveal';

interface Step {
  phase: string;
  title: string;
  description: string;
  dotColor: string;
}

export const ProcessSection = () => {
  const steps: Step[] = [
    {
      phase: 'Phase 01',
      title: 'Project Discussion',
      description: 'We align on your product scope, explore goals, document key performance metrics, define style sheets, and set project timelines.',
      dotColor: 'bg-purple-500',
    },
    {
      phase: 'Phase 02',
      title: 'Planning & Strategy',
      description: 'Designing UX blueprints, selecting appropriate fonts, establishing component tokens, and drafting layout schemas.',
      dotColor: 'bg-indigo-500',
    },
    {
      phase: 'Phase 03',
      title: 'Development',
      description: 'Writing clean semantic markup, styling layouts using responsive Tailwind classes, and injecting custom Javascript interactions.',
      dotColor: 'bg-blue-500',
    },
    {
      phase: 'Phase 04',
      title: 'Testing',
      description: 'Verifying screen rendering ratios across devices, debugging JavaScript listeners, testing contact form pathways, and checking core loading indices.',
      dotColor: 'bg-cyan-500',
    },
    {
      phase: 'Phase 05',
      title: 'Delivery',
      description: 'Shipping completed high-end codes ready to launch, optimizing hosting configurations, and providing walkthrough folders.',
      dotColor: 'bg-emerald-500',
    },
  ];

  return (
    <section id="process" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-20" variant="fade">
          <span className="text-xs font-bold text-purple-400 uppercase tracking-widest px-3 py-1 rounded-full bg-purple-500/10">Roadmap</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white mt-4 mb-4">
            Development Process
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            A transparent, phase-by-phase look into how I construct your custom web project.
          </p>
        </ScrollReveal>

        {/* Timeline Container */}
        <div className="relative max-w-3xl mx-auto">
          {/* Connecting Vertical Line */}
          <div className="timeline-line absolute left-[21px] md:left-1/2 top-2 bottom-2 w-[2px] -translate-x-1/2 opacity-30 z-0"></div>

          {/* Timeline Steps */}
          {steps.map((step, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <ScrollReveal 
                key={idx}
                className="relative grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 items-start"
                variant="fade"
              >
                {/* Dot */}
                <div className={`absolute left-5 md:left-1/2 top-1.5 w-4 h-4 rounded-full timeline-dot -translate-x-1/2 z-10 flex items-center justify-center ${step.dotColor}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                </div>

                {isLeft ? (
                  <>
                    {/* Left side content (Desktop) */}
                    <div className="pl-12 md:pl-0 md:pr-12 md:text-right">
                      <span className="text-xs font-bold text-purple-400 uppercase tracking-widest font-heading mb-1.5 block">
                        {step.phase}
                      </span>
                      <h3 className="text-lg font-bold font-heading text-white mb-2">{step.title}</h3>
                      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                    {/* Empty column for desktop layout */}
                    <div className="hidden md:block"></div>
                  </>
                ) : (
                  <>
                    {/* Empty column for desktop layout */}
                    <div className="hidden md:block"></div>
                    {/* Right side content */}
                    <div className="pl-12 md:pl-12">
                      <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest font-heading mb-1.5 block">
                        {step.phase}
                      </span>
                      <h3 className="text-lg font-bold font-heading text-white mb-2">{step.title}</h3>
                      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </>
                )}
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
