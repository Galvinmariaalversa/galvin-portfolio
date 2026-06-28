'use client';

import React, { useEffect, useRef } from 'react';
import { ArrowRight, Mail, Phone } from 'lucide-react';

interface MobileNavItems {
  label: string;
  href: string;
  sub: string;
  num: string;
  id: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  navItems: { label: string; href: string; id: string }[];
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  activeSection,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const mobileNavItems: MobileNavItems[] = [
    { label: 'Home', href: '#hero', sub: 'Back to Top', num: '01', id: 'hero' },
    { label: 'About', href: '#about', sub: 'About & Goals', num: '02', id: 'about' },
    { label: 'Services', href: '#services', sub: 'What I Build', num: '03', id: 'services' },
    { label: 'Skills', href: '#skills', sub: 'Tech Stack & Tools', num: '04', id: 'skills' },
    { label: 'Projects', href: '#projects', sub: 'Featured Work', num: '05', id: 'projects' },
    { label: 'Contact', href: '#contact', sub: 'Get In Touch', num: '06', id: 'contact' },
  ];

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === containerRef.current || e.target === document.getElementById('mobile-scroll-container')) {
      onClose();
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={handleBackdropClick}
      className={`fixed inset-0 z-40 bg-[#0B0B0F]/90 backdrop-blur-3xl flex-col justify-between px-6 py-12 md:hidden ${
        isOpen ? 'flex menu-visible' : 'hidden'
      }`}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
    >
      {/* 1. Grid Overlay (Linear / Vercel style) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0"></div>
      
      {/* 2. Mesh Gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-40">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-purple-600/20 filter blur-[100px] animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-blue-600/10 filter blur-[90px] animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }}></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-indigo-600/20 filter blur-[100px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '4s' }}></div>
      </div>

      {/* Scroll container */}
      <div 
        id="mobile-scroll-container" 
        className="relative z-10 flex flex-col justify-between h-full w-full overflow-y-auto mt-20 px-2 pb-8 no-scrollbar"
      >
        {/* Navigation Links */}
        <nav className="flex flex-col gap-3 py-4 w-full">
          {mobileNavItems.map((item, idx) => {
            const isActive = activeSection === item.id;
            const delay = `${(idx + 1) * 50}ms`;

            return (
              <a
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`mobile-nav-link menu-item relative p-4 rounded-2xl border border-white/[0.02] bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/[0.06] flex items-center justify-between group ${
                  isActive ? 'active' : ''
                }`}
                style={{ transitionDelay: delay }}
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono font-bold text-purple-500/80 group-[.active]:text-purple-400 group-hover:text-purple-400 transition-colors">
                    {item.num}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-xl font-heading font-bold text-gray-300 group-[.active]:text-white group-hover:text-white transition-colors">
                      {item.label}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium tracking-wide mt-0.5 uppercase">
                      {item.sub}
                    </span>
                  </div>
                </div>
                <div className="flex-arrow w-8 h-8 rounded-full bg-white/[0.02] border border-white/[0.04] flex items-center justify-center text-gray-600 group-[.active]:text-purple-400 group-[.active]:border-purple-500/20 group-[.active]:bg-purple-500/10 group-hover:text-purple-400 group-hover:border-purple-500/20 group-hover:bg-purple-500/10 transition-all duration-300">
                  <ArrowRight className="w-4 h-4 transform -rotate-45 transition-transform duration-300" />
                </div>
              </a>
            );
          })}
        </nav>

        {/* Bottom Contact Area */}
        <div className="menu-item border-t border-gray-800/40 pt-6 mt-6 flex flex-col gap-6 w-full" style={{ transitionDelay: '350ms' }}>
          {/* Availability Badge */}
          <div className="self-start inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Available for Freelance Projects
          </div>

          {/* Contact Channels */}
          <div className="grid grid-cols-2 gap-4">
            <a 
              href="mailto:galvin.ma.j@gmail.com" 
              className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.03] hover:border-purple-500/20 hover:bg-purple-500/5 transition-all duration-300 flex flex-col gap-1.5 group"
            >
              <Mail className="w-4 h-4 text-purple-400" />
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Email Me</span>
              <span className="text-xs text-gray-300 font-semibold break-all">galvin.ma.j@gmail.com</span>
            </a>
            <a 
              href="tel:+919344200893" 
              className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.03] hover:border-blue-500/20 hover:bg-blue-500/5 transition-all duration-300 flex flex-col gap-1.5 group"
            >
              <Phone className="w-4 h-4 text-blue-400" />
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Call Me</span>
              <span className="text-xs text-gray-300 font-semibold">+91 93442 00893</span>
            </a>
          </div>

          {/* Social Media Icons Row */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.01] border border-white/[0.02]">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Follow Me</span>
            <div className="flex items-center gap-3">
              <a href="https://github.com/Galvinmariaalversa" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="w-8 h-8 rounded-lg bg-white/[0.02] border border-white/[0.04] flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-500/10 hover:border-purple-500/20 transition-all duration-300">
                <svg aria-hidden="true" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/galvin-frontend" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="w-8 h-8 rounded-lg bg-white/[0.02] border border-white/[0.04] flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-500/10 hover:border-purple-500/20 transition-all duration-300">
                <svg aria-hidden="true" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="https://wa.me/919344200893" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Contact" className="w-8 h-8 rounded-lg bg-white/[0.02] border border-white/[0.04] flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-500/10 hover:border-purple-500/20 transition-all duration-300">
                <svg aria-hidden="true" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.709 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413"/></svg>
              </a>
              <a href="#" aria-label="Instagram Profile" className="w-8 h-8 rounded-lg bg-white/[0.02] border border-white/[0.04] flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-500/10 hover:border-purple-500/20 transition-all duration-300">
                <svg aria-hidden="true" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
