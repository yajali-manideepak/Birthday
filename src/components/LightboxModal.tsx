import React, { useEffect } from 'react';
import { X, Sparkles, Video } from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  videoSrc?: string;
  title?: string;
  caption?: string;
  isBlackAndWhite?: boolean;
}

export const LightboxModal: React.FC<LightboxProps> = ({
  isOpen,
  onClose,
  imageSrc,
  videoSrc,
  title,
  caption,
  isBlackAndWhite = false,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/90 backdrop-blur-xl animate-fade-in"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-zinc-900/80 text-gold-300 hover:text-white hover:bg-gold-600/30 border border-gold-500/30 transition-all duration-200"
        aria-label="Close media"
      >
        <X size={24} />
      </button>

      <div
        className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Frame container */}
        <div className="relative rounded-2xl overflow-hidden p-2 bg-gradient-to-b from-gold-400/40 via-gold-600/20 to-black/60 shadow-[0_0_50px_rgba(212,175,55,0.3)] border border-gold-500/40">
          {videoSrc ? (
            <video
              src={videoSrc}
              controls
              autoPlay
              playsInline
              className="max-h-[75vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
            />
          ) : (
            <img
              src={imageSrc}
              alt={title || 'Stella'}
              className={`max-h-[75vh] w-auto max-w-full rounded-xl object-contain ${
                isBlackAndWhite ? 'grayscale contrast-110' : ''
              }`}
            />
          )}

          {/* Golden Corner Accents */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-gold-300 pointer-events-none" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-gold-300 pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-gold-300 pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-gold-300 pointer-events-none" />
        </div>

        {/* Caption */}
        {(title || caption) && (
          <div className="mt-4 text-center max-w-xl">
            {title && (
              <h4 className="text-xl font-serif text-gold-200 font-medium flex items-center justify-center gap-2">
                {videoSrc ? (
                  <Video size={18} className="text-gold-400" />
                ) : (
                  <Sparkles size={16} className="text-gold-400" />
                )}
                {title}
                <Sparkles size={16} className="text-gold-400" />
              </h4>
            )}
            {caption && (
              <p className="mt-1 text-sm text-zinc-300 font-light leading-relaxed whitespace-pre-line">
                {caption}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
