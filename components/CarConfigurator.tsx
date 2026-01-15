"use client";
import React, { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, Html, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ShieldCheck, Droplets, Hammer, Sun, Plus } from 'lucide-react';

// Use the reliable Ferrari model
const MODEL_URL = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r126/examples/models/gltf/ferrari.glb";

// --- Types ---
interface PPFFeature {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  position: [number, number, number]; // Where the hotspot is
  camPos: [number, number, number];   // Where the camera goes
  lookAt: [number, number, number];   // Where the camera looks
}

// --- Data: PPF Features ---
const features: PPFFeature[] = [
  {
    id: 0,
    title: "Self-Healing Technology",
    description: "Swirl marks and light scratches disappear with heat from the sun or engine. Your paint remains flawless forever.",
    icon: <Sun size={24} className="text-black" />,
    // Moved slightly up and back to separate from bumper
    position: [0.3, 0.45, 1.1], 
    camPos: [3, 1.5, 2.5],
    lookAt: [0, 0, 0.5]
  },
  {
    id: 1,
    title: "Impact Resistance",
    description: "Thick 8mil urethane layer absorbs impact from rock chips, road debris, and sand blasting at highway speeds.",
    icon: <Hammer size={24} className="text-black" />,
    // Tip of the nose
    position: [0, 0.2, 2.3], 
    camPos: [1, 0.5, 4.0],
    lookAt: [0, 0, 1.5]
  },
  {
    id: 2,
    title: "Hydrophobic Finish",
    description: "Advanced top-coat repels water, dirt, and grime. Makes washing your car effortless and keeps it cleaner longer.",
    icon: <Droplets size={24} className="text-black" />,
    // Center of door
    position: [0.9, 0.4, -0.2], 
    camPos: [3.5, 0.5, -0.2],
    lookAt: [0, 0, -0.2]
  },
  {
    id: 3,
    title: "Invisible Shield",
    description: "High-clarity adhesive ensures the film is virtually undetectable. Protects without altering your car's factory look.",
    icon: <ShieldCheck size={24} className="text-black" />,
    // Rear quarter panel / Roof area to spread it out far back
    position: [0.7, 0.6, -1.2], 
    camPos: [3, 1.0, -2.5],
    lookAt: [0, 0, -1.0]
  }
];

// --- 3D Components ---

function Model({ 
  activeFeature, 
  onFeatureClick 
}: { 
  activeFeature: number | null, 
  onFeatureClick: (id: number) => void 
}) {
  const { scene } = useGLTF(MODEL_URL) as any;
  const meshRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (scene) {
      scene.traverse((child: any) => {
        if (child.isMesh) {
          const matName = child.material.name ? child.material.name.toLowerCase() : '';
          
          if (matName.includes('body')) {
             if (!(child.material instanceof THREE.MeshPhysicalMaterial)) {
                 const oldMat = child.material;
                 child.material = new THREE.MeshPhysicalMaterial({
                    color: oldMat.color,
                    map: oldMat.map,
                    normalMap: oldMat.normalMap
                 });
                 child.material.name = 'Body';
             }
             // Premium Silver/Grey for PPF Showcase
             child.material.color.set('#e5e7eb'); 
             child.material.roughness = 0.15;
             child.material.metalness = 0.9;
             child.material.clearcoat = 1.0;
             child.material.envMapIntensity = 1.5;
          }
          
          if (matName.includes('glass') || matName.includes('window')) {
             child.material.transparent = true;
             child.material.opacity = 0.3;
             child.material.color.set('black');
          }
           if (matName.includes('rim') || matName.includes('wheel')) {
             child.material.metalness = 0.9;
             child.material.roughness = 0.2;
             child.material.color.set('#111');
          }
        }
      });
    }
  }, [scene]);

  // Rotate 0 to align side profile with X-axis camera
  return (
    <group ref={meshRef} position={[0, -0.8, 0]} scale={0.65} rotation={[0, 0, 0]}>
      <primitive object={scene} />
      
      {/* Minimalist Hotspots */}
      {features.map((feature) => (
        <Html 
          key={feature.id} 
          position={feature.position} 
          distanceFactor={8} 
          zIndexRange={[100, 0]}
        >
          <div className="relative flex items-center justify-center w-12 h-12 cursor-pointer"
               onClick={(e) => {
                 e.stopPropagation();
                 onFeatureClick(feature.id);
               }}>
            
            {/* Active State: Solid Ring */}
            {activeFeature === feature.id && (
              <>
                 <motion.div 
                    layoutId="active-ring"
                    className="absolute inset-0 border-2 border-white rounded-full opacity-100"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.2, opacity: 1 }}
                    transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
                 />
                 <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)] z-10" />
              </>
            )}

            {/* Inactive State: Pulsing Beacon */}
            {activeFeature !== feature.id && (
              <div className="group relative flex items-center justify-center">
                 {/* Ping animation */}
                 <span className="absolute inline-flex h-full w-full rounded-full bg-venom-green opacity-75 animate-ping"></span>
                 
                 {/* Core dot */}
                 <span className="relative inline-flex rounded-full h-3 w-3 bg-venom-green border border-black/20 shadow-[0_0_10px_#96ed11]"></span>
                 
                 {/* Hover Ring */}
                 <span className="absolute w-8 h-8 border border-venom-green/50 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></span>
              </div>
            )}
          </div>
        </Html>
      ))}
    </group>
  );
}

// Smooth Camera Controller
function CameraRig({ activeFeature }: { activeFeature: number | null }) {
  // Closer Default Position (Zoomed In)
  // X = 4.5 gives a tighter side profile shot compared to 6
  const defaultPos = new THREE.Vector3(4.5, 0.4, 0);
  const defaultTarget = new THREE.Vector3(0, -0.2, 0);

  useFrame((state) => {
    let targetPos = defaultPos;
    let targetLook = defaultTarget;

    if (activeFeature !== null) {
      const feat = features[activeFeature];
      targetPos = new THREE.Vector3(...feat.camPos);
      targetLook = new THREE.Vector3(...feat.lookAt);
    }

    // Lerp Camera Position
    state.camera.position.lerp(targetPos, 0.04);
    
    // Smooth LookAt
    const dummyCam = state.camera.clone();
    dummyCam.lookAt(targetLook);
    state.camera.quaternion.slerp(dummyCam.quaternion, 0.04);
  });

  return null;
}

const CarConfigurator: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  const handleNext = () => {
    if (activeFeature === null) setActiveFeature(0);
    else if (activeFeature < features.length - 1) setActiveFeature(activeFeature + 1);
    else setActiveFeature(0);
  };

  return (
    <div className="w-full h-[600px] bg-gradient-to-b from-gray-900 to-venom-dark relative rounded-xl overflow-hidden border border-white/10 shadow-2xl group">
      
      {/* 3D Canvas */}
      <Canvas shadows camera={{ position: [4.5, 0.4, 0], fov: 40 }}>
        <CameraRig activeFeature={activeFeature} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1000} castShadow />
        <spotLight position={[-10, 5, 0]} angle={0.5} penumbra={1} intensity={500} color="#96ed11" />
        {/* Rim Light for shape definition */}
        <spotLight position={[0, 5, -10]} intensity={800} color="#ffffff" />
        
        <Suspense fallback={null}>
          <Model activeFeature={activeFeature} onFeatureClick={setActiveFeature} />
          <Environment preset="city" />
          <ContactShadows position={[0, -0.8, 0]} opacity={0.6} scale={10} blur={2.5} far={4} color="#000000" />
        </Suspense>
      </Canvas>

      {/* Loading Overlay */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <Suspense fallback={<div className="text-venom-green font-display animate-pulse tracking-widest">LOADING MODEL...</div>}>
           {/* Fallback container */}
        </Suspense>
      </div>

      {/* Instructions (Only visible when no feature is active) */}
      <AnimatePresence>
        {activeFeature === null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center pointer-events-none"
          >
            <div className="bg-black/40 backdrop-blur-md px-6 py-3 rounded-full border border-venom-green/20 flex items-center gap-3">
              <div className="w-2 h-2 bg-venom-green rounded-full animate-ping"></div>
              <span className="text-white text-xs tracking-[0.2em] font-display">TAP THE GREEN MARKERS TO EXPLORE</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feature Card Overlay (Bottom Right) */}
      <AnimatePresence>
        {activeFeature !== null && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: 50 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 50, x: 50 }}
            className="absolute bottom-6 right-6 max-w-sm w-full z-20"
          >
            <div className="bg-black/80 backdrop-blur-md text-white p-6 rounded-lg border border-white/10 shadow-2xl relative overflow-hidden">
               {/* Decorative accent */}
               <div className="absolute top-0 left-0 w-1 h-full bg-venom-green"></div>
               
               <div className="flex justify-between items-start mb-4">
                 <div className="flex items-center gap-3">
                   <div className="p-2 bg-white/10 rounded-md text-venom-green">
                      {features[activeFeature].icon}
                   </div>
                   <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">0{activeFeature + 1} / 0{features.length}</span>
                 </div>
                 <button 
                   onClick={() => setActiveFeature(null)}
                   className="text-gray-400 hover:text-white transition-colors"
                 >
                   <X size={20} />
                 </button>
               </div>
               
               <h3 className="font-display text-2xl font-bold mb-3 uppercase leading-none text-white">
                 {features[activeFeature].title}
               </h3>
               
               <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">
                 {features[activeFeature].description}
               </p>
               
               <div className="flex justify-end">
                 <button 
                   onClick={handleNext}
                   className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-venom-green hover:text-white transition-colors group/btn"
                 >
                   Next Feature
                   <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                 </button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CarConfigurator;