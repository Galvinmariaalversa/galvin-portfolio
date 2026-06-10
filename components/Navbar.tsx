'use client';

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useActiveSection } from '@/hooks/useActiveSection';
import MobileMenu from './MobileMenu';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isScrolled } = useScrollPosition(20);
  
  const sectionIds = ['hero', 'about', 'services', 'skills', 'projects', 'contact'];
  const activeSection = useActiveSection(sectionIds);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navItems = [
    { label: 'Home', href: '#hero', id: 'hero' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled ? 'glass-nav py-4' : 'py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <a href="#hero" className="text-xl font-bold tracking-tight text-white flex items-center gap-2" id="nav-logo">
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text font-heading text-2xl font-extrabold">
              &lt;Galvin J /&gt;
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`nav-link text-sm transition-colors duration-200 ${
                    isActive 
                      ? 'active text-purple-400 font-medium' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Action Button */}
          <div className="hidden md:block">
            <a 
              href="#contact" 
              className="px-5 py-2.5 rounded-full text-xs font-semibold bg-white text-darkBg hover:bg-purple-500 hover:text-white transition-all duration-300 shadow-lg shadow-white/5 hover:shadow-purple-500/25 inline-flex items-center gap-2"
            >
              Contact Me <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button with Morphing Animation */}
          <button 
            className={`md:hidden z-50 relative w-6 h-5 flex flex-col justify-between items-center focus:outline-none ${
              isMenuOpen ? 'menu-open' : ''
            }`}
            id="menu-toggle"
            aria-label="Toggle Navigation Menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={toggleMenu}
          >
            <span className="w-full h-[2px] bg-gray-300 rounded-full transition-all duration-300 origin-center"></span>
            <span className="w-full h-[2px] bg-gray-300 rounded-full transition-all duration-200"></span>
            <span className="w-full h-[2px] bg-gray-300 rounded-full transition-all duration-300 origin-center"></span>
          </button>
        </div>

        {/* Full-screen Mobile Menu Component */}
        <MobileMenu 
          isOpen={isMenuOpen} 
          onClose={closeMenu} 
          activeSection={activeSection}
          navItems={navItems}
        />
      </header>
    </>
  );
};

export default Navbar;
