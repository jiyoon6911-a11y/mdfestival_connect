import { useEffect } from 'react';
import { X } from 'lucide-react';
import { HERO_CONTENT, type ProblemItem } from '../data/projectData';
import { ResilientImage } from './ResilientImage';

interface DetailModalProps {
  mode: 'brief' | 'problem' | null;
  problem: ProblemItem | null;
  onClose: () => void;
}

export function DetailModal({ mode, problem, onClose }: DetailModalProps) {
  useEffect(() => {
    if (!mode) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, onClose]);

  if (!mode) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-2xl border border-zinc-200 bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-6 py-4 bg-white/95 backdrop-blur-sm border-b border-zinc-200">
          <div className="text-xs font-medium text-zinc-500">
            {mode === 'brief'
              ? '프로젝트 개요 시트'
              : `${problem?.index} · ${problem?.categoryLabel}`}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="창 닫기"
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {mode === 'brief' && (
          <div className="p-6 md:p-8 space-y-6">
            <div className="space-y-2">
              <h3 id="modal-title" className="font-display text-2xl font-bold text-zinc-950">
                {HERO_CONTENT.briefModal.title}
              </h3>
              <p className="text-sm text-zinc-500">{HERO_CONTENT.briefModal.subtitle}</p>
            </div>

            <div className="divide-y divide-zinc-200 border-t border-zinc-200">
              {HERO_CONTENT.briefModal.sections.map((sec) => (
                <div key={sec.heading} className="py-5 space-y-2">
                  <h4 className="text-base font-bold text-zinc-950">{sec.heading}</h4>
                  <p className="text-sm leading-relaxed text-zinc-600">{sec.body}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {mode === 'problem' && problem && (
          <div className="p-6 md:p-8 space-y-6">
            <div className="overflow-hidden rounded-xl border border-zinc-200 aspect-video bg-zinc-100">
              <ResilientImage
                src={problem.image}
                alt={problem.imageAlt}
                fallbackTitle={problem.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-2">
              <h3 id="modal-title" className="font-display text-2xl font-bold text-zinc-950 text-balance">
                {problem.title}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-600">{problem.summary}</p>
            </div>

            <div className="grid grid-cols-1 gap-4 pt-2 border-t border-zinc-200">
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 space-y-1">
                <span className="text-xs font-bold text-zinc-900 block">01. 문제 배경 슬롯</span>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {problem.detail.backgroundSlot}
                </p>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 space-y-1">
                <span className="text-xs font-bold text-zinc-900 block">02. 현장 관찰 기록 슬롯</span>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {problem.detail.fieldObservationSlot}
                </p>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 space-y-1">
                <span className="text-xs font-bold text-red-600 block">03. 개선 방향 초안</span>
                <p className="text-sm text-zinc-800 leading-relaxed">
                  {problem.detail.improvementDirectionSlot}
                </p>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-white p-4 flex items-center justify-between gap-4">
                <span className="text-xs font-semibold text-zinc-500">목표 검증 지표</span>
                <span className="font-mono-tabular text-xs font-bold text-zinc-950">
                  {problem.detail.targetMetricSlot}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
