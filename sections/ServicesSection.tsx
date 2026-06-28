'use client';

import React from 'react';
import { 
  Globe, 
  Rocket, 
  Utensils, 
  Activity, 
  User, 
  RefreshCw, 
  Smartphone,
  ArrowUpRight,
  ShoppingCart,
  Award
} from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  link: string;
  delay: string;
  colClass?: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  globe: Globe,
  rocket: Rocket,
  utensils: Utensils,
  activity: Activity,
  user: User,
  'refresh-cw': RefreshCw,
  smartphone: Smartphone,
  'shopping-cart': ShoppingCart,
  award: Award,
};

const colorClasses: Record<string, string> = {
  purple: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
  blue: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
  pink: 'bg-pink-500/10 border-pink-500/20 text-pink-400',
  emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
  amber: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
  cyan: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
  red: 'bg-red-500/10 border-red-500/20 text-red-400',
};

const hoverTextClasses: Record<string, string> = {
  purple: 'text-purple-400 hover:text-white',
  blue: 'text-blue-400 hover:text-white',
  pink: 'text-pink-400 hover:text-white',
  emerald: 'text-emerald-400 hover:text-white',
  amber: 'text-amber-400 hover:text-white',
  cyan: 'text-cyan-400 hover:text-white',
  red: 'text-red-400 hover:text-white',
};

export const ServicesSection = () => {
  const services: ServiceItem[] = [
    {
      id: 1,
      title: 'Business Website Development',
      description: 'Responsive website development to help businesses showcase their products, services, and build client trust with fast page performance.',
      icon: 'globe',
      color: 'purple',
      link: '#contact',
      delay: '0s',
    },
    {
      id: 2,
      title: 'Landing Page Development',
      description: 'Optimized single-page websites designed to present your offer clearly and encourage visitor actions.',
      icon: 'rocket',
      color: 'blue',
      link: '#contact',
      delay: '0.1s',
    },
    {
      id: 3,
      title: 'Restaurant Website Development',
      description: 'Visual food showcases featuring online digital menu catalogs, table booking simulation widgets, opening hours, and location maps.',
      icon: 'utensils',
      color: 'pink',
      link: '#contact',
      delay: '0.2s',
    },
    {
      id: 4,
      title: 'Gym & Fitness Web Solutions',
      description: 'Dynamic wellness platforms featuring BMI calculators, workout schedule listings, trainer spotlights, and glassmorphic layouts.',
      icon: 'activity',
      color: 'emerald',
      link: '#contact',
      delay: '0.3s',
    },
    {
      id: 5,
      title: 'Portfolio Website Development',
      description: 'Sleek, modern personal portfolios using responsive dark layouts, subtle animations, and clean code to showcase your work.',
      icon: 'user',
      color: 'amber',
      link: '#contact',
      delay: '0.4s',
    },
    {
      id: 6,
      title: 'Website Redesign',
      description: 'Re-coding older websites into responsive, fast-loading, and modern interfaces.',
      icon: 'refresh-cw',
      color: 'cyan',
      link: '#contact',
      delay: '0.5s',
    },
    {
      id: 7,
      title: 'Responsive Web Development',
      description: 'Developing with a mobile-first approach to guarantee a clean user experience on screens ranging from small smartphones to desktops.',
      icon: 'smartphone',
      color: 'red',
      link: '#contact',
      delay: '0.6s',
    },
    {
      id: 8,
      title: 'E-Commerce Website Development',
      description: 'Modern online store interfaces featuring product catalogs, shopping cart experiences, responsive layouts, and user-friendly customer journeys.',
      icon: 'shopping-cart',
      color: 'emerald',
      link: '#contact',
      delay: '0.7s',
    },
    {
      id: 9,
      title: 'Personal Brand Website Development',
      description: 'Professional personal websites for creators, freelancers, students, and professionals to showcase skills, services, and achievements online.',
      icon: 'award',
      color: 'purple',
      link: '#contact',
      delay: '0.8s',
    },
  ];

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-16" variant="fade">
          <span className="text-xs font-bold text-purple-400 uppercase tracking-widest px-3 py-1 rounded-full bg-purple-500/10">What I Do</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white mt-4 mb-4">
            Freelance Frontend Services
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Responsive web development services tailored to help you establish a clean, fast, and modern online presence.
          </p>
        </ScrollReveal>

        {/* Services Grid (7 items) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => {
            const IconComponent = iconMap[service.icon];
            const colorClass = colorClasses[service.color] || '';
            const hoverTextClass = hoverTextClasses[service.color] || '';

            return (
              <ScrollReveal 
                key={service.id}
                className={`glass-card p-8 rounded-2xl flex flex-col justify-between hover:scale-[1.02] interactive-card ${service.colClass || ''}`}
                variant="fade"
                style={{ animationDelay: service.delay }}
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-6 ${colorClass}`}>
                    {IconComponent && <IconComponent className="w-6 h-6" />}
                  </div>
                  <h3 className="text-xl font-bold font-heading text-white mb-3">{service.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>
                <a 
                  href={service.link} 
                  aria-label={`Let's discuss your ${service.title} project`}
                  className={`inline-flex items-center gap-2 text-xs font-semibold transition-colors duration-200 ${hoverTextClass}`}
                >
                  Let&apos;s Discuss Your Project <ArrowUpRight aria-hidden="true" className="w-3.5 h-3.5" />
                </a>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
