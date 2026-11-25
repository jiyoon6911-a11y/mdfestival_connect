import { useEffect, useState } from 'react';
import { DakgalbiWarriorSprite, MakguksuWarriorSprite } from './PixelSprites';

interface SimulatorLoaderProps {
  onComplete: () => void;
}

const LOADER_LINES = [
  '본 화면은 CON:NECT의 2026 춘천 막국수닭갈비축제 개선 가상 시뮬레이터입니다.',
  '현실에 반영되기 전, 불편함이 사라진 새로운 축제 현장을 지금 미리 걸어보세요!',
];

export function SimulatorLoader({ onComplete }: SimulatorLoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 2200;
    let rafId = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        rafId = requestAnimationFrame(tick);
      } else {
        setTimeout(onComplete, 250);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [onComplete]);

  const blocks = 16;
  const filled = Math.round((progress / 100) * blocks);

  return (
    <div className="fixed inset-0 z-50 bg-[#1A1A2E] text-[#F5E6D3] flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-xl text-center space-y-5 sm:space-y-7">
        <div className="flex items-center justify-center gap-3 sm:gap-6">
          <div className="p-2.5 sm:p-3 bg-[#FF5722]/25 border-2 border-[#FF5722] animate-pixel-bob">
            <DakgalbiWarriorSprite className="w-12 h-12 sm:w-16 sm:h-16" />
          </div>
          <span className="font-arcade text-[10px] sm:text-xs text-[#FFD54F]">LOADING</span>
          <div className="p-2.5 sm:p-3 bg-[#1E88E5]/25 border-2 border-[#1E88E5] animate-pixel-bob">
            <MakguksuWarriorSprite className="w-12 h-12 sm:w-16 sm:h-16" />
          </div>
        </div>

        <div className="space-y-2.5 sm:space-y-3">
          <div className="font-pixel text-[11px] sm:text-xs text-[#90CAF9]">
            VIRTUAL FESTIVAL SIMULATOR · 2026 CHUNCHEON
          </div>
          <h2 className="font-pixel text-lg sm:text-2xl text-white leading-snug text-balance break-keep">
            {progress < 55 ? LOADER_LINES[0] : LOADER_LINES[1]}
          </h2>
          <p className="text-xs sm:text-sm text-[#F5E6D3]/70 break-keep">
            석사천 산책로와 공지천 피크닉존, 막닭.ZIP 부스 현장을 불러오는 중...
          </p>
        </div>

        {/* Pixel Progress Bar */}
        <div className="max-w-md mx-auto space-y-2">
          <div className="flex justify-between font-pixel text-[11px] sm:text-xs gap-2">
            <span className="text-[#FFD54F] truncate">FESTIVAL WORLD INITIALIZING</span>
            <span className="font-tabular shrink-0">{progress}%</span>
          </div>
          <div className="p-1 sm:p-1.5 bg-[#0F0F1E] border-4 border-[#F5E6D3] grid grid-cols-16 gap-0.5 sm:gap-1">
            {Array.from({ length: blocks }).map((_, idx) => (
              <div
                key={idx}
                className={`h-5 ${
                  idx < filled
                    ? idx % 2 === 0
                      ? 'bg-[#FF5722]'
                      : 'bg-[#1E88E5]'
                    : 'bg-[#262642]'
                }`}
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={onComplete}
          className="px-4 py-2 font-pixel text-xs text-[#F5E6D3]/80 hover:text-white border border-[#F5E6D3]/40 hover:border-white cursor-pointer"
        >
          바로 입장하기 (SKIP) &gt;&gt;
        </button>
      </div>
    </div>
  );
}
