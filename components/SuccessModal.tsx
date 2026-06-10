'use client';

import React, { useEffect, useRef } from 'react';
import { CheckCircle2 } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize canvas
    canvas.width = canvas.parentElement?.offsetWidth || 400;
    canvas.height = canvas.parentElement?.offsetHeight || 400;

    const particles: Array<{
      x: number;
      y: number;
      r: number;
      d: number;
      color: string;
      tilt: number;
      tiltAngleIncremental: number;
      tiltAngle: number;
    }> = [];

    const colors = ['#8B5CF6', '#3B82F6', '#EC4899', '#10B981', '#F59E0B'];
    
    // Initialize particles
    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 4 + 2,
        d: Math.random() * canvas.height,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 10 - 5,
        tiltAngleIncremental: Math.random() * 0.07 + 0.02,
        tiltAngle: 0
      });
    }

    const drawConfetti = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, idx) => {
        p.tiltAngle += p.tiltAngleIncremental;
        p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
        p.x += Math.sin(p.tiltAngle);
        p.tilt = Math.sin(p.tiltAngle - idx / 3) * 15;
        
        ctx.beginPath();
        ctx.lineWidth = p.r * 2;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
        ctx.stroke();
        
        // Reset particle to top if it goes off bottom
        if (p.y > canvas.height) {
          particles[idx] = {
            x: Math.random() * canvas.width,
            y: -20,
            r: p.r,
            d: p.d,
            color: p.color,
            tilt: p.tilt,
            tiltAngleIncremental: p.tiltAngleIncremental,
            tiltAngle: p.tiltAngle
          };
        }
      });

      animationFrameRef.current = requestAnimationFrame(drawConfetti);
    };

    drawConfetti();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-darkBg/80 backdrop-blur-md flex items-center justify-center px-4"
      id="success-modal"
    >
      <div 
        className="modal-box w-full max-w-md bg-darkGray border border-gray-800 rounded-3xl p-8 text-center shadow-2xl scale-100 opacity-100 transition-all duration-300 relative overflow-hidden"
      >
        {/* Confetti Canvas */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
        ></canvas>
        
        <div className="relative z-10">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold font-heading text-white mb-2">Message Sent!</h3>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            Thank you for contacting me. Your message has been received successfully and a confirmation email has been sent to your inbox. I will get back to you within 12–24 hours.
          </p>
          <button 
            onClick={onClose}
            className="w-full py-3 rounded-xl text-sm font-semibold bg-white text-darkBg hover:bg-purple-500 hover:text-white transition-colors duration-200 focus:outline-none cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
