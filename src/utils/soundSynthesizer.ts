/**
 * Romantic Cinematic Web Audio Ambient Synth & Audio Bridge
 * 
 * Generates an emotional, warm, gentle piano & harp chord progression
 * in case an external mp3 file is not yet placed in /public/assets/birthday-music.mp3.
 * If /public/assets/birthday-music.mp3 exists, the AudioPlayer will play that directly!
 */

class RomanticAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private intervalId: any = null;
  private volume: number = 0.5;

  // Chord progression: Dmaj9 -> Bm7 -> Gmaj7 -> A7sus4 (gentle, emotional, cinematic)
  private chords = [
    [146.83, 220.00, 277.18, 369.99, 440.00, 554.37], // Dmaj9 (D3, A3, C#4, F#4, A4, C#5)
    [123.47, 185.00, 220.00, 277.18, 369.99, 440.00], // Bm7 (B2, F#3, A3, C#4, F#4, A4)
    [98.00, 146.83, 196.00, 246.94, 293.66, 369.99],  // Gmaj7 (G2, D3, G3, B3, D4, F#4)
    [110.00, 164.81, 220.00, 293.66, 329.63, 440.00], // A7sus4 (A2, E3, A3, D4, E4, A4)
  ];
  private currentChordIdx = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playPluck(freq: number, time: number, duration: number = 3.5, gainLevel: number = 0.15) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const noteGain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 1.002, time); // slight chorus detune

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, time);
    filter.frequency.exponentialRampToValueAtTime(350, time + duration);

    // Warm envelope
    noteGain.gain.setValueAtTime(0.0001, time);
    noteGain.gain.linearRampToValueAtTime(gainLevel, time + 0.05);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(filter);
    osc2.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc.start(time);
    osc2.start(time);
    osc.stop(time + duration);
    osc2.stop(time + duration);
  }

  public start() {
    this.initContext();
    if (this.isPlaying || !this.ctx || !this.masterGain) return;
    this.isPlaying = true;

    // Smooth fade in
    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.masterGain.gain.linearRampToValueAtTime(this.volume, this.ctx.currentTime + 2.0);

    const stepChord = () => {
      if (!this.isPlaying || !this.ctx) return;
      const now = this.ctx.currentTime;
      const chord = this.chords[this.currentChordIdx];

      // Arpeggiate notes gently
      chord.forEach((note, index) => {
        const noteDelay = index * 0.35 + (Math.random() * 0.08);
        this.playPluck(note, now + noteDelay, 4.2, 0.12);
      });

      // Extra shimmering high bell note
      if (Math.random() > 0.3) {
        const highNote = chord[chord.length - 1] * 2;
        this.playPluck(highNote, now + 1.6, 2.5, 0.05);
      }

      this.currentChordIdx = (this.currentChordIdx + 1) % this.chords.length;
    };

    stepChord();
    this.intervalId = setInterval(stepChord, 3800);
  }

  public stop() {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;
    this.isPlaying = false;
    this.masterGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 1.0);
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.ctx && this.masterGain && this.isPlaying) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public getIsPlaying() {
    return this.isPlaying;
  }

  /**
   * Synthesize a crisp party popper / cracker pop sound
   */
  public playPop() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Punchy transient oscillator
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(650, now);
      osc.frequency.exponentialRampToValueAtTime(70, now + 0.12);

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      // Noise burst for the "snap/crack" of a party popper
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.08);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(2200, now);
      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.35, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.15);
      noise.start(now);
      noise.stop(now + 0.09);
    } catch {
      // Audio context might need user gesture
    }
  }

  /**
   * Synthesize a gentle breath whoosh when blowing candles
   */
  public playBlow() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const duration = 0.7;

      const bufferSize = Math.floor(this.ctx.sampleRate * duration);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.3;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(900, now);
      filter.frequency.exponentialRampToValueAtTime(250, now + duration);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + duration);
    } catch {
      // Ignore
    }
  }

  /**
   * Synthesize celebratory sparkle chimes (fanfare)
   */
  public playChime() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6

      notes.forEach((freq, idx) => {
        const startTime = now + idx * 0.09;
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(0.18, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.2);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(startTime);
        osc.stop(startTime + 1.2);
      });
    } catch {
      // Ignore
    }
  }

  /**
   * Synthesize a gentle cake slice whoosh
   */
  public playSlice() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch {
      // Ignore
    }
  }
}

export const synthAudio = new RomanticAudioSynthesizer();
