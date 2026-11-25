import { useCallback, useEffect, useRef, useState } from 'react';
import { Sparkles, ArrowRight, PartyPopper } from 'lucide-react';
import { DakgalbiWarriorSprite, MakguksuWarriorSprite } from './PixelSprites';
import { soundEngine } from '../utils/soundEngine';

interface KingdomSavedCutsceneProps {
  onContinueToOutro: () => void;
}

interface FireworkRocket {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetY: number;
  color: string;
}

interface FireworkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  life: number;
  maxLife: number;
  size: number;
}

const FIREWORK_COLORS = [
  '#FF5722',
  '#FFD54F',
  '#1E88E5',
  '#A5D6A7',
  '#FF80AB',
  '#4DD0E1',
  '#FFFFFF',
];

const CONFETTI_PIECES = [
  { left: '8%', color: '#FF5722', delay: '0s', duration: '2.4s' },
  { left: '16%', color: '#FFD54F', delay: '0.5s', duration: '2.8s' },
  { left: '24%', color: '#1E88E5', delay: '1.1s', duration: '2.3s' },
  { left: '33%', color: '#A5D6A7', delay: '0.2s', duration: '2.7s' },
  { left: '42%', color: '#FF80AB', delay: '0.9s', duration: '2.5s' },
  { left: '53%', color: '#FFD54F', delay: '0.35s', duration: '2.6s' },
  { left: '62%', color: '#4DD0E1', delay: '1.4s', duration: '2.4s' },
  { left: '71%', color: '#FF5722', delay: '0.7s', duration: '2.9s' },
  { left: '80%', color: '#A5D6A7', delay: '0.15s', duration: '2.5s' },
  { left: '89%', color: '#FF80AB', delay: '1.0s', duration: '2.7s' },
];

function PixelCheeringCitizen({
  shirtColor,
  hairColor,
  stickColor,
  jumpClass,
  swayClass,
}: {
  shirtColor: string;
  hairColor: string;
  stickColor: string;
  jumpClass: string;
  swayClass: string;
}) {
  return (
    <svg viewBox="0 0 16 20" shapeRendering="crispEdges" className={`w-7 h-9 sm:w-9 sm:h-11 ${jumpClass}`} aria-hidden="true">
      {/* Hair & Head */}
      <rect x="5" y="2" width="6" height="2" fill={hairColor} />
      <rect x="5" y="4" width="6" height="4" fill="#FFE0B2" />
      <rect x="6" y="5" width="1" height="1" fill="#1A1A2E" />
      <rect x="9" y="5" width="1" height="1" fill="#1A1A2E" />
      {/* Happy smile */}
      <rect x="7" y="7" width="2" height="1" fill="#E53935" />
      {/* Shirt */}
      <rect x="4" y="8" width="8" height="6" fill={shirtColor} />
      {/* Raised cheering arms */}
      <rect x="2" y="6" width="2" height="4" fill="#FFE0B2" />
      <rect x="12" y="6" width="2" height="4" fill="#FFE0B2" />
      {/* Waving celebration flag/lightstick */}
      <g className={swayClass}>
        <rect x="12" y="1" width="2" height="5" fill={stickColor} />
        <rect x="11" y="1" width="4" height="2" fill="#FFFFFF" opacity="0.7" />
      </g>
      {/* Legs */}
      <rect x="5" y="14" width="2" height="5" fill="#1A1A2E" />
      <rect x="9" y="14" width="2" height="5" fill="#1A1A2E" />
    </svg>
  );
}

function PixelTrophy() {
  return (
    <svg viewBox="0 0 16 16" shapeRendering="crispEdges" className="w-8 h-8 sm:w-10 sm:h-10 drop-shadow-[0_2px_0_#1A1A2E]" aria-hidden="true">
      <rect x="3" y="2" width="10" height="2" fill="#FFD54F" />
      <rect x="4" y="4" width="8" height="4" fill="#FFB300" />
      <rect x="1" y="3" width="2" height="3" fill="#FFD54F" />
      <rect x="13" y="3" width="2" height="3" fill="#FFD54F" />
      <rect x="6" y="8" width="4" height="2" fill="#FFD54F" />
      <rect x="7" y="10" width="2" height="2" fill="#FFB300" />
      <rect x="4" y="12" width="8" height="3" fill="#5D4037" />
      <rect x="5" y="4" width="2" height="2" fill="#FFF8E1" />
    </svg>
  );
}

export function KingdomSavedCutscene({ onContinueToOutro }: KingdomSavedCutsceneProps) {
  const [phase, setPhase] = useState<'marching' | 'meet' | 'celebrate'>('marching');
  const [burstCount, setBurstCount] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rocketsRef = useRef<FireworkRocket[]>([]);
  const particlesRef = useRef<FireworkParticle[]>([]);

  const spawnBurstAt = useCallback((x: number, y: number, color?: string) => {
    const baseColor = color ?? FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)];
    const secondaryColor = FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)];
    const count = 28;
    for (let i = 0; i < count; i += 1) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.2;
      const speed = 1.8 + Math.random() * 3.8;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: i % 3 === 0 ? secondaryColor : baseColor,
        life: 0,
        maxLife: 38 + Math.floor(Math.random() * 22),
        size: i % 2 === 0 ? 6 : 4,
      });
    }
    // Inner sparkle ring
    for (let i = 0; i < 12; i += 1) {
      const angle = (Math.PI * 2 * i) / 12;
      const speed = 1.0 + Math.random() * 1.4;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: '#FFFFFF',
        life: 0,
        maxLife: 24 + Math.floor(Math.random() * 10),
        size: 4,
      });
    }
  }, []);

  const launchSalvo = useCallback((count = 3, withSound = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (withSound) {
      soundEngine.playSfx('firework');
    }
    for (let i = 0; i < count; i += 1) {
      const startX = canvas.width * (0.12 + Math.random() * 0.76);
      const targetY = canvas.height * (0.1 + Math.random() * 0.38);
      rocketsRef.current.push({
        x: startX,
        y: canvas.height - 10,
        vx: (Math.random() - 0.5) * 1.8,
        vy: -(8.5 + Math.random() * 3.5),
        targetY,
        color: FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)],
      });
    }
  }, []);

  // Choreography timeline + victory fanfare
  useEffect(() => {
    soundEngine.playSfx('victory');
    const meetTimer = window.setTimeout(() => {
      setPhase('meet');
      soundEngine.playSfx('firework');
      launchSalvo(4, false);
    }, 1050);

    const celebrateTimer = window.setTimeout(() => {
      setPhase('celebrate');
      launchSalvo(3, false);
    }, 1550);

    return () => {
      window.clearTimeout(meetTimer);
      window.clearTimeout(celebrateTimer);
    };
  }, [launchSalvo]);

  // 16-bit Pixel Fireworks Canvas Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    if (reducedMotion) {
      // Draw static festive pixel firework bursts for reduced-motion preference
      spawnBurstAt(canvas.width * 0.16, canvas.height * 0.2, '#FF5722');
      spawnBurstAt(canvas.width * 0.84, canvas.height * 0.18, '#FFD54F');
      particlesRef.current.forEach((p) => {
        ctx.fillStyle = p.color;
        const px = Math.round((p.x + p.vx * 8) / 4) * 4;
        const py = Math.round((p.y + p.vy * 8) / 4) * 4;
        ctx.fillRect(px, py, p.size, p.size);
      });
      return () => window.removeEventListener('resize', resize);
    }

    // Initial celebratory rockets
    launchSalvo(3, false);

    const salvoInterval = window.setInterval(() => {
      launchSalvo(2, false);
    }, 1350);

    let rafId = 0;
    const render = () => {
      ctx.fillStyle = 'rgba(15, 16, 36, 0.28)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update & draw ascending pixel rockets
      const nextRockets: FireworkRocket[] = [];
      for (const r of rocketsRef.current) {
        r.x += r.vx;
        r.y += r.vy;
        r.vy += 0.12;

        // Snap to 4px pixel grid
        const gx = Math.round(r.x / 4) * 4;
        const gy = Math.round(r.y / 4) * 4;
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(gx, gy, 4, 8);
        ctx.fillStyle = r.color;
        ctx.fillRect(gx, gy + 8, 4, 8);

        if (r.y <= r.targetY || r.vy >= -1.2) {
          spawnBurstAt(r.x, r.y, r.color);
        } else {
          nextRockets.push(r);
        }
      }
      rocketsRef.current = nextRockets;

      // Update & draw pixel firework particles
      const nextParticles: FireworkParticle[] = [];
      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy = p.vy * 0.96 + 0.08;
        p.life += 1;

        if (p.life < p.maxLife) {
          const alpha = 1 - p.life / p.maxLife;
          ctx.globalAlpha = alpha;
          ctx.fillStyle = p.color;
          const gx = Math.round(p.x / 4) * 4;
          const gy = Math.round(p.y / 4) * 4;
          ctx.fillRect(gx, gy, p.size, p.size);
          nextParticles.push(p);
        }
      }
      ctx.globalAlpha = 1;
      particlesRef.current = nextParticles;

      rafId = window.requestAnimationFrame(render);
    };

    rafId = window.requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      window.clearInterval(salvoInterval);
      window.cancelAnimationFrame(rafId);
    };
  }, [launchSalvo, spawnBurstAt]);

  const handleFireBonusFireworks = () => {
    setBurstCount((c) => c + 1);
    launchSalvo(4, true);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0F1024] text-[#F5E6D3] flex items-center justify-center p-4 sm:p-6 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label="닭갈비 왕국 구출 엔딩 애니메이션"
    >
      {/* Full-Screen 16-bit Pixel Fireworks Canvas */}
      <canvas
        ref={canvasRef}
        onClick={(e) => {
          soundEngine.playSfx('firework');
          spawnBurstAt(e.clientX, e.clientY);
          setBurstCount((c) => c + 1);
        }}
        className="absolute inset-0 w-full h-full cursor-crosshair"
        aria-hidden="true"
      />

      {/* Main Pixel Cutscene Stage */}
      <div className="relative z-10 w-full max-w-3xl pixel-box bg-[#1A1A2E]/95 p-4 sm:p-8 text-center space-y-5 sm:space-y-6 max-h-[92dvh] overflow-y-auto">
        <div className="inline-flex items-center gap-1.5 font-pixel text-[11px] sm:text-xs text-[#FFD54F] px-3 py-1 bg-[#28284A] border-2 border-[#FFD54F]">
          <Sparkles className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>QUEST COMPLETE · ALL 6 STAGES CLEAR</span>
        </div>

        {/* Animated Pixel Castle + Heroes + Cheering Crowd Scene */}
        <div className="relative h-60 sm:h-72 bg-[#13142B] border-4 border-[#F5E6D3] overflow-hidden flex flex-col justify-end p-4">
          {/* Twinkling Night Stars + Mini Pixel Fireworks Inside Backdrop */}
          <div className="absolute inset-0 pointer-events-none select-none">
            {[
              { left: '8%', top: '14%', color: '#FFD54F' },
              { left: '22%', top: '10%', color: '#90CAF9' },
              { left: '44%', top: '8%', color: '#FFFFFF' },
              { left: '68%', top: '12%', color: '#FFD54F' },
              { left: '90%', top: '16%', color: '#A5D6A7' },
            ].map((star, idx) => (
              <div
                key={idx}
                className="absolute w-1.5 h-1.5 animate-pulse"
                style={{ left: star.left, top: star.top, backgroundColor: star.color }}
              />
            ))}

            {/* Stage Pixel Confetti Rain during Celebration */}
            {phase === 'celebrate' &&
              CONFETTI_PIECES.map((c, idx) => (
                <div
                  key={idx}
                  className="absolute top-0 w-2 h-2 sm:w-2.5 sm:h-2.5 animate-confetti-fall"
                  style={{
                    left: c.left,
                    backgroundColor: c.color,
                    animationDelay: c.delay,
                    animationDuration: c.duration,
                  }}
                />
              ))}
          </div>

          {/* Celebration Banner inside scene once arrived */}
          {phase !== 'marching' && (
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-30 px-3.5 py-1 bg-[#FFD54F] text-[#1A1A2E] border-2 sm:border-3 border-[#1A1A2E] font-pixel text-[11px] sm:text-sm max-w-[92%] truncate animate-stamp shadow-[3px_3px_0_#1A1A2E]">
              🎉 닭갈비 왕국 구출 대성공! 🎉
            </div>
          )}

          {/* Impact / High-Five Starburst when heroes meet */}
          {phase === 'meet' && (
            <div className="absolute left-[46%] bottom-24 z-30 font-pixel text-2xl sm:text-3xl text-[#FFD54F] animate-ping pointer-events-none">
              ★
            </div>
          )}

          {/* Pixel Castle Silhouette (Dakgalbi Kingdom) with Lit Torches & Fluttering Banners */}
          <div className="absolute right-2 sm:right-8 bottom-10 flex flex-col items-center pointer-events-none z-10">
            <div className="font-pixel text-[9px] sm:text-[10px] px-1.5 py-0.5 bg-[#FF5722] text-white border border-white mb-1 shadow-[2px_2px_0_#1A1A2E]">
              닭갈비 왕국
            </div>
            <svg viewBox="0 0 28 20" shapeRendering="crispEdges" className="w-20 h-16 sm:w-32 sm:h-24">
              {/* Left & Right Towers */}
              <rect x="2" y="5" width="5" height="15" fill="#3949AB" />
              <rect x="21" y="5" width="5" height="15" fill="#3949AB" />
              {/* Center Keep */}
              <rect x="7" y="7" width="14" height="13" fill="#5C6BC0" />
              {/* Fluttering Pixel Flags */}
              <g className="animate-banner-flutter">
                <rect x="4" y="1" width="1" height="4" fill="#FFD54F" />
                <rect x="5" y="1" width="3" height="2" fill="#FF5722" />
                <rect x="23" y="1" width="1" height="4" fill="#FFD54F" />
                <rect x="24" y="1" width="3" height="2" fill="#1E88E5" />
              </g>
              {/* Center Crown Spire */}
              <rect x="13" y="2" width="2" height="5" fill="#FFD54F" />
              <rect x="12" y="1" width="4" height="2" fill="#FF5722" />
              {/* Glowing Castle Windows */}
              <rect x="9" y="9" width="2" height="2" fill="#FFD54F" />
              <rect x="17" y="9" width="2" height="2" fill="#FFD54F" />
              {/* Castle Gate (Bright Warm Golden Glow when saved) */}
              <rect x="11" y="13" width="6" height="7" fill="#FFD54F" />
              <rect x="12" y="14" width="4" height="6" fill={phase === 'marching' ? '#1A1A2E' : '#FFF8E1'} />
              {/* Lit Torches on Left & Right Walls */}
              <rect x="3" y="13" width="1" height="3" fill="#5D4037" />
              <rect x="24" y="13" width="1" height="3" fill="#5D4037" />
              <g className="animate-flame">
                <rect x="3" y="11" width="2" height="2" fill="#FF5722" />
                <rect x="24" y="11" width="2" height="2" fill="#FF5722" />
              </g>
            </svg>
          </div>

          {/* Cheering Pixel Citizens on the Grass during Celebration */}
          {phase === 'celebrate' && (
            <>
              <div className="absolute left-3 sm:left-6 bottom-9 z-20 flex items-end gap-1 sm:gap-2">
                <PixelCheeringCitizen
                  shirtColor="#1E88E5"
                  hairColor="#3E2723"
                  stickColor="#FFD54F"
                  jumpClass="animate-pixel-jump-a"
                  swayClass="animate-lightstick-a"
                />
                <PixelCheeringCitizen
                  shirtColor="#FF5722"
                  hairColor="#1A1A2E"
                  stickColor="#4DD0E1"
                  jumpClass="animate-pixel-jump-b"
                  swayClass="animate-lightstick-b"
                />
              </div>

              {/* Floating Celebration Notes & Hearts */}
              <div className="absolute left-[14%] bottom-20 z-20 font-pixel text-xs sm:text-sm text-[#FFD54F] animate-pixel-float pointer-events-none">
                ♪ ★
              </div>
              <div className="absolute left-[50%] bottom-28 z-20 font-pixel text-xs sm:text-sm text-[#FF80AB] animate-pixel-float pointer-events-none">
                ♥ ♫
              </div>
            </>
          )}

          {/* Ground Floor */}
          <div className="h-10 bg-[#2E7D32] border-t-4 border-[#A5D6A7] -mx-4 -mb-4 relative z-10" />

          {/* Makguksu Warrior marching into the Kingdom to join Dakgalbi Warrior */}
          <div
            className={`absolute bottom-9 z-20 transition-all duration-1000 ease-out flex flex-col items-center -translate-x-1/2 ${
              phase === 'marching' ? 'left-[15%]' : 'left-[35%] sm:left-[40%]'
            }`}
          >
            {phase === 'marching' && (
              <div className="mb-1 px-2 py-0.5 bg-white text-[#1A1A2E] border-2 border-[#1A1A2E] font-pixel text-[10px] whitespace-nowrap">
                돌격!
              </div>
            )}
            {phase === 'celebrate' && (
              <div className="mb-1 px-2 py-0.5 bg-[#E3F2FD] text-[#1565C0] border-2 border-[#1A1A2E] font-pixel text-[10px] whitespace-nowrap animate-speech-pop">
                축제 대성공!
              </div>
            )}
            <div className={phase === 'marching' ? 'animate-avatar-walk' : 'animate-victory-hop'}>
              <MakguksuWarriorSprite className="w-12 h-12 sm:w-20 sm:h-20" />
            </div>
          </div>

          {/* Floating Gold Trophy between Both Heroes once Celebrated */}
          {phase === 'celebrate' && (
            <div className="absolute left-[46%] sm:left-[51%] bottom-20 sm:bottom-24 -translate-x-1/2 z-30 animate-pixel-bob pointer-events-none">
              <PixelTrophy />
            </div>
          )}

          {/* Dakgalbi Warrior celebrating at the castle gate */}
          <div className="absolute bottom-9 right-[24%] sm:right-[28%] z-20 flex flex-col items-center">
            {phase === 'celebrate' && (
              <div className="mb-1 px-2 py-0.5 bg-[#FFF3E0] text-[#E53935] border-2 border-[#1A1A2E] font-pixel text-[10px] whitespace-nowrap animate-speech-pop">
                왕국 만세!
              </div>
            )}
            <div className={phase === 'celebrate' ? 'animate-victory-hop' : 'animate-pixel-bob'}>
              <DakgalbiWarriorSprite className="w-12 h-12 sm:w-20 sm:h-20" />
            </div>
          </div>
        </div>

        {/* Ending Dialogue */}
        <div className="space-y-2">
          <h2 className="font-pixel text-xl sm:text-3xl text-white leading-snug text-balance break-keep">
            막국수 용사가 닭갈비 왕국을 구했습니다!
          </h2>
          <p className="text-xs sm:text-sm text-[#F5E6D3]/85 max-w-xl mx-auto leading-relaxed break-keep">
            석사천의 보행 병목, 자리 눈치싸움, 백화점식 부스, 단기 체류의 한계를 모두 물리치고
            춘천 시민과 외지인 모두가 웃는 <strong>2026 춘천 막국수닭갈비축제</strong>가 완성되었습니다!
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <button
            type="button"
            onClick={handleFireBonusFireworks}
            className="pixel-btn inline-flex items-center gap-2 px-5 py-3.5 bg-[#FFD54F] hover:bg-[#FFCA28] text-[#1A1A2E] font-pixel text-xs sm:text-sm cursor-pointer"
          >
            <PartyPopper className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>
              축하 폭죽 쏘기!{burstCount > 0 ? ` (${burstCount})` : ''}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundEngine.playSfx('click');
              onContinueToOutro();
            }}
            className="pixel-btn inline-flex items-center gap-2 px-7 py-3.5 bg-[#FF5722] hover:bg-[#E53935] text-white font-pixel text-sm sm:text-base cursor-pointer"
          >
            <span>기대효과 &amp; 굿즈 보러가기</span>
            <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
