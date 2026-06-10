'use client';

import React from 'react';
import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import HeroSection from '@/sections/HeroSection';
import AboutSection from '@/sections/AboutSection';
import ServicesSection from '@/sections/ServicesSection';
import SkillsSection from '@/sections/SkillsSection';
import ProjectsSection from '@/sections/ProjectsSection';
import WhyChooseMeSection from '@/sections/WhyChooseMeSection';
import ProcessSection from '@/sections/ProcessSection';
import CTASection from '@/sections/CTASection';
import ContactSection from '@/sections/ContactSection';
import Footer from '@/sections/Footer';

export default function Home() {
  return (
    <>
      {/* 1. Window Preloader */}
      <Preloader />

      {/* 2. Header and Navigations */}
      <Navbar />

      {/* 3. Main content sections */}
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <SkillsSection />
        <ProjectsSection />
        <WhyChooseMeSection />
        <ProcessSection />
        <CTASection />
        <ContactSection />
      </main>

      {/* 4. Footer */}
      <Footer />
    </>
  );
}
