'use client';

import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Send } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import SuccessModal from '@/components/SuccessModal';
import Toast from '@/components/Toast';

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    website: '', // Honeypot field
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
    message: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof window !== 'undefined' && (window as any).turnstile) {
        clearInterval(interval);
        try {
          const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
          const isLocal = hostname === 'localhost' ||
            hostname === '127.0.0.1' ||
            hostname === '[::1]' ||
            /^192\.168\./.test(hostname) ||
            /^10\./.test(hostname) ||
            /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(hostname) ||
            /\.local$/.test(hostname);

          const sitekey = isLocal
            ? '1x00000000000000000000AA'  // Local testing key
            : (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '0x4AAAAAADiIZRYvpnNLtIG5'); // Production live key

          console.log('[Turnstile Debug] Initializing widget with Site Key:', sitekey);

          (window as any).turnstile.render('#turnstile-container', {
            sitekey,
            callback: (token: string) => {
              console.log('[Turnstile Debug] Token generated successfully:', token);
              setTurnstileToken(token);
            },
            'expired-callback': () => {
              setTurnstileToken(null);
            },
            'error-callback': () => {
              setTurnstileToken(null);
            }
          });
        } catch (e) {
          console.error('Turnstile render error:', e);
        }
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const validateForm = () => {
    const nameTrim = formData.name.trim();
    const emailTrim = formData.email.trim();
    const phoneTrim = formData.phone.trim();
    const msgTrim = formData.message.trim();

    const newErrors = {
      name: !nameTrim || nameTrim.length < 2,
      email: !emailTrim || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrim),
      phone: !phoneTrim || phoneTrim.length < 5 || phoneTrim.length > 30,
      message: !msgTrim || msgTrim.length < 10,
    };

    setErrors(newErrors);
    return !newErrors.name && !newErrors.email && !newErrors.phone && !newErrors.message;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validateForm()) {
      setToast({
        message: 'Please fix the form errors before submitting.',
        type: 'error',
      });
      return;
    }

    if (!turnstileToken) {
      setToast({
        message: 'Please complete the bot protection check.',
        type: 'error',
      });
      return;
    }

    setIsSubmitting(true);

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      website: formData.website,
      turnstileToken,
    };

    console.log('[Form Debug] Submitting form with payload:', payload);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          website: '',
        });
        setIsModalOpen(true);
        setToast({
          message: result.message || 'Your message has been sent successfully!',
          type: 'success',
        });
      } else {
        setToast({
          message: result.message || 'Something went wrong while sending your message. Please try again later.',
          type: 'error',
        });
      }
    } catch (err) {
      setToast({
        message: 'Something went wrong while sending your message. Please try again later.',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
      // Reset turnstile widget for next submission
      if (typeof window !== 'undefined' && (window as any).turnstile) {
        try {
          (window as any).turnstile.reset('#turnstile-container');
        } catch (e) {}
        setTurnstileToken(null);
      }
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-16" variant="fade">
          <span className="text-xs font-bold text-purple-400 uppercase tracking-widest px-3 py-1 rounded-full bg-purple-500/10">Get In Touch</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white mt-4 mb-4">
            Contact Me
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Have a freelance project or an internship opportunity? Send a message and let&apos;s discuss how I can help.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Details Left */}
          <ScrollReveal className="lg:col-span-5 flex flex-col gap-6" variant="left">
            <div className="glass-card p-8 rounded-2xl border border-gray-800 flex flex-col gap-6">
              
              <h3 className="text-xl font-bold font-heading text-white mb-2">Freelancer Profile</h3>
              
              {/* Item 1: Name */}
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Full Name</span>
                  <span className="text-sm font-semibold text-gray-200">Galvin J</span>
                </div>
              </div>

              {/* Item 2: Email */}
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Email Address</span>
                  <a href="mailto:galvin.ma.j@gmail.com" className="text-sm font-semibold text-gray-200 hover:text-purple-400 transition-colors">galvin.ma.j@gmail.com</a>
                </div>
              </div>

              {/* Item 3: Phone */}
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Phone Number</span>
                  <a href="tel:+919344200893" className="text-sm font-semibold text-gray-200 hover:text-purple-400 transition-colors">+91 93442 00893</a>
                </div>
              </div>

              {/* Item 4: Location */}
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Base Location</span>
                  <span className="text-sm font-semibold text-gray-200">Chennai, Tamil Nadu</span>
                </div>
              </div>

            </div>

            {/* Social Links Card */}
            <div className="glass-card p-6 rounded-2xl border border-gray-800 flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-400">Social Connections</span>
              <div className="flex items-center gap-3">
                <a href="https://github.com/Galvinmariaalversa" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="w-9 h-9 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-500/20 transition-all duration-300">
                  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/></svg>
                </a>
                <a href="https://www.linkedin.com/in/galvin-frontend" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="w-9 h-9 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-500/20 transition-all duration-300">
                  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
                <a href="https://wa.me/919344200893" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Contact" className="w-9 h-9 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-500/20 transition-all duration-300">
                  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.709 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413"/></svg>
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Contact Form Right */}
          <ScrollReveal className="lg:col-span-7" variant="right">
            <form onSubmit={handleSubmit} className="glass-card p-8 rounded-2xl border border-gray-800 flex flex-col gap-6" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name Input */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className={`px-4 py-3 rounded-xl bg-darkBg border text-sm text-white focus:outline-none focus:border-purple-500 transition-colors ${
                      errors.name ? 'border-red-500' : 'border-gray-800'
                    }`}
                  />
                </div>
                {/* Email Input */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Your Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className={`px-4 py-3 rounded-xl bg-darkBg border text-sm text-white focus:outline-none focus:border-purple-500 transition-colors ${
                      errors.email ? 'border-red-500' : 'border-gray-800'
                    }`}
                  />
                </div>
              </div>

              {/* Phone Input */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="phone" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 98765 43210"
                  className={`px-4 py-3 rounded-xl bg-darkBg border text-sm text-white focus:outline-none focus:border-purple-500 transition-colors ${
                    errors.phone ? 'border-red-500' : 'border-gray-800'
                  }`}
                />
              </div>

              {/* Message Input */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell me about your project scope, timeline, and goals..."
                  className={`px-4 py-3 rounded-xl bg-darkBg border text-sm text-white focus:outline-none focus:border-purple-500 transition-colors resize-none ${
                    errors.message ? 'border-red-500' : 'border-gray-800'
                  }`}
                ></textarea>
              </div>

              {/* Honeypot field (hidden from users) */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Cloudflare Turnstile Widget */}
              <div className="flex justify-center my-2">
                <div id="turnstile-container"></div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl text-sm font-semibold bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/10 hover:shadow-purple-500/30 hover:opacity-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Contact Me <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </ScrollReveal>

        </div>
      </div>

      {/* Success Modal Overlay */}
      <SuccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </section>
  );
};

export default ContactSection;
