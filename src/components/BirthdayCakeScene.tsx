import React, { useState, useRef, useEffect } from 'react';
import { Heart, Wind, RotateCcw, Cake, Check, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { synthAudio } from '../utils/soundSynthesizer';

interface SliceDedication {
  id: number;
  label: string;
  recipient: string;
  detail: string;
}

const SLICE_DEDICATIONS: SliceDedication[] = [
  { id: 0, label: "Slice 01", recipient: "For The Birthday Queen Stella 👑", detail: "The sweetest first bite for the star of today." },
  { id: 1, label: "Slice 02", recipient: "With Love For Mom & Dad ❤️", detail: "A slice of endless gratitude and warmth." },
  { id: 2, label: "Slice 03", recipient: "For Lifelong Friends & Memories ✨", detail: "To all the shared laughs, bus rides, and smiles." },
  { id: 3, label: "Slice 04", recipient: "For Bright Success & Future Dreams 🌟", detail: "May every ambition and goal become reality." },
  { id: 4, label: "Slice 05", recipient: "For Endless Health & Radiance 😊", detail: "May that beautiful smile shine forever." },
  { id: 5, label: "Slice 06", recipient: "The Pure Love Finale Slice 🍰💖", detail: "Every wish and blessing sealed with devotion." },
];

export const BirthdayCakeScene: React.FC = () => {
  const [candlesLit, setCandlesLit] = useState<boolean>(true);
  const [wishMade, setWishMade] = useState<boolean>(false);
  const [smokeActive, setSmokeActive] = useState<boolean>(false);
  
  // Cut slices state: array of slice indices [0, 1, 2, 3, 4, 5] that have been cut
  const [cutSlices, setCutSlices] = useState<number[]>([]);
  const [activeCuttingIndex, setActiveCuttingIndex] = useState<number | null>(null);
  const [justServedIndex, setJustServedIndex] = useState<number | null>(null);

  const confettiAnimRef = useRef<number | null>(null);

  const fireGoldenConfetti = () => {
    const duration = 2500;
    const end = Date.now() + duration;
    const colors = ['#D4AF37', '#FFD700', '#FFFFFF', '#F59E0B', '#FF4B72'];

    const frame = () => {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 55,
        origin: { x: 0.1, y: 0.75 },
        colors,
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 55,
        origin: { x: 0.9, y: 0.75 },
        colors,
      });

      if (Date.now() < end) {
        confettiAnimRef.current = requestAnimationFrame(frame);
      }
    };
    frame();
  };

  useEffect(() => {
    return () => {
      if (confettiAnimRef.current) {
        cancelAnimationFrame(confettiAnimRef.current);
      }
    };
  }, []);

  // Blow out candle
  const handleCandleClick = () => {
    if (!candlesLit) return;

    synthAudio.playBlow();
    setCandlesLit(false);
    setSmokeActive(true);
    setWishMade(true);

    setTimeout(() => {
      synthAudio.playChime();
      fireGoldenConfetti();
    }, 250);

    setTimeout(() => {
      setSmokeActive(false);
    }, 2200);
  };

  // Relight candle
  const handleRelight = () => {
    setCandlesLit(true);
    setSmokeActive(false);
    synthAudio.playChime();
  };

  // Cut next available slice or a specific slice
  const handleCutSlice = (targetSlice?: number) => {
    if (activeCuttingIndex !== null) return;
    if (cutSlices.length >= 6) return;

    // Determine which slice to cut
    let sliceToCut = targetSlice;
    if (sliceToCut === undefined || cutSlices.includes(sliceToCut)) {
      for (let i = 0; i < 6; i++) {
        if (!cutSlices.includes(i)) {
          sliceToCut = i;
          break;
        }
      }
    }

    if (sliceToCut === undefined) return;

    setActiveCuttingIndex(sliceToCut);
    synthAudio.playSlice();

    setTimeout(() => {
      setCutSlices((prev) => [...prev, sliceToCut!]);
      setJustServedIndex(sliceToCut!);
      setActiveCuttingIndex(null);
      synthAudio.playPop();

      // Confetti on first slice or all slices completed
      if (cutSlices.length === 0 || cutSlices.length === 5) {
        fireGoldenConfetti();
      }
    }, 600);
  };

  // Reset/Bake cake again
  const handleResetCake = () => {
    setCutSlices([]);
    setActiveCuttingIndex(null);
    setJustServedIndex(null);
    setCandlesLit(true);
    synthAudio.playChime();
  };

  const totalSlices = 6;
  const remainingCount = totalSlices - cutSlices.length;
  const isCakeEmpty = remainingCount === 0;

  // 3D Isometric Slice Geometry Generator
  // Center is (170, 110), rx = 135, ry = 60, height = 75
  const cx = 170;
  const cy = 110;
  const rx = 135;
  const ry = 60;
  const cakeH = 75;

  const renderSlice = (idx: number) => {
    const isCut = cutSlices.includes(idx);
    const isBeingCut = activeCuttingIndex === idx;

    // Angles for this slice in radians (6 slices = 60 deg each)
    // Offset slightly so front slices look dramatic in 3D
    const startDeg = idx * 60 - 30;
    const endDeg = (idx + 1) * 60 - 30;
    const startRad = (startDeg * Math.PI) / 180;
    const endRad = (endDeg * Math.PI) / 180;
    const midRad = ((startDeg + endDeg) / 2 * Math.PI) / 180;

    const x1 = cx + rx * Math.cos(startRad);
    const y1 = cy + ry * Math.sin(startRad);
    const x2 = cx + rx * Math.cos(endRad);
    const y2 = cy + ry * Math.sin(endRad);

    // Decorative strawberry and cream rosette coordinates on top of slice
    const decorX = cx + rx * 0.72 * Math.cos(midRad);
    const decorY = cy + ry * 0.72 * Math.sin(midRad);

    // If slice is cut, we don't render it on the cake! It's deleted/removed from the cake!
    if (isCut) return null;

    // Check if this slice is facing front (between 0 and 180 deg) so front side wall is rendered
    const midDeg = (startDeg + endDeg) / 2;
    const isFrontFacing = Math.sin(midRad) > -0.2;

    // Slice translation when cutting
    const shiftX = isBeingCut ? Math.cos(midRad) * 22 : 0;
    const shiftY = isBeingCut ? Math.sin(midRad) * 14 - 15 : 0;

    return (
      <g
        key={idx}
        className="cursor-pointer transition-transform duration-500 hover:brightness-110"
        onClick={() => handleCutSlice(idx)}
        style={{
          transform: `translate(${shiftX}px, ${shiftY}px)`,
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <title>{`Slice ${idx + 1} • Click to cut & serve!`}</title>
        {/* INNER CUT SECTION: Left Face (from center to start angle) */}
        {/* Rendered if previous slice (idx - 1) is already cut or being cut */}
        {(cutSlices.includes((idx + 5) % 6) || isBeingCut) && (
          <path
            d={`M ${cx} ${cy} L ${x1} ${y1} L ${x1} ${y1 + cakeH} L ${cx} ${cy + cakeH} Z`}
            fill="url(#spongeGradient)"
            stroke="#4a2e22"
            strokeWidth="0.8"
          />
        )}

        {/* INNER CUT SECTION: Right Face (from center to end angle) */}
        {/* Rendered if next slice (idx + 1) is already cut or being cut */}
        {(cutSlices.includes((idx + 1) % 6) || isBeingCut) && (
          <path
            d={`M ${cx} ${cy} L ${x2} ${y2} L ${x2} ${y2 + cakeH} L ${cx} ${cy + cakeH} Z`}
            fill="url(#spongeGradient)"
            stroke="#4a2e22"
            strokeWidth="0.8"
          />
        )}

        {/* 3D OUTER CYLINDER WALL (Front facing) */}
        {isFrontFacing && (
          <g>
            <path
              d={`M ${x1} ${y1} A ${rx} ${ry} 0 0 1 ${x2} ${y2} L ${x2} ${y2 + cakeH} A ${rx} ${ry} 0 0 0 ${x1} ${y1 + cakeH} Z`}
              fill="url(#frostingWallGrad)"
              stroke="#3a2219"
              strokeWidth="0.6"
            />
            {/* White cream drip accent along outer wall */}
            <path
              d={`M ${x1} ${y1} A ${rx} ${ry} 0 0 1 ${x2} ${y2} L ${x2} ${y2 + 8} A ${rx} ${ry} 0 0 0 ${x1} ${y1 + 8} Z`}
              fill="#fff8f0"
              opacity="0.9"
            />
          </g>
        )}

        {/* TOP FACE OF SLICE (Rich chocolate velvet frosting sector) */}
        <path
          d={`M ${cx} ${cy} L ${x1} ${y1} A ${rx} ${ry} 0 0 1 ${x2} ${y2} Z`}
          fill="url(#frostingTopGrad)"
          stroke="#42271d"
          strokeWidth="0.9"
        />

        {/* Golden Honey / Caramel Glaze Drizzle */}
        <path
          d={`M ${cx + (x1 - cx) * 0.4} ${cy + (y1 - cy) * 0.4} Q ${decorX} ${decorY - 6} ${cx + (x2 - cx) * 0.4} ${cy + (y2 - cy) * 0.4}`}
          fill="none"
          stroke="#d4af37"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* Whipped Cream Rosette on Slice */}
        <g transform={`translate(${decorX}, ${decorY})`}>
          <circle cx="0" cy="0" r="9" fill="#ffffff" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.25))" />
          <circle cx="-3" cy="-2" r="5" fill="#fffef7" />
          <circle cx="3" cy="-1" r="5" fill="#fdfbf5" />
          <circle cx="0" cy="2" r="6" fill="#f8f4ec" />

          {/* Fresh Ruby Red Strawberry on top of Cream */}
          <path
            d="M 0 -7 C 4 -7 7 -4 5 1 C 3 5 0 8 0 8 C 0 8 -3 5 -5 1 C -7 -4 -4 -7 0 -7 Z"
            fill="#e11d48"
            stroke="#be123c"
            strokeWidth="0.5"
            filter="drop-shadow(0 2px 2px rgba(0,0,0,0.3))"
          />
          {/* Strawberry seeds & shine */}
          <circle cx="-1.5" cy="-2" r="0.6" fill="#fef08a" />
          <circle cx="1.5" cy="-1" r="0.6" fill="#fef08a" />
          <circle cx="0" cy="2" r="0.6" fill="#fef08a" />
          {/* Green leaf cap */}
          <path d="M 0 -7 L -2 -9 L 0 -8 L 2 -9 Z" fill="#15803d" />
        </g>
      </g>
    );
  };

  return (
    <section id="birthday-cake-section" className="relative min-h-screen py-24 px-4 sm:px-6 md:px-12 flex flex-col items-center justify-center z-10 select-none">
      {/* Golden Celebration Aura Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[750px] h-[380px] sm:h-[750px] bg-gradient-to-tr from-amber-600/15 via-gold-500/12 to-rose-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-6xl w-full mx-auto flex flex-col items-center text-center">
        {/* Badge Header */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs sm:text-sm font-serif mb-4 animate-fade-in">
          <Cake size={15} className="text-gold-400" />
          <span>The Birthday Cake Celebration</span>
        </div>

        {/* Section Heading */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-cinzel font-bold text-white mb-2">
          Make A Wish & <span className="gold-metallic-text">Cut The Cake</span> 🎂
        </h2>

        <p className="text-zinc-300 font-light text-sm sm:text-base max-w-2xl mx-auto mb-10 leading-relaxed">
          Blow out the golden celebration candle, then cut slice by slice to serve Stella and everyone! Watch each cut slice transfer straight to the serving platter.
        </p>

        {/* MAIN DUAL STAGE: 3D CAKE STAND ON LEFT + SERVING PLATTER ON RIGHT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full max-w-5xl items-center">
          
          {/* =========================================================================
              LEFT COLUMN: THE 3D INTERACTIVE CAKE
              ========================================================================= */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="relative w-full max-w-md sm:max-w-lg p-6 sm:p-8 rounded-3xl glass-luxury border border-gold-400/30 shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col items-center">
              
              {/* Status Header */}
              <div className="w-full flex items-center justify-between mb-4 px-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-gold-400 animate-pulse" />
                  <span className="text-xs font-serif text-gold-300 font-medium">
                    {isCakeEmpty ? "All Slices Cut & Served!" : `${remainingCount} of 6 Slices Left`}
                  </span>
                </div>

                {!candlesLit && (
                  <button
                    onClick={handleRelight}
                    className="px-3 py-1 rounded-full bg-gold-500/15 hover:bg-gold-500/30 border border-gold-400/40 text-gold-200 text-xs font-serif flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <RotateCcw size={12} className="text-gold-400" />
                    <span>Relight Candle</span>
                  </button>
                )}
              </div>

              {/* SVG 3D CAKE VIEWPORT */}
              <div className="relative w-full aspect-[4/3] flex items-center justify-center">
                <svg
                  viewBox="0 0 340 260"
                  className="w-full h-full max-w-[360px] overflow-visible drop-shadow-[0_25px_35px_rgba(0,0,0,0.8)]"
                >
                  <defs>
                    {/* Cake Top Frosting Gradient */}
                    <radialGradient id="frostingTopGrad" cx="50%" cy="40%" r="60%">
                      <stop offset="0%" stopColor="#6d4c41" />
                      <stop offset="60%" stopColor="#4e342e" />
                      <stop offset="100%" stopColor="#3e2723" />
                    </radialGradient>

                    {/* Cake Side Wall Gradient */}
                    <linearGradient id="frostingWallGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3e2723" />
                      <stop offset="25%" stopColor="#5d4037" />
                      <stop offset="50%" stopColor="#6d4c41" />
                      <stop offset="75%" stopColor="#4e342e" />
                      <stop offset="100%" stopColor="#2e1c17" />
                    </linearGradient>

                    {/* Delicious Cut Sponge Layers Pattern */}
                    <linearGradient id="spongeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3e2723" />
                      <stop offset="15%" stopColor="#8d6e63" />
                      <stop offset="22%" stopColor="#fff8e7" />{/* Cream stripe */}
                      <stop offset="30%" stopColor="#795548" />
                      <stop offset="50%" stopColor="#e11d48" />{/* Berry jam stripe */}
                      <stop offset="58%" stopColor="#fff8e7" />{/* Cream stripe */}
                      <stop offset="70%" stopColor="#6d4c41" />
                      <stop offset="100%" stopColor="#3e2723" />
                    </linearGradient>

                    {/* Gold Pedestal Stand Gradient */}
                    <linearGradient id="goldStandGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#aa771c" />
                      <stop offset="35%" stopColor="#faef82" />
                      <stop offset="50%" stopColor="#fff" />
                      <stop offset="70%" stopColor="#e5c158" />
                      <stop offset="100%" stopColor="#895b1b" />
                    </linearGradient>
                  </defs>

                  {/* 1. LUXURY GOLD/SILVER CAKE PEDESTAL STAND */}
                  <g>
                    {/* Stand base ellipse */}
                    <ellipse cx={cx} cy={cy + cakeH + 35} rx={rx * 0.75} ry={ry * 0.55} fill="url(#goldStandGrad)" opacity="0.9" />
                    {/* Stand pillar */}
                    <path
                      d={`M ${cx - 24} ${cy + cakeH + 10} L ${cx - 16} ${cy + cakeH + 34} L ${cx + 16} ${cy + cakeH + 34} L ${cx + 24} ${cy + cakeH + 10} Z`}
                      fill="url(#goldStandGrad)"
                    />
                    {/* Platter top plate rim */}
                    <ellipse cx={cx} cy={cy + cakeH + 10} rx={rx + 16} ry={ry + 10} fill="url(#goldStandGrad)" filter="drop-shadow(0 4px 10px rgba(0,0,0,0.5))" />
                    {/* Inner porcelain plate base */}
                    <ellipse cx={cx} cy={cy + cakeH + 7} rx={rx + 10} ry={ry + 7} fill="#1a1520" stroke="#d4af37" strokeWidth="1" />
                  </g>

                  {/* EMPTY CAKE CRUMBS (When cake is eaten/cut) */}
                  {isCakeEmpty ? (
                    <g className="animate-fade-in">
                      {/* Leftover crumbs */}
                      <circle cx={cx - 30} cy={cy + cakeH + 4} r="2.5" fill="#8d6e63" />
                      <circle cx={cx - 15} cy={cy + cakeH + 7} r="1.8" fill="#e11d48" />
                      <circle cx={cx + 20} cy={cy + cakeH + 2} r="2.2" fill="#fff8e7" />
                      <circle cx={cx + 45} cy={cy + cakeH + 5} r="3" fill="#8d6e63" />
                      <circle cx={cx - 5} cy={cy + cakeH + 6} r="1.5" fill="#d4af37" />
                      
                      <text
                        x={cx}
                        y={cy + 30}
                        textAnchor="middle"
                        fill="#faef82"
                        fontFamily="Playfair Display, serif"
                        fontSize="15"
                        fontStyle="italic"
                        fontWeight="600"
                      >
                        All 6 Slices Lovingly Served! 🍰
                      </text>
                    </g>
                  ) : (
                    /* 2. THE 6 3D CAKE SLICES */
                    <g>
                      {/* Render order: back slices first (idx: 3, 2, 4, 1, 5, 0) for correct 3D overlap */}
                      {[3, 2, 4, 1, 5, 0].map((idx) => renderSlice(idx))}
                    </g>
                  )}

                  {/* 3. CENTER CANDLE & FLAME (Only rendered if cake has at least 1 slice) */}
                  {!isCakeEmpty && (
                    <g
                      transform={`translate(${cx}, ${cy - 12})`}
                      className="cursor-pointer"
                      onClick={handleCandleClick}
                    >
                      {/* Candle Wick */}
                      <line x1="0" y1="-32" x2="0" y2="-40" stroke="#221815" strokeWidth="1.8" strokeLinecap="round" />

                      {/* Candle Body */}
                      <rect
                        x="-4.5"
                        y="-32"
                        width="9"
                        height="34"
                        rx="2"
                        fill="#ffffff"
                        stroke="#e2e8f0"
                        strokeWidth="0.8"
                      />
                      {/* Gold candle spiral stripe */}
                      <path d="M -4.5 -26 Q 0 -22 4.5 -25 L 4.5 -19 Q 0 -16 -4.5 -20 Z" fill="#d4af37" opacity="0.8" />
                      <path d="M -4.5 -13 Q 0 -9 4.5 -12 L 4.5 -6 Q 0 -3 -4.5 -7 Z" fill="#d4af37" opacity="0.8" />

                      {/* Candle Flame (Flickering) */}
                      {candlesLit ? (
                        <g transform="translate(0, -42)" className="animate-flame-flicker origin-bottom">
                          {/* Flame Aura */}
                          <circle cx="0" cy="-6" r="14" fill="#f59e0b" opacity="0.3" filter="blur(4px)" />
                          {/* Outer Yellow Flame */}
                          <path
                            d="M 0 -18 C 5 -12 7 -4 4 2 C 2 5 -2 5 -4 2 C -7 -4 -5 -12 0 -18 Z"
                            fill="url(#flameGrad)"
                          />
                          {/* Inner White Hot Core */}
                          <ellipse cx="0" cy="-2" rx="2" ry="4" fill="#ffffff" />
                        </g>
                      ) : (
                        /* Smoke wisps when blown out */
                        smokeActive && (
                          <g transform="translate(0, -44)" className="animate-smoke-rise">
                            <path
                              d="M 0 0 Q -4 -10 2 -18 Q 8 -26 0 -34"
                              fill="none"
                              stroke="rgba(200, 200, 210, 0.65)"
                              strokeWidth="2"
                              strokeLinecap="round"
                              filter="blur(1px)"
                            />
                          </g>
                        )
                      )}
                    </g>
                  )}

                  <defs>
                    <linearGradient id="flameGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#ef4444" />
                      <stop offset="40%" stopColor="#f59e0b" />
                      <stop offset="90%" stopColor="#fef08a" />
                      <stop offset="100%" stopColor="#ffffff" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Slicing Knife Animation Overlay */}
                {activeCuttingIndex !== null && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
                    <div className="w-1.5 h-36 bg-gradient-to-b from-transparent via-gold-200 to-gold-500 shadow-[0_0_25px_#ffd700] transform -rotate-12 animate-pulse" />
                  </div>
                )}
              </div>

              {/* Interactive Slicing Buttons Below Cake */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                {candlesLit ? (
                  <button
                    onClick={handleCandleClick}
                    className="btn-gold px-6 py-2.5 rounded-full text-xs sm:text-sm font-serif tracking-wider flex items-center gap-2 shadow-lg hover:scale-105 transition-all cursor-pointer"
                  >
                    <Wind size={15} />
                    <span>Blow Out Candle 🎂</span>
                  </button>
                ) : null}

                {!isCakeEmpty ? (
                  <button
                    onClick={() => handleCutSlice()}
                    disabled={activeCuttingIndex !== null}
                    className="btn-gold px-7 py-3 rounded-full text-sm sm:text-base font-serif tracking-wider flex items-center gap-2.5 shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer font-bold"
                  >
                    <Cake size={17} />
                    <span>Cut Slice #{cutSlices.length + 1} 🍰</span>
                  </button>
                ) : (
                  <button
                    onClick={handleResetCake}
                    className="btn-gold px-7 py-3 rounded-full text-sm sm:text-base font-serif tracking-wider flex items-center gap-2.5 shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer font-bold"
                  >
                    <RotateCcw size={16} />
                    <span>Bake & Restore Cake 🎂</span>
                  </button>
                )}
              </div>

              <span className="text-[11px] font-serif text-zinc-400 mt-3 block">
                {isCakeEmpty
                  ? "🎉 Every slice has been placed on the serving platter!"
                  : "Tip: Tap 'Cut Slice' or click any slice directly on the cake to cut and serve it!"}
              </span>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: THE LUXURY SERVING PLATTER (Served Slices)
              ========================================================================= */}
          <div className="lg:col-span-5 flex flex-col items-center w-full">
            <div className="w-full glass-luxury rounded-3xl p-6 sm:p-7 border border-gold-400/40 shadow-2xl flex flex-col items-center">
              
              {/* Serving Platter Header */}
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gold-500/20 w-full justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-gold-500/10 border border-gold-500/30 text-gold-300">
                    <Cake size={16} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm sm:text-base font-cinzel font-bold text-white">
                      Dessert Serving Platter
                    </h4>
                    <span className="text-[10px] font-mono text-gold-400 uppercase tracking-widest block">
                      {cutSlices.length === 0 ? "Awaiting First Slice" : `${cutSlices.length} of 6 Slices Served`}
                    </span>
                  </div>
                </div>

                <div className="px-3 py-1 rounded-full bg-gold-500/15 border border-gold-400/40 text-gold-300 font-mono text-xs font-bold">
                  {cutSlices.length}/6 🍰
                </div>
              </div>

              {/* SERVING PLATE CONTAINER */}
              <div className="relative w-full min-h-[260px] flex flex-col items-center justify-center p-4 rounded-2xl bg-black/40 border border-gold-500/20 overflow-hidden">
                {cutSlices.length === 0 ? (
                  <div className="flex flex-col items-center text-center p-6 text-zinc-400">
                    <div className="w-16 h-16 rounded-full border-2 border-dashed border-gold-500/30 flex items-center justify-center text-gold-400 mb-3 opacity-60">
                      <Cake size={24} />
                    </div>
                    <p className="font-serif italic text-sm text-zinc-300">
                      "Cut a slice from the cake to place it here on the serving plate..."
                    </p>
                    <span className="text-[11px] font-sans text-gold-400/80 mt-2">
                      Ready for the Birthday Star Stella!
                    </span>
                  </div>
                ) : (
                  <div className="w-full flex flex-col gap-3 animate-fade-in">
                    {cutSlices.map((sliceIdx) => {
                      const dedication = SLICE_DEDICATIONS[sliceIdx];
                      const isLatest = justServedIndex === sliceIdx;

                      return (
                        <div
                          key={sliceIdx}
                          className={`p-3.5 rounded-xl border text-left transition-all duration-300 flex items-center gap-3.5 ${
                            isLatest
                              ? 'bg-gradient-to-r from-gold-950/60 via-amber-950/40 to-black/60 border-gold-400 shadow-[0_0_15px_rgba(212,175,55,0.4)] scale-[1.02]'
                              : 'bg-black/50 border-gold-500/20'
                          }`}
                        >
                          {/* Mini Realistic Cake Slice Icon */}
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#6d4c41] to-[#3e2723] border border-gold-400/40 flex items-center justify-center shrink-0 shadow-md relative">
                            <span className="text-base select-none">🍰</span>
                            {/* Little fresh strawberry badge */}
                            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-rose-600 border border-white/40" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-mono text-gold-400 uppercase tracking-widest font-bold">
                                {dedication.label}
                              </span>
                              {isLatest && (
                                <span className="text-[9px] font-serif bg-gold-500 text-black px-1.5 py-0.5 rounded-full font-bold">
                                  Just Served
                                </span>
                              )}
                            </div>
                            <h5 className="text-xs sm:text-sm font-serif font-bold text-white truncate">
                              {dedication.recipient}
                            </h5>
                            <p className="text-[11px] font-serif text-zinc-300 italic truncate">
                              {dedication.detail}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Dedication Footer */}
              <div className="mt-4 pt-3 border-t border-gold-500/15 w-full text-center flex items-center justify-center gap-1.5 text-xs font-serif text-gold-200/90">
                <Heart size={13} className="fill-red-500 text-red-500" />
                <span>Every slice shared with sweetness and devotion</span>
              </div>
            </div>
          </div>
        </div>

        {/* Wish Confirmation Card when Candle was blown */}
        {wishMade && (
          <div className="mt-8 max-w-xl w-full glass-luxury rounded-2xl p-5 border border-gold-400/40 text-center animate-fade-in shadow-2xl relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-gold-400/20 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center justify-center gap-2 text-gold-300 font-serif text-base sm:text-lg font-bold mb-2">
              <Heart size={16} className="text-red-500 fill-red-500" />
              <span>A Sweet Birthday Wish For Stella</span>
              <Heart size={16} className="text-red-500 fill-red-500" />
            </div>
            <p className="font-serif italic text-zinc-200 text-sm sm:text-base leading-relaxed">
              "May every dream whispered into this golden flame find its way to reality. May your 18th year and all the years ahead bring you infinite peace, radiant smiles, and boundless joy."
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
