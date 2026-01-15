"use client";
import React from 'react';
import { Quote, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: "Marcus T.",
    car: "Lamborghini Urus",
    image: "https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=800&auto=format&fit=crop",
    text: "The matte black wrap they did on my Urus is flawless. I've had wraps done at other shops in LA, but the corners and edges here are on another level. Worth every penny.",
  },
  {
    name: "Sarah Jenkins",
    car: "Tesla Model S Plaid",
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=800&auto=format&fit=crop",
    text: "Got the full PPF package + ceramic coating. My car looks wetter than when I picked it up from the dealership. The team was super professional and kept me updated daily.",
  },
  {
    name: "David Chen",
    car: "Porsche 911 GT3",
    image: "https://images.unsplash.com/photo-1634673970798-a15ae56f6c65?q=80&w=1828&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text: "I was nervous about letting anyone touch my GT3, but PAL earned my trust. They invited me to see their clean room process. The result is absolute perfection.",
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-black border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
             <h2 className="font-display text-4xl font-bold text-white mb-2">CLIENT <span className="text-venom-green">STORIES</span></h2>
             <p className="text-gray-400">See the results for yourself.</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-venom-gray rounded-full border border-white/10">
             <CheckCircle2 className="w-5 h-5 text-venom-green" />
             <span className="text-white font-bold">120+ Verified Reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group bg-venom-gray rounded-xl border border-white/5 overflow-hidden hover:border-venom-green/30 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Car Image Section */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-venom-gray via-transparent to-transparent z-10"></div>
                <img 
                  src={t.image} 
                  alt={t.car} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md p-2 rounded-full border border-white/10 text-venom-green">
                  <Quote size={16} />
                </div>
              </div>
              
              <div className="p-8 pt-4 relative">
                <p className="text-gray-300 mb-8 leading-relaxed font-light text-sm">
                  "{t.text}"
                </p>

                <div className="flex items-center gap-4 border-t border-white/5 pt-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-venom-green to-green-900 flex items-center justify-center text-black font-bold font-display shadow-lg shadow-venom-green/20">
                      {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">{t.name}</h4>
                    <p className="text-venom-green text-xs uppercase tracking-wider font-bold">{t.car}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;