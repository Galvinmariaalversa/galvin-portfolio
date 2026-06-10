'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, Mail, Phone, Clock, Trash2, CheckCircle, 
  XCircle, LogOut, Globe, RefreshCw, MessageSquare, AlertCircle
} from 'lucide-react';
import Toast from '@/components/Toast';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  ip_address: string;
  status: 'pending' | 'contacted';
  created_at: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'contacted'>('all');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const fetchInquiries = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/inquiries');
      if (res.status === 401) {
        router.push('/admin');
        return;
      }

      const result = await res.json();
      if (res.ok && result.success) {
        setInquiries(result.data || []);
      } else {
        setToast({ message: result.message || 'Failed to load inquiries.', type: 'error' });
      }
    } catch (err) {
      setToast({ message: 'Network error. Failed to load inquiries.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleUpdateStatus = async (id: string, status: 'pending' | 'contacted') => {
    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });

      const result = await res.json();
      if (res.ok && result.success) {
        setToast({ message: 'Status updated successfully.', type: 'success' });
        setInquiries((prev) =>
          prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
        );
      } else {
        setToast({ message: result.message || 'Failed to update status.', type: 'error' });
      }
    } catch (err) {
      setToast({ message: 'Network error. Failed to update status.', type: 'error' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this inquiry? This action cannot be undone.')) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/inquiries?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });

      const result = await res.json();
      if (res.ok && result.success) {
        setToast({ message: 'Inquiry deleted successfully.', type: 'success' });
        setInquiries((prev) => prev.filter((inq) => inq.id !== id));
      } else {
        setToast({ message: result.message || 'Failed to delete inquiry.', type: 'error' });
      }
    } catch (err) {
      setToast({ message: 'Network error. Failed to delete inquiry.', type: 'error' });
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth');
      router.push('/admin');
    } catch (err) {
      router.push('/admin');
    }
  };

  const filteredInquiries = inquiries.filter((inq) => {
    if (filter === 'all') return true;
    return inq.status === filter;
  });

  return (
    <main className="min-h-screen bg-darkBg text-gray-100 py-12 relative overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Decorative Blur Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full filter blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full filter blur-[120px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12 border-b border-gray-800 pb-6">
          <div>
            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest px-3 py-1 rounded-full bg-purple-500/10">
              Control Panel
            </span>
            <h1 className="text-3xl font-bold font-heading text-white mt-3">
              Inquiry Dashboard
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Review and manage inquiry submissions from your portfolio website.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={fetchInquiries}
              className="p-3 rounded-xl border border-gray-800 bg-white/5 hover:bg-white/10 transition-colors text-gray-300 hover:text-white cursor-pointer"
              title="Refresh Inquiries"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-800 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors text-sm font-semibold cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </header>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {(['all', 'pending', 'contacted'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                filter === tab
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/10'
                  : 'bg-white/5 border border-gray-800 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab} ({inquiries.filter((i) => tab === 'all' || i.status === tab).length})
            </button>
          ))}
        </div>

        {/* Content Area */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 glass-card rounded-2xl border border-gray-800">
            <svg className="animate-spin h-10 w-10 text-purple-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-gray-400 text-sm">Loading submissions...</p>
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 glass-card rounded-2xl border border-gray-800 text-center px-4">
            <AlertCircle className="w-12 h-12 text-gray-600 mb-4" />
            <h3 className="text-lg font-semibold text-white">No inquiries found</h3>
            <p className="text-gray-400 text-sm mt-1 max-w-sm">
              {filter === 'all'
                ? "You haven't received any form submissions yet."
                : `There are no inquiries marked as ${filter}.`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredInquiries.map((inq) => (
              <div 
                key={inq.id} 
                className="glass-card p-6 rounded-2xl border border-gray-800 flex flex-col gap-5 hover:border-purple-500/20"
              >
                {/* Inquiry Card Header */}
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      {inq.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-xs text-gray-400">
                      <a href={`mailto:${inq.email}`} className="flex items-center gap-1.5 hover:text-purple-400 transition-colors">
                        <Mail className="w-3.5 h-3.5" />
                        {inq.email}
                      </a>
                      {inq.phone && (
                        <a href={`tel:${inq.phone}`} className="flex items-center gap-1.5 hover:text-purple-400 transition-colors">
                          <Phone className="w-3.5 h-3.5" />
                          {inq.phone}
                        </a>
                      )}
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0 ${
                    inq.status === 'contacted'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {inq.status}
                  </span>
                </div>

                {/* Subject & Message */}
                <div className="bg-darkBg/60 p-4 rounded-xl border border-white/5 flex flex-col gap-2">
                  <div className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" />
                    Subject: {inq.subject}
                  </div>
                  <p className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
                    {inq.message}
                  </p>
                </div>

                {/* Footer and Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-t border-gray-800/80 pt-4 text-xs text-gray-500">
                  <div className="flex flex-col gap-1">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(inq.created_at).toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5" />
                      IP: {inq.ip_address}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    {inq.status === 'pending' ? (
                      <button
                        onClick={() => handleUpdateStatus(inq.id, 'contacted')}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors cursor-pointer"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        Mark Contacted
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUpdateStatus(inq.id, 'pending')}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 hover:text-amber-300 font-semibold transition-colors cursor-pointer"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        Mark Pending
                      </button>
                    )}
                    
                    <button
                      onClick={() => handleDelete(inq.id)}
                      className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                      title="Delete Inquiry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

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
