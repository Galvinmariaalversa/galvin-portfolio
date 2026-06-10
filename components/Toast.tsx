import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onClose, duration = 5000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const isSuccess = type === 'success';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-toast max-w-sm w-full px-4 sm:px-0">
      <div className="glass-card flex items-start gap-4 p-4 rounded-2xl border border-gray-800 shadow-2xl backdrop-blur-md">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
          isSuccess ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
        }`}>
          {isSuccess ? <CheckCircle2 className="w-5.5 h-5.5" /> : <AlertTriangle className="w-5.5 h-5.5" />}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white">
            {isSuccess ? 'Submission Successful' : 'Submission Failed'}
          </p>
          <p className="text-xs text-gray-400 mt-1 leading-relaxed">
            {message}
          </p>
        </div>
        <button 
          onClick={onClose} 
          className="text-gray-500 hover:text-white transition-colors cursor-pointer p-0.5"
          aria-label="Close Notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
