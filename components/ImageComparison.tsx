"use client";
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MoveHorizontal } from 'lucide-react';

interface ImageComparisonProps {
  beforeImage: string;
  afterImage: string;
  alt: string;
}

const ImageComparison: React.FC<ImageComparisonProps> = ({ beforeImage, afterImage, alt }) => {
  const [isResizing, setIsResizing] = useState(false);
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleResize = useCallback((clientX: number) => {
    if (containerRef.current) {
      const { left, width } = containerRef.current.getBoundingClientRect();
      const newPosition = ((clientX - left) / width) * 100;
      setPosition(Math.min(Math.max(newPosition, 0), 100));
    }
  }, []);

  const handleMouseDown = () => setIsResizing(true);
  const handleMouseUp = () => setIsResizing(false);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isResizing) handleResize(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleResize(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsResizing(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-hidden select-none cursor-ew-resize group"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* After Image (Background - The "New" Look) */}
      <img
        src={afterImage}
        alt={`After ${alt}`}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />
      
      {/* Label After */}
      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded border border-white/10 z-10">
        <span className="text-venom-green text-xs font-bold uppercase tracking-widest">After</span>
      </div>

      {/* Before Image (Foreground - Clipped) */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img
          src={beforeImage}
          alt={`Before ${alt}`}
          className="absolute inset-0 w-full h-full object-cover max-w-none"
          // In a real scenario, you'd use a different URL. 
          // For demo purposes, if the URL is the same, we apply a filter to simulate "Before" state (e.g. dull paint)
          style={{ 
             width: '100%', 
             height: '100%',
             filter: beforeImage === afterImage ? 'grayscale(100%) contrast(80%) brightness(90%) sepia(20%)' : 'none' 
          }}
          draggable={false}
        />
        
        {/* Label Before */}
        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded border border-white/10 z-10">
           <span className="text-white text-xs font-bold uppercase tracking-widest">Before</span>
        </div>
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-venom-green cursor-ew-resize z-20 shadow-[0_0_15px_rgba(150,237,17,0.5)]"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-black border-2 border-venom-green rounded-full flex items-center justify-center shadow-lg">
           <MoveHorizontal size={20} className="text-venom-green" />
        </div>
      </div>
      
      {/* Hint Text */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 px-4 py-2 rounded-full pointer-events-none">
         <span className="text-white text-xs uppercase tracking-wider">Drag to Compare</span>
      </div>
    </div>
  );
};

export default ImageComparison;