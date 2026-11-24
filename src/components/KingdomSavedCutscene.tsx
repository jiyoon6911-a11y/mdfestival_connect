import { useEffect, useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { DakgalbiWarriorSprite, MakguksuWarriorSprite } from './PixelSprites';
import { soundEngine } from '../utils/soundEngine';

interface KingdomSavedCutsceneProps {
  onContinueToOutro: () => void;
}

export function KingdomSavedCutscene({ onContinueToOutro }: KingdomSavedCutsceneProps) {
  const [phase, setPhase] = useState<'marching' | 'saved'>('marching');

  useEffect(() => {
    soundEngine.playSfx('victory');
    const timer = window.setTimeout(() => {
      setPhase('saved');
    }, 1150);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0F1024] text-[#F5E6D3] flex items-center justify-center p-4 sm:p-6 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label="닭갈비 왕국 구출 엔딩 애니메이션"
    >
      {/* Night Sky Pixel Stars & Fireworks */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {[
          { left: '14%', top: '18%', color: '#FF5722', delay: '0s' },
          { left: '82%', top: '16%', color: '#FFD54F', delay: '0.3s' },
          { left: '26%', top: '34%', color: '#1E88E5', delay: '0.6s' },
          { left: '72%', top: '32%', color: '#A5D6A7', delay: '0.2s' },
          { left: '50%', top: '12%', color: '#FF8A65', delay: '0.45s' },
        ].map((fw, idx) => (
          <div
            key={idx}
            className="absolute w-3 h-3 animate-ping"
            style={{
              left: fw.left,
              top: fw.top,
              backgroundColor: fw.color,
              animationDelay: fw.delay,
              animationDuration: '1.4s',
            }}
          />
        ))}
      </div>

      {/* Main Pixel Cutscene Stage */}
      <div className="relative z-10 w-full max-w-3xl pixel-box bg-[#1A1A2E] p-6 sm:p-10 text-center space-y-7">
        <div className="inline-flex items-center gap-2 font-pixel text-xs text-[#FFD54F] px-3 py-1 bg-[#28284A] border-2 border-[#FFD54F]">
          <Sparkles className="w-4 h-4" aria-hidden="true" />
          <span>QUEST COMPLETE · ALL 6 STAGES CLEAR</span>
        </div>

        {/* Animated Pixel Castle + Heroes Scene */}
        <div className="relative h-48 sm:h-56 bg-[#13142B] border-4 border-[#F5E6D3] overflow-hidden flex flex-col justify-end p-4">
          {/* Pixel Castle Silhouette (Dakgalbi Kingdom) */}
          <div className="absolute right-8 sm:right-14 bottom-10 flex flex-col items-center pointer-events-none">
            <div className="font-pixel text-[10px] px-2 py-0.5 bg-[#FF5722] text-white border border-white mb-1">
              닭갈비 왕국 성문
            </div>
            <svg viewBox="0 0 24 18" shapeRendering="crispEdges" className="w-24 h-20 sm:w-28 sm:h-24">
              <rect x="2" y="4" width="4" height="14" fill="#3949AB" />
              <rect x="18" y="4" width="4" height="14" fill="#3949AB" />
              <rect x="6" y="6" width="12" height="12" fill="#5C6BC0" />
              <rect x="2" y="2" width="2" height="2" fill="#FF5722" />
              <rect x="4" y="3" width="2" height="1" fill="#FF5722" />
              <rect x="18" y="2" width="2" height="2" fill="#1E88E5" />
              <rect x="20" y="3" width="2" height="1" fill="#1E88E5" />
              <rect x="9" y="11" width="6" height="7" fill="#FFD54F" />
              <rect x="10" y="12" width="4" height="6" fill="#1A1A2E" />
              <rect x="11" y="2" width="2" height="4" fill="#FFD54F" />
            </svg>
          </div>

          {/* Ground Floor */}
          <div className="h-10 bg-[#2E7D32] border-t-4 border-[#A5D6A7] -mx-4 -mb-4 relative z-10" />

          {/* Makguksu Warrior marching into the Kingdom to join Dakgalbi Warrior */}
          <div
            className="absolute bottom-9 z-20 transition-all duration-1000 ease-out flex items-end gap-2"
            style={{
              left: phase === 'marching' ? '14%' : '46%',
              transform: 'translateX(-50%)',
            }}
          >
            <div className={phase === 'marching' ? 'animate-avatar-walk' : 'animate-pixel-bob'}>
              <MakguksuWarriorSprite className="w-16 h-16 sm:w-20 sm:h-20" />
            </div>
          </div>

          {/* Dakgalbi Warrior celebrating at the castle gate */}
          <div
            className="absolute bottom-9 z-20 transition-transform duration-500"
            style={{
              right: '24%',
            }}
          >
            <div className="animate-pixel-bob">
              <DakgalbiWarriorSprite className="w-16 h-16 sm:w-20 sm:h-20" />
            </div>
          </div>

          {/* Celebration Banner inside scene once arrived */}
          {phase === 'saved' && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 px-4 py-1.5 bg-[#FFD54F] text-[#1A1A2E] border-3 border-[#1A1A2E] font-pixel text-xs sm:text-sm whitespace-nowrap animate-stamp">
              🎉 닭갈비 왕국 구출 대성공! 🎉
            </div>
          )}
        </div>

        {/* Ending Dialogue */}
        <div className="space-y-2.5">
          <h2 className="font-pixel text-2xl sm:text-3xl text-white leading-snug text-balance">
            막국수 용사가 닭갈비 왕국을 구했습니다!
          </h2>
          <p className="text-xs sm:text-sm text-[#F5E6D3]/85 max-w-xl mx-auto leading-relaxed">
            석사천의 보행 병목, 자리 눈치싸움, 백화점식 부스, 단기 체류의 한계를 모두 물리치고
            춘천 시민과 외지인 모두가 웃는 <strong>2026 춘천 막국수닭갈비축제</strong>가 완성되었습니다!
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <button
            type="button"
            onClick={() => {
              soundEngine.playSfx('click');
              onContinueToOutro();
            }}
            className="pixel-btn inline-flex items-center gap-2 px-7 py-3.5 bg-[#FF5722] hover:bg-[#E53935] text-white font-pixel text-sm sm:text-base cursor-pointer"
          >
            <span>기대효과 &amp; 공식 굿즈 6종 보러가기</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
