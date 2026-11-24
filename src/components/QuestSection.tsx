import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { QUEST_STAGES } from '../data/projectData';

export function QuestSection() {
  const [activeStageId, setActiveStageId] = useState(QUEST_STAGES[0].id);

  const currentStage =
    QUEST_STAGES.find((s) => s.id === activeStageId) ?? QUEST_STAGES[0];

  return (
    <section id="quests" className="bg-white py-20 md:py-28 border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header & Interactive Stage Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-zinc-200">
          <div className="space-y-4 max-w-2xl">
            <p className="text-xs font-medium text-zinc-500">
              <span className="font-mono-tabular font-bold text-red-600">02</span>
              <span className="mx-2" aria-hidden="true">·</span>
              <span>막국수용사의 개선 전략</span>
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-zinc-950 text-balance">
              축제를 되살릴 3단계 개선 퀘스트
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-zinc-600">
              단계별 탭을 전환하여 각 개선 전략과 기존 대비 변화(Before / After) 구조를 미리 확인할 수 있습니다.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="개선 퀘스트 단계 선택"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-zinc-100 border border-zinc-200 rounded-xl self-start lg:self-auto"
          >
            {QUEST_STAGES.map((stage) => {
              const isActive = stage.id === currentStage.id;
              return (
                <button
                  key={stage.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveStageId(stage.id)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 ${
                    isActive
                      ? 'bg-white text-zinc-950 shadow-sm'
                      : 'text-zinc-600 hover:text-zinc-950'
                  }`}
                >
                  {stage.tabLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetric 12-Col Content Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Numbered Strategy Breakdown */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="text-xs font-mono-tabular font-bold text-red-600">
                STAGE {currentStage.stepNumber}
              </div>
              <h3 className="font-display text-2xl font-bold tracking-tight text-zinc-950 text-balance">
                {currentStage.title}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-600">
                {currentStage.description}
              </p>
            </div>

            <div className="divide-y divide-zinc-200 border-t border-b border-zinc-200">
              {currentStage.strategies.map((item) => (
                <div key={item.code} className="py-5 space-y-1.5">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono-tabular text-xs font-bold text-red-600 shrink-0">
                      {item.code}.
                    </span>
                    <h4 className="text-base font-bold text-zinc-950">{item.title}</h4>
                  </div>
                  <p className="text-sm text-zinc-600 leading-relaxed pl-7">
                    {item.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Before -> After Structural Comparison Table */}
          <div className="lg:col-span-7 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 md:p-8">
            <div className="flex items-center justify-between gap-4 pb-5 border-b border-zinc-200">
              <div>
                <p className="text-xs font-medium text-zinc-500">개선 전후 구조 대비표</p>
                <h4 className="mt-1 text-lg font-bold text-zinc-950">
                  {currentStage.tabLabel} 핵심 변화 포인트
                </h4>
              </div>
              <span className="font-mono-tabular text-xs font-semibold text-zinc-500">
                3 ITEMS
              </span>
            </div>

            <div className="mt-6 space-y-4">
              {currentStage.comparison.map((row) => (
                <div
                  key={row.aspect}
                  className="rounded-xl border border-zinc-200 bg-white p-5 space-y-4"
                >
                  <div className="text-xs font-bold text-zinc-900 tracking-tight">
                    {row.aspect}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
                    <div className="md:col-span-5 space-y-1">
                      <span className="text-[11px] font-medium text-zinc-500 block">
                        기존 현황 (Before)
                      </span>
                      <p className="text-sm text-zinc-600 leading-relaxed">
                        {row.before}
                      </p>
                    </div>

                    <div className="hidden md:flex md:col-span-1 justify-center text-zinc-400">
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </div>

                    <div className="md:col-span-5 space-y-1">
                      <span className="text-[11px] font-semibold text-red-600 block">
                        개선 제안 (After)
                      </span>
                      <p className="text-sm font-medium text-zinc-950 leading-relaxed">
                        {row.after}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
