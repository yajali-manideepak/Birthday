# Stella's 3D Cinematic Birthday Website ✨

A luxury, romantic, cinematic, and interactive 3D animated birthday website dedicated to **STELLA** (`@miss_photophile30`, Born 30 December 2006).

---

## 🌟 Key Features

1. **Cinematic Opening & Dynamic Countdown**:
   - 3D Metallic Gold "STELLA" emblem with continuous light sweeps.
   - Live countdown calculating time to **30 December** (automatically rolls over to next year).
   - "Counting every moment until your special day..."
2. **Secret Passcode Gate (Code: `301206`)**:
   - The website starts locked with only the Countdown and the Secret Birthday Passcode keypad visible.
   - Enter `301206` (30 • 12 • 06) on the interactive on-screen keypad or physical keyboard.
   - Triggers golden fireworks, unlocks background romantic music, and reveals the entire birthday journey!
3. **Birthday Reveal**:
   - "Happy Birthday My Dear Mam ❤️"
   - Stella's primary hero boat photo in a glowing circular gold frame with particle halos and "@miss_photophile30" badge.
4. **Interactive 3D Calendar (December 2006)**:
   - Time travel to 2006.
   - Clicking **Date 30** triggers golden confetti, reveals Stella's portrait, and shows: *"And on this beautiful day, the world got a little brighter... 30 December 2006 — The day STELLA was born ❤️"*.
5. **Photo Memory Gallery (3D Tilt & Lightbox)**:
   - Realistic 3D mouse-tracking tilt cards with golden reflections and polaroid aesthetics.
   - Click-to-expand high-resolution lightbox modal with zoom and captions.
6. **Heartfelt Birthday Wishes**:
   - Animated luxury cards with typewriter-style staggered reveal.
7. **Our Memories (Preserved Black & White Photo)**:
   - 6 curated memories (12th Class, Mall Selfies, School to Bus Stop, Bakery Moments, Endless Calls & Chats, Early Morning College).
   - Preserves Stella's authentic Black & White car photo without colorizing.
8. **The Feeling**:
   - Slow-paced emotional reveal: *"Somewhere between the calls... the chats... the laughs... the memories... the walks... the little moments... I don't even know when... I fell in love with you. ❤️"*.
9. **Handwritten Letter From the Heart**:
   - Vintage luxury parchment card, cursive calligraphy typography, and a golden wax seal initialed "S".
10. **For Your Future ✨**:
    - 7 celestial golden constellation blessing cards.
11. **Grand Finale & Replay**:
    - Centerpiece gold framed portrait of Stella, birthday tribute, and a "Replay the Memories ✨" button that smoothly returns to top.
12. **Music System**:
    - Floating luxury gold glass audio controller with Play/Pause, Mute, Volume slider, and equalizer waves.
    - Features a built-in romantic ambient Web Audio piano synthesizer so music always plays out of the box, with instant plug-and-play MP3 replacement.

---

## 📸 Photo Configuration System

All photos can be replaced directly in:
```
public/assets/photos/
```

Configured in [src/config/photos.ts](file:///src/config/photos.ts):
- `stella-hero.jpg` → Primary hero / profile photo (Stella boat portrait)
- `stella-car-memory.jpg` → Special memory photo (Stella car photo, preserved Black & White)
- `memory-traditional.jpg` → Traditional dress photo
- `memory-party.jpg` → Fairy lights / celebration photo
- `memory-selfie.jpg` → Selfie photo
- `memory-final.jpg` → Portrait photo

> **Note**: If any photo is not provided or set to `null`, an elegant luxury glassmorphism card is displayed automatically, so the layout never breaks!

---

## 🎵 Replacing Background Music

Place your MP3 audio file at:
```
public/assets/birthday-music.mp3
```
The website will automatically detect and play your custom audio file with smooth volume fade-in! If the file is not present, it will seamlessly fall back to the built-in ambient romantic piano melody.

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v18 or higher)
- npm

### 1. Install dependencies:
```bash
npm install
```

### 2. Run the development server:
```bash
npm run dev
```
Open your browser and navigate to:
```
http://localhost:3000/
```

### 3. Build for production:
```bash
npm run build
```
The optimized production files will be output to the `dist/` directory, ready to deploy to Vercel, Netlify, GitHub Pages, or any static web host.

---

## 🔑 Secret Passcode
- **Code**: `301206`
