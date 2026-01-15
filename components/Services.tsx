"use client";
import React from 'react';
import { Layers, Shield, Scissors, Droplets, Sun, Palette, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import TechShowcase from './TechShowcase';
import Link from 'next/link';

const services = [
  {
    id: 'ppf',
    title: 'Paint Protection Film',
    description: 'Invisible armor for your paint. Protects against rock chips, scratches, and road debris.',
    icon: <Shield className="w-8 h-8" />,
    priceStart: '$1,800'
  },
  {
    id: 'wrap',
    title: 'Color Change Wraps',
    description: 'Transform your vehicle with hundreds of colors in matte, satin, gloss, or chrome finishes.',
    icon: <Palette className="w-8 h-8" />,
    priceStart: '$2,500'
  },
  {
    id: 'chrome',
    title: 'Chrome Delete',
    description: 'Black out your window trim, grille, and emblems for a stealthy, modern aesthetic.',
    icon: <Scissors className="w-8 h-8" />,
    priceStart: '$450'
  },
  {
    id: 'ceramic',
    title: 'Ceramic Coating',
    description: 'Hydrophobic protection that makes washing easy and gives your car a deep, wet gloss.',
    icon: <Droplets className="w-8 h-8" />,
    priceStart: '$800'
  },
  {
    id: 'tint',
    title: 'Window Tinting',
    description: 'Ceramic tint for privacy, UV protection, and heat rejection. Keeps your interior cool.',
    icon: <Sun className="w-8 h-8" />,
    priceStart: '$250'
  },
  {
    id: 'livery',
    title: 'Custom Graphics / Livery',
    description: 'Racing stripes, business branding, or fully custom printed designs designed in-house.',
    icon: <Layers className="w-8 h-8" />,
    priceStart: 'Custom'
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-venom-dark relative">
      <div className="absolute top-0 left-0 w-full h-full bg-venom-radial pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl font-bold text-white mb-4"
          >
            OUR <span className="text-venom-green">EXPERTISE</span>
          </motion.h2>
          <div className="w-24 h-1 bg-venom-green mx-auto"></div>
        </div>

        {/* Video Showcase Section */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="mb-20"
        >
          <div className="flex flex-col md:flex-row justify-between items-end mb-6">
             <div>
               <h3 className="text-2xl font-bold text-white font-display">ADVANCED <span className="text-venom-green">PROTECTION</span></h3>
               <p className="text-gray-400 max-w-lg">
                 See the technology in action. Select a feature below to watch how our Paint Protection Film (PPF) defends your investment.
               </p>
             </div>
             <div className="hidden md:block text-right">
               <span className="text-xs bg-venom-green/20 text-venom-green px-3 py-1 rounded-full uppercase font-bold tracking-widest border border-venom-green/30 animate-pulse">
                 Live Tech Demo
               </span>
             </div>
          </div>
          
          <TechShowcase />
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-venom-gray p-8 border border-white/5 hover:border-venom-green/50 transition-all duration-300 group hover:-translate-y-2 rounded-sm flex flex-col h-full"
            >
              <div className="bg-venom-dark w-16 h-16 rounded-full flex items-center justify-center text-venom-green mb-6 group-hover:bg-venom-green group-hover:text-black transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-venom-green transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed grow">
                {service.description}
              </p>
              <div className="border-t border-white/10 pt-4 mt-auto">
                <Link 
                  href={`/services/${service.id}`}
                  className="w-full flex items-center justify-between bg-black/50 border border-venom-green/30 text-white px-4 py-3 text-xs font-bold uppercase tracking-widest hover:bg-venom-green hover:text-black hover:border-venom-green transition-all group/btn"
                >
                  <span>Details & Pricing</span>
                  <ArrowRight size={16} className="text-venom-green group-hover/btn:text-black transition-colors" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;