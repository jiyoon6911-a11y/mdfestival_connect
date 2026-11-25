import { RotateCcw, Sparkles, Gift } from 'lucide-react';
import { FINAL_IMPACTS, GOODS_RELEASE_NOTICE } from '../data/festivalData';

interface OutroStageProps {
  onRestart: () => void;
  onGoToBriefing: () => void;
}

export function OutroStage({ onRestart, onGoToBriefing }: OutroStageProps) {
  return (
    <section className="max-w-7xl mx-auto px-3.5 sm:px-6 py-8 sm:py-10 md:py-14 space-y-10 sm:space-y-12">
      {/* Outro Hero Summary */}
      <div className="pixel-box bg-[#1A1A2E] text-[#F5E6D3] p-5 sm:p-6 md:p-10 text-center space-y-4">
        <div className="inline-flex items-center gap-2 font-pixel text-xs text-[#FFD54F]">
          <Sparkles className="w-4 h-4" aria-hidden="true" />
          <span>STAGE 3 · EXPECTED IMPACT &amp; GOODS</span>
        </div>
        <h2 className="font-pixel text-2xl sm:text-3xl md:text-4xl text-white leading-snug text-balance break-keep">
          “2026 춘천 막국수닭갈비축제, 이렇게 바뀝니다!”
        </h2>
        <p className="text-xs sm:text-base text-[#F5E6D3]/85 max-w-2xl mx-auto leading-relaxed break-keep">
          한림대학교 문화기획동아리 CON:NECT의 프로젝트 핵심 기대효과와
          12/1~12/3 오프라인 축제 현장에 DP(전시)되는 CON:NECT가 기획한 축제 굿즈 안내를 확인하세요.
        </p>
      </div>

      {/* 1. 3대 핵심 기대 효과 */}
      <div className="space-y-5">
        <div>
          <p className="font-pixel text-xs text-[#1E88E5]">01 · EXPECTED IMPACT</p>
          <h3 className="font-pixel text-xl md:text-2xl text-[#1A1A2E] mt-1">
            프로젝트 3대 핵심 기대 효과
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {FINAL_IMPACTS.map((item) => (
            <div
              key={item.num}
              className="pixel-box-sm bg-white p-5 sm:p-6 flex flex-col justify-between gap-4"
            >
              <div className="space-y-2.5">
                <span className="font-arcade text-xs px-2 py-1 bg-[#FF5722] text-white inline-block">
                  {item.num}
                </span>
                <h4 className="font-bold text-base md:text-lg text-[#1A1A2E]">{item.title}</h4>
                <p className="text-xs sm:text-sm text-[#1A1A2E]/80 leading-relaxed">{item.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. CON:NECT가 기획한 축제 굿즈 12/1 ~ 12/3 오프라인 현장 DP 안내 */}
      <div className="space-y-4">
        <div>
          <p className="font-pixel text-xs text-[#FF5722]">02 · FESTIVAL GOODS OFFLINE DP</p>
          <h3 className="font-pixel text-xl md:text-2xl text-[#1A1A2E] mt-1">
            CON:NECT가 기획한 축제 굿즈 오프라인 현장 DP 안내
          </h3>
        </div>

        <div className="pixel-box bg-[#FFF8E1] p-5 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="p-3.5 bg-[#FF5722] text-white border-3 border-[#1A1A2E] shrink-0">
              <Gift className="w-7 h-7" aria-hidden="true" />
            </div>
            <div className="space-y-1.5">
              <span className="inline-block font-pixel text-xs px-2.5 py-0.5 bg-[#1A1A2E] text-[#FFD54F]">
                OFFLINE DP · {GOODS_RELEASE_NOTICE.period}
              </span>
              <h4 className="font-pixel text-lg sm:text-xl text-[#1A1A2E] break-keep">
                {GOODS_RELEASE_NOTICE.headline}
              </h4>
              <p className="text-xs sm:text-sm text-[#1A1A2E]/80 leading-relaxed break-keep">
                {GOODS_RELEASE_NOTICE.desc}
              </p>
            </div>
          </div>
          <div className="px-4 py-2.5 bg-white border-3 border-[#1A1A2E] font-pixel text-xs sm:text-sm text-[#E53935] shrink-0 self-end md:self-center">
            12/1 — 12/3 오프라인 DP!
          </div>
        </div>
      </div>

      {/* Bottom Restart & Briefing Actions */}
      <div className="pixel-box bg-white p-5 sm:p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <div className="font-pixel text-sm text-[#1A1A2E]">
            한림대학교 문화기획동아리 CON:NECT · 춘천 막국수닭갈비축제 개선 프로젝트
          </div>
          <p className="text-xs text-[#1A1A2E]/70 mt-1">
            시뮬레이션을 처음부터 다시 플레이하거나 데이터 기획 브리핑을 다시 열람할 수 있습니다.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto shrink-0">
          <button
            type="button"
            onClick={onGoToBriefing}
            className="pixel-btn w-full sm:w-auto px-4 py-3 bg-[#F5E6D3] text-[#1A1A2E] font-pixel text-xs cursor-pointer text-center"
          >
            기획 브리핑 다시 보기
          </button>
          <button
            type="button"
            onClick={onRestart}
            className="pixel-btn w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3 bg-[#FF5722] hover:bg-[#E53935] text-white font-pixel text-xs sm:text-sm cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>처음부터 다시 체험하기</span>
          </button>
        </div>
      </div>
    </section>
  );
}
