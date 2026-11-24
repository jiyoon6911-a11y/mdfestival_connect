import { ExternalLink, ArrowRight, Lightbulb } from 'lucide-react';
import { URL_DECORATE } from '../../constants/links';

interface Step1Props {
  completed: boolean;
  onCompleteAndNext: () => void;
}

export function Step1Decorate({ completed, onCompleteAndNext }: Step1Props) {
  return (
    <div className="space-y-6">
      {/* Game Box */}
      <div className="pixel-box bg-white overflow-hidden">
        <div className="px-5 py-3.5 bg-[#FFF0F3] border-b-4 border-[#1A1A2E] flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="font-pixel text-xs text-[#E53935]">
              STEP 01 · 사전 홍보 웹 게임
            </span>
            <h3 className="font-pixel text-lg sm:text-xl text-[#1A1A2E]">
              🎨 나만의 막닭 꾸미기 (직접 플레이해 보세요!)
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={URL_DECORATE}
              target="_blank"
              rel="noopener noreferrer"
              className="pixel-btn inline-flex items-center gap-1 px-3 py-1.5 bg-white text-[#1A1A2E] font-pixel text-xs whitespace-nowrap"
            >
              <ExternalLink className="w-3.5 h-3.5" /> 새 탭으로 크게 열기
            </a>
          </div>
        </div>

        {/* Embedded Real HTML Game */}
        <div className="bg-[#FFF0F3] border-b-4 border-[#1A1A2E]">
          <iframe
            src={URL_DECORATE}
            title="나만의 막닭 꾸미기 웹 게임"
            className="w-full h-[540px] sm:h-[600px] border-0 block"
          />
        </div>

        <div className="p-4 sm:px-6 bg-[#FFFDF9] flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs sm:text-sm text-[#1A1A2E]/80">
            막국수 또는 닭갈비를 골라 토핑을 올린 뒤, 인스타 스토리 공유 이미지를 만들어 보세요!
          </span>
          <button
            type="button"
            onClick={onCompleteAndNext}
            className="pixel-btn inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF5722] hover:bg-[#E53935] text-white font-pixel text-xs sm:text-sm cursor-pointer whitespace-nowrap"
          >
            <span>{completed ? 'STEP 2 탐험지도로 이동' : '꾸미기 완료! 축제 현장 출발'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Planning Rationale Box Below Game */}
      <div className="pixel-box-sm bg-[#FFFDF7] p-5 md:p-6 space-y-3">
        <div className="flex items-center gap-2 font-pixel text-sm text-[#1E88E5]">
          <Lightbulb className="w-4 h-4 text-[#FF5722]" aria-hidden="true" />
          <span>기획 의도 &amp; 상세 내용 — 왜 〈나만의 막닭 꾸미기〉를 만들었을까요?</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-[#1A1A2E]/85 leading-relaxed">
          <div className="p-3.5 bg-white border-2 border-[#1A1A2E]">
            <strong className="block text-[#E53935] mb-1">발견한 문제 (As-Is)</strong>
            기존 축제의 사전 홍보는 단순 SNS 카드뉴스 업로드와 현수막 게시에 그쳐, 2030 세대와 외지인의 자발적인 공유·바이럴 파급력이 매우 낮았습니다.
          </div>
          <div className="p-3.5 bg-white border-2 border-[#1A1A2E]">
            <strong className="block text-[#1E88E5] mb-1">기획 해결책 (To-Be)</strong>
            방문 전 웹사이트에서 직접 막국수·닭갈비 토핑을 조합하고 인스타그램 스토리(9:16) 규격으로 즉시 저장·공유하게 만들어 자연스러운 축제 유입을 유도합니다.
          </div>
        </div>
      </div>
    </div>
  );
}
