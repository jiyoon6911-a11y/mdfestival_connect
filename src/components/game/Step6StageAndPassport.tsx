import { useState } from 'react';
import { Award, Sparkles, Lightbulb, ArrowRight, Flame, CheckCircle2, Calendar, Trophy } from 'lucide-react';
import {
  MAKDAG_CONTEST_DATA,
  PULMUONE_STAGE_PROGRAM,
  WEEKEND_FESTIVAL_SCHEDULE,
} from '../../data/festivalData';
import { soundEngine } from '../../utils/soundEngine';
import { GongjicheonPixelStage } from '../GongjicheonPixelStage';
import { PassportBooklet } from '../PassportBooklet';

interface Step6Props {
  completed: boolean;
  onCompleteAndFinish: () => void;
}

const FINALIST_DISHES = [
  { id: 'd1', team: '우미닭갈비 × 김춘천', dish: '매콤 닭갈비소스 냉메밀 타코 한 그릇' },
  { id: 'd2', team: '명동본가 × 이소양', dish: '숯불향 닭갈비 · 들기름 막국수 비빔볼' },
  { id: 'd3', team: '샘밭막국수 × 박한림', dish: '동치미 육수 & 치즈 닭갈비 핸드롤' },
  { id: 'd4', team: '통나무집 × 최메밀', dish: '바삭 메밀전병 닭갈비 랩 한 그릇' },
];

export function Step6StageAndPassport({
  completed,
  onCompleteAndFinish,
}: Step6Props) {
  const [subTab, setSubTab] = useState<'stage' | 'passport'>('stage');
  const [programDay, setProgramDay] = useState<'wedThu' | 'friSun'>('wedThu');
  const [activeRoundIdx, setActiveRoundIdx] = useState(3);
  const [votedDish, setVotedDish] = useState<string | null>(null);
  const [spiceTested, setSpiceTested] = useState(false);
  const [cheering, setCheering] = useState(false);
  const [voucherClaimed, setVoucherClaimed] = useState(false);

  const activeFlow = MAKDAG_CONTEST_DATA.flowSteps[activeRoundIdx] ?? MAKDAG_CONTEST_DATA.flowSteps[0];

  return (
    <div className="space-y-6">
      <div className="pixel-box bg-white p-4 sm:p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b-3 border-[#1A1A2E]">
          <div className="min-w-0">
            <span className="font-pixel text-xs text-[#1E88E5] block">
              STEP 06 · 공지천 메인 스테이지 무대 프로그램 &amp; 〈춘천 미식 여권〉
            </span>
            <h3 className="font-pixel text-base sm:text-xl text-[#1A1A2E] break-keep">
              🎤 낮에는 「막닭 소스 대첩」, 밤에는 〈닭같이 막 즐겨〉 × 풀무원 스테이지!
            </h3>
          </div>

          {/* Clean Sub-tab switcher between Concert Stage and Gourmet Passport */}
          <div className="grid grid-cols-2 sm:inline-flex gap-2 w-full sm:w-auto shrink-0">
            <button
              type="button"
              onClick={() => {
                soundEngine.playSfx('click');
                setSubTab('stage');
              }}
              className={`pixel-btn px-2.5 sm:px-3.5 py-2 font-pixel text-[11px] sm:text-xs cursor-pointer text-center ${
                subTab === 'stage' ? 'bg-[#1A1A2E] text-[#FFD54F]' : 'bg-[#F5E6D3]'
              }`}
            >
              A. 무대 프로그램
            </button>
            <button
              type="button"
              onClick={() => {
                soundEngine.playSfx('click');
                setSubTab('passport');
              }}
              className={`pixel-btn px-2.5 sm:px-3.5 py-2 font-pixel text-[11px] sm:text-xs cursor-pointer text-center ${
                subTab === 'passport' ? 'bg-[#143059] text-[#FFD54F]' : 'bg-[#F5E6D3]'
              }`}
            >
              B. 춘천 미식 여권 (8p)
            </button>
          </div>
        </div>

        {subTab === 'stage' && (
          <div className="space-y-5">
            {/* 1. Bespoke 16-bit Pixel Art Gongjicheon Field Implementation (Auto-switches Day Cooking vs Night Band) */}
            <GongjicheonPixelStage
              mode={programDay}
              cheering={cheering}
              spiceActive={spiceTested}
            />

            {/* 2. Day-Split Stage Program Switcher: 수·목 요리대회 vs 금·토·일 페스티벌 */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playSfx('click');
                    setProgramDay('wedThu');
                  }}
                  className={`pixel-btn p-3 text-left cursor-pointer ${
                    programDay === 'wedThu'
                      ? 'bg-[#FF5722] text-white'
                      : 'bg-[#FFF3E0] text-[#1A1A2E]'
                  }`}
                >
                  <div className="font-pixel text-[11px] opacity-90">수 · 목 낮 무대 프로그램</div>
                  <div className="font-pixel text-sm sm:text-base mt-0.5">
                    🔥 요리대회 「막닭 소스 대첩」 전체 안내
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playSfx('click');
                    setProgramDay('friSun');
                  }}
                  className={`pixel-btn p-3 text-left cursor-pointer ${
                    programDay === 'friSun'
                      ? 'bg-[#1E88E5] text-white'
                      : 'bg-[#E3F2FD] text-[#1A1A2E]'
                  }`}
                >
                  <div className="font-pixel text-[11px] opacity-90">금 · 토 · 일 밤 무대 프로그램</div>
                  <div className="font-pixel text-sm sm:text-base mt-0.5">
                    🎶 〈닭같이 막 즐겨〉 × 풀무원 스테이지
                  </div>
                </button>
              </div>

              {programDay === 'wedThu' && (
                <div className="border-3 border-[#1A1A2E] bg-[#FFFDF8] p-4 sm:p-6 space-y-6">
                  {/* Concept Header */}
                  <div className="border-b-3 border-[#1A1A2E] pb-4 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-pixel text-xs px-2.5 py-1 bg-[#FF5722] text-white border-2 border-[#1A1A2E]">
                        {MAKDAG_CONTEST_DATA.schedule}
                      </span>
                      <span className="font-pixel text-xs text-[#E53935]">총 상금 약 500만 원 · 전액 현금 지급</span>
                    </div>
                    <h4 className="font-pixel text-xl sm:text-2xl text-[#1A1A2E]">
                      🔥 {MAKDAG_CONTEST_DATA.title}
                    </h4>
                    <div className="inline-block font-pixel text-xs sm:text-sm px-2.5 py-1 bg-[#1A1A2E] text-[#FFD54F]">
                      {MAKDAG_CONTEST_DATA.conceptQuote}
                    </div>
                    <p className="text-xs sm:text-sm text-[#1A1A2E]/85 leading-relaxed break-keep">
                      {MAKDAG_CONTEST_DATA.conceptSummary}
                    </p>
                  </div>

                  {/* Why Citizen x Store Pair & References */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="p-4 bg-[#FFF8E1] border-2 border-[#1A1A2E] space-y-3">
                      <div className="font-pixel text-sm text-[#1A1A2E]">
                        1. 참가자 구조: 왜 〈시민 × 가게 페어〉인가?
                      </div>
                      <div className="space-y-1.5 text-xs sm:text-sm">
                        <strong className="text-[#E53935] block">가게끼리 대결(3대천황형)의 한계</strong>
                        <ul className="list-disc pl-4 space-y-1 text-[#1A1A2E]/80">
                          {MAKDAG_CONTEST_DATA.whyPair.asIsLimit.map((li) => (
                            <li key={li}>{li}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-1.5 text-xs sm:text-sm pt-2 border-t border-dashed border-[#1A1A2E]/30">
                        <strong className="text-[#1E88E5] block">해결 구조: 시민 참가 + 가게 파트너십</strong>
                        <ul className="list-disc pl-4 space-y-1 text-[#1A1A2E]/85">
                          {MAKDAG_CONTEST_DATA.whyPair.solution.map((li) => (
                            <li key={li}>{li}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="p-4 bg-white border-2 border-[#1A1A2E] space-y-3">
                      <div className="font-pixel text-sm text-[#1A1A2E]">2. 벤치마킹 레퍼런스</div>
                      <div className="space-y-2.5">
                        {MAKDAG_CONTEST_DATA.references.map((ref) => (
                          <div key={ref.name} className="p-2.5 bg-[#FFFDF8] border border-[#1A1A2E] text-xs sm:text-sm">
                            <strong className="text-[#1E88E5] block">{ref.name}</strong>
                            <span className="text-[#1A1A2E]/80">{ref.detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Interactive 6-Step Contest Flow Simulator */}
                  <div className="space-y-2.5">
                    <div className="font-pixel text-xs sm:text-sm text-[#E53935]">
                      3. 대회 진행 흐름 눌러서 살펴보기 (① 온라인 예선 → ⑥ 매운맛 챌린지)
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5">
                      {MAKDAG_CONTEST_DATA.flowSteps.map((st, idx) => (
                        <button
                          key={st.step}
                          type="button"
                          onClick={() => {
                            soundEngine.playSfx('click');
                            setActiveRoundIdx(idx);
                          }}
                          className={`p-2 border-2 border-[#1A1A2E] text-left cursor-pointer ${
                            activeRoundIdx === idx
                              ? 'bg-[#1A1A2E] text-[#FFD54F]'
                              : 'bg-white text-[#1A1A2E] hover:bg-[#FFF8E1]'
                          }`}
                        >
                          <div className="font-pixel text-[11px] leading-tight">{st.step}</div>
                          <div className="text-[10px] opacity-80 mt-0.5">{st.timing}</div>
                        </button>
                      ))}
                    </div>

                    <div className="p-3.5 bg-[#FFF8E1] border-2 border-[#1A1A2E] space-y-1">
                      <div className="font-pixel text-xs sm:text-sm text-[#1A1A2E]">
                        {activeFlow.step} ({activeFlow.timing})
                      </div>
                      <p className="text-xs sm:text-sm text-[#1A1A2E]/85 leading-relaxed break-keep">
                        {activeFlow.summary}
                      </p>
                    </div>
                  </div>

                  {/* Interactive Audience Tasting Vote (Gives Chicken Comb Stamp!) + Spicy Challenge */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3.5 bg-white border-2 border-[#1A1A2E] space-y-2.5">
                      <div className="font-pixel text-xs text-[#1E88E5]">
                        결선 2R 관객 한입 시식 스티커 투표 (30% 반영)
                      </div>
                      <div className="space-y-1.5">
                        {FINALIST_DISHES.map((item) => {
                          const picked = votedDish === item.id;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => {
                                soundEngine.playSfx('stamp');
                                setVotedDish(item.id);
                              }}
                              className={`w-full text-left p-2 border-2 border-[#1A1A2E] text-xs cursor-pointer flex items-center justify-between gap-2 ${
                                picked ? 'bg-[#E8F5E9] font-bold' : 'bg-[#FFFDF9] hover:bg-[#F5E6D3]/50'
                              }`}
                            >
                              <div className="min-w-0">
                                <span className="font-pixel text-[11px] text-[#E53935] block">
                                  {item.team}
                                </span>
                                <span className="break-keep">{item.dish}</span>
                              </div>
                              <span className="font-pixel text-[11px] shrink-0">
                                {picked ? '✓ 투표!' : '스티커'}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      {votedDish && (
                        <div className="p-2 bg-[#E8F5E9] border border-[#2E7D32] text-xs font-bold text-[#2E7D32] flex items-center gap-1.5 animate-stamp">
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                          <span>닭 벼슬 도장 1개 획득! (5개 완성 시 상품권 교환)</span>
                        </div>
                      )}
                    </div>

                    <div className="p-3.5 bg-[#1A1A2E] text-[#F5E6D3] border-2 border-[#1A1A2E] flex flex-col justify-between gap-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-1.5 font-pixel text-xs text-[#FF8A65]">
                          <Flame className="w-4 h-4" />
                          <span>사이드 이벤트 · 매운맛 챌린지</span>
                        </div>
                        <p className="text-xs leading-relaxed text-[#F5E6D3]/85">
                          라운드 사이 쉬는 시간에 무대 위 매운맛 단계에 도전하고, 도전 장면을 인스타 해시태그와 함께 올리면 추첨을 통해 경품을 드립니다!
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          soundEngine.playSfx('click');
                          setSpiceTested((s) => !s);
                        }}
                        className={`pixel-btn w-full py-2 font-pixel text-xs cursor-pointer ${
                          spiceTested ? 'bg-[#FFD54F] text-[#1A1A2E]' : 'bg-[#E53935] text-white'
                        }`}
                      >
                        {spiceTested
                          ? '🔥 매운맛 챌린지 도전 & #막닭소스대첩 인증 완료!'
                          : '🔥 무대 매운맛 챌린지 도전하기'}
                      </button>
                    </div>
                  </div>

                  {/* Judging Criteria & All-Cash Prizes */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    <div className="lg:col-span-5 p-4 bg-[#E3F2FD] border-2 border-[#1A1A2E] space-y-3">
                      <div className="font-pixel text-sm text-[#143059]">4. 심사 방식 및 배점 기준</div>
                      <div className="text-xs space-y-1.5 text-[#1A1A2E]/85">
                        <p><strong>· 1R 블라인드 심사:</strong> {MAKDAG_CONTEST_DATA.judging.round1}</p>
                        <p><strong>· 결선 합산 비율:</strong> {MAKDAG_CONTEST_DATA.judging.finalRule}</p>
                        <p><strong>· 심사위원단:</strong> {MAKDAG_CONTEST_DATA.judging.judges}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        {MAKDAG_CONTEST_DATA.judging.criteria.map((c) => (
                          <div key={c.label} className="p-2 bg-white border border-[#1A1A2E] flex justify-between text-xs font-pixel">
                            <span>{c.label}</span>
                            <span className="text-[#E53935]">{c.weight}</span>
                          </div>
                        ))}
                      </div>
                      <div className="p-2.5 bg-white border-2 border-[#2E7D32] text-xs text-[#2E7D32] font-bold">
                        🎫 도장판·프로모션 연계: {MAKDAG_CONTEST_DATA.judging.audienceVoteLink}
                      </div>
                    </div>

                    <div className="lg:col-span-7 p-4 bg-[#FFF8E1] border-2 border-[#1A1A2E] space-y-3">
                      <div className="flex items-center gap-1.5 font-pixel text-sm text-[#1A1A2E]">
                        <Trophy className="w-4 h-4 text-[#FF5722]" />
                        <span>5. 시상 내역 &amp; 전액 현금 지급 원칙 (총 약 500만 원)</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {MAKDAG_CONTEST_DATA.prizes.map((p) => (
                          <div key={p.rank} className="p-2.5 bg-white border border-[#1A1A2E] text-xs space-y-0.5">
                            <div className="flex items-center justify-between gap-2 font-pixel">
                              <span className="text-[#1A1A2E]">{p.rank}</span>
                              <span className="text-[#E53935] shrink-0">{p.amount}</span>
                            </div>
                            <p className="text-[#1A1A2E]/75 text-[11px]">{p.note}</p>
                          </div>
                        ))}
                      </div>

                      <p className="text-xs text-[#1A1A2E]/85 leading-relaxed bg-white p-2.5 border border-dashed border-[#1A1A2E]">
                        <strong>전액 현금 지급 이유:</strong> {MAKDAG_CONTEST_DATA.cashPolicy}
                      </p>

                      <div className="flex flex-wrap gap-2 text-[11px]">
                        {MAKDAG_CONTEST_DATA.storeBenefits.map((b) => (
                          <span
                            key={b}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-[#1A1A2E] text-[#FFD54F] font-pixel"
                          >
                            <CheckCircle2 className="w-3 h-3" /> {b}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {programDay === 'friSun' && (
                <div className="border-3 border-[#1A1A2E] bg-[#1A1A2E] text-[#F5E6D3] p-4 sm:p-6 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-[#90CAF9]/30 pb-4">
                    <div className="space-y-1">
                      <div className="font-pixel text-xs text-[#90CAF9] flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>금 · 토 · 일 공지천 메인 스테이지 최종 라인업</span>
                      </div>
                      <h4 className="font-pixel text-base sm:text-xl text-white">
                        🎶 {PULMUONE_STAGE_PROGRAM.brandTitle}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-[#F5E6D3]/80 break-keep">
                        {PULMUONE_STAGE_PROGRAM.venueDesc}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        soundEngine.playSfx('click');
                        setCheering((c) => !c);
                      }}
                      className={`pixel-btn w-full sm:w-auto px-4 py-2 font-pixel text-xs cursor-pointer shrink-0 ${
                        cheering ? 'bg-[#FFD54F] text-[#1A1A2E]' : 'bg-[#FF5722] text-white'
                      }`}
                    >
                      {cheering ? '🔦 야광봉 흔들며 응원 중!' : '🔦 야광봉 흔들어 무대 응원하기'}
                    </button>
                  </div>

                  {cheering && (
                    <div className="p-2.5 bg-[#FF5722]/25 border border-[#FFD54F] font-pixel text-xs text-[#FFD54F] text-center animate-stamp">
                      ✨ 공지천 잔디광장 · 풀무원 스테이지에서 야광봉을 흔들며 밴드 공연을 함께 떼창합니다! ✨
                    </div>
                  )}

                  {/* 1. 기획 배경 & 공간 확장 */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs sm:text-sm">
                    <div className="p-4 bg-[#262646] border-2 border-[#FF8A65]/50 space-y-2.5">
                      <div className="font-pixel text-xs sm:text-sm text-[#FF8A65]">
                        1. 기획 배경 및 기존 문제점
                      </div>
                      {PULMUONE_STAGE_PROGRAM.backgroundProblems.map((item) => (
                        <div key={item.title} className="p-2.5 bg-[#13142B] border border-[#F5E6D3]/15 space-y-1">
                          <strong className="block text-white">{item.title}</strong>
                          <p className="text-[#F5E6D3]/80 text-xs leading-relaxed break-keep">{item.detail}</p>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 bg-[#262646] border-2 border-[#90CAF9]/50 space-y-2.5">
                      <div className="font-pixel text-xs sm:text-sm text-[#90CAF9]">
                        2. 공간 확장 및 무대 구성안
                      </div>
                      {PULMUONE_STAGE_PROGRAM.spaceExpansion.map((item) => (
                        <div key={item.title} className="p-2.5 bg-[#13142B] border border-[#F5E6D3]/15 space-y-1">
                          <strong className="block text-white">{item.title}</strong>
                          <p className="text-[#F5E6D3]/80 text-xs leading-relaxed break-keep">{item.detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 3. 기업 네이밍 스폰서십 & 밴드·로컬 상생 */}
                  <div className="space-y-2.5">
                    <div className="font-pixel text-xs sm:text-sm text-[#FFD54F]">
                      3. 기업 네이밍 스폰서십 〈풀무원 스테이지〉 &amp; 밴드·로컬 상생 선정 근거
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                      {PULMUONE_STAGE_PROGRAM.sponsorshipAndLineup.map((card) => (
                        <div
                          key={card.title}
                          className="p-3.5 bg-[#13142B] border-2 border-[#FFD54F]/40 space-y-2 text-xs sm:text-sm"
                        >
                          <span className="inline-block font-arcade text-[9px] px-2 py-0.5 bg-[#262646] text-[#90CAF9] border border-[#90CAF9]/40">
                            {card.tag}
                          </span>
                          <div className="font-bold text-white break-keep">{card.title}</div>
                          <p className="text-xs text-[#F5E6D3]/80 leading-relaxed break-keep">{card.detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 4. 〈닭같이 막 즐겨〉 3일차 최종 타임테이블 */}
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="font-pixel text-xs sm:text-sm text-[#FFD54F]">
                        4. 〈닭같이 막 즐겨〉 3일차 최종 타임테이블
                      </div>
                      <span className="text-[11px] font-pixel text-[#A5D6A7]">
                        ★ 매일 오프닝: 강원음악창작소 지원 강원뮤지션
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {WEEKEND_FESTIVAL_SCHEDULE.map((day) => (
                        <div key={day.day} className="p-3.5 bg-[#262646] border-2 border-[#90CAF9]/50 space-y-2.5">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-pixel text-xs text-[#FFD54F]">{day.dayLabel}</span>
                            <span className="text-[10px] font-pixel px-1.5 py-0.5 bg-[#13142B] text-[#90CAF9]">
                              풀무원 스테이지
                            </span>
                          </div>
                          <div className="font-bold text-xs sm:text-sm text-white break-keep">{day.theme}</div>
                          <div className="space-y-1.5">
                            {day.timetable.map((slot) => (
                              <div
                                key={`${day.day}-${slot.time}`}
                                className={`p-2 border text-xs ${
                                  slot.isClosing
                                    ? 'bg-[#FF5722]/20 border-[#FF8A65]'
                                    : slot.isLocalSupported
                                      ? 'bg-[#2E7D32]/20 border-[#A5D6A7]/60'
                                      : 'bg-[#13142B] border-[#90CAF9]/30'
                                }`}
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <span className="font-arcade text-[10px] text-[#90CAF9] shrink-0">
                                    {slot.time}
                                  </span>
                                  <span className="font-pixel text-xs text-white text-right">
                                    {slot.artist}
                                  </span>
                                </div>
                                {slot.note !== '-' && (
                                  <div className="text-[10px] text-[#FFD54F] mt-1">
                                    ★ {slot.note}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Chuncheon Love Voucher Exchange */}
            <div className="p-4 bg-[#FFF8E1] border-3 border-[#1A1A2E] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-3">
                <Award className="w-8 h-8 text-[#FF5722] shrink-0" aria-hidden="true" />
                <div>
                  <div className="font-pixel text-sm text-[#1A1A2E]">
                    도장 5개 달성 보상: 춘천사랑상품권 5,000원권
                  </div>
                  <p className="text-xs text-[#1A1A2E]/75">
                    결선 시식 투표·〈막닭.ZIP〉 스탬프 5개를 모으면 춘천 관내 상권에서 바로 쓸 수 있는 상품권을 드립니다.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap gap-2 w-full sm:w-auto shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playSfx('stamp');
                    setVoucherClaimed(true);
                  }}
                  className={`pixel-btn w-full sm:w-auto px-4 py-2 font-pixel text-xs cursor-pointer ${
                    voucherClaimed ? 'bg-[#2E7D32] text-white' : 'bg-[#FF5722] text-white'
                  }`}
                >
                  {voucherClaimed ? '✓ 5,000원권 수령 완료' : '🎁 상품권 수령하기'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playSfx('click');
                    setSubTab('passport');
                  }}
                  className="pixel-btn w-full sm:w-auto px-4 py-2 bg-[#143059] text-[#FFD54F] font-pixel text-xs cursor-pointer"
                >
                  이어서 〈춘천 미식 여권〉 펼치기 ▶
                </button>
              </div>
            </div>
          </div>
        )}

        {subTab === 'passport' && <PassportBooklet />}

        {/* Final Complete CTA */}
        <div className="pt-3 border-t-2 border-[#1A1A2E] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs text-[#1A1A2E]/75 break-keep">
            공지천 무대 프로그램과 미식 여권을 모두 둘러보셨다면 기대효과와 CON:NECT가 기획한 축제 굿즈 오프라인 DP를 확인해 보세요!
          </span>
          <button
            type="button"
            onClick={onCompleteAndFinish}
            className="pixel-btn w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#FF5722] hover:bg-[#E53935] text-white font-pixel text-xs sm:text-sm cursor-pointer shrink-0"
          >
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>{completed ? '기대효과 · 굿즈 보기' : '전체 코스 클리어! 결과 보기'}</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>
        </div>
      </div>

      {/* Planning Rationale Box Below */}
      <div className="pixel-box-sm bg-[#FFFDF7] p-5 md:p-6 space-y-5">
        <div className="flex items-center gap-2 font-pixel text-sm sm:text-base text-[#1E88E5] border-b-2 border-[#1A1A2E] pb-2.5">
          <Lightbulb className="w-4 h-4 text-[#FF5722] shrink-0" aria-hidden="true" />
          <span>기획 의도 &amp; 상세 내용 — 왜 〈공지천 스테이지 이원화 &amp; 막닭 소스 대첩〉을 기획했을까요?</span>
        </div>

        {/* 문제점 및 핵심 해결 방향 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-[#1A1A2E]/85 leading-relaxed">
          <div className="p-4 bg-white border-2 border-[#1A1A2E] space-y-1.5">
            <strong className="block font-pixel text-xs sm:text-sm text-[#E53935]">발견한 문제</strong>
            <p className="break-keep">
              석사천 수면 위 무대는 우천 위험·측면 스크린 간접 관람·통행로 의자 침범으로 시야와 안전을 해쳤고, 기존 가게 간 요리 대결은 주방 인력 차출·패배 시 평판 부담으로 참여가 어려웠습니다. 또한 먹거리 단일 콘텐츠와 수동적인 트로트·발라드 관람형 무대만으로는 춘천 지역민 위주(약 59%) 방문객 구조를 깨고 외지 관광객을 축제 현장으로 끌어오기 역부족이었습니다.
            </p>
          </div>
          <div className="p-4 bg-white border-2 border-[#1A1A2E] space-y-1.5">
            <strong className="block font-pixel text-xs sm:text-sm text-[#1E88E5]">기획 해결책</strong>
            <p className="break-keep">
              메인 무대를 <strong>공지천 잔디광장·분수대·조각공원</strong> 일대로 확장하고 지상형 대형 스테이지 <strong>〈풀무원 스테이지〉</strong>를 조성해 정면 시야와 쾌적성을 확보했습니다. 수·목 낮에는 <strong>〈막닭 소스 대첩〉</strong>(시민×가게 페어)을, 금·토·일 밤에는 <strong>〈닭같이 막 즐겨〉</strong> 밴드 페스티벌과 강원음악창작소 로컬 뮤지션 상생 무대를 배치해 외부 관광객의 축제 방문을 극대화합니다.
            </p>
          </div>
        </div>

        {/* 공연 라인업 강화 및 밴드 중심 섭외 기획 근거 */}
        <div className="border-3 border-[#1A1A2E] bg-white p-4 sm:p-5 space-y-5">
          <div className="space-y-1">
            <div className="inline-block font-pixel text-[11px] px-2.5 py-0.5 bg-[#1A1A2E] text-[#FFD54F]">
              STAGE STRATEGY · 〈닭같이 막 즐겨〉 × 〈풀무원 스테이지〉
            </div>
            <h4 className="font-pixel text-base sm:text-lg text-[#1A1A2E] break-keep">
              🎤 기업 네이밍 스폰서십 &amp; 밴드 중심·로컬 상생 공연 기획 근거
            </h4>
          </div>

          {/* 1. 왜 유명 가수(킬러 라인업)가 필수적인가? */}
          <div className="space-y-3">
            <div className="font-pixel text-xs sm:text-sm text-[#E53935] border-l-4 border-[#E53935] pl-2.5">
              1. 왜 외부 관광객을 늘리려면 ‘유명 가수(킬러 라인업)’가 필수적인가?
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs sm:text-sm text-[#1A1A2E]/85 leading-relaxed">
              <div className="p-3.5 bg-[#FFF8E1] border-2 border-[#1A1A2E] space-y-1.5">
                <strong className="block text-[#1A1A2E] font-bold">
                  ① ‘먹거리’만으로는 타 지역 이동의 물리적·시간적 허들을 넘기 어려움
                </strong>
                <p className="break-keep">
                  닭갈비와 막국수는 이미 전국 프랜차이즈나 밀키트로도 쉽게 접할 수 있는 대중적인 음식입니다. 따라서 수도권 등 타 지역 관광객이 시간과 교통비를 들여 춘천까지 직접 찾아오게 만들려면 <strong>“오직 그날, 그 장소에서만 경험할 수 있는 강력한 방문 트리거(유인책)”</strong>가 반드시 필요합니다.
                </p>
              </div>
              <div className="p-3.5 bg-[#FFF8E1] border-2 border-[#1A1A2E] space-y-1.5">
                <strong className="block text-[#1A1A2E] font-bold">
                  ② 초기 집객(Traffic)과 자발적 SNS 바이럴의 기폭제
                </strong>
                <p className="break-keep">
                  크라잉넛·김장훈·데이브레이크·소란·10CM 등 인지도와 팬덤을 보유한 아티스트의 출연은 발표 즉시 온라인 커뮤니티와 SNS에서 화제성을 선점해, 춘천 지역민 위주(약 59%) 방문객 구조를 깨고 <strong>2030 세대 및 타 지역 관광객을 축제 현장으로 대거 유입</strong>시킵니다.
                </p>
              </div>
              <div className="p-3.5 bg-[#FFF8E1] border-2 border-[#1A1A2E] space-y-1.5">
                <strong className="block text-[#1A1A2E] font-bold">
                  ③ 축제 현장 전반의 활기 및 재방문 동기 부여
                </strong>
                <p className="break-keep">
                  단순히 음식만 먹고 빠르게 이탈하던 기존 축제와 달리, 낮에는 요리대회 〈막닭 소스 대첩〉·밤에는 대형 밴드 라이브 공연을 배치해 <strong>관람객이 오래 머무르며 축제 현장 전체를 즐기게</strong> 만듭니다.
                </p>
              </div>
            </div>
          </div>

          {/* 2. 왜 '밴드(Band)' 기반 라인업 & 풀무원 네이밍 스폰서십인가? */}
          <div className="space-y-3">
            <div className="font-pixel text-xs sm:text-sm text-[#1E88E5] border-l-4 border-[#1E88E5] pl-2.5">
              2. 왜 〈풀무원 스테이지〉 스폰서십 &amp; ‘밴드·로컬 상생’ 라인업을 기획했는가?
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs sm:text-sm text-[#1A1A2E]/85 leading-relaxed">
              <div className="p-3.5 bg-[#E8F5E9] border-2 border-[#1A1A2E] space-y-1.5">
                <strong className="block text-[#1B5E20] font-bold">
                  ① 메인 무대 네이밍 스폰서십 〈풀무원 스테이지〉
                </strong>
                <p className="break-keep">
                  해외 페스티벌·‘서울파크뮤직페스티벌’ 방식을 벤치마킹해 국내 생면 1위이자 춘천식 메밀 막국수·닭갈비 밀키트(HMR) 라인업 및 ‘바른먹거리·친환경’ 가치를 지닌 <strong>풀무원(Pulmuone)</strong>과 제휴, 지자체 예산 의존도를 낮추고 라인업 섭외 재원·현장 시식/체험 윈윈 구조를 확보했습니다.
                </p>
              </div>
              <div className="p-3.5 bg-[#E3F2FD] border-2 border-[#1A1A2E] space-y-1.5">
                <strong className="block text-[#143059] font-bold">
                  ② ‘원주 K-매운맛 페스티벌’ 벤치마킹
                </strong>
                <p className="break-keep">
                  인근 ‘원주 K-매운맛 페스티벌’이 미식 테마에 트렌디한 인디·록 밴드 공연을 결합해 2030 외부 관광객을 대거 유치한 성공 사례를 반영, <strong>“맛있는 음식과 함께 뛰어노는 야외 뮤직 페스티벌”</strong>로 포지셔닝했습니다.
                </p>
              </div>
              <div className="p-3.5 bg-[#E3F2FD] border-2 border-[#1A1A2E] space-y-1.5">
                <strong className="block text-[#143059] font-bold">
                  ③ 공지천 공간 × 닭갈비 열정 시너지
                </strong>
                <p className="break-keep">
                  물 위 무대를 철수하고 공지천 잔디광장·분수대·조각공원 일대에 지상형 대형 스테이지를 조성해, 의자에 갇힌 관람형 무대 대신 스탠딩과 피크닉을 오가며 함께 떼창하고 뛰어놀 수 있는 <strong>밴드 중심 페스티벌</strong>을 완성했습니다.
                </p>
              </div>
              <div className="p-3.5 bg-[#FFF3E0] border-2 border-[#1A1A2E] space-y-1.5">
                <strong className="block text-[#E65100] font-bold">
                  ④ 로컬 뮤지션 상생 (강원음악창작소)
                </strong>
                <p className="break-keep">
                  매일 오프닝 타임(1일차 <strong>SiiiL</strong> · 2일차 <strong>그림하일드</strong> · 3일차 <strong>곽다한 밴드</strong>)에 <strong>강원음악창작소 지원 강원뮤지션</strong>을 1팀씩 배치해 지역 예술인에게 대형 무대 기회를 제공하는 공공성을 확보했습니다.
                </p>
              </div>
            </div>
          </div>

          {/* 핵심 요약 */}
          <div className="p-3.5 sm:p-4 bg-[#1A1A2E] text-[#F5E6D3] border-2 border-[#1A1A2E] text-xs sm:text-sm leading-relaxed space-y-1.5">
            <div className="font-pixel text-xs text-[#FFD54F]">
              📄 〈닭같이 막 즐겨〉 × 〈풀무원 스테이지〉 기획 핵심 요약
            </div>
            <p className="break-keep">
              <strong>· 유명 아티스트 섭외의 필요성:</strong> 음식 단일 콘텐츠만으로는 타 지역 관광객의 이동 허들을 넘기 어려우므로, 인지도 높은 아티스트 라인업을 통해 강력한 초기 방문 동기(트리거)와 SNS 화제성을 확보하고 유입된 외부 인파를 축제 현장으로 유입시킵니다.
            </p>
            <p className="break-keep">
              <strong>· 밴드 기반 라인업 &amp; 공지천 무대 구축:</strong> ‘원주 K-매운맛 페스티벌’이 강렬한 미식 테마에 트렌디한 밴드·라이브 공연을 결합해 2030 외부 관광객을 대거 유치한 성공 사례를 벤치마킹해, 탁 트인 공지천 잔디광장의 개방감을 극대화한 관객 참여형 밴드 페스티벌 스테이지를 구축합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
