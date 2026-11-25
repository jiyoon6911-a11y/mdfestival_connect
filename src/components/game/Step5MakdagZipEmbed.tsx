import { useState } from 'react';
import { ExternalLink, ArrowRight, Lightbulb, Maximize2, Minimize2, ArrowLeft } from 'lucide-react';
import { URL_MAKDAG_ZIP } from '../../constants/links';

interface Step5Props {
  completed: boolean;
  onCompleteAndNext: () => void;
}

export function Step5MakdagZipEmbed({ completed, onCompleteAndNext }: Step5Props) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [extraTall, setExtraTall] = useState(false);

  return (
    <div className="space-y-6">
      {/* Full-Viewport Overlay Mode when user wants zero outer scroll distractions */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 bg-[#1A1A2E] flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="막닭.ZIP 전체화면 체험"
        >
          <div className="px-3 sm:px-5 py-2.5 bg-[#1A1A2E] text-white border-b-4 border-[#FF5722] flex items-center justify-between gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsFullscreen(false)}
              className="pixel-btn inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FF5722] text-white font-pixel text-xs cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>축제장 시뮬레이터로 돌아가기</span>
            </button>

            <div className="flex items-center gap-2">
              <a
                href={URL_MAKDAG_ZIP}
                target="_blank"
                rel="noopener noreferrer"
                className="pixel-btn inline-flex items-center gap-1 px-2.5 py-1.5 bg-white text-[#1A1A2E] font-pixel text-xs whitespace-nowrap"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">새 탭</span>
              </a>
              <button
                type="button"
                onClick={() => setIsFullscreen(false)}
                className="pixel-btn inline-flex items-center gap-1 px-2.5 py-1.5 bg-[#2B2B4B] text-[#FFD54F] font-pixel text-xs cursor-pointer"
                aria-label="전체화면 닫기"
              >
                <Minimize2 className="w-3.5 h-3.5" />
                <span>축소</span>
              </button>
            </div>
          </div>

          <iframe
            src={URL_MAKDAG_ZIP}
            title="체험부스 막닭.ZIP 전체화면"
            className="w-full flex-1 border-0 bg-white"
          />
        </div>
      )}

      {/* Directly Embedded User-Built Makdag.ZIP + Cardpack Gacha */}
      <div className="pixel-box bg-white overflow-hidden">
        <div className="px-4 sm:px-5 py-3.5 bg-[#E3F2FD] border-b-4 border-[#1A1A2E] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="font-pixel text-xs text-[#1E88E5] block">
              STEP 05 · 체험존 〈막닭.ZIP〉 &amp; 봄내크루 카드팩 뽑기
            </span>
            <h3 className="font-pixel text-base sm:text-xl text-[#1A1A2E] break-keep">
              🎪 직접 제작한 〈막닭.ZIP〉 체험부스 &amp; 카드깡 플레이!
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsFullscreen(true)}
              className="pixel-btn inline-flex items-center gap-1 px-3 py-1.5 bg-[#1E88E5] text-white font-pixel text-xs cursor-pointer whitespace-nowrap"
            >
              <Maximize2 className="w-3.5 h-3.5" /> 전체화면으로 편하게 보기
            </button>
            <button
              type="button"
              onClick={() => setExtraTall((v) => !v)}
              className="pixel-btn inline-flex items-center gap-1 px-2.5 py-1.5 bg-[#FFF8E1] text-[#1A1A2E] font-pixel text-xs cursor-pointer whitespace-nowrap"
            >
              {extraTall ? '세로 높이 기본' : '세로 더 길게 펼치기'}
            </button>
            <a
              href={URL_MAKDAG_ZIP}
              target="_blank"
              rel="noopener noreferrer"
              className="pixel-btn inline-flex items-center gap-1 px-2.5 py-1.5 bg-white text-[#1A1A2E] font-pixel text-xs whitespace-nowrap"
            >
              <ExternalLink className="w-3.5 h-3.5" /> 새 탭 열기
            </a>
          </div>
        </div>

        {/* Tall Seamless Embed so user doesn't have to double-scroll inside a short box */}
        <div className="bg-[#1A1A2E] border-b-4 border-[#1A1A2E]">
          <iframe
            src={URL_MAKDAG_ZIP}
            title="체험부스 막닭.ZIP 및 봄내크루 카드팩"
            className={`w-full border-0 block bg-white transition-[height] duration-300 ${
              extraTall
                ? 'h-[2900px] sm:h-[2400px] lg:h-[2100px]'
                : 'h-[2150px] sm:h-[1650px] lg:h-[1450px]'
            }`}
          />
        </div>

        <div className="p-4 sm:px-6 bg-[#FFFDF9] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs sm:text-sm text-[#1A1A2E]/80 break-keep">
            안쪽 스크롤 없이 바로 체험되도록 길게 펼쳤습니다. 화면을 꽉 채워 보려면 상단 <strong>전체화면으로 편하게 보기</strong>를 눌러주세요!
          </span>
          <button
            type="button"
            onClick={onCompleteAndNext}
            className="pixel-btn w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#FF5722] hover:bg-[#E53935] text-white font-pixel text-xs sm:text-sm cursor-pointer shrink-0"
          >
            <span>{completed ? 'STEP 6 공지천 공연·여권으로' : '체험 완료! 공지천 무대로 이동'}</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
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
            <strong className="block text-[#E53935] mb-1">발견한 문제</strong>
            기존 축제장에는 독서존·말타기 등 막국수·닭갈비와 무관한 백화점식 부스가 섞여 있어 축제 고유의 정체성과 참여 재미가 떨어졌습니다.
          </div>
          <div className="p-3.5 bg-white border-2 border-[#1A1A2E]">
            <strong className="block text-[#1E88E5] mb-1">5종 체험존 + 달랑달랑 참 리워드</strong>
            ① 막국수 헤어살롱 ② 막 넘고 닭 넘어(줄넘기) ③ 닭치고 닭잡고 ④ 100m 닭리기 ⑤ 하늘에서 막국수가 내린다면 완료 시 &lsquo;달랑달랑 참&rsquo; 메지루시 키링을 지급하고, 도장 5개 완성 시 <strong>춘천사랑상품권 5,000원권</strong>으로 교환해 지역 실물 소비로 환원합니다.
          </div>
        </div>
      </div>
    </div>
  );
}
