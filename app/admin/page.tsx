'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ArrowRight } from 'lucide-react';
import Toast from '@/components/Toast';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setToast({ message: 'Password is required.', type: 'error' });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setToast({ message: 'Authentication successful. Redirecting...', type: 'success' });
        setTimeout(() => {
          router.push('/admin/dashboard');
        }, 1000);
      } else {
        setToast({ message: data.message || 'Incorrect password.', type: 'error' });
        setIsSubmitting(false);
      }
    } catch (err) {
      setToast({ message: 'Network error. Please try again.', type: 'error' });
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-darkBg text-gray-100 flex items-center justify-center relative overflow-hidden px-4">
      {/* Decorative Blur Blobs */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full filter blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full filter blur-[100px] pointer-events-none z-0"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-purple-400 uppercase tracking-widest px-3 py-1 rounded-full bg-purple-500/10">
            Secure Access
          </span>
          <h1 className="text-3xl font-bold font-heading text-white mt-4">
            Admin Portal
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            Enter your administrator credentials to manage inquiries.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card p-8 rounded-2xl border border-gray-800 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-darkBg border border-gray-800 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                disabled={isSubmitting}
              />
            </div>
          </div>

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
                Authenticating...
              </>
            ) : (
              <>
                Sign In <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </main>
  );
}
