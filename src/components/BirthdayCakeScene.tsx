import React from 'react';
import { Heart, Cake, ExternalLink, Sparkles } from 'lucide-react';

export const BirthdayCakeScene: React.FC = () => {
  return (
    <section id="birthday-cake-section" className="relative min-h-screen py-20 px-3 sm:px-6 md:px-10 flex flex-col items-center justify-center z-10 select-none">
      {/* Golden Celebration Aura Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[850px] h-[380px] sm:h-[850px] bg-gradient-to-tr from-amber-600/15 via-gold-500/12 to-rose-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl w-full mx-auto flex flex-col items-center text-center">
        {/* Badge Header */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs sm:text-sm font-serif mb-3 animate-fade-in">
          <Cake size={15} className="text-gold-400" />
          <span>Interactive 3D Cake Celebration Tab</span>
        </div>

        {/* Section Heading */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-cinzel font-bold text-white mb-2">
          Make A Wish & <span className="gold-metallic-text">Cut The Cake</span> 🎂
        </h2>

        <p className="text-zinc-300 font-light text-sm sm:text-base max-w-2xl mx-auto mb-5 leading-relaxed">
          Step inside Stella’s 3D Birthday Celebration Hall! Walk around the hall, explore the memory wall, open the gift boxes, blow out the candles, and share the first cake slice with Stella.
        </p>

        {/* Dedicated Full Tab Launch Button */}
        <a
          href="/stella-world/index.html"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-gold-400 to-yellow-300 text-stone-950 font-cinzel font-bold text-sm sm:text-base shadow-[0_0_25px_rgba(212,175,55,0.6)] hover:shadow-[0_0_35px_rgba(212,175,55,0.9)] hover:scale-105 active:scale-95 transition-all duration-300 mb-6 group cursor-pointer"
        >
          <Sparkles size={17} className="text-amber-950 group-hover:rotate-12 transition-transform" />
          <span>Open Stella’s 3D Celebration in New Tab ↗</span>
          <ExternalLink size={16} className="text-amber-950" />
        </a>

        {/* 3D Celebration Hall Full Tab View Container */}
        <div className="w-full rounded-2xl glass-luxury border-2 border-gold-400/50 shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col mb-8 animate-fade-in">
          {/* Top Browser Tab Bar */}
          <div className="w-full bg-[#120d14] px-4 pt-3 pb-0 border-b border-gold-500/20 flex items-center justify-between">
            {/* Left: Window Controls + Active Tab Pill */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 mr-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>

              {/* Active Tab Pill */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-t-xl bg-[#24151e] border-t-2 border-l border-r border-gold-400/60 text-gold-200 text-xs sm:text-sm font-cinzel font-bold shadow-lg">
                <Cake size={14} className="text-gold-400" />
                <span>Stella’s 3D Birthday World (Tab)</span>
                <span className="ml-1 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            </div>

            {/* Right: Tab Launch Action */}
            <div className="flex items-center gap-2 pb-2">
              <a
                href="/stella-world/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold-500/20 hover:bg-gold-500/35 border border-gold-400/40 text-gold-300 text-xs font-sans font-medium transition-colors cursor-pointer"
                title="Open in a separate browser tab"
              >
                <ExternalLink size={13} />
                <span className="hidden sm:inline">Launch Full Tab</span>
              </a>
            </div>
          </div>

          {/* Simulated Address / Controls Info Strip */}
          <div className="w-full bg-[#1b1018] px-4 py-2 border-b border-white/5 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
            <div className="flex items-center gap-2 truncate">
              <span className="text-gold-400">https://</span>
              <span className="text-zinc-200 truncate">stella-birthday.world/celebration-hall-3d</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 text-zinc-400 text-[10px] sm:text-xs">
              <span><strong className="text-gold-300">WASD</strong> Walk</span>
              <span><strong className="text-gold-300">DRAG</strong> Look</span>
              <span><strong className="text-gold-300">E</strong> Interact</span>
              <span><strong className="text-gold-300">Q</strong> Share</span>
            </div>
          </div>

          {/* Large Immersive Viewport */}
          <div className="relative w-full h-[78vh] min-h-[640px] max-h-[880px] bg-black">
            <iframe
              id="stella-3d-hall-frame"
              src="/stella-world/index.html"
              title="Stella's 3D Birthday Celebration Hall"
              className="w-full h-full border-0"
              allow="autoplay; fullscreen"
            />
          </div>
        </div>

        {/* Sweet Birthday Wish Card */}
        <div className="mt-2 max-w-xl w-full glass-luxury rounded-2xl p-6 border border-gold-400/40 text-center animate-fade-in shadow-2xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-gold-400/20 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-center gap-2 text-gold-300 font-serif text-base sm:text-lg font-bold mb-2">
            <Heart size={16} className="text-red-500 fill-red-500" />
            <span>A Sweet Birthday Blessing For Stella</span>
            <Heart size={16} className="text-red-500 fill-red-500" />
          </div>
          <p className="font-serif italic text-zinc-200 text-sm sm:text-base leading-relaxed">
            "May every dream whispered into this golden flame find its way to reality. May all the years ahead bring you infinite peace, radiant smiles, and boundless joy."
          </p>
        </div>
      </div>
    </section>
  );
};
