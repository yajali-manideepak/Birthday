import React, { useState, useEffect, useRef } from 'react';
import { Lock, KeyRound, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PHOTO_CONFIG } from '../config/photos';

interface SecretLockProps {
  onUnlock: () => void;
  isUnlocked: boolean;
}

const SECRET_CODE = '301206';

export const SecretLock: React.FC<SecretLockProps> = ({ onUnlock, isUnlocked }) => {
  const [pin, setPin] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleDigit = (digit: string) => {
    if (isUnlocked || pin.length >= 6) return;
    setError(false);
    const newPin = pin + digit;
    setPin(newPin);

    if (newPin.length === 6) {
      validatePin(newPin);
    }
  };

  const handleDelete = () => {
    if (isUnlocked) return;
    setError(false);
    setPin((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    if (isUnlocked) return;
    setError(false);
    setPin('');
  };

  const validatePin = (enteredPin: string) => {
    if (enteredPin === SECRET_CODE) {
      // Golden fireworks and confetti
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#fbf5b7', '#d4af37', '#faef82', '#ffffff', '#ff4b72'],
      });
      setTimeout(() => {
        if (typeof onUnlock === 'function') {
          onUnlock();
        }
        window.dispatchEvent(new CustomEvent('stella:unlocked'));
      }, 500);
    } else {
      setError(true);
      setErrorMessage('Incorrect passcode. Please try again.');
      // Brief feedback, clear pin and stop error state so it doesn't get stuck
      setTimeout(() => {
        setPin('');
        setError(false);
      }, 700);
    }
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isUnlocked) return;
      if (e.key >= '0' && e.key <= '9') {
        handleDigit(e.key);
      } else if (e.key === 'Backspace') {
        handleDelete();
      } else if (e.key === 'Escape') {
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pin, isUnlocked]);

  // When unlocked, remove the lock completely so it doesn't stay visible in the above scroll
  if (isUnlocked) {
    return null;
  }

  return (
    <div className="my-8 max-w-md w-full mx-auto px-4 z-20">
      <div
        className={`glass-luxury rounded-3xl p-6 sm:p-8 gold-border-glow shadow-2xl transition-all duration-300 ${
          error ? 'border-red-500/80 shadow-[0_0_30px_rgba(239,68,68,0.4)] animate-shake' : ''
        }`}
      >
        {/* Stella's Profile Avatar with Glowing Gold Frame & Lock Badge */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-4 group">
          {/* Animated Gold Aura */}
          <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-gold-500 via-amber-400 to-yellow-300 opacity-60 blur-md group-hover:opacity-90 transition-opacity animate-pulse" />
          
          {/* Profile Picture Container */}
          <div className="relative w-full h-full rounded-full p-1 bg-gradient-to-b from-gold-300 via-gold-500 to-amber-700 shadow-2xl overflow-hidden">
            <img
              src={PHOTO_CONFIG.heroPhoto}
              alt="Stella"
              className="w-full h-full object-cover object-center rounded-full group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/40 via-transparent to-white/10 pointer-events-none" />
          </div>

          {/* Luxury Lock Badge on Avatar */}
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-black/90 border border-gold-400 shadow-[0_0_12px_rgba(212,175,55,0.7)] flex items-center justify-center text-gold-300">
            <Lock size={15} className="text-gold-300" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-white tracking-wider text-center">
          Enter the Password
        </h3>
        <p className="text-xs sm:text-sm text-zinc-300 font-serif text-center mt-1 mb-6">
          Enter the 6-digit password to unlock Stella's world
        </p>

        {/* Hidden input for mobile keyboard focus if needed */}
        <input
          ref={inputRef}
          type="tel"
          pattern="[0-9]*"
          maxLength={6}
          value={pin}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, '').slice(0, 6);
            setPin(val);
            if (val.length === 6) validatePin(val);
          }}
          className="sr-only"
          aria-label="Secret passcode input"
        />

        {/* 6-Digit PIN Boxes */}
        <div
          className="flex items-center justify-center gap-2 sm:gap-3 mb-6 cursor-pointer"
          onClick={() => inputRef.current?.focus()}
        >
          {Array.from({ length: 6 }).map((_, index) => {
            const digit = pin[index];
            const isCurrent = pin.length === index;

            return (
              <div
                key={index}
                className={`w-11 h-13 sm:w-12 sm:h-14 rounded-xl flex items-center justify-center font-mono text-xl sm:text-2xl font-bold transition-all duration-200 ${
                  digit
                    ? 'bg-gold-500/20 border-2 border-gold-400 text-gold-200 shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                    : isCurrent
                    ? 'bg-black/50 border-2 border-gold-400/80 shadow-[0_0_10px_rgba(212,175,55,0.3)] animate-pulse text-zinc-500'
                    : 'bg-black/40 border border-gold-500/20 text-zinc-600'
                }`}
              >
                {digit ? '•' : ''}
              </div>
            );
          })}
        </div>

        {/* Error message if any */}
        {error && (
          <div className="flex items-center justify-center gap-2 text-xs text-red-400 mb-4 animate-fade-in font-medium">
            <AlertCircle size={14} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Luxury On-Screen Keypad */}
        <div className="grid grid-cols-3 gap-2.5 max-w-[280px] mx-auto mb-4">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              onClick={() => handleDigit(num)}
              className="h-12 rounded-xl bg-black/40 hover:bg-gold-500/20 active:bg-gold-500 active:text-black border border-gold-500/20 hover:border-gold-400/60 text-gold-200 font-mono text-lg font-semibold transition-all duration-150 shadow-sm active:scale-95"
            >
              {num}
            </button>
          ))}
          <button
            onClick={handleClear}
            className="h-12 rounded-xl bg-black/40 hover:bg-red-500/20 active:bg-red-500 active:text-white border border-red-500/20 hover:border-red-400/40 text-red-300 font-serif text-xs font-semibold transition-all duration-150 uppercase"
          >
            Clear
          </button>
          <button
            onClick={() => handleDigit('0')}
            className="h-12 rounded-xl bg-black/40 hover:bg-gold-500/20 active:bg-gold-500 active:text-black border border-gold-500/20 hover:border-gold-400/60 text-gold-200 font-mono text-lg font-semibold transition-all duration-150 shadow-sm active:scale-95"
          >
            0
          </button>
          <button
            onClick={handleDelete}
            className="h-12 rounded-xl bg-black/40 hover:bg-amber-500/20 active:bg-amber-500 active:text-black border border-amber-500/20 hover:border-amber-400/40 text-amber-300 font-serif text-xs font-semibold transition-all duration-150 uppercase"
          >
            Del
          </button>
        </div>

      </div>
    </div>
  );
};
