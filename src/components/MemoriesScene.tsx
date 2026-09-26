import { Heart, Sparkles, Image as ImageIcon, ExternalLink, Calendar, MapPin, Coffee, PhoneCall, Bus, BookOpen, Play } from 'lucide-react';
import { MEMORIES_DATA, PhotoMemory, GalleryPhoto } from '../config/photos';

interface MemoriesSceneProps {
  onOpenLightbox: (photo: GalleryPhoto) => void;
}

export const MemoriesScene: React.FC<MemoriesSceneProps> = ({ onOpenLightbox }) => {
  const getMemoryIcon = (id: string) => {
    switch (id) {
      case 'memory-01': return <BookOpen size={18} />;
      case 'memory-02': return <Bus size={18} />;
      case 'memory-03': return <Coffee size={18} />;
      case 'memory-04': return <PhoneCall size={18} />;
      case 'memory-05': return <MapPin size={18} />;
      default: return <Heart size={18} />;
    }
  };

  const handleCardClick = (memory: PhotoMemory) => {
    if (memory.imageSrc || memory.videoSrc) {
      onOpenLightbox({
        id: memory.id,
        title: memory.title,
        caption: memory.description,
        src: memory.imageSrc || '',
        videoSrc: memory.videoSrc,
        isBlackAndWhite: memory.isBlackAndWhite,
      });
    }
  };

  return (
    <section id="memories-section" className="relative min-h-screen py-24 px-4 sm:px-6 md:px-12 z-10">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-gold-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs sm:text-sm font-serif mb-4">
            <Heart size={14} className="fill-red-500 text-red-500" />
            <span>Unforgettable Chapters</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-cinzel font-bold text-white mb-4">
            Some Memories <span className="gold-metallic-text">I'll Always Keep</span> ❤️
          </h2>

          <p className="text-zinc-400 font-light text-sm sm:text-base leading-relaxed">
            Every step, every conversation, every glance and quiet smile woven into the fabric of time.
          </p>
        </div>

        {/* Memory Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {MEMORIES_DATA.map((memory) => {
            const hasPhoto = Boolean(memory.imageSrc);
            const hasVideo = Boolean(memory.videoSrc);
            const isClickable = hasPhoto || hasVideo;

            return (
              <div
                key={memory.id}
                onClick={() => handleCardClick(memory)}
                className={`glass-luxury rounded-2xl p-6 gold-border-glow transition-all duration-500 hover:-translate-y-2 relative flex flex-col justify-between overflow-hidden group ${
                  isClickable ? 'cursor-pointer' : ''
                }`}
              >
                {/* Gold corner ornaments */}
                <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-gold-400/60 pointer-events-none" />
                <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-gold-400/60 pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-gold-400/60 pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-gold-400/60 pointer-events-none" />

                <div>
                  {/* Video, Photo, or Elegant Animated Placeholder */}
                  {hasVideo ? (
                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-5 bg-black/80 border border-gold-400/50 shadow-xl group/video">
                      <video
                        src={memory.videoSrc}
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-gold-500 text-black text-[10px] uppercase font-mono font-bold tracking-wider flex items-center gap-1.5 shadow-md">
                        <Play size={10} className="fill-black" />
                        <span>Live Video Memory</span>
                      </div>
                      <div className="absolute bottom-3 right-3 p-1.5 rounded-full bg-black/80 text-gold-300 border border-gold-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                        <ExternalLink size={14} />
                      </div>
                    </div>
                  ) : hasPhoto ? (
                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-5 bg-black/60 border border-gold-500/30">
                      <img
                        src={memory.imageSrc!}
                        alt={memory.title}
                        className={`w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 ${
                          memory.isBlackAndWhite ? 'bw-authentic' : ''
                        }`}
                      />

                      {/* Black & White authentic label */}
                      {memory.isBlackAndWhite && (
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/80 border border-white/20 text-[9px] uppercase font-mono tracking-widest text-zinc-300 backdrop-blur-sm">
                          Preserved B&W
                        </div>
                      )}

                      {/* Expand clue */}
                      <div className="absolute bottom-3 right-3 p-1.5 rounded-full bg-black/70 text-gold-300 border border-gold-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      </div>
                    </div>
                  ) : null}

                  {/* Header info */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-gold-400 uppercase tracking-wider font-semibold">
                      {memory.tag}
                    </span>
                    <div className="p-2 rounded-lg bg-gold-500/10 text-gold-300 border border-gold-500/20">
                      {getMemoryIcon(memory.id)}
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-2xl font-serif font-bold text-white group-hover:text-gold-200 transition-colors mb-1">
                    {memory.title}
                  </h3>
                  {memory.subtitle && (
                    <p className="text-xs sm:text-sm text-gold-400/80 font-medium mb-4">
                      {memory.subtitle}
                    </p>
                  )}

                  {/* Description */}
                  <div className={!hasPhoto && !hasVideo ? "mt-4 p-5 rounded-2xl bg-gradient-to-br from-gold-500/10 via-black/40 to-transparent border border-gold-400/20" : ""}>
                    <p className={`text-zinc-300 font-light leading-relaxed whitespace-pre-line ${
                      !hasPhoto && !hasVideo ? "text-sm sm:text-base font-serif text-gold-100/90 italic" : "text-sm"
                    }`}>
                      {memory.description}
                    </p>
                  </div>
                </div>

                {/* Footer accent */}
                <div className="mt-6 pt-4 border-t border-gold-500/15 flex items-center justify-between text-[11px] text-zinc-400">
                  <span className="italic font-serif text-gold-300/70">Always in my heart</span>
                  <Heart size={13} className="text-red-500/80 fill-red-500/60" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
