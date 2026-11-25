import { MapPin } from 'lucide-react';
import { GAME_STEPS, type HeroTeam } from '../data/festivalData';
import {
  DakgalbiWarriorSprite,
  MakguksuWarriorSprite,
  type FoodHoldType,
} from './PixelSprites';

interface GameProgressWalkerProps {
  currentStep: number;
  completedSteps: number[];
  selectedTeam: HeroTeam;
  isWalking: boolean;
  holdingFood: FoodHoldType;
  holdingMap: boolean;
  holdingLightstick: boolean;
  onSelectStep: (step: number) => void;
  onToggleTeam: () => void;
}

export function GameProgressWalker({
  currentStep,
  completedSteps,
  selectedTeam,
  isWalking,
  holdingFood,
  holdingMap,
  holdingLightstick,
  onSelectStep,
  onToggleTeam,
}: GameProgressWalkerProps) {
  const activeStepMeta = GAME_STEPS.find((s) => s.step === currentStep) ?? GAME_STEPS[0];
  const walkerPercent = 8 + ((currentStep - 1) / (GAME_STEPS.length - 1)) * 84;

  const carriedLabel =
    holdingFood !== 'none'
      ? holdingFood === 'dakgalbi'
        ? '🍗 닭갈비 컵 + 번호표'
        : holdingFood === 'makguksu'
          ? '🍜 막국수 사발 + 번호표'
          : '🍱 막닭 콤보 + 번호표'
      : holdingLightstick
        ? '🔦 LED 응원봉 + 여권'
        : completedSteps.includes(5)
          ? '🔑 달랑달랑 참 키링'
          : completedSteps.includes(4)
            ? '♻ 클린 식사 완료'
            : holdingMap
              ? '🗺 막닭 탐험지도'
              : completedSteps.includes(1)
                ? '🎨 나만의 막닭 배지'
                : '⚔ 기본 장비';

  return (
    <div className="pixel-box bg-[#1A1A2E] text-[#F5E6D3] overflow-hidden">
      {/* Festival Bunting Garland Top Trim */}
      <div className="px-3.5 sm:px-4 py-2.5 bg-[#23233F] border-b-2 border-[#F5E6D3]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-start sm:items-center gap-1.5 text-[11px] sm:text-xs font-pixel text-[#FFD54F] min-w-0">
          <MapPin className="w-3.5 h-3.5 text-[#FF5722] shrink-0 mt-0.5 sm:mt-0" aria-hidden="true" />
          <span className="leading-snug break-keep">현재 위치: {activeStepMeta.venue}</span>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 flex-wrap">
          <span className="text-[11px] font-pixel px-2 py-0.5 bg-[#111122] border border-[#FFD54F]/50 text-[#FFD54F]">
            손에 든 아이템: {carriedLabel}
          </span>
          <button
            type="button"
            onClick={onToggleTeam}
            className="text-[11px] font-pixel px-2.5 py-1 bg-[#2D2D52] hover:bg-[#3A3A66] border border-[#F5E6D3]/40 text-[#90CAF9] cursor-pointer whitespace-nowrap"
          >
            {selectedTeam === 'dakgalbi' ? '🍗 닭갈비 용사' : '🍜 막국수 용사'} (전환 ⇄)
          </button>
          <span className="font-pixel text-[11px] sm:text-xs text-[#A5D6A7] font-tabular whitespace-nowrap">
            {completedSteps.length} / {GAME_STEPS.length} 도장
          </span>
        </div>
      </div>

      <div className="p-3.5 sm:p-5 space-y-3.5">
        {/* In-Venue Warrior Dialogue */}
        <div className="px-3 py-2 bg-[#111122] border-2 border-[#F5E6D3]/30 text-xs sm:text-sm text-white flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
          <div className="flex items-start sm:items-center gap-2 min-w-0">
            <span className="font-pixel text-[#FFD54F] shrink-0">현장 안내 ▶</span>
            <span className="leading-snug break-keep">“{activeStepMeta.walkerLine}”</span>
          </div>
          {isWalking && (
            <span className="font-pixel text-[11px] text-[#FF8A65] shrink-0 self-end sm:self-auto">
              거점 이동 중...
            </span>
          )}
        </div>

        {/* Dedicated GATE Corridor Strip (Above the Walking Avatar so it NEVER overlaps) */}
        <div className="flex items-center justify-between gap-2 text-[10px] sm:text-xs font-pixel px-1">
          <span className="px-2 py-0.5 bg-[#FF5722]/20 border border-[#FF8A65]/50 text-[#FF8A65] truncate">
            GATE A · 석사천 방면
          </span>
          <span className="px-2 py-0.5 bg-[#1E88E5]/20 border border-[#90CAF9]/50 text-[#90CAF9] truncate">
            GATE B · 공지천 방면
          </span>
        </div>

        {/* Walking Pixel Character Along Festival Promenade */}
        <div className="pt-11 pb-1 relative">
          {/* Walking Character Sprite with CSS Keyframe Walk Cycle + Equipped Items */}
          <div
            className="absolute top-0 -translate-x-1/2 transition-[left] duration-650 ease-in-out z-10 pointer-events-none"
            style={{ left: `${walkerPercent}%` }}
          >
            <div
              className={`drop-shadow-[0_2px_0_#000] ${
                isWalking ? 'animate-avatar-walk' : 'animate-pixel-bob'
              }`}
            >
              {selectedTeam === 'dakgalbi' ? (
                <DakgalbiWarriorSprite
                  className="w-10 h-10 sm:w-11 sm:h-11"
                  holdingFood={holdingFood}
                  holdingMap={holdingMap}
                  holdingLightstick={holdingLightstick}
                />
              ) : (
                <MakguksuWarriorSprite
                  className="w-10 h-10 sm:w-11 sm:h-11"
                  holdingFood={holdingFood}
                  holdingMap={holdingMap}
                  holdingLightstick={holdingLightstick}
                />
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

          {/* 6 Venue Stop Buttons (3x2 on mobile so labels never collide, 6x1 on sm+) */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 sm:gap-1 mt-3">
            {GAME_STEPS.map((item) => {
              const isCurrent = currentStep === item.step;
              const isDone = completedSteps.includes(item.step);
              return (
                <button
                  key={item.step}
                  type="button"
                  onClick={() => onSelectStep(item.step)}
                  className={`flex flex-col items-center justify-center text-center p-1.5 rounded border cursor-pointer transition-colors ${
                    isCurrent
                      ? 'bg-[#FF5722]/25 border-[#FF5722]/60 text-[#FFD54F]'
                      : isDone
                        ? 'border-transparent text-[#A5D6A7] hover:bg-white/5'
                        : 'border-transparent text-[#F5E6D3]/70 hover:bg-white/5'
                  }`}
                >
                  <span
                    className={`w-6 h-6 flex items-center justify-center font-pixel text-[11px] border-2 shrink-0 ${
                      isCurrent
                        ? 'bg-[#FF5722] text-white border-white'
                        : isDone
                          ? 'bg-[#2E7D32] text-white border-[#A5D6A7]'
                          : 'bg-[#1A1A2E] text-[#F5E6D3]/70 border-[#F5E6D3]/40'
                    }`}
                  >
                    {isDone ? '✓' : item.step}
                  </span>
                  <span className="mt-1 font-pixel text-[11px] sm:text-xs leading-tight break-keep">
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
