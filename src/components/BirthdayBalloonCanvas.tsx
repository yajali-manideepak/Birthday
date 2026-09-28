import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, ChevronDown } from 'lucide-react';

interface BirthdayBalloonCanvasProps {
  onScrollToNext?: () => void;
}

export const BirthdayBalloonCanvas: React.FC<BirthdayBalloonCanvasProps> = ({
  onScrollToNext,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number | null>(null);
  const [hasRevealed, setHasRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let hw = w / 2;
    let hh = h / 2;

    const Tau = Math.PI * 2;
    const TauQuarter = Tau / 4;

    const getResponsiveOpts = () => {
      const isMobile = window.innerWidth < 640;
      const charSize = isMobile ? 24 : 36;
      const charSpacing = isMobile ? 30 : 44;
      const lineHeight = isMobile ? 44 : 62;

      return {
        strings: ['HAPPY', 'BIRTHDAY', 'STELLA'],
        charSize,
        charSpacing,
        lineHeight,
        cx: w / 2,
        cy: h / 2,
        fireworkPrevPoints: 10,
        fireworkBaseLineWidth: 4,
        fireworkAddedLineWidth: 6,
        fireworkSpawnTime: 180,
        fireworkBaseReachTime: 30,
        fireworkAddedReachTime: 30,
        fireworkCircleBaseSize: isMobile ? 16 : 22,
        fireworkCircleAddedSize: 10,
        fireworkCircleBaseTime: 25,
        fireworkCircleAddedTime: 25,
        fireworkCircleFadeBaseTime: 10,
        fireworkCircleFadeAddedTime: 5,
        fireworkBaseShards: 6,
        fireworkAddedShards: 6,
        fireworkShardPrevPoints: 3,
        fireworkShardBaseVel: 4,
        fireworkShardAddedVel: 2,
        fireworkShardBaseSize: 3,
        fireworkShardAddedSize: 3,
        gravity: 0.1,
        upFlow: -0.12,
        letterContemplatingWaitTime: 320,
        balloonSpawnTime: 20,
        balloonBaseInflateTime: 12,
        balloonAddedInflateTime: 12,
        balloonBaseSize: isMobile ? 18 : 26,
        balloonAddedSize: isMobile ? 12 : 18,
        balloonBaseVel: 0.45,
        balloonAddedVel: 0.45,
        balloonBaseRadian: -(Math.PI / 2 - 0.5),
        balloonAddedRadian: -1,
      };
    };

    let opts = getResponsiveOpts();
    let maxLen = Math.max(...opts.strings.map((s) => s.length));
    let totalWidth = opts.charSpacing * maxLen;

    function generateBalloonPath(cContext: CanvasRenderingContext2D, x: number, y: number, size: number) {
      cContext.moveTo(x, y);
      cContext.bezierCurveTo(
        x - size / 2,
        y - size / 2,
        x - size / 4,
        y - size,
        x,
        y - size
      );
      cContext.bezierCurveTo(
        x + size / 4,
        y - size,
        x + size / 2,
        y - size / 2,
        x,
        y
      );
    }

    class Shard {
      x: number;
      y: number;
      vx: number;
      vy: number;
      prevPoints: [number, number][];
      color: string;
      alive: boolean;
      size: number;

      constructor(x: number, y: number, vx: number, vy: number, color: string) {
        const vel = opts.fireworkShardBaseVel + opts.fireworkShardAddedVel * Math.random();
        this.vx = vx * vel;
        this.vy = vy * vel;
        this.x = x;
        this.y = y;
        this.prevPoints = [[x, y]];
        this.color = color;
        this.alive = true;
        this.size = opts.fireworkShardBaseSize + opts.fireworkShardAddedSize * Math.random();
      }

      step() {
        this.x += this.vx;
        this.y += (this.vy += opts.gravity);

        if (this.prevPoints.length > opts.fireworkShardPrevPoints) {
          this.prevPoints.shift();
        }
        this.prevPoints.push([this.x, this.y]);

        const lineWidthProportion = this.size / this.prevPoints.length;

        for (let k = 0; k < this.prevPoints.length - 1; ++k) {
          const point = this.prevPoints[k];
          const point2 = this.prevPoints[k + 1];

          if (ctx) {
            ctx.strokeStyle = this.color.replace('alp', String(k / this.prevPoints.length));
            ctx.lineWidth = k * lineWidthProportion;
            ctx.beginPath();
            ctx.moveTo(point[0], point[1]);
            ctx.lineTo(point2[0], point2[1]);
            ctx.stroke();
          }
        }

        if (this.prevPoints[0][1] > hh) {
          this.alive = false;
        }
      }
    }

    class Letter {
      char: string;
      x: number;
      y: number;
      dx: number;
      dy: number;
      fireworkDy: number;
      color: string;
      lightAlphaColor: string;
      lightColor: string;
      alphaColor: string;

      phase: 'firework' | 'contemplate' | 'balloon' | 'done' = 'firework';
      tick = 0;
      tick2 = 0;
      spawned = false;
      spawningTime = 0;
      reachTime = 0;
      lineWidth = 0;
      prevPoints: [number, number, number][] = [];

      circleFinalSize = 0;
      circleCompleteTime = 0;
      circleCreating = false;
      circleFading = false;
      circleFadeTime = 0;
      shards: Shard[] = [];

      spawning = false;
      spawnTime = 0;
      inflating = false;
      inflateTime = 0;
      size = 0;
      cx = 0;
      cy = 0;
      vx = 0;
      vy = 0;

      constructor(char: string, x: number, y: number) {
        this.char = char;
        this.x = x;
        this.y = y;

        ctx!.font = `bold ${opts.charSize}px "Plus Jakarta Sans", "Arial Rounded MT Bold", sans-serif`;
        this.dx = -ctx!.measureText(char).width / 2;
        this.dy = +opts.charSize / 2;
        this.fireworkDy = this.y - hh;

        const hue = ((x + totalWidth / 2) / totalWidth) * 360;
        this.color = `hsl(${hue}, 85%, 58%)`;
        this.lightAlphaColor = `hsla(${hue}, 85%, light%, alp)`;
        this.lightColor = `hsl(${hue}, 85%, light%)`;
        this.alphaColor = `hsla(${hue}, 85%, 58%, alp)`;

        this.reset();
      }

      reset() {
        this.phase = 'firework';
        this.tick = 0;
        this.tick2 = 0;
        this.spawned = false;
        this.spawningTime = (opts.fireworkSpawnTime * Math.random()) | 0;
        this.reachTime = (opts.fireworkBaseReachTime + opts.fireworkAddedReachTime * Math.random()) | 0;
        this.lineWidth = opts.fireworkBaseLineWidth + opts.fireworkAddedLineWidth * Math.random();
        this.prevPoints = [[0, hh, 0]];
        this.shards = [];
      }

      step() {
        if (!ctx) return;

        if (this.phase === 'firework') {
          if (!this.spawned) {
            ++this.tick;
            if (this.tick >= this.spawningTime) {
              this.tick = 0;
              this.spawned = true;
            }
          } else {
            ++this.tick;

            const linearProportion = this.tick / this.reachTime;
            const armonicProportion = Math.sin(linearProportion * TauQuarter);

            const x = linearProportion * this.x;
            const y = hh + armonicProportion * this.fireworkDy;

            if (this.prevPoints.length > opts.fireworkPrevPoints) {
              this.prevPoints.shift();
            }

            this.prevPoints.push([x, y, linearProportion * this.lineWidth]);

            const lineWidthProportion = 1 / Math.max(1, this.prevPoints.length - 1);

            for (let i = 1; i < this.prevPoints.length; ++i) {
              const point = this.prevPoints[i];
              const point2 = this.prevPoints[i - 1];

              ctx.strokeStyle = this.alphaColor.replace('alp', String(i / this.prevPoints.length));
              ctx.lineWidth = point[2] * lineWidthProportion * i;
              ctx.beginPath();
              ctx.moveTo(point[0], point[1]);
              ctx.lineTo(point2[0], point2[1]);
              ctx.stroke();
            }

            if (this.tick >= this.reachTime) {
              this.phase = 'contemplate';

              this.circleFinalSize = opts.fireworkCircleBaseSize + opts.fireworkCircleAddedSize * Math.random();
              this.circleCompleteTime = (opts.fireworkCircleBaseTime + opts.fireworkCircleAddedTime * Math.random()) | 0;
              this.circleCreating = true;
              this.circleFading = false;

              this.circleFadeTime = (opts.fireworkCircleFadeBaseTime + opts.fireworkCircleFadeAddedTime * Math.random()) | 0;
              this.tick = 0;
              this.tick2 = 0;
              this.shards = [];

              const shardCount = (opts.fireworkBaseShards + opts.fireworkAddedShards * Math.random()) | 0;
              const angle = Tau / shardCount;
              const cos = Math.cos(angle);
              const sin = Math.sin(angle);

              let sx = 1;
              let sy = 0;

              for (let i = 0; i < shardCount; ++i) {
                const x1 = sx;
                sx = sx * cos - sy * sin;
                sy = sy * cos + x1 * sin;

                this.shards.push(new Shard(this.x, this.y, sx, sy, this.alphaColor));
              }
            }
          }
        } else if (this.phase === 'contemplate') {
          ++this.tick;

          if (this.circleCreating) {
            ++this.tick2;
            const proportion = this.tick2 / Math.max(1, this.circleCompleteTime);
            const armonic = -Math.cos(proportion * Math.PI) / 2 + 0.5;

            ctx.beginPath();
            ctx.fillStyle = this.lightAlphaColor
              .replace('light', String(50 + 50 * proportion))
              .replace('alp', String(proportion));
            ctx.arc(this.x, this.y, armonic * this.circleFinalSize, 0, Tau);
            ctx.fill();

            if (this.tick2 > this.circleCompleteTime) {
              this.tick2 = 0;
              this.circleCreating = false;
              this.circleFading = true;
            }
          } else if (this.circleFading) {
            ctx.font = `bold ${opts.charSize}px "Plus Jakarta Sans", "Arial Rounded MT Bold", sans-serif`;
            ctx.fillStyle = this.lightColor.replace('light', '85');
            ctx.fillText(this.char, this.x + this.dx, this.y + this.dy);

            ++this.tick2;
            const proportion = this.tick2 / Math.max(1, this.circleFadeTime);
            const armonic = -Math.cos(proportion * Math.PI) / 2 + 0.5;

            ctx.beginPath();
            ctx.fillStyle = this.lightAlphaColor.replace('light', '100').replace('alp', String(1 - armonic));
            ctx.arc(this.x, this.y, this.circleFinalSize, 0, Tau);
            ctx.fill();

            if (this.tick2 >= this.circleFadeTime) {
              this.circleFading = false;
            }
          } else {
            ctx.font = `bold ${opts.charSize}px "Plus Jakarta Sans", "Arial Rounded MT Bold", sans-serif`;
            ctx.fillStyle = this.lightColor.replace('light', '88');
            ctx.fillText(this.char, this.x + this.dx, this.y + this.dy);
          }

          for (let i = 0; i < this.shards.length; ++i) {
            this.shards[i].step();
            if (!this.shards[i].alive) {
              this.shards.splice(i, 1);
              --i;
            }
          }

          if (this.tick > opts.letterContemplatingWaitTime) {
            this.phase = 'balloon';
            this.tick = 0;
            this.spawning = true;
            this.spawnTime = (opts.balloonSpawnTime * Math.random()) | 0;
            this.inflating = false;
            this.inflateTime = (opts.balloonBaseInflateTime + opts.balloonAddedInflateTime * Math.random()) | 0;
            this.size = (opts.balloonBaseSize + opts.balloonAddedSize * Math.random()) | 0;

            const rad = opts.balloonBaseRadian + opts.balloonAddedRadian * Math.random();
            const vel = opts.balloonBaseVel + opts.balloonAddedVel * Math.random();

            this.vx = Math.cos(rad) * vel;
            this.vy = Math.sin(rad) * vel;
          }
        } else if (this.phase === 'balloon') {
          ctx.strokeStyle = this.lightColor.replace('light', '85');
          ctx.lineWidth = 1.5;

          if (this.spawning) {
            ++this.tick;
            ctx.font = `bold ${opts.charSize}px "Plus Jakarta Sans", "Arial Rounded MT Bold", sans-serif`;
            ctx.fillStyle = this.lightColor.replace('light', '85');
            ctx.fillText(this.char, this.x + this.dx, this.y + this.dy);

            if (this.tick >= this.spawnTime) {
              this.tick = 0;
              this.spawning = false;
              this.inflating = true;
            }
          } else if (this.inflating) {
            ++this.tick;
            const proportion = this.tick / Math.max(1, this.inflateTime);
            const x = (this.cx = this.x);
            const y = (this.cy = this.y - this.size * proportion);

            ctx.fillStyle = this.alphaColor.replace('alp', String(proportion * 0.85));
            ctx.beginPath();
            generateBalloonPath(ctx, x, y, this.size * proportion);
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, this.y);
            ctx.stroke();

            ctx.font = `bold ${opts.charSize}px "Plus Jakarta Sans", "Arial Rounded MT Bold", sans-serif`;
            ctx.fillStyle = '#ffffff';
            ctx.fillText(this.char, this.x + this.dx, this.y + this.dy);

            if (this.tick >= this.inflateTime) {
              this.tick = 0;
              this.inflating = false;
            }
          } else {
            this.cx += this.vx;
            this.cy += this.vy += opts.upFlow;

            ctx.fillStyle = this.color;
            ctx.beginPath();
            generateBalloonPath(ctx, this.cx, this.cy, this.size);
            ctx.fill();

            // Balloon highlight reflection shine
            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.beginPath();
            ctx.arc(this.cx - this.size / 4, this.cy - this.size * 0.7, this.size / 6, 0, Tau);
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(this.cx, this.cy);
            ctx.lineTo(this.cx, this.cy + this.size);
            ctx.stroke();

            ctx.font = `bold ${opts.charSize}px "Plus Jakarta Sans", "Arial Rounded MT Bold", sans-serif`;
            ctx.fillStyle = '#ffffff';
            ctx.fillText(this.char, this.cx + this.dx, this.cy - this.size * 0.4);

            if (this.cy + this.size < -hh || this.cx < -hw || this.cx > hw) {
              this.phase = 'done';
            }
          }
        }
      }
    }

    let letters: Letter[] = [];

    const initLetters = () => {
      letters = [];
      opts = getResponsiveOpts();
      maxLen = Math.max(...opts.strings.map((s) => s.length));
      totalWidth = opts.charSpacing * maxLen;

      for (let i = 0; i < opts.strings.length; ++i) {
        const line = opts.strings[i];
        const lineLen = line.length;
        for (let j = 0; j < lineLen; ++j) {
          const lx = (j - (lineLen - 1) / 2) * opts.charSpacing;
          const ly = (i - (opts.strings.length - 1) / 2) * opts.lineHeight;
          letters.push(new Letter(line[j], lx, ly));
        }
      }
    };

    initLetters();

    let frameCount = 0;
    const anim = () => {
      animFrameId.current = window.requestAnimationFrame(anim);
      frameCount++;

      if (frameCount > 80 && !hasRevealed) {
        setHasRevealed(true);
      }

      // Smooth dark background trail
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, w, h);

      ctx.save();
      ctx.translate(hw, hh);

      let done = true;
      for (let l = 0; l < letters.length; ++l) {
        letters[l].step();
        if (letters[l].phase !== 'done') {
          done = false;
        }
      }

      ctx.restore();

      if (done) {
        for (let l = 0; l < letters.length; ++l) {
          letters[l].reset();
        }
      }
    };

    anim();

    const handleResize = () => {
      if (!canvas) return;
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      hw = w / 2;
      hh = h / 2;
      initLetters();
    };

    window.addEventListener('resize', handleResize);

    // Canvas click to spawn fireworks interaction
    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left - hw;
      const clickY = e.clientY - rect.top - hh;

      // Retrigger any random letters or spawn burst
      const targetLetters = letters.filter(
        (l) => l.phase === 'contemplate' || l.phase === 'balloon'
      );
      if (targetLetters.length > 0) {
        const chosen = targetLetters[Math.floor(Math.random() * targetLetters.length)];
        chosen.reset();
      }
    };

    canvas.addEventListener('click', handleCanvasClick);

    return () => {
      if (animFrameId.current) {
        window.cancelAnimationFrame(animFrameId.current);
      }
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('click', handleCanvasClick);
    };
  }, []);

  const handleScroll = () => {
    if (onScrollToNext) {
      onScrollToNext();
    } else {
      const target = document.getElementById('calendar-section') || document.getElementById('portrait-section');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative w-full min-h-[90vh] sm:min-h-screen bg-[#050508] overflow-hidden select-none flex flex-col justify-between items-center z-20 py-8">
      {/* HTML5 Canvas Fireworks & Balloons */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-pointer z-0"
        title="Tap to trigger fireworks"
      />

      {/* Top subtle badge */}
      <div className="relative z-10 pt-4 px-4 text-center pointer-events-none">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/50 border border-gold-500/20 backdrop-blur-md text-xs sm:text-sm font-serif tracking-[0.25em] text-gold-200/90 uppercase shadow-lg">
          <Sparkles size={14} className="text-gold-400 animate-spin-slow" />
          A Special Birthday Celebration
          <Sparkles size={14} className="text-gold-400 animate-spin-slow" />
        </div>
      </div>

      {/* Bottom Floating Navigation Controls (Replay removed as requested) */}
      <div className="relative z-10 pb-6 px-4 flex flex-col items-center gap-3">
        <button
          onClick={handleScroll}
          className="btn-gold px-8 py-3 rounded-full text-xs sm:text-sm font-serif tracking-wider flex items-center gap-2.5 cursor-pointer shadow-2xl group hover:scale-105 transition-all"
        >
          <span>Open Your Birthday Surprise</span>
          <ChevronDown size={17} className="group-hover:translate-y-0.5 transition-transform" />
        </button>

        <span className="text-[10px] sm:text-xs text-gold-300/60 font-serif tracking-widest uppercase">
          Scroll down to explore the journey
        </span>
      </div>
    </section>
  );
};
