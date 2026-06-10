'use client';

import React, { useEffect, useRef } from 'react';

export const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const activeCanvas = canvas;

    const ctx = activeCanvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    const mouse = { x: null as number | null, y: null as number | null, radius: 150 };
    let animationFrameId: number;

    const resizeCanvas = () => {
      if (!activeCanvas.parentElement) return;
      activeCanvas.width = activeCanvas.parentElement.offsetWidth;
      activeCanvas.height = activeCanvas.parentElement.offsetHeight;
      initParticles();
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;

      constructor() {
        this.x = Math.random() * activeCanvas.width;
        this.y = Math.random() * activeCanvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.size = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce on boundaries
        if (this.x < 0 || this.x > activeCanvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > activeCanvas.height) this.vy *= -1;

        // Mouse repeller interaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x += (dx / dist) * force * 2;
            this.y += (dy / dist) * force * 2;
          }
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(139, 92, 246, 0.4)';
        ctx.fill();
      }
    }

    let maxConnectDist = 100;

    const initParticles = () => {
      particles = [];
      const isMobile = window.innerWidth < 768;
      const particleDensity = isMobile ? 15 : 100;
      maxConnectDist = isMobile ? 60 : 100;
      for (let i = 0; i < particleDensity; i++) {
        particles.push(new Particle());
      }
    };

    const animateParticles = () => {
      ctx.clearRect(0, 0, activeCanvas.width, activeCanvas.height);
      
      // Update and draw particles
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxConnectDist) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.15 * (1 - dist / maxConnectDist)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animateParticles);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = activeCanvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const parent = activeCanvas.parentElement;
    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove);
      parent.addEventListener('mouseleave', handleMouseLeave);
    }

    window.addEventListener('resize', resizeCanvas);
    
    resizeCanvas();
    animateParticles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-auto opacity-70"
      id="hero-canvas"
    />
  );
};

export default ParticleCanvas;
