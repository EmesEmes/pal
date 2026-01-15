"use client";
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Track mouse
    const mouse = { x: -1000, y: -1000 };

    // Particles configuration
    const particles: {x: number, y: number, vx: number, vy: number, size: number}[] = [];
    const particleCount = Math.min(Math.floor((width * height) / 12000), 100);

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3, // Subtle movement
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 1,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach((p) => {
        // Move particles
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Draw Particle - Using updated PAL Green #96ed11
        ctx.fillStyle = 'rgba(150, 237, 17, 0.4)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect to mouse
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const connectDistance = 150;

        if (distance < connectDistance) {
          // Calculate opacity based on distance
          const opacity = 0.6 * (1 - distance / connectDistance);
          ctx.strokeStyle = `rgba(150, 237, 17, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();

          // Gentle attraction to mouse
          p.x += dx * 0.01;
          p.y += dy * 0.01;
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    initParticles();
    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-venom-dark">
      {/* Background Layer Group */}
      <div className="absolute inset-0 z-0">
        {/* 1. Base Video */}
        {/* We use a video with motion (tunnel/driving) to give energy */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover opacity-60"
        >
            <source src="https://cdn.coverr.co/videos/coverr-driving-through-a-tunnel-4566/1080p.mp4" type="video/mp4" />
        </video>
        
        {/* 2. Gradient Overlay for Depth and Readability */}
        <div className="absolute inset-0 bg-linear-to-b from-venom-dark/90 via-venom-dark/40 to-venom-dark"></div>
        
        {/* 3. Interactive Canvas Overlay */}
        {/* mix-blend-screen helps the green particles pop over the dark video */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h2 className="text-venom-green font-bold tracking-[0.2em] mb-4 text-sm md:text-base shadow-black drop-shadow-md">
            PRESERVE AUTO LAB • LOS ANGELES, CA
          </h2>
          <h1 className="font-display font-black text-5xl md:text-8xl text-white mb-6 uppercase drop-shadow-2xl">
            Preserve <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-venom-green to-yellow-400 drop-shadow-sm">
              Your Ride
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-200 text-lg md:text-xl mb-10 font-light drop-shadow-md">
            Premium vinyl wraps, paint protection, and custom styling. 
            We turn stock cars into street legends.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <a
              href="#services"
              className="px-8 py-3 bg-venom-green text-black font-bold uppercase tracking-wider rounded-sm hover:bg-white hover:shadow-glow transition-all duration-300 -skew-x-12"
            >
              <span className="block skew-x-12">Our Services</span>
            </a>
            <a
              href="#why-us"
              className="px-8 py-3 border border-venom-green text-venom-green font-bold uppercase tracking-wider rounded-sm hover:bg-venom-green/10 transition-all duration-300 -skew-x-12 backdrop-blur-sm"
            >
               <span className="block skew-x-12">Why Choose Us</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/50"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};

export default Hero;