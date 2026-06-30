import React from 'react';
import dynamic from 'next/dynamic';
import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import HeroSection from '@/sections/HeroSection';

// Dynamically import below-the-fold components to reduce initial JavaScript payload
const AboutSection = dynamic(() => import('@/sections/AboutSection'));
const ServicesSection = dynamic(() => import('@/sections/ServicesSection'));
const SkillsSection = dynamic(() => import('@/sections/SkillsSection'));
const ProjectsSection = dynamic(() => import('@/sections/ProjectsSection'));
const WhyChooseMeSection = dynamic(() => import('@/sections/WhyChooseMeSection'));
const ProcessSection = dynamic(() => import('@/sections/ProcessSection'));
const CTASection = dynamic(() => import('@/sections/CTASection'));
const ContactSection = dynamic(() => import('@/sections/ContactSection'));
const Footer = dynamic(() => import('@/sections/Footer'));

export default function Home() {
  return (
    <>
      {/* 1. Window Preloader */}
      <Preloader />

      {/* 2. Header and Navigations */}
      <Navbar />

      {/* 2. Main content sections */}
      <main>
        {/* Above the fold (Critical for LCP) */}
        <HeroSection />

        {/* Below the fold (Lazy loaded) */}
        <AboutSection />
        <ServicesSection />
        <SkillsSection />
        <ProjectsSection />
        <WhyChooseMeSection />
        <ProcessSection />
        <CTASection />
        <ContactSection />
      </main>

      {/* 3. Footer */}
      <Footer />
    </>
  );
}
