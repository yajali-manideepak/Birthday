/**
 * =========================================================================
 * STELLA'S PHOTO CONFIGURATION SYSTEM
 * =========================================================================
 * 
 * To update or replace photos:
 * 1. Place your new image file inside: `/public/assets/photos/`
 * 2. Update the filename/path below if needed.
 * 
 * NOTE: If a photo is set to null or not yet available, the website will
 * automatically render a gorgeous luxury glassmorphism placeholder card
 * with golden animations so the design never looks empty or broken!
 */

export interface PhotoMemory {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  imageSrc: string | null;
  videoSrc?: string;
  tag: string;
  isBlackAndWhite?: boolean;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  caption: string;
  src: string;
  videoSrc?: string;
  isBlackAndWhite?: boolean;
}

export interface PresentItem {
  id: string;
  category: 'bracelet' | 'nail' | 'mehandi';
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  secondaryImageSrc?: string;
  tag: string;
  badge: string;
  quote?: string;
}

export const PHOTO_CONFIG = {
  // Primary Hero & Profile Photo (Stella on Boat in pink dress)
  heroPhoto: '/assets/photos/stella-hero.jpg',

  // Special Memory Photo (Stella leaning on car - Authentic Black & White preserved)
  carMemoryPhoto: '/assets/photos/stella-car-memory.jpg',

  // Additional Real Photos of Stella
  partyPhoto: '/assets/photos/memory-party.jpg',
  traditionalPhoto: '/assets/photos/memory-traditional.jpg',
  selfiePhoto: '/assets/photos/memory-selfie.jpg',
  portraitPhoto: '/assets/photos/memory-final.jpg',

  // Birthday Cake & Celebration Assets
  cakePhoto: '/assets/photos/birthday-cake-design.svg',

  // Audio track configuration
  // Place your MP3 file at: /public/assets/birthday-music.mp3
  audioSrc: '/assets/birthday-music.mp3',

  // Stella's details
  name: 'STELLA',
  instagram: '@miss_photophile30',
  instagramUrl: 'https://instagram.com/miss_photophile30',
  birthDate: {
    year: 2006,
    month: 12, // December (1-12)
    day: 30,
  }
};

/**
 * Curated Surprise Presents (Bracelet, Nail Polish, Mehendi)
 */
export const PRESENTS_DATA: PresentItem[] = [
  {
    id: 'present-bracelet',
    category: 'bracelet',
    title: 'The Best Friend Charm Bracelet',
    subtitle: '"I will give this to you when I meet you in offline 💕🎀✨"',
    tag: 'Gift 01 • Promised Surprise',
    badge: 'Special Gift 🎀',
    quote: 'I will give you when I meet you in offline 💕🎀✨',
    description: 'You shared this sweet hint, and today that promise is celebrated! A handcrafted charm bracelet glistening with soft pink stars, lustrous pearls, wings, and delicate pink bows — I will give this to you when I meet you in offline! 🎀✨',
    imageSrc: '/assets/presents/present.png',
  },
  {
    id: 'present-nail',
    category: 'nail',
    title: 'Rose Velvet Nail Polish',
    subtitle: '"Nail polish 💅🥰"',
    tag: 'Gift 02 • Style & Beauty',
    badge: 'Glamour 💅',
    quote: 'Nail polish 💅🥰',
    description: 'That classic, captivating shade of rose velvet on your graceful hands. Every detail of your style is effortless, poised, and unforgettable.',
    imageSrc: '/assets/presents/nail.jpg',
  },
  {
    id: 'present-mehandi',
    category: 'mehandi',
    title: 'Intricate Mehendi Artistry',
    subtitle: '"Traditional Henna Elegance"',
    tag: 'Gift 03 • Pure Grace',
    badge: 'Artistry 🌿',
    description: 'Intricate, traditional henna patterns flowing across your hands with floral motifs and cultural poise. Pure poetry on your hands that turns heads and warms hearts.',
    imageSrc: '/assets/presents/mehandi.jpg',
    secondaryImageSrc: '/assets/presents/mehandi-2.jpg',
  },
];

/**
 * Curated Memories List for Scene 6
 */
export const MEMORIES_DATA: PhotoMemory[] = [
  {
    id: 'memory-01',
    tag: 'Memory 01',
    title: '12th Class',
    subtitle: 'Board Exam Preparation Days',
    description: 'Those 12th class days...\nWe didn’t go to college at that time because of our board exam preparation — it was all online preparation, endless calls, and texting each other all day long, helping each other, studying together, and sharing every little moment.',
    imageSrc: null,
  },
  {
    id: 'memory-02',
    tag: 'Memory 02',
    title: 'College → Bus Stop Walk',
    subtitle: 'Walking, Laughing & Friends Bonding',
    description: 'Walking from college to the bus stop...\nTalking, laughing, teasing and enjoying those little moments together with friends.',
    imageSrc: null,
    videoSrc: '/assets/videos/college-bus-memory.mp4',
  },
  {
    id: 'memory-03',
    tag: 'Memory 03',
    title: 'Bakery Moments',
    subtitle: 'Chatting, Eating & Pure Joy',
    description: 'Friends meeting, chatting, eating at the bakery and laughing about random things...\nThose simple moments were honestly some of the happiest ones.',
    imageSrc: '/assets/photos/memory-party.jpg',
  },
  {
    id: 'memory-04',
    tag: 'Memory 04',
    title: 'Those Calls & Chats',
    subtitle: 'Time Losing Meaning',
    description: 'Those endless calls and chats...\nI never really noticed how quickly time was passing whenever I was talking to you.',
    imageSrc: '/assets/photos/stella-car-memory.jpg', // Authentic Black and White photo
    isBlackAndWhite: true,
  },
  {
    id: 'memory-05',
    tag: 'Memory 05',
    title: 'Early Morning College',
    subtitle: 'Cool Breeze & Gentle Peace',
    description: 'Talking on calls in the cool breeze during those early mornings while coming to college...\nThose moments had a different kind of peace.',
    imageSrc: '/assets/photos/memory-final.jpg',
  },
];

/**
 * Gallery Photos for Scene 4 (Interactive 3D Polaroid & Glass Album)
 */
export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'g-1',
    title: 'Serenity on the Water',
    caption: 'That effortless grace and radiant smile that brightens every day.',
    src: '/assets/photos/stella-hero.jpg',
  },
  {
    id: 'g-2',
    title: 'Cinematic Elegance',
    caption: 'Timeless black & white memories. Shy, poised, and unforgettable.',
    src: '/assets/photos/stella-car-memory.jpg',
    isBlackAndWhite: true,
  },
  {
    id: 'g-3',
    title: 'Night of Lights',
    caption: 'Fairy lights and golden moments that will linger forever.',
    src: '/assets/photos/memory-party.jpg',
  },
];
