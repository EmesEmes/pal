"use client";
import React from 'react';
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail, Shield } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-venom-dark border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand */}
          <div>
            <div className="mb-6">
                <img 
                  src="/logo.png" 
                  alt="PAL - Preserve Auto Lab" 
                  className="h-16 w-auto mb-4 object-contain"
                />
                <div id="footer-logo-fallback" className="hidden">
                    <h3 className="font-display text-2xl font-bold text-white leading-none">
                    PAL
                    </h3>
                    <span className="text-venom-green text-xs font-bold tracking-[0.2em]">PRESERVE AUTO LAB</span>
                </div>
            </div>
            <p className="text-gray-400 mb-6">
              The premier automotive restyling studio in Los Angeles. 
              Certified installers, premium materials, and unmatched attention to detail.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/preserveautolab" className="w-10 h-10 rounded-full bg-venom-gray flex items-center justify-center text-white hover:bg-venom-green hover:text-black transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.facebook.com/preserveautolab" className="w-10 h-10 rounded-full bg-venom-gray flex items-center justify-center text-white hover:bg-venom-green hover:text-black transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-bold text-white mb-6">CONTACT US</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="text-venom-green shrink-0 mt-1" size={18} />
                <span>Location exclusive to appointments<br />Pico Rivera, CA, USA</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-venom-green shrink-0" size={18} />
                <span>(562) 236-7779</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-venom-green shrink-0" size={18} />
                <span>preserveautolab@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-display text-lg font-bold text-white mb-6">OPENING HOURS</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>Monday - Friday</span>
                <span className="text-white">9:00 AM - 5:00 PM</span>
              </li>
             
              <li className="flex justify-between pb-2">
                <span>Saturday - Sunday</span>
                <span className="text-venom-green">Closed</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-white/5 text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} Preserve Auto Lab (PAL). All rights reserved.</p>
          <p>Developed by: <span className='text-venom-green'>Emilio del Hierro</span></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;