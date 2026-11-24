import { useState } from 'react';
import { Award, Sparkles, Lightbulb, ArrowRight } from 'lucide-react';
import { PassportBooklet } from '../PassportBooklet';

interface Step6Props {
  completed: boolean;
  onCompleteAndFinish: () => void;
}

export function Step6StageAndPassport({
  completed,
  onCompleteAndFinish,
}: Step6Props) {
  const [subTab, setSubTab] = useState<'stage' | 'passport'>('stage');
  const [cheering, setCheering] = useState(false);
  const [voucherClaimed, setVoucherClaimed] = useState(false);

  return (
    <div className="space-y-6">
      <div className="pixel-box bg-white p-5 md:p-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b-3 border-[#1A1A2E]">
          <div>
            <span className="font-pixel text-xs text-[#1E88E5]">
              STEP 06 · 공지천 메인 스테이지 &amp; 〈춘천 미식 여권〉
            </span>
            <h3 className="font-pixel text-lg sm:text-xl text-[#1A1A2E]">
              🎤 공지천 대형 공연·요리대회 즐기고 〈끼끼 여권〉으로 춘천 맛집까지!
            </h3>
          </div>

          {/* Clean Sub-tab switcher between Concert Stage and Gourmet Passport */}
          <div className="inline-flex gap-1.5">
            <button
              type="button"
              onClick={() => setSubTab('stage')}
              className={`pixel-btn px-3.5 py-2 font-pixel text-xs cursor-pointer ${
                subTab === 'stage' ? 'bg-[#1A1A2E] text-[#FFD54F]' : 'bg-[#F5E6D3]'
              }`}
            >
              A. 공지천 메인 스테이지
            </button>
            <button
              type="button"
              onClick={() => setSubTab('passport')}
              className={`pixel-btn px-3.5 py-2 font-pixel text-xs cursor-pointer ${
                subTab === 'passport' ? 'bg-[#143059] text-[#FFD54F]' : 'bg-[#F5E6D3]'
              }`}
            >
              B. 춘천 미식 여권 (8p)
            </button>
          </div>
        </div>

        {subTab === 'stage' && (
          <div className="space-y-5">
            {/* Pixel Stage Scene */}
            <div className="p-5 bg-[#1A1A2E] text-[#F5E6D3] border-3 border-[#1A1A2E] space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="font-pixel text-xs text-[#FFD54F]">
                    공지천 잔디광장 · 분수대 · 조각공원 확장 스테이지
                  </div>
                  <h4 className="font-pixel text-lg sm:text-xl text-white mt-1">
                    기업 협업 네이밍 무대 &amp; 시민×가게 페어 〈막닭 소스 대첩〉
                  </h4>
                </div>

                <button
                  type="button"
                  onClick={() => setCheering((c) => !c)}
                  className={`pixel-btn px-4 py-2 font-pixel text-xs cursor-pointer ${
                    cheering ? 'bg-[#FFD54F] text-[#1A1A2E]' : 'bg-[#FF5722] text-white'
                  }`}
                >
                  {cheering ? '🔦 LED 응원봉 흔드는 중!' : '🔦 LED 응원봉 키링 흔들기'}
                </button>
              </div>

              {cheering && (
                <div className="p-2.5 bg-[#FF5722]/25 border border-[#FFD54F] font-pixel text-xs text-[#FFD54F] text-center animate-stamp">
                  ✨ TEAM 닭갈비 vs TEAM 막국수 슬로건 타올과 LED 응원봉으로 공지천 광장이 빛납니다! ✨
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 bg-[#262646] border-2 border-[#FF5722] space-y-1.5">
                  <div className="font-pixel text-xs text-[#FF8A65]">
                    기업 후원 연계 스테이지
                  </div>
                  <p className="text-[#F5E6D3]/90 leading-relaxed">
                    <strong>하림 · 삼양 불닭 · 풀무원</strong> 등 브랜드와 연계해 대형 스테이지 네이밍, 시식·매운맛 챌린지 협찬을 유치하고 화제성 높은 공연 라인업을 구축했습니다.
                  </p>
                </div>

                <div className="p-4 bg-[#262646] border-2 border-[#1E88E5] space-y-1.5">
                  <div className="font-pixel text-xs text-[#90CAF9]">
                    〈막닭 소스 대첩〉 (총 상금 500만 원 전액 현금)
                  </div>
                  <p className="text-[#F5E6D3]/90 leading-relaxed">
                    시민×가게 일대일 매칭으로 상인 부담을 덜고, <strong>1R &lsquo;닭 없는 닭갈비&rsquo;</strong> → <strong>2R &lsquo;한 그릇 미션&rsquo;</strong> 우승 레시피를 매칭 점포의 한정·정식 메뉴로 출시합니다.
                  </p>
                </div>
              </div>
            </div>

            {/* Chuncheon Love Voucher Exchange */}
            <div className="p-4 bg-[#FFF8E1] border-3 border-[#1A1A2E] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-[#FF5722] shrink-0" aria-hidden="true" />
                <div>
                  <div className="font-pixel text-sm text-[#1A1A2E]">
                    도장 5개 달성 보상: 춘천사랑상품권 5,000원권
                  </div>
                  <p className="text-xs text-[#1A1A2E]/75">
                    수령한 상품권은 축제장 및 춘천 관내 상권에서 현금처럼 사용할 수 있습니다.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setVoucherClaimed(true)}
                  className={`pixel-btn px-4 py-2 font-pixel text-xs cursor-pointer ${
                    voucherClaimed ? 'bg-[#2E7D32] text-white' : 'bg-[#FF5722] text-white'
                  }`}
                >
                  {voucherClaimed ? '✓ 5,000원권 수령 완료' : '🎁 상품권 수령하기'}
                </button>
                <button
                  type="button"
                  onClick={() => setSubTab('passport')}
                  className="pixel-btn px-4 py-2 bg-[#143059] text-[#FFD54F] font-pixel text-xs cursor-pointer"
                >
                  이어서 〈춘천 미식 여권〉 펼치기 ▶
                </button>
              </div>
            </div>
          </div>
        )}

        {subTab === 'passport' && <PassportBooklet />}

        {/* Final Complete CTA */}
        <div className="pt-3 border-t-2 border-[#1A1A2E] flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs text-[#1A1A2E]/75">
            공지천 스테이지와 미식 여권까지 모두 둘러보셨다면 최종 기대효과 &amp; 굿즈 쇼케이스를 확인해 보세요!
          </span>
          <button
            type="button"
            onClick={onCompleteAndFinish}
            className="pixel-btn inline-flex items-center gap-2 px-5 py-3 bg-[#FF5722] hover:bg-[#E53935] text-white font-pixel text-xs sm:text-sm cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4" />
            <span>{completed ? '기대효과 · 공식 굿즈 6종 보기' : '전체 코스 클리어! 결과 보기'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Planning Rationale Box Below */}
      <div className="pixel-box-sm bg-[#FFFDF7] p-5 md:p-6 space-y-3">
        <div className="flex items-center gap-2 font-pixel text-sm text-[#1E88E5]">
          <Lightbulb className="w-4 h-4 text-[#FF5722]" aria-hidden="true" />
          <span>기획 의도 &amp; 상세 내용 — 왜 〈공지천 스테이지 확장 &amp; 끼끼 여권〉을 기획했을까요?</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-[#1A1A2E]/85 leading-relaxed">
          <div className="p-3.5 bg-white border-2 border-[#1A1A2E]">
            <strong className="block text-[#E53935] mb-1">발견한 문제 (As-Is)</strong>
            석사천 수면 위 무대는 우천 위험·측면 스크린 간접 관람·통행로 의자 침범 문제가 있었고, 음식 축제 평균 체류(1.5~2시간) 후 원도심 상권 소비로 이어지는 장치가 전무했습니다.
          </div>
          <div className="p-3.5 bg-white border-2 border-[#1A1A2E]">
            <strong className="block text-[#1E88E5] mb-1">기획 해결책 (To-Be)</strong>
            공지천 잔디광장으로 메인 무대를 이원화해 사각지대와 병목을 없애고, 시민 추천 맛집 10선과 제휴 바우처를 담은 〈끼끼 여권〉으로 축제 방문을 춘천 시내 외식 매출로 연결합니다.
          </div>
        </div>
      </div>
    </div>
  );
}
