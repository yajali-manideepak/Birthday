import React, { useState, useEffect, useRef } from 'react';
import { Lock, Unlock, KeyRound, Sparkles, AlertCircle, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SecretLockProps {
  onUnlock: () => void;
  isUnlocked: boolean;
}

const SECRET_CODE = '301206';

export const SecretLock: React.FC<SecretLockProps> = ({ onUnlock, isUnlocked }) => {
  const [pin, setPin] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showHint, setShowHint] = useState<boolean>(false);
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
      setErrorMessage('Incorrect code. Please enter the correct passcode.');
      // Shake feedback, clear pin after delay
      setTimeout(() => {
        setPin('');
      }, 800);
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

  if (isUnlocked) {
    return (
      <div className="my-10 p-6 glass-luxury rounded-3xl border border-gold-400/60 shadow-[0_0_40px_rgba(212,175,55,0.3)] max-w-md mx-auto text-center animate-fade-in">
        <div className="w-14 h-14 mx-auto rounded-full bg-gold-500/20 border border-gold-400/50 flex items-center justify-center text-gold-300 mb-3 shadow-[0_0_25px_rgba(212,175,55,0.5)]">
          <Unlock size={26} className="text-gold-300" />
        </div>
        <h4 className="text-xl font-cinzel font-bold text-white tracking-wide">
          Passcode Verified ✨
        </h4>
        <p className="text-xs font-serif text-gold-300/80 mt-1">
          Welcome to Stella’s Birthday Universe
        </p>
      </div>
    );
  }

  return (
    <div className="my-8 max-w-md w-full mx-auto px-4 z-20">
      <div
        className={`glass-luxury rounded-3xl p-6 sm:p-8 gold-border-glow shadow-2xl transition-all duration-300 ${
          error ? 'border-red-500/80 shadow-[0_0_30px_rgba(239,68,68,0.4)] animate-bounce' : ''
        }`}
      >
        {/* Header Icon */}
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-gold-600/30 via-gold-400/20 to-transparent border border-gold-400/50 flex items-center justify-center text-gold-300 mb-4 shadow-[0_0_20px_rgba(212,175,55,0.25)] relative group">
          <Lock size={26} className="text-gold-300 group-hover:scale-110 transition-transform" />
          <Sparkles size={14} className="text-gold-400 absolute top-2 right-2 animate-spin-slow" />
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-white tracking-wider text-center">
          Secret Birthday Passcode
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400 font-serif text-center mt-1 mb-6">
          Enter the 6-digit key to unlock Stella's special world
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

        {/* Hint button */}
        <div className="text-center pt-2 border-t border-gold-500/15">
          <button
            onClick={() => setShowHint(!showHint)}
            className="inline-flex items-center gap-1.5 text-xs text-gold-400/80 hover:text-gold-200 transition-colors"
          >
            <HelpCircle size={13} />
            <span>{showHint ? 'Hide Hint' : 'Need a Hint?'}</span>
          </button>

          {showHint && (
            <p className="text-xs text-gold-200/90 font-serif italic mt-2 animate-fade-in">
              Hint: Stella’s birth date (DDMMYY) — 30 • 12 • 06
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
