import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Music } from 'lucide-react';
import { PHOTO_CONFIG } from '../config/photos';
import { synthAudio } from '../utils/soundSynthesizer';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.65);
  const [useSynth, setUseSynth] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element with fallback to synthesizer
  useEffect(() => {
    const audio = new Audio();
    audio.src = PHOTO_CONFIG.audioSrc;
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    // If MP3 file errors or is missing, try alternate path before synth
    const handleError = () => {
      if (audio.src && !audio.src.includes('doroon_doroon_2_o.mp3')) {
        console.info('Switching to alternate audio source...');
        audio.src = '/assets/audio/doroon_doroon_2_o.mp3';
        audio.load();
        if (isPlaying) {
          audio.play().catch(() => setUseSynth(true));
        }
      } else {
        console.info('Audio file failed, using romantic ambient synthesizer.');
        setUseSynth(true);
        if (isPlaying) {
          synthAudio.setVolume(isMuted ? 0 : volume);
          synthAudio.start();
        }
      }
    };

    audio.addEventListener('error', handleError);

    // Global listeners to unlock audio seamlessly on first user interaction
    const handleFirstGesture = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        startPlayback();
      }
    };

    window.addEventListener('click', handleFirstGesture, { once: true });
    window.addEventListener('touchstart', handleFirstGesture, { once: true });
    window.addEventListener('pointerdown', handleFirstGesture, { once: true });
    window.addEventListener('keydown', handleFirstGesture, { once: true });

    return () => {
      audio.removeEventListener('error', handleError);
      audio.pause();
      synthAudio.stop();
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      window.removeEventListener('pointerdown', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };
  }, []);

  // Sync volume changes
  useEffect(() => {
    const targetVol = isMuted ? 0 : volume;
    if (audioRef.current) {
      audioRef.current.volume = targetVol;
    }
    synthAudio.setVolume(targetVol);
  }, [volume, isMuted]);

  const startPlayback = () => {
    setIsPlaying(true);
    if (useSynth) {
      synthAudio.setVolume(isMuted ? 0 : volume);
      synthAudio.start();
    } else if (audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.warn('Autoplay prevented or waiting for interaction:', err);
      });
    }
  };

  const pausePlayback = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
    synthAudio.stop();
  };

  const togglePlay = () => {
    if (isPlaying) {
      pausePlayback();
    } else {
      startPlayback();
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 transition-all duration-300">
      <div className="glass-luxury rounded-full px-4 py-2.5 flex items-center gap-3.5 shadow-2xl border border-gold-500/30 group hover:border-gold-400/60 backdrop-blur-md">
        {/* Equalizer animation indicator */}
        <div className="flex items-end gap-1 h-4 w-4">
          <span
            className={`w-1 bg-gold-400 rounded-full transition-all duration-300 ${
              isPlaying && !isMuted ? 'h-4 animate-pulse' : 'h-1.5 opacity-40'
            }`}
          />
          <span
            className={`w-1 bg-gold-300 rounded-full transition-all duration-300 ${
              isPlaying && !isMuted ? 'h-3 animate-pulse delay-100' : 'h-2 opacity-40'
            }`}
          />
          <span
            className={`w-1 bg-gold-500 rounded-full transition-all duration-300 ${
              isPlaying && !isMuted ? 'h-4 animate-pulse delay-200' : 'h-1 opacity-40'
            }`}
          />
        </div>

        {/* Play / Pause button */}
        <button
          onClick={togglePlay}
          className="w-8 h-8 rounded-full bg-gold-500/20 text-gold-300 hover:bg-gold-500 hover:text-black flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer"
          title={isPlaying ? 'Pause Music' : 'Play Music'}
          aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
        >
          {isPlaying ? <Pause size={15} /> : <Play size={15} className="ml-0.5" />}
        </button>

        {/* Label */}
        <div className="hidden sm:flex flex-col">
          <span className="text-[11px] font-medium tracking-wider text-gold-200 uppercase font-serif">
            {isPlaying ? 'Playing Melody' : 'Stella’s Music'}
          </span>
          <span className="text-[9px] text-zinc-400">
            {useSynth ? 'Ambient Piano Suite' : 'Doroon Doroon 🎵'}
          </span>
        </div>

        {/* Volume & Mute control */}
        <div className="flex items-center gap-2 pl-1 border-l border-gold-500/20">
          <button
            onClick={toggleMute}
            className="text-zinc-400 hover:text-gold-300 transition-colors p-1 cursor-pointer"
            title={isMuted ? 'Unmute' : 'Mute'}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted || volume === 0 ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(parseFloat(e.target.value));
              if (isMuted) setIsMuted(false);
            }}
            className="w-16 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-gold-500 hidden md:block"
            title={`Volume: ${Math.round(volume * 100)}%`}
          />
        </div>
      </div>
    </div>
  );
};
