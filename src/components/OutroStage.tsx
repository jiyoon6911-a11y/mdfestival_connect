import { RotateCcw, Sparkles, Gift } from 'lucide-react';
import { FINAL_IMPACTS, GOODS_RELEASE_NOTICE } from '../data/festivalData';

function PixelNoSmokingIcon() {
  return (
    <svg viewBox="0 0 24 24" shapeRendering="crispEdges" className="w-14 h-14 shrink-0" aria-hidden="true">
      <rect x="7" y="2" width="10" height="2" fill="#E53935" />
      <rect x="7" y="20" width="10" height="2" fill="#E53935" />
      <rect x="2" y="7" width="2" height="10" fill="#E53935" />
      <rect x="20" y="7" width="2" height="10" fill="#E53935" />
      <rect x="4" y="4" width="3" height="3" fill="#E53935" />
      <rect x="17" y="4" width="3" height="3" fill="#E53935" />
      <rect x="4" y="17" width="3" height="3" fill="#E53935" />
      <rect x="17" y="17" width="3" height="3" fill="#E53935" />
      <rect x="6" y="11" width="9" height="3" fill="#FFFFFF" stroke="#1A1A2E" strokeWidth="0.6" />
      <rect x="15" y="11" width="3" height="3" fill="#FF8A65" />
      <rect x="7" y="7" width="2" height="2" fill="#90A4AE" />
      <rect x="6" y="6" width="2" height="2" fill="#E53935" />
      <rect x="8" y="8" width="2" height="2" fill="#E53935" />
      <rect x="10" y="10" width="2" height="2" fill="#E53935" />
      <rect x="12" y="12" width="2" height="2" fill="#E53935" />
      <rect x="14" y="14" width="2" height="2" fill="#E53935" />
      <rect x="16" y="16" width="2" height="2" fill="#E53935" />
    </svg>
  );
}

function PixelNoPetsIcon() {
  return (
    <svg viewBox="0 0 24 24" shapeRendering="crispEdges" className="w-14 h-14 shrink-0" aria-hidden="true">
      <rect x="7" y="2" width="10" height="2" fill="#E53935" />
      <rect x="7" y="20" width="10" height="2" fill="#E53935" />
      <rect x="2" y="7" width="2" height="10" fill="#E53935" />
      <rect x="20" y="7" width="2" height="10" fill="#E53935" />
      <rect x="4" y="4" width="3" height="3" fill="#E53935" />
      <rect x="17" y="4" width="3" height="3" fill="#E53935" />
      <rect x="4" y="17" width="3" height="3" fill="#E53935" />
      <rect x="17" y="17" width="3" height="3" fill="#E53935" />
      <rect x="8" y="7" width="2" height="2" fill="#5D4037" />
      <rect x="11" y="6" width="2" height="2" fill="#5D4037" />
      <rect x="14" y="7" width="2" height="2" fill="#5D4037" />
      <rect x="9" y="10" width="6" height="5" fill="#5D4037" />
      <rect x="8" y="12" width="8" height="3" fill="#5D4037" />
      <rect x="6" y="6" width="2" height="2" fill="#E53935" />
      <rect x="8" y="8" width="2" height="2" fill="#E53935" />
      <rect x="10" y="10" width="2" height="2" fill="#E53935" />
      <rect x="12" y="12" width="2" height="2" fill="#E53935" />
      <rect x="14" y="14" width="2" height="2" fill="#E53935" />
      <rect x="16" y="16" width="2" height="2" fill="#E53935" />
    </svg>
  );
}

function PixelTrashDisposalIcon() {
  return (
    <svg viewBox="0 0 24 24" shapeRendering="crispEdges" className="w-14 h-14 shrink-0" aria-hidden="true">
      <rect x="9" y="3" width="6" height="2" fill="#1A1A2E" />
      <rect x="5" y="5" width="14" height="3" fill="#1B5E20" />
      <rect x="6" y="8" width="12" height="13" fill="#2E7D32" />
      <rect x="8" y="10" width="2" height="9" fill="#A5D6A7" />
      <rect x="11" y="10" width="2" height="9" fill="#A5D6A7" />
      <rect x="14" y="10" width="2" height="9" fill="#A5D6A7" />
      <rect x="6" y="20" width="12" height="1" fill="#1A1A2E" />
    </svg>
  );
}

function PixelAccessibilityIcon() {
  return (
    <svg viewBox="0 0 24 24" shapeRendering="crispEdges" className="w-14 h-14 shrink-0" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" fill="#1E88E5" />
      <rect x="3" y="3" width="18" height="18" fill="#1565C0" />
      <rect x="10" y="5" width="3" height="3" fill="#FFFFFF" />
      <rect x="10" y="8" width="2" height="6" fill="#FFFFFF" />
      <rect x="10" y="12" width="6" height="2" fill="#FFFFFF" />
      <rect x="14" y="14" width="2" height="4" fill="#FFFFFF" />
      <rect x="7" y="12" width="2" height="5" fill="#FFD54F" />
      <rect x="8" y="16" width="5" height="2" fill="#FFD54F" />
      <rect x="12" y="14" width="1" height="3" fill="#FFD54F" />
    </svg>
  );
}

const GREEN_ZONE_POLICIES = [
  {
    id: 'no-smoking',
    code: 'NO SMOKING',
    title: '금연',
    desc: '피크닉존 및 행사장 전 구역 금연 (가족·아동 보호)',
    badgeClass: 'bg-[#FFEBEE] text-[#E53935]',
    icon: <PixelNoSmokingIcon />,
  },
  {
    id: 'no-pets',
    code: 'NO PETS',
    title: '반려동물 금지',
    desc: '위생 및 안전 관리를 위해 반려동물 출입 제한 (안내견 제외)',
    badgeClass: 'bg-[#FFEBEE] text-[#E53935]',
    icon: <PixelNoPetsIcon />,
  },
  {
    id: 'trash-disposal',
    code: 'TRASH DISPOSAL',
    title: '쓰레기 처리',
    desc: '출입구 근처 4개 분리배출 스테이션 운영 및 식사 후 즉시 정리',
    badgeClass: 'bg-[#E8F5E9] text-[#2E7D32]',
    icon: <PixelTrashDisposalIcon />,
  },
  {
    id: 'accessibility',
    code: 'ACCESSIBILITY',
    title: '접근성 보장',
    desc: '유모차·휠체어 이동이 가능한 1.5m 이상 보행 통로 및 평탄 동선 확보',
    badgeClass: 'bg-[#E3F2FD] text-[#1E88E5]',
    icon: <PixelAccessibilityIcon />,
  },
];

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
          한림대학교 문화기획동아리 CON:NECT의 프로젝트 핵심 기대효과와 쾌적한 축제 현장 체험을 위한 그린존 피크닉 운영 정책,
          그리고 12/1~12/3 오프라인 축제 현장에 DP(전시)되는 CON:NECT가 기획한 축제 굿즈 안내를 확인하세요.
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

      {/* 2. 축제 현장 체험 - 그린존 피크닉 운영 정책 */}
      <section aria-labelledby="outro-festival-experience-heading" className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <p className="font-pixel text-xs text-[#2E7D32]">02 · FESTIVAL EXPERIENCE · GREEN ZONE</p>
            <h3 id="outro-festival-experience-heading" className="font-pixel text-xl md:text-2xl text-[#1A1A2E] mt-1">
              축제 현장 체험 — 그린존 피크닉 운영 정책
            </h3>
          </div>
          <div className="flex flex-wrap gap-1.5 font-pixel text-[11px]">
            <span className="px-2.5 py-1 bg-[#2E7D32] text-white border-2 border-[#1A1A2E]">
              50~100칸 (350~700㎡)
            </span>
            <span className="px-2.5 py-1 bg-[#1A1A2E] text-[#FFD54F] border-2 border-[#1A1A2E]">
              전담 인력 24명
            </span>
          </div>
        </div>

        <div className="pixel-box bg-[#F3FAF4] p-4 sm:p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#1A1A2E]/20 pb-3">
            <span className="font-pixel text-xs sm:text-sm text-[#1A1A2E]">
              쾌적하고 안전한 피크닉존 이용을 위한 4대 핵심 운영 원칙
            </span>
            <span className="font-arcade text-[10px] px-2 py-0.5 bg-[#1A1A2E] text-[#FFD54F]">
              16-BIT POLICY GRID
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {GREEN_ZONE_POLICIES.map((policy) => (
              <div
                key={policy.id}
                className="bg-white border-3 border-[#1A1A2E] p-4 sm:p-5 flex flex-col items-center text-center gap-3 shadow-[4px_4px_0px_#1A1A2E]"
              >
                <span className={`font-arcade text-[10px] px-2.5 py-0.5 border border-[#1A1A2E] ${policy.badgeClass}`}>
                  {policy.code}
                </span>
                <div className="p-2.5 bg-[#FFFDF8] border-2 border-[#1A1A2E]">
                  {policy.icon}
                </div>
                <div className="space-y-1">
                  <h4 className="font-pixel text-base text-[#1A1A2E] break-keep">
                    {policy.title}
                  </h4>
                  <p className="text-xs text-[#1A1A2E]/80 leading-relaxed break-keep">
                    {policy.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CON:NECT가 기획한 축제 굿즈 12/1 ~ 12/3 오프라인 현장 DP 안내 */}
      <div className="space-y-4">
        <div>
          <p className="font-pixel text-xs text-[#FF5722]">03 · FESTIVAL GOODS OFFLINE DP</p>
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
