import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import {
  PROBLEM_CATEGORIES,
  PROBLEM_ITEMS,
  type ProblemCategory,
  type ProblemItem,
} from '../data/projectData';
import { ResilientImage } from './ResilientImage';

interface DiagnosisSectionProps {
  onSelectProblem: (problem: ProblemItem) => void;
}

export function DiagnosisSection({ onSelectProblem }: DiagnosisSectionProps) {
  const [activeCategory, setActiveCategory] = useState<ProblemCategory>('all');

  const filteredItems =
    activeCategory === 'all'
      ? PROBLEM_ITEMS
      : PROBLEM_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="diagnosis" className="bg-zinc-950 text-zinc-50 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header + Interactive Filter Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-zinc-800">
          <div className="space-y-4 max-w-2xl">
            <p className="text-xs font-medium text-zinc-400 tracking-wide">
              <span className="font-mono-tabular text-red-500">01</span>
              <span className="mx-2" aria-hidden="true">·</span>
              <span>현황 및 문제 진단</span>
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-white text-balance">
              닭갈비 왕국이 마주한 세 가지 위기
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-zinc-400">
              각 카드를 클릭하면 추후 현장 조사 자료와 개선 방향을 기록할 수 있는 상세 시트 구조가 열립니다.
            </p>
          </div>

          {/* Interactive Segmented Filter Control */}
          <div
            role="tablist"
            aria-label="문제 영역 필터"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-zinc-900 border border-zinc-800 rounded-xl self-start lg:self-auto"
          >
            {PROBLEM_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${
                    isActive
                      ? 'bg-red-600 text-white'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {filteredItems.map((item, idx) => {
            const isFeatured = activeCategory === 'all' && idx === 0;
            return (
              <article
                key={item.id}
                className={`group rounded-2xl border border-zinc-800 bg-zinc-900/70 overflow-hidden transition-colors duration-150 hover:border-zinc-700 ${
                  isFeatured
                    ? 'lg:col-span-12 grid grid-cols-1 lg:grid-cols-12'
                    : 'lg:col-span-6 flex flex-col'
                }`}
              >
                <div
                  className={`overflow-hidden bg-zinc-900 ${
                    isFeatured
                      ? 'lg:col-span-7 aspect-[4/3] lg:aspect-auto lg:min-h-[340px]'
                      : 'aspect-[4/3]'
                  }`}
                >
                  <ResilientImage
                    src={item.image}
                    alt={item.imageAlt}
                    darkSurface
                    fallbackTitle={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>

                <div
                  className={`p-6 md:p-8 flex flex-col justify-between gap-6 ${
                    isFeatured ? 'lg:col-span-5' : 'flex-1'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                      <span className="font-mono-tabular font-bold text-red-400">
                        {item.index}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{item.categoryLabel}</span>
                    </div>

                    <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight text-white leading-snug text-balance">
                      {item.title}
                    </h3>

                    <p className="text-sm leading-relaxed text-zinc-400">
                      {item.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between gap-4">
                    <span className="text-xs text-zinc-500">
                      상세 슬롯 4개 구성됨
                    </span>
                    <button
                      type="button"
                      onClick={() => onSelectProblem(item)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-zinc-800 hover:bg-red-600 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                    >
                      <span>상세 구조 보기</span>
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
