"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Hammer, Droplets, ShieldCheck } from 'lucide-react';

const features = [
  {
    id: 0,
    title: "Self-Healing Tech",
    subtitle: "Heat Activated Repair",
    description: "Watch as swirl marks and light scratches vanish instantly when exposed to heat from the sun or engine. Your paint remains perpetually flawless.",
    video: "/test.mp4",
    icon: <Sun className="w-6 h-6" />
  },
  {
    id: 1,
    title: "Impact Resistance",
    subtitle: "8 mil Urethane Armor",
    description: "Built for real roads. 8 mil PPF helps protect your paint by absorbing impacts from rock chips, gravel, and road debris at highway speeds (11.5 mil also available).",
    video: "/test2.mp4",
    icon: <Hammer className="w-6 h-6" />
  },
  {
    id: 2,
    title: "Hydrophobic Finish",
    subtitle: "Water & Dirt Repellent",
    description: "Advanced nanotechnology creates a surface so slick that water, mud, and grime simply slide off, making washing your car effortless.",
    video: "/test3.mp4", // Simula agua/lavado
    icon: <Droplets className="w-6 h-6" />
  },
  {
    id: 3,
    title: "Invisible Shield",
    subtitle: "Optical Clarity",
    description: "Protection that doesn't compromise beauty. Our film is virtually invisible, enhancing the depth of your factory paint without altering the color.",
    video: "/test4.mp4",
    icon: <ShieldCheck className="w-6 h-6" />
  }
];

const TechShowcase: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <div className="bg-venom-dark border border-white/10 rounded-xl overflow-hidden shadow-2xl">
      <div className="flex flex-col lg:flex-row h-auto lg:h-150">
        
        {/* Video Area (Left/Top) */}
        <div className="relative lg:w-2/3 h-100 lg:h-full bg-black overflow-hidden group">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 w-full h-full"
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-80"
                src={features[activeFeature].video}
              />
              {/* Overlay Gradients */}
              <div className="absolute inset-0 bg-lienar-to-t from-venom-dark via-transparent to-transparent"></div>
              <div className="absolute inset-0 bg-linear-to-r from-venom-dark/50 via-transparent to-transparent"></div>
            </motion.div>
          </AnimatePresence>
          
          {/* Active Title Overlay on Video */}
          <div className="absolute bottom-8 left-8 z-20">
             <motion.div
               key={activeFeature}
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.2 }}
             >
               <div className="flex items-center gap-2 mb-2">
                 <span className="bg-venom-green text-black text-xs font-bold px-2 py-1 uppercase tracking-widest rounded-sm">
                   Demonstration 0{activeFeature + 1}
                 </span>
               </div>
               <h3 className="text-3xl font-display font-bold text-white uppercase leading-none">
                 {features[activeFeature].title}
               </h3>
             </motion.div>
          </div>
        </div>

        {/* Controls / Info Area (Right/Bottom) */}
        <div className="lg:w-1/3 bg-venom-gray border-l border-white/5 flex flex-col">
          <div className="p-8 border-b border-white/5">
             <h4 className="text-venom-green font-bold uppercase tracking-widest text-xs mb-2">Select Technology</h4>
             <p className="text-gray-400 text-sm">Click below to see the protection features in action.</p>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {features.map((feature, index) => (
              <button
                key={feature.id}
                onClick={() => setActiveFeature(index)}
                className={`w-full text-left p-6 border-b border-white/5 transition-all duration-300 relative group ${
                  activeFeature === index 
                    ? 'bg-white/5' 
                    : 'hover:bg-white/5'
                }`}
              >
                {/* Active Indicator Bar */}
                {activeFeature === index && (
                  <motion.div 
                    layoutId="active-bar"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-venom-green"
                  />
                )}

                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg transition-colors ${
                    activeFeature === index 
                      ? 'bg-venom-green text-black' 
                      : 'bg-black text-gray-500 group-hover:text-white'
                  }`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className={`font-bold font-display uppercase text-sm mb-1 transition-colors ${
                      activeFeature === index ? 'text-white' : 'text-gray-400 group-hover:text-white'
                    }`}>
                      {feature.title}
                    </h4>
                    <span className="text-xs text-venom-green font-bold tracking-wider block mb-2">
                      {feature.subtitle}
                    </span>
                    <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                       activeFeature === index ? 'text-gray-300 h-auto opacity-100' : 'text-gray-500 h-0 opacity-0 overflow-hidden'
                    }`}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
          
          <div className="p-6 bg-black/20 mt-auto">
             <a href="/services/ppf" className="flex items-center justify-center gap-2 w-full py-3 border border-venom-green/30 text-venom-green text-sm font-bold uppercase tracking-widest hover:bg-venom-green hover:text-black transition-all">
                Get PPF Quote
             </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechShowcase;