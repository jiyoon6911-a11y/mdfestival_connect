import { useState } from 'react';
import { ArrowRight, Lightbulb, CheckCircle2 } from 'lucide-react';
import { EXPLORER_MASCOTS } from '../../data/festivalData';

interface Step2Props {
  completed: boolean;
  onCompleteAndNext: () => void;
}

export function Step2ExplorerMap({ completed, onCompleteAndNext }: Step2Props) {
  const [activeMascotId, setActiveMascotId] = useState<string>(EXPLORER_MASCOTS[0].id);
  const [solvedMascots, setSolvedMascots] = useState<string[]>([]);
  const [wrongMsg, setWrongMsg] = useState('');

  const activeMascot =
    EXPLORER_MASCOTS.find((m) => m.id === activeMascotId) ?? EXPLORER_MASCOTS[0];

  const handleSolveMascot = (choiceIdx: number) => {
    if (choiceIdx === activeMascot.answer) {
      setWrongMsg('');
      if (!solvedMascots.includes(activeMascot.id)) {
        setSolvedMascots((prev) => [...prev, activeMascot.id]);
      }
    } else {
      setWrongMsg('다시 한 번 생각해 보세요! 춘천 축제만의 특징을 떠올려 볼까요?');
    }
  };

  return (
    <div className="space-y-6">
      {/* In-Venue Interactive Explorer Map */}
      <div className="pixel-box bg-white p-5 md:p-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b-3 border-[#1A1A2E]">
          <div>
            <span className="font-pixel text-xs text-[#1E88E5]">
              STEP 02 · 석사천 → 공지천 축제장 현장 탐험
            </span>
            <h3 className="font-pixel text-lg sm:text-xl text-[#1A1A2E]">
              🗺 〈막닭 탐험지도〉 들고 숨은 닭 마스코트 5마리 찾기!
            </h3>
          </div>
          <span className="font-pixel text-xs px-2.5 py-1 bg-[#1A1A2E] text-[#FFD54F]">
            수집 스티커 {solvedMascots.length} / 5
          </span>
        </div>

        {/* Interactive Pixel Festival Grounds Map + Mascot Quiz */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Left: Atmospheric Chuncheon Riverside Festival Map */}
          <div className="lg:col-span-7 border-3 border-[#1A1A2E] bg-[#E8F5E9] relative min-h-[320px] p-4 overflow-hidden flex flex-col justify-between">
            {/* Top Venue Atmosphere Strip */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-pixel relative z-10">
              <span className="px-2.5 py-1 bg-[#FFEBEE] border-2 border-[#1A1A2E] text-[#C62828]">
                🍢 석사천 먹거리 산책로 (일방통행)
              </span>
              <span className="px-2.5 py-1 bg-[#FFF8E1] border-2 border-[#1A1A2E] text-[#1A1A2E]">
                🪨 징검다리 순환 연결
              </span>
              <span className="px-2.5 py-1 bg-[#E3F2FD] border-2 border-[#1A1A2E] text-[#1565C0]">
                🎤 공지천 잔디광장 · 막닭.ZIP
              </span>
            </div>

            {/* Pixel River & Wooden Booth Scenery */}
            <div
              className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-16 bg-[#64B5F6]/55 border-y-2 border-dashed border-[#1E88E5] pointer-events-none"
              aria-hidden="true"
            />
            {/* Stepping Stones across river */}
            <div
              className="absolute left-[38%] top-1/2 -translate-y-1/2 flex gap-1.5 pointer-events-none"
              aria-hidden="true"
            >
              <span className="w-3 h-3 bg-[#D7CCC8] border border-[#1A1A2E]" />
              <span className="w-3 h-3 bg-[#D7CCC8] border border-[#1A1A2E]" />
              <span className="w-3 h-3 bg-[#D7CCC8] border border-[#1A1A2E]" />
            </div>

            {/* Clickable Mascot Silhouettes on the Festival Grounds */}
            <div className="relative flex-1 my-4">
              {EXPLORER_MASCOTS.map((m) => {
                const isCurrent = m.id === activeMascotId;
                const isSolved = solvedMascots.includes(m.id);
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      setActiveMascotId(m.id);
                      setWrongMsg('');
                    }}
                    style={{ left: m.x, top: m.y }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1.5 border-2 border-[#1A1A2E] font-pixel text-[11px] cursor-pointer transition-transform ${
                      isSolved
                        ? 'bg-[#2E7D32] text-white'
                        : isCurrent
                          ? 'bg-[#FF5722] text-white scale-110 shadow-[2px_2px_0px_#1A1A2E] z-10'
                          : 'bg-[#FFF59D] text-[#1A1A2E] hover:scale-105'
                    }`}
                  >
                    {isSolved ? '✓ ' : '🐔 '}
                    {m.name}
                  </button>
                );
              })}
            </div>

            <div className="text-[11px] bg-white/95 border-2 border-[#1A1A2E] px-3 py-2 relative z-10 flex items-center justify-between gap-2">
              <span>축제장 구역별 숨은 닭 마스코트 실루엣을 클릭해 퀴즈를 풀어보세요!</span>
              <span className="font-pixel text-[#E53935] shrink-0">참여 점포 할인 쿠폰 지급</span>
            </div>
          </div>

          {/* Right: Active Mascot Mini-Quiz */}
          <div className="lg:col-span-5 border-3 border-[#1A1A2E] bg-[#FFFDF8] p-4 flex flex-col justify-between gap-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-pixel text-xs px-2 py-1 bg-[#1A1A2E] text-[#FFD54F]">
                  {activeMascot.name}
                </span>
                <span className="text-xs text-[#1A1A2E]/70">{activeMascot.spot}</span>
              </div>

              <h4 className="font-bold text-sm sm:text-base text-[#1A1A2E]">
                {activeMascot.prompt}
              </h4>

              <div className="space-y-2">
                {activeMascot.choices.map((ch, idx) => {
                  const isSolved = solvedMascots.includes(activeMascot.id);
                  const isRight = idx === activeMascot.answer;
                  return (
                    <button
                      key={ch}
                      type="button"
                      onClick={() => handleSolveMascot(idx)}
                      className={`w-full text-left p-2.5 border-2 border-[#1A1A2E] text-xs sm:text-sm cursor-pointer ${
                        isSolved && isRight
                          ? 'bg-[#2E7D32] text-white font-bold'
                          : 'bg-white hover:bg-[#F5E6D3]/60'
                      }`}
                    >
                      {idx + 1}. {ch}
                    </button>
                  );
                })}
              </div>

              {wrongMsg && (
                <p className="text-xs font-bold text-[#E53935]">⚠ {wrongMsg}</p>
              )}

              {solvedMascots.includes(activeMascot.id) && (
                <div className="p-2.5 bg-[#E8F5E9] border-2 border-[#2E7D32] text-xs font-bold text-[#2E7D32] flex items-center gap-1.5 animate-stamp">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>획득 보상: {activeMascot.reward}</span>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={onCompleteAndNext}
              className="pixel-btn w-full inline-flex items-center justify-center gap-2 py-2.5 bg-[#1E88E5] hover:bg-[#1565C0] text-white font-pixel text-xs sm:text-sm cursor-pointer"
            >
              <span>
                {solvedMascots.length >= 2
                  ? '탐험 완료! 먹거리 부스 거리로 이동'
                  : '탐험 마치고 먹거리 부스 거리로 이동'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Planning Rationale Box Below */}
      <div className="pixel-box-sm bg-[#FFFDF7] p-5 md:p-6 space-y-3">
        <div className="flex items-center gap-2 font-pixel text-sm text-[#1E88E5]">
          <Lightbulb className="w-4 h-4 text-[#FF5722]" aria-hidden="true" />
          <span>기획 의도 &amp; 상세 내용 — 왜 〈공간 이원화 &amp; 막닭 탐험지도〉를 기획했을까요?</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-[#1A1A2E]/85 leading-relaxed">
          <div className="p-3.5 bg-white border-2 border-[#1A1A2E]">
            <strong className="block text-[#E53935] mb-1">발견한 문제 (As-Is)</strong>
            &lsquo;석사천 일대&rsquo;라는 모호한 안내와 구역 경계 불분명, 폭 3~4m 산책로의 양방향 병목, 그리고 스토리 없이 산발 노출되던 마스코트가 방문객 혼란을 가중시켰습니다.
          </div>
          <div className="p-3.5 bg-white border-2 border-[#1A1A2E]">
            <strong className="block text-[#1E88E5] mb-1">기획 해결책 (To-Be)</strong>
            석사천 일방통행 및 징검다리 확충으로 보행 전용 순환 동선을 만들고, 공지천 광장으로 공간을 이원화했습니다. 구역별 5마리 마스코트 찾기 스티커 투어로 자연스러운 동선 유도와 할인 쿠폰 혜택을 제공합니다.
          </div>
        </div>
      </div>
    </div>
  );
}
