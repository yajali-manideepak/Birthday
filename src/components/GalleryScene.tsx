import React, { useState } from 'react';
import { Sparkles, Maximize2, Camera } from 'lucide-react';
import { GALLERY_PHOTOS, GalleryPhoto } from '../config/photos';

interface GallerySceneProps {
  onOpenLightbox: (photo: GalleryPhoto) => void;
}

export const GalleryScene: React.FC<GallerySceneProps> = ({ onOpenLightbox }) => {
  return (
    <section id="gallery-section" className="relative min-h-screen py-24 px-4 sm:px-6 md:px-12 z-10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-gold-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs sm:text-sm font-serif mb-4">
            <Camera size={14} className="text-gold-400" />
            <span>Digital Memory Album</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-cinzel font-bold text-white mb-4">
            Moments Frozen in <span className="gold-metallic-text">Gold</span>
          </h2>

          <p className="text-zinc-400 font-light text-sm sm:text-base leading-relaxed">
            Every snapshot tells a story of elegance, grace, and unmatched charm. Hover over the cards to experience their 3D depth, and tap to view in full splendour.
          </p>
        </div>

        {/* 3D Tilt Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {GALLERY_PHOTOS.map((photo, index) => (
            <TiltCard key={photo.id} photo={photo} index={index} onExpand={() => onOpenLightbox(photo)} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface TiltCardProps {
  photo: GalleryPhoto;
  index: number;
  onExpand: () => void;
}

const TiltCard: React.FC<TiltCardProps> = ({ photo, index, onExpand }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -12; // Inverted for natural tilt
    const rotY = ((x - centerX) / centerX) * 12;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      className="perspective-1000 group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onExpand}
      style={{ perspective: '1000px' }}
    >
      <div
        className="glass-luxury rounded-2xl p-4 sm:p-5 gold-border-glow transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
        style={{
          transform: isHovered
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`
            : 'rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)',
          transformStyle: 'preserve-3d',
          boxShadow: isHovered
            ? '0 25px 50px -12px rgba(212, 175, 55, 0.25), 0 0 30px rgba(212, 175, 55, 0.15)'
            : '0 10px 30px -10px rgba(0, 0, 0, 0.7)',
        }}
      >
        {/* Golden corner accents */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-gold-400/60 pointer-events-none" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-gold-400/60 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-gold-400/60 pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-gold-400/60 pointer-events-none" />

        {/* Image Container */}
        <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-black/60 mb-4 border border-gold-500/20">
          <img
            src={photo.src}
            alt={photo.title}
            className={`w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 ${
              photo.isBlackAndWhite ? 'bw-authentic' : ''
            }`}
          />

          {/* Light sweep glare on hover */}
          <div
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ transform: 'translateZ(30px)' }}
          />

          {/* Expand icon on hover */}
          <div className="absolute bottom-3 right-3 p-2 rounded-full bg-black/60 text-gold-300 border border-gold-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
            <Maximize2 size={16} />
          </div>

          {/* B&W badge if authentic monochrome */}
          {photo.isBlackAndWhite && (
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/70 border border-white/20 text-[10px] uppercase font-mono tracking-widest text-zinc-300">
              Classic B&W
            </div>
          )}
        </div>

        {/* Caption and Info */}
        <div className="text-left" style={{ transform: 'translateZ(20px)' }}>
          <div className="flex items-center justify-between text-xs text-gold-400/80 mb-1 font-serif">
            <span>Memory 0{index + 1}</span>
            <Sparkles size={12} className="text-gold-400 opacity-70" />
          </div>
          <h3 className="text-lg font-serif font-bold text-white group-hover:text-gold-200 transition-colors">
            {photo.title}
          </h3>
          <p className="text-xs text-zinc-400 mt-1 font-light leading-relaxed line-clamp-2">
            {photo.caption}
          </p>
        </div>
      </div>
    </div>
  );
};
