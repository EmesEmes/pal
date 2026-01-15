"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import ImageComparison from './ImageComparison';
import { GalleryImage } from '@/app/types';

// Extended type for internal use to support before/after
interface Project extends GalleryImage {
  beforeUrl?: string; // Optional: if provided, shows comparison. If not, defaults to same (filtered)
  title: string;
  description: string;
}

const projects: Project[] = [
  {
    id: '1',
    category: 'Full Wrap',
    url: "https://images.unsplash.com/photo-1652992252915-f9b6592a61a3?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Lamborghini Urus",
    title: "Lamborghini Urus",
    description: "Factory Gloss White transformed to Satin Black. Full disassembly for seamless edges.",
    // Simulating 'before' by using the same image (ImageComparison component will grayscale it)
    // In production, put the real 'Before' image URL here.
    beforeUrl: "https://images.unsplash.com/photo-1615394695852-da39a8df9bf1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: '2',
    category: 'PPF & Ceramic',
    url: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop",
    alt: "Tesla Model S",
    title: "Tesla Model S Plaid",
    description: "Full body Paint Protection Film (PPF) followed by a 2-stage paint correction and ceramic coating.",
    beforeUrl: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: '3',
    category: 'Color Change',
    url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200&auto=format&fit=crop",
    alt: "McLaren 720s",
    title: "McLaren 720s",
    description: "A bold move from silver to Inozetek Midnight Purple. Door jambs included.",
    beforeUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: '4',
    category: 'Livery Design',
    url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop",
    alt: "Porsche 911",
    title: "Porsche 911 GT3",
    description: "Custom racing livery designed in-house. Printed on 3M IJ180 with gloss overlaminate.",
    beforeUrl: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: '5',
    category: 'Chrome Delete',
    url: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1200&auto=format&fit=crop",
    alt: "Ford Mustang",
    title: "Ford Mustang",
    description: "Complete chrome delete package. Window trims, grille, and badges wrapped in 3M 2080 Gloss Black.",
    beforeUrl: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: '6',
    category: 'Detailing',
    url: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=1200&auto=format&fit=crop",
    alt: "Audi R8",
    title: "Audi R8 Spyder",
    description: "Interior and exterior deep clean, leather conditioning, and exterior wax sealant.",
    beforeUrl: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=1200&auto=format&fit=crop"
  }
];

const Gallery: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="gallery" className="py-20 bg-venom-gray relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl font-bold text-white mb-2">RECENT <span className="text-venom-green">DROPS</span></h2>
          <p className="text-gray-400">Tap any project to see the Before & After transformation.</p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              layoutId={`project-${project.id}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className="relative group overflow-hidden aspect-video cursor-pointer rounded-lg border border-white/5 hover:border-venom-green/50 transition-colors"
            >
              <img 
                src={project.url} 
                alt={project.alt} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
              
              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                 <ZoomIn size={20} />
              </div>

              <div className="absolute bottom-0 left-0 p-4 w-full">
                <span className="text-venom-green text-xs font-bold uppercase tracking-wider mb-1 block">
                  {project.category}
                </span>
                <h3 className="text-white font-display font-bold text-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  {project.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              layoutId={`project-${selectedProject.id}`}
              className="w-full max-w-5xl bg-venom-dark rounded-xl overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Comparison Area */}
              <div className="w-full md:w-2/3 h-[40vh] md:h-[70vh] relative bg-black">
                 <ImageComparison 
                    beforeImage={selectedProject.beforeUrl || selectedProject.url} 
                    afterImage={selectedProject.url}
                    alt={selectedProject.alt}
                 />
              </div>

              {/* Info Sidebar */}
              <div className="w-full md:w-1/3 p-8 flex flex-col bg-venom-gray border-l border-white/5">
                <div className="flex justify-between items-start mb-6">
                   <div>
                     <span className="text-venom-green text-xs font-bold uppercase tracking-widest border border-venom-green/30 px-2 py-1 rounded">
                       {selectedProject.category}
                     </span>
                   </div>
                   <button 
                     onClick={() => setSelectedProject(null)}
                     className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"
                   >
                     <X size={24} />
                   </button>
                </div>

                <h2 className="font-display text-3xl font-bold text-white mb-4 leading-none">
                  {selectedProject.title}
                </h2>
                
                <p className="text-gray-400 leading-relaxed mb-8">
                  {selectedProject.description}
                </p>

                <div className="mt-auto">
                   <h4 className="text-white font-bold mb-2 uppercase text-sm">Transformation Details</h4>
                   <ul className="text-sm text-gray-400 space-y-2 mb-8">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-venom-green rounded-full"></div>
                        <span>Surface Decontamination</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-venom-green rounded-full"></div>
                        <span>Paint Correction</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-venom-green rounded-full"></div>
                        <span>Premium Material Application</span>
                      </li>
                   </ul>

                   <a href="#contact" className="block w-full text-center bg-venom-green text-black font-bold py-3 rounded uppercase tracking-widest hover:bg-white transition-colors" onClick={() => setSelectedProject(null)}>
                     Get This Look
                   </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;