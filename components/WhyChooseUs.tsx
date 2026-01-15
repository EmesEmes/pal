"use client";
import React from 'react';
import { Award, ShieldCheck, PenTool, Thermometer, Clock, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const reasons = [
  {
    icon: <Users className="w-8 h-8" />,
    title: "Certified Installers",
    description: "Our team holds advanced certifications from 3M, Avery Dennison, and Xpel. Your vehicle is in expert hands."
  },
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "Premium Materials Only",
    description: "We never cut corners. We strictly use genuine, high-grade films that ensure longevity and flawless finish."
  },
  {
    icon: <Thermometer className="w-8 h-8" />,
    title: "Climate Controlled Studio",
    description: "Our dust-free, temperature-regulated facility ensures perfect adhesion and zero contamination during installation."
  },
  {
    icon: <PenTool className="w-8 h-8" />,
    title: "In-House Design Team",
    description: "From subtle accents to full racing liveries, our graphic designers bring your unique vision to life before printing."
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: "Comprehensive Warranty",
    description: "We stand behind our work. All wraps and PPF come with a manufacturer warranty plus our craftsmanship guarantee."
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Precision & Efficiency",
    description: "We respect your time. Our streamlined process gets you back on the road quickly without compromising quality."
  }
];

const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-us" className="py-24 bg-venom-dark relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-venom-green/5 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-venom-green/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl font-bold text-white mb-4"
          >
            THE PAL <span className="text-venom-green">STANDARD</span>
          </motion.h2>
          <div className="w-24 h-1 bg-venom-green mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            In Los Angeles, image is everything. Here is why luxury car owners trust Preserve Auto Lab with their investments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-venom-gray/50 border border-white/5 p-8 hover:bg-venom-gray hover:border-venom-green/30 transition-all duration-300 rounded-lg relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                 {React.cloneElement(reason.icon as React.ReactElement<any>, { className: "w-24 h-24 text-venom-green transform rotate-12" })}
              </div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-black border border-venom-green/30 rounded-lg flex items-center justify-center text-venom-green mb-6 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(150,237,17,0.15)]">
                  {reason.icon}
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-venom-green transition-colors">
                  {reason.title}
                </h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300">
                  {reason.description}
                </p>
              </div>
              
              <div className="absolute bottom-0 left-0 w-full h-1 bg-venom-green transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;