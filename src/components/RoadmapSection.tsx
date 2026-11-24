import { useState } from 'react';
import { Check } from 'lucide-react';
import { IMPACT_CARDS, ROADMAP_PHASES } from '../data/projectData';

export function RoadmapSection() {
  const [selectedPhaseIndex, setSelectedPhaseIndex] = useState(0);
  const currentPhase = ROADMAP_PHASES[selectedPhaseIndex];

  return (
    <>
      {/* Section 3: Expected Impact */}
      <section id="impact" className="bg-zinc-100 py-20 md:py-24 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl space-y-4 pb-12 border-b border-zinc-200/80">
            <p className="text-xs font-medium text-zinc-500">
              <span className="font-mono-tabular font-bold text-red-600">03</span>
              <span className="mx-2" aria-hidden="true">·</span>
              <span>기대 효과 및 성과 틀</span>
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-zinc-950 text-balance">
              왕국 구출 이후 달라질 축제의 모습
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-zinc-600">
              프로젝트 검증 및 설문 결과가 도출되면 각 영역의 목표 지표 슬롯에 정량 수치를 입력할 수 있습니다.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {IMPACT_CARDS.map((card) => (
              <div
                key={card.index}
                className="rounded-2xl border border-zinc-200 bg-white p-7 flex flex-col justify-between gap-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <span className="font-mono-tabular font-bold text-red-600">
                      {card.index}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{card.domain}</span>
                  </div>

                  <h3 className="font-display text-xl font-bold tracking-tight text-zinc-950 leading-snug text-balance">
                    {card.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-zinc-600">
                    {card.description}
                  </p>
                </div>

                <div className="pt-5 border-t border-zinc-200">
                  <span className="text-[11px] font-medium text-zinc-500 block">
                    성과 지표 슬롯
                  </span>
                  <span className="mt-1 block font-mono-tabular text-sm font-bold text-zinc-900">
                    {card.metricPlaceholder}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Interactive Project Roadmap */}
      <section id="roadmap" className="bg-zinc-50 py-20 md:py-24 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-zinc-200">
            <div className="space-y-4 max-w-2xl">
              <p className="text-xs font-medium text-zinc-500">
                <span className="font-mono-tabular font-bold text-red-600">04</span>
                <span className="mx-2" aria-hidden="true">·</span>
                <span>프로젝트 추진 로드맵</span>
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-zinc-950 text-balance">
                문제 발견부터 최종 제안까지의 여정
              </h2>
            </div>
            <p className="text-xs text-zinc-500">
              단계를 선택하면 산출물 목록이 아래에 표시됩니다.
            </p>
          </div>

          {/* 4-Column Interactive Phase Selectors */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ROADMAP_PHASES.map((item, idx) => {
              const isSelected = idx === selectedPhaseIndex;
              return (
                <button
                  key={item.phase}
                  type="button"
                  onClick={() => setSelectedPhaseIndex(idx)}
                  aria-pressed={isSelected}
                  className={`text-left rounded-xl p-5 border transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 ${
                    isSelected
                      ? 'bg-zinc-950 text-white border-zinc-950'
                      : 'bg-white text-zinc-900 border-zinc-200 hover:border-zinc-400'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span
                      className={`font-mono-tabular font-bold ${
                        isSelected ? 'text-red-400' : 'text-red-600'
                      }`}
                    >
                      {item.phase}
                    </span>
                    <span className={isSelected ? 'text-zinc-400' : 'text-zinc-500'}>
                      {item.periodSlot}
                    </span>
                  </div>
                  <div className="mt-3 text-base font-bold leading-snug">
                    {item.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Phase Deliverables Detail Panel */}
          <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-2">
              <div className="text-xs font-mono-tabular font-bold text-red-600">
                {currentPhase.phase} · {currentPhase.periodSlot}
              </div>
              <h3 className="font-display text-2xl font-bold text-zinc-950">
                {currentPhase.title}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-600">
                {currentPhase.summary}
              </p>
            </div>

            <div className="lg:col-span-7 lg:pl-8 lg:border-l border-zinc-200 space-y-3">
              <div className="text-xs font-semibold text-zinc-500">
                주요 산출물 및 기록 예정 항목
              </div>
              <ul className="space-y-3">
                {currentPhase.deliverables.map((deliv) => (
                  <li key={deliv} className="flex items-start gap-3 text-sm text-zinc-800">
                    <Check
                      className="w-4 h-4 text-red-600 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{deliv}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
