"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    vehicle: '',
    service: 'wrap',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setFormState({ name: '', email: '', phone: '', vehicle: '', service: 'wrap', message: '' });
      setTimeout(() => setIsSent(false), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-24 bg-venom-dark relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full bg-venom-radial-corner pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-venom-green/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl font-bold text-white mb-4"
          >
            START YOUR <span className="text-venom-green">PROJECT</span>
          </motion.h2>
          <div className="w-24 h-1 bg-venom-green mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Ready to transform your vehicle? Fill out the form below to visit our studio in Los Angeles.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* Contact Info Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/3 space-y-8"
          >
            <div className="bg-venom-gray p-8 rounded-2xl border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-venom-green/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              
              <h3 className="font-display text-2xl font-bold text-white mb-6">STUDIO INFO</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-venom-green shrink-0 border border-venom-green/20">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Location </h4>
                    <p className="text-gray-400 text-sm">Exclusive to appointments<br />Pico Rivera, CA, USA</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-venom-green shrink-0 border border-venom-green/20">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Phone</h4>
                    <p className="text-gray-400 text-sm">(562) 236-7779</p>
                    <p className="text-gray-500 text-xs mt-1">Mon-Fri 9am-5pm</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-venom-green shrink-0 border border-venom-green/20">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Email</h4>
                    <p className="text-gray-400 text-sm">preserveautolab@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="flex items-center justify-between text-sm">
                   <span className="text-gray-400">Response Time:</span>
                   <span className="text-venom-green font-bold">Within 24 Hours</span>
                </div>
              </div>
            </div>            
          </motion.div>

          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-2/3"
          >
            <form onSubmit={handleSubmit} className="bg-venom-gray/50 backdrop-blur-sm p-8 md:p-10 rounded-2xl border border-white/5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-xs font-bold text-venom-green uppercase tracking-widest mb-2">Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/50 border border-white/10 rounded-lg p-4 text-white focus:border-venom-green focus:ring-1 focus:ring-venom-green outline-none transition-all placeholder-gray-600"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-venom-green uppercase tracking-widest mb-2">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/50 border border-white/10 rounded-lg p-4 text-white focus:border-venom-green focus:ring-1 focus:ring-venom-green outline-none transition-all placeholder-gray-600"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-xs font-bold text-venom-green uppercase tracking-widest mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-white/10 rounded-lg p-4 text-white focus:border-venom-green focus:ring-1 focus:ring-venom-green outline-none transition-all placeholder-gray-600"
                    placeholder="(555) 000-0000"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-venom-green uppercase tracking-widest mb-2">Vehicle Info</label>
                  <input 
                    type="text" 
                    name="vehicle"
                    value={formState.vehicle}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/50 border border-white/10 rounded-lg p-4 text-white focus:border-venom-green focus:ring-1 focus:ring-venom-green outline-none transition-all placeholder-gray-600"
                    placeholder="2024 Porsche 911 GT3"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-bold text-venom-green uppercase tracking-widest mb-2">Service Interest</label>
                <select 
                  name="service"
                  value={formState.service}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-white/10 rounded-lg p-4 text-white focus:border-venom-green focus:ring-1 focus:ring-venom-green outline-none transition-all"
                >
                  <option value="wrap">Color Change Wrap</option>
                  <option value="ppf">Paint Protection Film (PPF)</option>
                  <option value="ceramic">Ceramic Coating</option>
                  <option value="chrome">Chrome Delete</option>
                  <option value="tint">Window Tint</option>
                  <option value="other">Other / Custom Project</option>
                </select>
              </div>

              <div className="mb-8">
                <label className="block text-xs font-bold text-venom-green uppercase tracking-widest mb-2">Project Details</label>
                <textarea 
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-black/50 border border-white/10 rounded-lg p-4 text-white focus:border-venom-green focus:ring-1 focus:ring-venom-green outline-none transition-all placeholder-gray-600 resize-none"
                  placeholder="Tell us about your vision..."
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting || isSent}
                className={`w-full py-4 rounded-lg font-bold uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-2 ${
                  isSent 
                    ? 'bg-white text-black' 
                    : 'bg-venom-green text-black hover:bg-white hover:shadow-[0_0_20px_rgba(150,237,17,0.4)]'
                }`}
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Processing...</span>
                ) : isSent ? (
                  <span>Message Sent Successfully!</span>
                ) : (
                  <>
                    Send Inquiry <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;