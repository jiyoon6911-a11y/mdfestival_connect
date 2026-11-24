import { MapPin } from 'lucide-react';
import { GAME_STEPS, type HeroTeam } from '../data/festivalData';
import { DakgalbiWarriorSprite, MakguksuWarriorSprite } from './PixelSprites';

interface GameProgressWalkerProps {
  currentStep: number;
  completedSteps: number[];
  selectedTeam: HeroTeam;
  isWalking: boolean;
  onSelectStep: (step: number) => void;
  onToggleTeam: () => void;
}

export function GameProgressWalker({
  currentStep,
  completedSteps,
  selectedTeam,
  isWalking,
  onSelectStep,
  onToggleTeam,
}: GameProgressWalkerProps) {
  const activeStepMeta = GAME_STEPS.find((s) => s.step === currentStep) ?? GAME_STEPS[0];
  const walkerPercent = 8 + ((currentStep - 1) / (GAME_STEPS.length - 1)) * 84;

  return (
    <div className="pixel-box bg-[#1A1A2E] text-[#F5E6D3] overflow-hidden">
      {/* Festival Bunting Garland Top Trim */}
      <div className="px-4 py-2 bg-[#23233F] border-b-2 border-[#F5E6D3]/20 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-pixel text-[#FFD54F]">
          <MapPin className="w-3.5 h-3.5 text-[#FF5722] shrink-0" aria-hidden="true" />
          <span>현재 축제장 위치: {activeStepMeta.venue}</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleTeam}
            className="text-[11px] font-pixel px-2.5 py-1 bg-[#2D2D52] hover:bg-[#3A3A66] border border-[#F5E6D3]/40 text-[#90CAF9] cursor-pointer"
          >
            {selectedTeam === 'dakgalbi' ? '🍗 닭갈비 용사' : '🍜 막국수 용사'} (전환 ⇄)
          </button>
          <span className="font-pixel text-xs text-[#A5D6A7] font-tabular">
            {completedSteps.length} / {GAME_STEPS.length} 도장 완료
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-5 space-y-4">
        {/* In-Venue Warrior Dialogue */}
        <div className="px-3.5 py-2 bg-[#111122] border-2 border-[#F5E6D3]/30 text-xs sm:text-sm text-white flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[#FFD54F] shrink-0">현장 안내 ▶</span>
            <span>“{activeStepMeta.walkerLine}”</span>
          </div>
          {isWalking && (
            <span className="font-pixel text-[11px] text-[#FF8A65] shrink-0">
              거점 이동 중...
            </span>
          )}
        </div>

        {/* Walking Pixel Character Along Festival Promenade (GATE A -> GATE B) */}
        <div className="pt-11 pb-1 relative">
          {/* Waypoint Zone Markers (GATE A / GATE B corridor) */}
          <div className="absolute top-0 inset-x-4 flex justify-between text-[10px] font-pixel opacity-85 pointer-events-none select-none">
            <span className="text-[#FF8A65]">GATE A · 석사천 방면</span>
            <span className="text-[#90CAF9]">GATE B · 공지천 방면</span>
          </div>

          {/* Walking Character Sprite with CSS Keyframe Walk Cycle */}
          <div
            className="absolute top-2 -translate-x-1/2 transition-[left] duration-650 ease-in-out z-10 pointer-events-none"
            style={{ left: `${walkerPercent}%` }}
          >
            <div
              className={`drop-shadow-[0_2px_0_#000] ${
                isWalking ? 'animate-avatar-walk' : 'animate-pixel-bob'
              }`}
            >
              {selectedTeam === 'dakgalbi' ? (
                <DakgalbiWarriorSprite className="w-11 h-11" />
              ) : (
                <MakguksuWarriorSprite className="w-11 h-11" />
              )}
            </div>
          </div>

          {/* Festival Street Road Line */}
          <div className="relative h-2.5 bg-[#2B2B4B] border border-[#F5E6D3]/30 mx-4 sm:mx-8">
            <div
              className="h-full bg-[#FF5722] transition-all duration-650 ease-in-out"
              style={{
                width: `${((currentStep - 1) / (GAME_STEPS.length - 1)) * 100}%`,
              }}
            />
          </div>

          {/* 6 Venue Stop Buttons */}
          <div className="grid grid-cols-6 gap-1 mt-2">
            {GAME_STEPS.map((item) => {
              const isCurrent = currentStep === item.step;
              const isDone = completedSteps.includes(item.step);
              return (
                <button
                  key={item.step}
                  type="button"
                  onClick={() => onSelectStep(item.step)}
                  className={`flex flex-col items-center text-center p-1.5 rounded cursor-pointer transition-colors ${
                    isCurrent
                      ? 'bg-[#FF5722]/25 text-[#FFD54F]'
                      : isDone
                        ? 'text-[#A5D6A7] hover:bg-white/5'
                        : 'text-[#F5E6D3]/65 hover:bg-white/5'
                  }`}
                >
                  <span
                    className={`w-6 h-6 flex items-center justify-center font-pixel text-[11px] border-2 ${
                      isCurrent
                        ? 'bg-[#FF5722] text-white border-white'
                        : isDone
                          ? 'bg-[#2E7D32] text-white border-[#A5D6A7]'
                          : 'bg-[#1A1A2E] text-[#F5E6D3]/70 border-[#F5E6D3]/40'
                    }`}
                  >
                    {isDone ? '✓' : item.step}
                  </span>
                  <span className="mt-1 font-pixel text-[10px] sm:text-xs leading-tight whitespace-nowrap">
                    {item.shortLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
