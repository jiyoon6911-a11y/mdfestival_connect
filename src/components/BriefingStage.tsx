import { ArrowRight, AlertTriangle } from 'lucide-react';
import { AS_IS_PROBLEMS, BACKGROUND_METRICS } from '../data/festivalData';
import { DakgalbiWarriorSprite, MakguksuWarriorSprite } from './PixelSprites';

interface BriefingStageProps {
  onStartSimulation: () => void;
}

export function BriefingStage({ onStartSimulation }: BriefingStageProps) {
  return (
    <div>
      {/* Briefing Content: Data Background & 4 Field Problems */}
      <section
        id="briefing-section"
        className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-12"
      >
        {/* 1. 데이터 기반 기획 배경 */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <p className="font-pixel text-xs text-[#1E88E5]">01 · PROJECT BACKGROUND</p>
              <h2 className="font-pixel text-xl md:text-2xl text-[#1A1A2E] mt-1">
                데이터로 본 기획 배경
              </h2>
            </div>
            <span className="text-xs text-[#1A1A2E]/70">
              춘천 주요 축제 통계 및 한국문화관광연구원 실태조사 근거
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {BACKGROUND_METRICS.map((item) => (
              <div
                key={item.code}
                className="pixel-box-sm bg-white p-5 flex flex-col justify-between gap-3"
              >
                <div className="space-y-2">
                  <div className="font-pixel text-xs text-[#1E88E5]">POINT {item.code}</div>
                  <h3 className="font-bold text-base text-[#1A1A2E]">{item.label}</h3>
                  <div className="font-pixel text-lg font-tabular text-[#E53935]">{item.stat}</div>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-[#1A1A2E]/80 pt-3 border-t-2 border-dashed border-[#1A1A2E]/20">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 2. 축제에서 나온 4대 문제점 */}
        <div className="space-y-4">
          <div>
            <p className="font-pixel text-xs text-[#E53935]">02 · FIELD PROBLEMS (AS-IS)</p>
            <h2 className="font-pixel text-xl md:text-2xl text-[#1A1A2E] mt-1">
              현장 답사에서 발견한 4대 문제점
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {AS_IS_PROBLEMS.map((prob) => (
              <article key={prob.id} className="pixel-box bg-white p-5 md:p-6 space-y-3.5">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b-2 border-[#1A1A2E]">
                  <div className="flex items-center gap-2">
                    <span className="font-arcade text-xs px-2 py-1 bg-[#1A1A2E] text-white">
                      {prob.num}
                    </span>
                    <h3 className="font-bold text-base text-[#1A1A2E]">{prob.title}</h3>
                  </div>
                  <span className="font-pixel text-xs text-[#E53935] font-bold">{prob.badge}</span>
                </div>

                <ul className="space-y-2">
                  {prob.points.map((pt, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-xs sm:text-sm text-[#1A1A2E]/85 leading-relaxed"
                    >
                      <AlertTriangle
                        className="w-4 h-4 text-[#FF5722] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Full-Viewport Transition Screen ("만약 2026 축제가 이렇게 바뀐다면?") */}
      <section
        id="enter-simulator"
        className="min-h-[calc(100vh-4rem)] bg-[#1A1A2E] text-[#F5E6D3] border-y-4 border-[#FF5722] flex flex-col items-center justify-center px-6 py-16 text-center relative overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #F5E6D3 1px, transparent 1px), linear-gradient(to bottom, #F5E6D3 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
          <div className="flex items-center justify-center gap-6">
            <div className="p-3 bg-[#FF5722]/25 border-2 border-[#FF5722] animate-pixel-bob">
              <DakgalbiWarriorSprite className="w-16 h-16 md:w-20 md:h-20" />
            </div>
            <span className="font-arcade text-sm md:text-base text-[#FFD54F]">QUEST</span>
            <div className="p-3 bg-[#1E88E5]/25 border-2 border-[#1E88E5] animate-pixel-bob">
              <MakguksuWarriorSprite className="w-16 h-16 md:w-20 md:h-20" />
            </div>
          </div>

          <div className="space-y-4">
            <p className="font-pixel text-xs sm:text-sm text-[#90CAF9]">
              CON:NECT가 그리는 새로운 춘천 막국수닭갈비축제의 모습은?
            </p>
            <h2 className="font-pixel text-3xl sm:text-4xl md:text-5xl text-white leading-snug text-balance">
              “만약 2026 춘천 막국수닭갈비축제가
              <br className="hidden sm:block" /> 이렇게 바뀐다면?”
            </h2>
            <p className="text-sm sm:text-base text-[#F5E6D3]/85 max-w-xl mx-auto leading-relaxed">
              현실에 반영되기 전, 불편함이 사라진 축제 현장 속으로 직접 걸어 들어가
              사전 꾸미기부터 취향 지도 주문, 피크닉존, 막닭.ZIP, 끼끼 여권까지 체험해 보세요!
            </p>
          </div>

          <button
            type="button"
            onClick={onStartSimulation}
            className="pixel-btn inline-flex items-center gap-2.5 px-8 py-4 bg-[#FF5722] hover:bg-[#E53935] text-white font-pixel text-base md:text-lg cursor-pointer"
          >
            <span>▶ 가상 축제 시뮬레이터 입장하기</span>
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </section>
    </div>
  );
}
