import { ExternalLink, ArrowRight, Lightbulb } from 'lucide-react';
import { URL_MAKDAG_ZIP } from '../../constants/links';

interface Step5Props {
  completed: boolean;
  onCompleteAndNext: () => void;
}

export function Step5MakdagZipEmbed({ completed, onCompleteAndNext }: Step5Props) {
  return (
    <div className="space-y-6">
      {/* Directly Embedded User-Built Makdag.ZIP + Cardpack Gacha */}
      <div className="pixel-box bg-white overflow-hidden">
        <div className="px-5 py-3.5 bg-[#E3F2FD] border-b-4 border-[#1A1A2E] flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="font-pixel text-xs text-[#1E88E5]">
              STEP 05 · 체험존 〈막닭.ZIP〉 &amp; 봄내크루 카드팩 뽑기
            </span>
            <h3 className="font-pixel text-lg sm:text-xl text-[#1A1A2E]">
              🎪 직접 제작한 〈막닭.ZIP〉 체험부스 &amp; 카드깡 플레이!
            </h3>
          </div>
          <a
            href={URL_MAKDAG_ZIP}
            target="_blank"
            rel="noopener noreferrer"
            className="pixel-btn inline-flex items-center gap-1 px-3 py-1.5 bg-white text-[#1A1A2E] font-pixel text-xs whitespace-nowrap"
          >
            <ExternalLink className="w-3.5 h-3.5" /> 새 탭에서 크게 열기
          </a>
        </div>

        {/* Real Live Embed of User's GitHub Pages App */}
        <div className="bg-[#1A1A2E] border-b-4 border-[#1A1A2E]">
          <iframe
            src={URL_MAKDAG_ZIP}
            title="체험부스 막닭.ZIP 및 봄내크루 카드팩"
            className="w-full h-[600px] sm:h-[660px] border-0 block bg-white"
          />
        </div>

        <div className="p-4 sm:px-6 bg-[#FFFDF9] flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs sm:text-sm text-[#1A1A2E]/80">
            위 화면에서 직접 〈막닭.ZIP〉 체험 부스와 봄내크루 랜덤 카드팩 뽑기를 실행해 보세요!
          </span>
          <button
            type="button"
            onClick={onCompleteAndNext}
            className="pixel-btn inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF5722] hover:bg-[#E53935] text-white font-pixel text-xs sm:text-sm cursor-pointer whitespace-nowrap"
          >
            <span>{completed ? 'STEP 6 공지천 공연·여권으로' : '체험 완료! 공지천 무대로 이동'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Planning Rationale Box Below */}
      <div className="pixel-box-sm bg-[#FFFDF7] p-5 md:p-6 space-y-4">
        <div className="flex items-center gap-2 font-pixel text-sm text-[#1E88E5]">
          <Lightbulb className="w-4 h-4 text-[#FF5722]" aria-hidden="true" />
          <span>기획 의도 &amp; 상세 내용 — 왜 〈막닭.ZIP〉 5종 체험과 &lsquo;달랑달랑 참&rsquo;을 기획했을까요?</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-[#1A1A2E]/85 leading-relaxed">
          <div className="p-3.5 bg-white border-2 border-[#1A1A2E]">
            <strong className="block text-[#E53935] mb-1">발견한 문제 (As-Is)</strong>
            기존 축제장에는 독서존·말타기 등 막국수·닭갈비와 무관한 백화점식 부스가 섞여 있어 축제 고유의 정체성과 참여 재미가 떨어졌습니다.
          </div>
          <div className="p-3.5 bg-white border-2 border-[#1A1A2E]">
            <strong className="block text-[#1E88E5] mb-1">5종 체험존 + 달랑달랑 참 리워드 (To-Be)</strong>
            ① 막국수 헤어살롱 ② 막 넘고 닭 넘어(줄넘기) ③ 닭치고 닭잡고 ④ 100m 닭리기 ⑤ 하늘에서 막국수가 내린다면 완료 시 &lsquo;달랑달랑 참&rsquo; 메지루시 키링을 지급하고, 도장 5개 완성 시 <strong>춘천사랑상품권 5,000원권</strong>으로 교환해 지역 실물 소비로 환원합니다.
          </div>
        </div>
      </div>
    </div>
  );
}
