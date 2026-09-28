import React, { useState, useEffect } from 'react';
import { ParticleBackground } from './components/ParticleBackground';
import { AudioPlayer } from './components/AudioPlayer';
import { HeroScene } from './components/HeroScene';
import { CalendarScene } from './components/CalendarScene';
import { GalleryScene } from './components/GalleryScene';
import { BirthdayWishScene } from './components/BirthdayWishScene';
import { BirthdayCakeScene } from './components/BirthdayCakeScene';
import { PresentsScene } from './components/PresentsScene';
import { MemoriesScene } from './components/MemoriesScene';
import { TheFeelingScene } from './components/TheFeelingScene';
import { LetterScene } from './components/LetterScene';
import { FutureWishesScene } from './components/FutureWishesScene';
import { FinalScene } from './components/FinalScene';
import { LightboxModal } from './components/LightboxModal';
import { PartyPoppers } from './components/PartyPoppers';
import { GalleryPhoto } from './config/photos';

export function App() {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);

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
      {/* Dynamic Golden Particle Field & Stardust */}
      <ParticleBackground />

      {/* Floating Audio Controller & Autoplay (Bottom Left) */}
      <AudioPlayer />

      {/* Floating Interactive Party Poppers Dock & Balloon Pops (Bottom Right) */}
      <PartyPoppers />


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
          <div className="animate-fade-in">
            {/* Scene 3: Calendar Interaction */}
            <CalendarScene />

            {/* Scene 4: Photo Memory Gallery */}
            <GalleryScene onOpenLightbox={handleOpenLightbox} />

            {/* Scene 5: Birthday Wish */}
            <BirthdayWishScene />

            {/* Scene 6: Interactive Birthday Cake Celebration (Candles, Cake Cutting & Wishes) */}
            <BirthdayCakeScene />

            {/* Scene 7: Surprise Presents & Favors (Bracelet, Nail Polish, Mehendi) */}
            <PresentsScene onOpenLightbox={handleOpenLightbox} />

            {/* Scene 8: Our Memories */}
            <MemoriesScene onOpenLightbox={handleOpenLightbox} />

            {/* Scene 9: The Feeling */}
            <TheFeelingScene />

            {/* Scene 10: Personal Message */}
            <LetterScene />

            {/* Scene 11: Wishes For Her Future */}
            <FutureWishesScene />

            {/* Scene 12 & Finale: Final Tribute & Replay */}
            <FinalScene onReplay={handleReplay} />
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
