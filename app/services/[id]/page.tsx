"use client"

import Navigation from '../../../components/Navigation';
import Footer from '../../../components/Footer';
import { motion } from 'framer-motion';
import { Check, Shield, Clock, DollarSign, ArrowLeft, Star } from 'lucide-react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { use } from 'react';

// Data Dictionary for Service Details
const serviceDetails: Record<string, {
  title: string;
  subtitle: string;
  heroImage: string;
  description: string;
  features: string[];
  process: { step: string; desc: string }[];
  priceRange: string;
  gallery: string[];
}> = {
  ppf: {
    title: "Paint Protection Film",
    subtitle: "The Invisible Armor",
    heroImage: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2000&auto=format&fit=crop",
    description: "Our Paint Protection Film (PPF) is the ultimate defense for your vehicle's factory finish. We use advanced, self-healing polyurethane films that absorb impact from rock chips, road debris, and scratches. Opt for high-gloss for an invisible finish or satin-matte to transform your paint's texture while protecting it.",
    features: [
      "Self-Healing Technology",
      "10-Year Warranty",
      "Hydrophobic Top Coat",
      "Precision Plotter Cut Patterns",
      "No Yellowing or Cracking"
    ],
    process: [
      { step: "01", desc: "Decontamination Wash & Clay Bar" },
      { step: "02", desc: "Paint Correction (Optional with a fee)" },
      { step: "03", desc: "Precision Film Application" },
      { step: "04", desc: "Edge Wrapping & Heat Sealing" }
    ],
    priceRange: "$1,800 - $6,500",
    gallery: [
      "https://images.unsplash.com/photo-1632154939368-1a92207d8af3?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?q=80&w=800&auto=format&fit=crop"
    ]
  },
  wrap: {
    title: "Color Change Wraps",
    subtitle: "Redefine Your Presence",
    heroImage: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000&auto=format&fit=crop",
    description: "Completely transform the look of your vehicle without the permanence or cost of a respray. Choose from hundreds of colors in Gloss, Satin, Matte, Metallic, or Color-Shift finishes. Our master installers ensure door jambs, edges, and corners are wrapped to perfection, making the film look like factory paint.",
    features: [
      "3M & Avery Dennison Films",
      "Fully Reversible",
      "Protects Original Paint",
      "Custom Finishes Available",
      "Door Jambs Available With a Fee"
    ],
    process: [
      { step: "01", desc: "Full Disassembly (Handles, Mirrors, Lights)" },
      { step: "02", desc: "Deep Cleaning & Degreasing" },
      { step: "03", desc: "Panel-by-Panel Installation" },
      { step: "04", desc: "Reassembly & Quality Check" }
    ],
    priceRange: "$2,500 - $5,000",
    gallery: [
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=800&auto=format&fit=crop"
    ]
  },
  chrome: {
    title: "Chrome Delete",
    subtitle: "Stealth Mode Activated",
    heroImage: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=2000&auto=format&fit=crop",
    description: "Eliminate the factory chrome trim for a sleeker, more aggressive aesthetic. We wrap window trims, grilles, handles, and emblems in Gloss Black, Satin Black, or Matte Black. This subtle change dramatically modernizes the look of luxury and sport sedans.",
    features: [
      "Sleek Modern Aesthetic",
      "High-Gloss or Satin Black",
      "Durable Vinyl Material",
      "Reversible Modification",
      "Matches Factory Black Packs"
    ],
    process: [
      { step: "01", desc: "Trim Cleaning & Prep" },
      { step: "02", desc: "Precise Masking" },
      { step: "03", desc: "Vinyl Application" },
      { step: "04", desc: "Detailed Trimming" }
    ],
    priceRange: "$450 - $900",
    gallery: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1bcfb0?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605559424843-9e4c2287f386?q=80&w=800&auto=format&fit=crop"
    ]
  },
  ceramic: {
    title: "Ceramic Coating",
    subtitle: "Liquid Glass Protection",
    heroImage: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=2000&auto=format&fit=crop",
    description: "Ceramic coating bonds to your vehicle's paint at a molecular level, creating a hard, hydrophobic sacrifice layer. This ensures your car repels water, dirt, and UV rays, keeping it cleaner for longer and making washing incredibly easy. It creates a deep, candy-like gloss that wax cannot achieve.",
    features: [
      "9H Hardness Protection",
      "Extreme Hydrophobic Effect",
      "Deep Gloss Enhancement",
      "UV & Oxidation Resistance",
      "Easy Maintenance",
      "Coatings Available for Wraps & PPF"
    ],
    process: [
      { step: "01", desc: "Multi-Stage Paint Correction" },
      { step: "02", desc: "Alcohol Prep Wipe" },
      { step: "03", desc: "Base Coat Application" },
      { step: "04", desc: "Top Coat & Curing" }
    ],
    priceRange: "$800 - $1,800",
    gallery: [
      "https://images.unsplash.com/photo-1635783353497-6a4574fc5c51?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=800&auto=format&fit=crop"
    ]
  },
  tint: {
    title: "Window Tinting",
    subtitle: "Privacy & Heat Rejection",
    heroImage: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=2000&auto=format&fit=crop",
    description: "We use only premium Ceramic IR films that block up to 98% of infrared heat. Unlike standard dye films, our tint won't turn purple or bubble over time. Protect your interior from fading, reduce glare, and keep your cabin cool in the California sun.",
    features: [
      "Ceramic IR Technology",
      "99% UV Protection",
      "High Heat Rejection",
      "Lifetime Warranty",
      "Privacy & Security"
    ],
    process: [
      { step: "01", desc: "Glass Cleaning & Prep" },
      { step: "02", desc: "Film Heat Shrinking" },
      { step: "03", desc: "Interior Application" },
      { step: "04", desc: "Final Inspection" }
    ],
    priceRange: "$250 - $600",
    gallery: [
      "https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop"
    ]
  },
  livery: {
    title: "Custom Graphics",
    subtitle: "Designed to Turn Heads",
    heroImage: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=2000&auto=format&fit=crop",
    description: "From subtle racing stripes to full commercial fleet branding or livery design. Our in-house design team works with you to create a visual identity that stands out. We use high-resolution wide-format printers and premium laminates for durability.",
    features: [
      "In-House Graphic Design",
      "High-Res Latex & UV Printing",
      "Commercial Branding",
      "Racing Liveries",
      "Reflective Vinyl Options"
    ],
    process: [
      { step: "01", desc: "Design Consultation" },
      { step: "02", desc: "Digital Mockups" },
      { step: "03", desc: "Printing & Lamination" },
      { step: "04", desc: "Installation" }
    ],
    priceRange: "Custom Quote",
    gallery: [
      "https://images.unsplash.com/photo-1580274455191-1c62238fa333?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1626847037657-fd3622613ce3?q=80&w=800&auto=format&fit=crop"
    ]
  }
};
type ServicePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default  function ServicePage({ params }: ServicePageProps) {
  const resolvedParams = use(params);
  const service =  serviceDetails[resolvedParams.id];

  if (!service) {
    return notFound();
  }

  return (
    <div className="bg-venom-dark min-h-screen text-white font-sans selection:bg-venom-green selection:text-black">
      <Navigation />

      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <div className="absolute inset-0">
           <img 
             src={service.heroImage} 
             alt={service.title} 
             className="w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-linear-to-t from-venom-dark via-venom-dark/80 to-transparent"></div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="container mx-auto">
             <motion.div
               initial={{ opacity: 0, x: -50 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8 }}
             >
               <Link href="/#services" className="inline-flex items-center gap-2 text-venom-green hover:text-white mb-6 uppercase tracking-widest text-xs font-bold transition-colors">
                  <ArrowLeft size={16} /> Back to Services
               </Link>
               <h2 className="text-venom-green font-bold tracking-[0.2em] mb-2 uppercase text-sm md:text-base">
                 Preserve Auto Lab Service
               </h2>
               <h1 className="font-display font-black text-5xl md:text-7xl text-white uppercase leading-none mb-4">
                 {service.title}
               </h1>
               <p className="text-xl md:text-2xl font-light text-gray-300 max-w-2xl">
                 {service.subtitle}
               </p>
             </motion.div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Main Content */}
          <div className="lg:w-2/3">
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="mb-12"
             >
                <h3 className="text-2xl font-display font-bold text-white mb-6">OVERVIEW</h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  {service.description}
                </p>
             </motion.div>

             {/* Features Grid */}
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16"
             >
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-venom-gray/50 p-4 rounded-lg border border-white/5 hover:border-venom-green/30 transition-colors">
                     <div className="w-8 h-8 rounded-full bg-venom-green/20 flex items-center justify-center text-venom-green shrink-0">
                       <Check size={16} />
                     </div>
                     <span className="font-medium text-gray-200">{feature}</span>
                  </div>
                ))}
             </motion.div>

             {/* Process Steps */}
             <div className="mb-16">
               <h3 className="text-2xl font-display font-bold text-white mb-8">THE PROCESS</h3>
               <div className="space-y-6">
                 {service.process.map((step, idx) => (
                   <div key={idx} className="flex gap-6 group">
                      <div className="font-display text-4xl font-bold text-white/10 group-hover:text-venom-green transition-colors">
                        {step.step}
                      </div>
                      <div className="pt-2">
                        <h4 className="text-lg font-bold text-white mb-1">{step.desc}</h4>
                        <div className="h-px w-24 bg-venom-green/30 group-hover:w-full transition-all duration-500"></div>
                      </div>
                   </div>
                 ))}
               </div>
             </div>
             
             {/* Mini Gallery */}
             <div>
                <h3 className="text-2xl font-display font-bold text-white mb-8">RECENT WORK</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.gallery.map((img, idx) => (
                    <div key={idx} className="aspect-video rounded-lg overflow-hidden border border-white/10">
                       <img src={img} alt="Work Example" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
             </div>
          </div>

          {/* Sidebar / sticky CTA */}
          <div className="lg:w-1/3">
             <div className="sticky top-24">
                <div className="bg-venom-gray border border-white/10 p-8 rounded-xl shadow-2xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-5">
                      <Shield size={120} />
                   </div>
                   
                   <h3 className="font-display text-xl font-bold text-white mb-6 relative z-10">
                     STARTING PRICE
                   </h3>
                   
                   <div className="flex items-baseline gap-2 mb-2 relative z-10">
                      <DollarSign className="text-venom-green" size={24} />
                      <span className="text-3xl md:text-4xl font-bold text-white">{service.priceRange}</span>
                   </div>
                   <p className="text-xs text-gray-500 mb-8 relative z-10">
                     *Final price depends on vehicle size, condition, and specific material choices.
                   </p>

                   <div className="space-y-4 relative z-10">
                     <div className="flex items-center gap-3 text-sm text-gray-400">
                        <Clock size={16} className="text-venom-green" />
                        <span>Duration: 2 - 5 Days</span>
                     </div>
                     <div className="flex items-center gap-3 text-sm text-gray-400">
                        <Star size={16} className="text-venom-green" />
                        <span>Certified Installers</span>
                     </div>
                     <div className="flex items-center gap-3 text-sm text-gray-400">
                        <Shield size={16} className="text-venom-green" />
                        <span>Warranty Included</span>
                     </div>
                   </div>

                   <div className="mt-8 relative z-10">
                      <Link 
                        href="/#contact" 
                        className="block w-full bg-venom-green text-black font-bold text-center py-4 rounded-lg uppercase tracking-widest hover:bg-white hover:shadow-glow transition-all"
                      >
                        Book Appointment
                      </Link>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}