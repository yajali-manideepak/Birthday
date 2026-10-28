import React, { useState, useEffect } from 'react';
import { ParticleBackground } from './components/ParticleBackground';
import { HeroScene } from './components/HeroScene';
import { CalendarScene } from './components/CalendarScene';
import { BirthdayCakeScene } from './components/BirthdayCakeScene';
import { MemoriesScene } from './components/MemoriesScene';
import { TheFeelingScene } from './components/TheFeelingScene';
import { LetterScene } from './components/LetterScene';
import { FutureWishesScene } from './components/FutureWishesScene';
import { FinalScene } from './components/FinalScene';
import { LightboxModal } from './components/LightboxModal';
import { CustomCursor } from './components/CustomCursor';
import { ScrollReveal } from './components/ScrollReveal';
import { GalleryPhoto } from './config/photos';

export function App() {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        setScrollProgress((window.scrollY / total) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleUnlock = () => {
    setIsUnlocked(true);
    setTimeout(() => {
      const revealEl = document.getElementById('birthday-reveal');
      if (revealEl) {
        revealEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 400);
  };

  useEffect(() => {
    const onUnlockedEvent = () => handleUnlock();
    window.addEventListener('stella:unlocked', onUnlockedEvent);
    return () => window.removeEventListener('stella:unlocked', onUnlockedEvent);
  }, []);

  const handleOpenLightbox = (photo: GalleryPhoto) => {
    setSelectedPhoto(photo);
  };

  const handleCloseLightbox = () => {
    setSelectedPhoto(null);
  };

  const handleExploreSurprise = () => {
    const calendarElement = document.getElementById('calendar-section');
    if (calendarElement) {
      calendarElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#050508] text-white selection:bg-gold-500/30 selection:text-gold-200 overflow-x-hidden">
      {/* Luxury Golden Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none bg-black/40">
        <div
          className="h-full bg-gradient-to-r from-gold-500 via-amber-300 to-yellow-200 shadow-[0_0_12px_rgba(212,175,55,0.85)] transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Interactive Luxury Animated Cursor with Rings & Stardust */}
      <CustomCursor />

      {/* Dynamic Golden Particle Field & Stardust */}
      <ParticleBackground />

      {/* Main Continuous Journey */}
      <main className="relative z-10">
        {/* Scenes 1 & 2: Opening + Countdown + Secret Passcode Gate (Code: 301206) */}
        <HeroScene
          onExploreSurprise={handleExploreSurprise}
          isUnlocked={isUnlocked}
          onUnlock={handleUnlock}
        />

        {/* All remaining scenes are unlocked ONLY after entering secret code 301206 */}
        {isUnlocked && (
          <div className="animate-fade-in space-y-4">
            {/* Scene 3: Calendar Interaction */}
            <ScrollReveal direction="up" delay={100}>
              <CalendarScene />
            </ScrollReveal>

            {/* Interactive Birthday Cake Celebration (3D Hall & Cake Cutting) */}
            <ScrollReveal direction="up" delay={150}>
              <BirthdayCakeScene />
            </ScrollReveal>

            {/* Scene 8: Our Memories */}
            <ScrollReveal direction="up" delay={150}>
              <MemoriesScene onOpenLightbox={handleOpenLightbox} />
            </ScrollReveal>

            {/* Scene 9: The Feeling */}
            <ScrollReveal direction="up" delay={150}>
              <TheFeelingScene />
            </ScrollReveal>

            {/* Scene 10: Personal Message */}
            <ScrollReveal direction="up" delay={150}>
              <LetterScene />
            </ScrollReveal>

            {/* Scene 11: Wishes For Her Future */}
            <ScrollReveal direction="up" delay={150}>
              <FutureWishesScene />
            </ScrollReveal>

            {/* Scene 12 & Finale: Final Tribute & Replay */}
            <ScrollReveal direction="up" delay={150}>
              <FinalScene onReplay={handleReplay} />
            </ScrollReveal>
          </div>
        )}
      </main>

      {/* High-Resolution Lightbox Modal */}
      {selectedPhoto && (
        <LightboxModal
          isOpen={Boolean(selectedPhoto)}
          onClose={handleCloseLightbox}
          imageSrc={selectedPhoto.src}
          title={selectedPhoto.title}
          caption={selectedPhoto.caption}
          isBlackAndWhite={selectedPhoto.isBlackAndWhite}
        />
      )}
    </div>
  );
}

export default App;
