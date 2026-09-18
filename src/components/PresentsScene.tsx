import React, { useState } from 'react';
import { Gift, Heart, Sparkles, Maximize2, Eye, Award, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PRESENTS_DATA, PresentItem, GalleryPhoto } from '../config/photos';
import { synthAudio } from '../utils/soundSynthesizer';

interface PresentsSceneProps {
  onOpenLightbox: (photo: GalleryPhoto) => void;
}

export const PresentsScene: React.FC<PresentsSceneProps> = ({ onOpenLightbox }) => {
  const [isBoxOpened, setIsBoxOpened] = useState<boolean>(true);
  const [activeImageIndex, setActiveImageIndex] = useState<{ [key: string]: number }>({
    'present-bracelet': 0,
    'present-mehandi': 0,
  });

  const handleOpenGiftBox = () => {
    setIsBoxOpened(true);
    synthAudio.playPop();
    synthAudio.playChime();

    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#fbf5b7', '#d4af37', '#ff8da1', '#ff4b72', '#ffffff'],
    });
  };

  const toggleSecondaryImage = (presentId: string) => {
    synthAudio.playPop();
    setActiveImageIndex((prev) => ({
      ...prev,
      [presentId]: prev[presentId] === 1 ? 0 : 1,
    }));
  };

  const handlePhotoClick = (present: PresentItem) => {
    const isSecondary = (activeImageIndex[present.id] || 0) === 1 && Boolean(present.secondaryImageSrc);
    const chosenSrc = isSecondary ? present.secondaryImageSrc! : present.imageSrc;

    onOpenLightbox({
      id: present.id,
      title: present.title,
      caption: present.description,
      src: chosenSrc,
    });
  };

  const handleShowerLove = (e: React.MouseEvent) => {
    e.stopPropagation();
    synthAudio.playPop();

    confetti({
      particleCount: 40,
      spread: 60,
      origin: {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      },
      shapes: ['star', 'circle'],
      colors: ['#ff4b72', '#ffd700', '#ffb6c1', '#ffffff'],
    });
  };

  return (
    <section id="presents-section" className="relative min-h-screen py-24 px-4 sm:px-6 md:px-12 z-10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] bg-rose-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-1/4 w-[450px] h-[450px] bg-gold-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs sm:text-sm font-serif mb-4">
            <Gift size={14} className="text-gold-400" />
            <span>Surprise Gifts & Favors</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-cinzel font-bold text-white mb-4">
            A Promise Kept <span className="gold-metallic-text">For Stella</span> 🎁
          </h2>

          <p className="text-zinc-300 font-light text-sm sm:text-base leading-relaxed">
            Every little hint you ever loved, every pretty aesthetic that caught your eye, and every graceful touch of your personality — celebrated in pure gold.
          </p>
        </div>

        {/* Surprise Gift Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {PRESENTS_DATA.map((present) => {
            const hasSecondary = Boolean(present.secondaryImageSrc);
            const currentIdx = activeImageIndex[present.id] || 0;
            const currentImg = currentIdx === 1 && hasSecondary ? present.secondaryImageSrc! : present.imageSrc;

            return (
              <div
                key={present.id}
                className="glass-luxury rounded-3xl p-5 sm:p-6 gold-border-glow transition-all duration-500 hover:-translate-y-2 relative flex flex-col justify-between overflow-hidden group shadow-2xl"
              >
                {/* Golden corner accents */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-gold-400/60 pointer-events-none" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-gold-400/60 pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-gold-400/60 pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-gold-400/60 pointer-events-none" />

                <div>
                  {/* Category Badge & Love Reaction */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-gold-500/15 border border-gold-400/30 text-gold-300 text-xs font-serif font-semibold">
                      {present.badge}
                    </span>

                    <button
                      onClick={handleShowerLove}
                      title="Send Love"
                      className="p-2 rounded-full bg-pink-500/10 hover:bg-pink-500/20 border border-pink-400/30 text-pink-300 transition-all hover:scale-110 active:scale-95 flex items-center gap-1 text-xs"
                    >
                      <Heart size={14} className="fill-pink-400 text-pink-400" />
                      <span>Love</span>
                    </button>
                  </div>

                  {/* Image Display Frame */}
                  <div
                    onClick={() => handlePhotoClick(present)}
                    className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-black/70 mb-5 border border-gold-500/30 cursor-pointer shadow-xl group/img"
                  >
                    <img
                      src={currentImg}
                      alt={present.title}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover/img:scale-105"
                    />

                    {/* Light Sweep Glare */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    {/* Expand icon on hover */}
                    <div className="absolute bottom-3 right-3 p-2 rounded-full bg-black/70 text-gold-300 border border-gold-500/30 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                      <Maximize2 size={16} />
                    </div>
                  </div>

                  {/* Image View Toggle Button (For items with 2 photos: Bracelet & Mehendi) */}
                  {hasSecondary && (
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <button
                        onClick={() => toggleSecondaryImage(present.id)}
                        className="px-3.5 py-1.5 rounded-full text-xs font-serif bg-gold-500/10 hover:bg-gold-500/20 border border-gold-400/30 text-gold-200 transition-all flex items-center gap-1.5 hover:scale-105 cursor-pointer"
                      >
                        <Eye size={12} className="text-gold-400" />
                        <span>
                          {currentIdx === 0
                            ? present.category === 'bracelet'
                              ? 'View Close-up Detail ✨'
                              : 'View Design #2 🌿'
                            : 'View Original Post 🎀'}
                        </span>
                      </button>
                    </div>
                  )}

                  {/* Quote Callout Banner if Present */}
                  {present.quote && (
                    <div className="mb-3 px-3 py-1.5 rounded-xl bg-gradient-to-r from-pink-950/40 via-black/50 to-gold-950/40 border border-gold-400/30 text-center">
                      <p className="text-xs font-serif text-gold-200 italic font-medium">
                        ✨ "{present.quote}"
                      </p>
                    </div>
                  )}

                  {/* Title and Subtitle */}
                  <div className="text-left">
                    <span className="text-[10px] font-mono text-gold-400/80 uppercase tracking-widest block mb-1">
                      {present.tag}
                    </span>
                    <h3 className="text-xl font-serif font-bold text-white group-hover:text-gold-200 transition-colors">
                      {present.title}
                    </h3>
                    <p className="text-xs font-serif italic text-gold-300/80 mt-0.5 mb-2.5">
                      {present.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                      {present.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Card Action Footer */}
                <div className="mt-6 pt-4 border-t border-gold-500/20 flex items-center justify-between text-xs text-gold-300/90 font-serif">
                  <span className="flex items-center gap-1">
                    <Sparkles size={12} className="text-gold-400" />
                    Specially Dedicated
                  </span>
                  <button
                    onClick={() => handlePhotoClick(present)}
                    className="hover:text-white underline underline-offset-4 cursor-pointer"
                  >
                    View Fullscreen →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
