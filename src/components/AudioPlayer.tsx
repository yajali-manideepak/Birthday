import React, { useEffect, useRef } from 'react';
import { PHOTO_CONFIG } from '../config/photos';
import { synthAudio } from '../utils/soundSynthesizer';

export const AudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = PHOTO_CONFIG.audioSrc;
    audio.loop = true;
    audio.volume = 0.75;
    audioRef.current = audio;

    // Fallback if initial src path fails
    const handleError = () => {
      if (audio.src && !audio.src.includes('doroon_doroon_2_o.mp3')) {
        console.info('Switching to alternate audio source...');
        audio.src = '/assets/audio/doroon_doroon_2_o.mp3';
        audio.load();
        audio.play().catch(() => {
          synthAudio.setVolume(0.75);
          synthAudio.start();
        });
      } else {
        synthAudio.setVolume(0.75);
        synthAudio.start();
      }
    };

    audio.addEventListener('error', handleError);

    const playAudio = () => {
      if (audio.paused) {
        audio.play().catch((err) => {
          console.warn('Autoplay waiting for user gesture:', err);
        });
      }
    };

    // Attempt direct play immediately
    playAudio();

    // Unlock playback on first user gesture across the document
    const handleGesture = () => {
      playAudio();
    };

    window.addEventListener('click', handleGesture, { passive: true });
    window.addEventListener('touchstart', handleGesture, { passive: true });
    window.addEventListener('pointerdown', handleGesture, { passive: true });
    window.addEventListener('keydown', handleGesture, { passive: true });
    window.addEventListener('scroll', handleGesture, { passive: true });

    return () => {
      audio.removeEventListener('error', handleError);
      audio.pause();
      synthAudio.stop();
      window.removeEventListener('click', handleGesture);
      window.removeEventListener('touchstart', handleGesture);
      window.removeEventListener('pointerdown', handleGesture);
      window.removeEventListener('keydown', handleGesture);
      window.removeEventListener('scroll', handleGesture);
    };
  }, []);

  // Invisible - no display on screen, runs purely as seamless background audio
  return null;
};
