'use client';

import React from 'react';
import { Smartphone, Code, Layout, Layers, Zap, BookOpen } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

interface ValueCard {
  id: number;
  title: string;
  description: string;
  icon: 'smartphone' | 'code' | 'layout' | 'layers' | 'zap' | 'book-open';
  color: 'purple' | 'blue' | 'pink' | 'emerald' | 'amber' | 'cyan';
  delay: string;
}

const iconMap = {
  smartphone: Smartphone,
  code: Code,
  layout: Layout,
  layers: Layers,
  zap: Zap,
  'book-open': BookOpen,
};

const colorClasses = {
  purple: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
  blue: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
  pink: 'bg-pink-500/10 border-pink-500/20 text-pink-400',
  emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
  amber: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
  cyan: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
};

export const WhyChooseMeSection = () => {
  const cards: ValueCard[] = [
    {
      id: 1,
      title: 'Mobile-Friendly Experience',
      description: 'Websites designed to provide a smooth and easy experience across mobile, tablet, and desktop devices.',
      icon: 'smartphone',
      color: 'purple',
      delay: '0s',
    },
    {
      id: 2,
      title: 'Modern & Professional Design',
      description: 'Clean and professional designs that represent your business and help build trust with potential customers.',
      icon: 'layout',
      color: 'blue',
      delay: '0.1s',
    },
    {
      id: 3,
      title: 'Fast & User-Friendly',
      description: 'Websites built with performance and usability in mind to provide visitors with a smooth browsing experience.',
      icon: 'zap',
      color: 'pink',
      delay: '0.2s',
    },
    {
      id: 4,
      title: 'Business-Focused Approach',
      description: 'Every website is designed to clearly showcase your services and encourage visitors to take the next step.',
      icon: 'layers',
      color: 'emerald',
      delay: '0.3s',
    },
    {
      id: 5,
      title: 'Clear Communication',
      description: 'A simple and transparent process from understanding your requirements to reviewing and delivering your website.',
      icon: 'book-open',
      color: 'amber',
      delay: '0.4s',
    },
    {
      id: 6,
      title: 'Quality Development',
      description: 'Carefully built websites with attention to detail, consistency, and a reliable user experience.',
      icon: 'code',
      color: 'cyan',
      delay: '0.5s',
    },
  ];

  return (
    <section id="why-me" className="py-24 relative overflow-hidden bg-darkGray/30 border-y border-gray-900/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-16" variant="fade">
          <span className="text-xs font-bold text-purple-400 uppercase tracking-widest px-3 py-1 rounded-full bg-purple-500/10">Value Proposition</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white mt-4 mb-4">
            Why Work With Me
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Focused on creating professional, user-friendly websites that help businesses build a strong online presence.
          </p>
        </ScrollReveal>

        {/* Why Me Grid (6 items) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card) => {
            const IconComponent = iconMap[card.icon];
            const colorClass = colorClasses[card.color];

            return (
              <ScrollReveal
                key={card.id}
                className="glass-card p-8 rounded-2xl flex flex-col items-start hover:scale-[1.02]"
                variant="fade"
                style={{ animationDelay: card.delay }}
              >
                <div className={`p-2.5 rounded-xl border mb-5 ${colorClass}`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-heading text-white mb-2">{card.title}</h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                  {card.description}
                </p>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseMeSection;
