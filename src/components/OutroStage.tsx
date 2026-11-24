import { RotateCcw, Sparkles } from 'lucide-react';
import { FINAL_IMPACTS, OFFICIAL_GOODS } from '../data/festivalData';
import { GoodsPixelSprite } from './PixelSprites';

interface OutroStageProps {
  onRestart: () => void;
  onGoToBriefing: () => void;
}

export function OutroStage({ onRestart, onGoToBriefing }: OutroStageProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14 space-y-12">
      {/* Outro Hero Summary */}
      <div className="pixel-box bg-[#1A1A2E] text-[#F5E6D3] p-6 md:p-10 text-center space-y-4">
        <div className="inline-flex items-center gap-2 font-pixel text-xs text-[#FFD54F]">
          <Sparkles className="w-4 h-4" aria-hidden="true" />
          <span>STAGE 3 · QUEST CLEAR &amp; FINAL IMPACT</span>
        </div>
        <h2 className="font-pixel text-2xl sm:text-3xl md:text-4xl text-white leading-snug text-balance">
          “2026 춘천 막국수닭갈비축제, 이렇게 바뀝니다!”
        </h2>
        <p className="text-sm sm:text-base text-[#F5E6D3]/85 max-w-2xl mx-auto leading-relaxed">
          한림대학교 문화기획동아리 CON:NECT가 제안하는 공간·운영·콘텐츠·상권 연계 혁신 모델과
          실제 제작 견적을 반영한 공식 굿즈 6종 라인업을 확인하세요.
        </p>
      </div>

      {/* 3대 기대 효과 */}
      <div className="space-y-5">
        <div>
          <p className="font-pixel text-xs text-[#1E88E5]">EXPECTED IMPACT</p>
          <h3 className="font-pixel text-xl md:text-2xl text-[#1A1A2E] mt-1">
            프로젝트 3대 핵심 기대 효과
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {FINAL_IMPACTS.map((item) => (
            <div
              key={item.num}
              className="pixel-box-sm bg-white p-6 flex flex-col justify-between gap-4"
            >
              <div className="space-y-2.5">
                <span className="font-arcade text-xs px-2 py-1 bg-[#FF5722] text-white inline-block">
                  {item.num}
                </span>
                <h4 className="font-bold text-base md:text-lg text-[#1A1A2E]">{item.title}</h4>
                <p className="text-sm text-[#1A1A2E]/80 leading-relaxed">{item.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 최종 확정 공식 굿즈 6종 쇼케이스 (141개 발주 기준) */}
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <p className="font-pixel text-xs text-[#E53935]">OFFICIAL MERCHANDISE LINEUP</p>
            <h3 className="font-pixel text-xl md:text-2xl text-[#1A1A2E] mt-1">
              최종 확정 공식 굿즈 6종 쇼케이스 (실제 제작 견적 · 141개 기준)
            </h3>
          </div>
          <span className="font-pixel text-xs text-[#1E88E5]">
            TEAM 닭갈비 vs TEAM 막국수 라이벌 구도
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {OFFICIAL_GOODS.map((g, idx) => (
            <div
              key={g.id}
              className="pixel-box bg-white p-5 flex flex-col justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#F5E6D3] border-3 border-[#1A1A2E] shrink-0">
                  <GoodsPixelSprite type={g.type} className="w-14 h-14" />
                </div>
                <div className="space-y-1">
                  <div className="font-pixel text-[11px] text-[#FF5722]">GOODS 0{idx + 1}</div>
                  <h4 className="font-bold text-base text-[#1A1A2E]">{g.name}</h4>
                  <div className="text-xs font-pixel text-[#1E88E5]">{g.spec}</div>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#1A1A2E]/80 leading-relaxed pt-3 border-t-2 border-dashed border-[#1A1A2E]/20">
                {g.usage}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Restart & Briefing Actions */}
      <div className="pixel-box bg-white p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <div className="font-pixel text-sm text-[#1A1A2E]">
            한림대학교 문화기획동아리 CON:NECT · 춘천 막국수닭갈비축제 개선 프로젝트
          </div>
          <p className="text-xs text-[#1A1A2E]/70 mt-1">
            시뮬레이션을 처음부터 다시 플레이하거나 데이터 기획 브리핑을 다시 열람할 수 있습니다.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onGoToBriefing}
            className="pixel-btn px-4 py-3 bg-[#F5E6D3] text-[#1A1A2E] font-pixel text-xs cursor-pointer whitespace-nowrap"
          >
            기획 브리핑 다시 보기
          </button>
          <button
            type="button"
            onClick={onRestart}
            className="pixel-btn inline-flex items-center gap-1.5 px-5 py-3 bg-[#FF5722] hover:bg-[#E53935] text-white font-pixel text-xs sm:text-sm cursor-pointer whitespace-nowrap"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            <span>처음부터 다시 체험하기</span>
          </button>
        </div>
      </div>
    </section>
  );
}
