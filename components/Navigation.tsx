"use client";
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '/#services' },
    { name: 'Why Us', href: '/#why-us' },
    { name: 'Gallery', href: '/#gallery' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-venom-dark/90 backdrop-blur-md border-b border-venom-green/20 py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          {/* Logo Image with Text Fallback */}
          <div className="relative flex items-center">
             <Image 
               src="/logo.png" 
               alt="PAL Logo"
               width={12}
               height={12} 
               className="h-12 w-auto object-contain group-hover:drop-shadow-glow transition-all"
               onError={(e) => {
                 e.currentTarget.style.display = 'none';
                 const fallback = document.getElementById('logo-fallback');
                 if (fallback) fallback.style.display = 'flex';
               }}
             />
             <div id="logo-fallback" className="flex items-center gap-2">
                
                <div className="flex flex-col leading-none">
                  <span className="font-display font-bold text-2xl tracking-wider text-white">
                    PAL
                  </span>
                  <span className="text-[10px] text-venom-green tracking-[0.2em] font-sans font-bold">
                    PRESERVE AUTO LAB
                  </span>
                </div>
             </div>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium uppercase tracking-widest text-gray-300 hover:text-venom-green hover:drop-shadow-glow transition-all"
            >
              {link.name}
            </a>
          ))}
          <Link
            href="/#contact"
            className="bg-venom-green text-black font-bold px-6 py-2 rounded-none -skew-x-12 hover:bg-white transition-colors"
          >
            <span className="block skew-x-12">BOOK NOW</span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white hover:text-venom-green"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-venom-gray border-b border-venom-green/30"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-display text-gray-300 hover:text-venom-green"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;