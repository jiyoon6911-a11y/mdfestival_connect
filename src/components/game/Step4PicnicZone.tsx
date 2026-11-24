import { useState } from 'react';
import { Umbrella, AlertTriangle, Trash2, ArrowRight, Lightbulb } from 'lucide-react';
import { PICNIC_STAFF_ROLES } from '../../data/festivalData';

interface Step4Props {
  completed: boolean;
  assignedSeat: string | null;
  onCompleteAndNext: () => void;
}

const A_SLOTS = ['A-10', 'A-11', 'A-12 (내 배정 칸)', 'A-13'];
const B_SLOTS = ['B-01', 'B-02', 'B-03', 'B-04'];

export function Step4PicnicZone({
  completed,
  assignedSeat,
  onCompleteAndNext,
}: Step4Props) {
  const [rainy, setRainy] = useState(false);
  const [seated, setSeated] = useState<string | null>(null);
  const [warningState, setWarningState] = useState<0 | 15 | 20>(0);
  const [exited, setExited] = useState(false);

  return (
    <div className="space-y-6">
      <div className="pixel-box bg-white p-5 md:p-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b-3 border-[#1A1A2E]">
          <div>
            <span className="font-pixel text-xs text-[#2E7D32]">
              STEP 04 · 번호 지정제 피크닉존 입장 &amp; 자리 관리
            </span>
            <h3 className="font-pixel text-lg sm:text-xl text-[#1A1A2E]">
              🧺 내 번호 칸({assignedSeat || 'A-12'})에 앉아 식사하고 깔끔하게 퇴장하기!
            </h3>
          </div>

          <button
            type="button"
            onClick={() => setRainy((r) => !r)}
            className={`pixel-btn inline-flex items-center gap-1.5 px-3 py-1.5 font-pixel text-xs cursor-pointer ${
              rainy ? 'bg-[#1E88E5] text-white' : 'bg-[#F5E6D3]'
            }`}
          >
            <Umbrella className="w-3.5 h-3.5" />
            <span>{rainy ? '☔ 우천 모드: 칸별 파라솔 지급' : '☀ 맑음 (우천 파라솔 보기)'}</span>
          </button>
        </div>

        {/* Interactive Picnic Floor Map */}
        <div className="p-4 bg-[#E8F5E9] border-3 border-[#1A1A2E] space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-pixel">
            <span className="px-2 py-1 bg-[#1E88E5] text-white border-2 border-[#1A1A2E]">
              입구 안내부스 ① (대기표 발급)
            </span>
            <span className="px-2 py-1 bg-[#FFD54F] text-[#1A1A2E] border-2 border-[#1A1A2E]">
              서서 먹는 선반 구역 (메뉴존 옆)
            </span>
            <span className="px-2 py-1 bg-[#1E88E5] text-white border-2 border-[#1A1A2E]">
              입구 안내부스 ② (규칙 안내)
            </span>
          </div>

          {/* A Zone */}
          <div className="space-y-1.5">
            <div className="text-xs font-bold text-[#1A1A2E]">
              A구역 (4인 칸: 2m × 2m, 최대 6명) — 배정받은 칸을 클릭해 착석하세요!
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {A_SLOTS.map((slot) => {
                const isMine = slot.startsWith('A-12');
                const isHere = seated === slot && !exited;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => {
                      setSeated(slot);
                      setExited(false);
                    }}
                    className={`p-3 border-3 border-[#1A1A2E] font-pixel text-xs text-center cursor-pointer transition-all ${
                      isHere
                        ? 'bg-[#FF5722] text-white shadow-[3px_3px_0px_#1A1A2E]'
                        : isMine
                          ? 'bg-[#FFF59D] text-[#1A1A2E]'
                          : 'bg-white text-[#1A1A2E]/75'
                    }`}
                  >
                    <div>{rainy ? '⛱ ' : ''}{slot}</div>
                    <div className="text-[10px] mt-1">
                      {isHere ? '용사 착석 중!' : isMine ? '내 예약 번호' : '고정 돗자리'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 1.5m Walkway */}
          <div className="py-1.5 px-3 bg-[#FFF8E1] border-2 border-dashed border-[#FF5722] text-center font-pixel text-xs text-[#E53935]">
            ─── 1.5m 보행 통로 (로프·콘 구분 / 보행로·개인 돗자리 금지) ───
          </div>

          {/* B Zone */}
          <div className="space-y-1.5">
            <div className="text-xs font-bold text-[#1A1A2E]">
              B구역 (1~2인 소형 칸: 1.5m × 1.5m)
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {B_SLOTS.map((slot) => {
                const isHere = seated === slot && !exited;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => {
                      setSeated(slot);
                      setExited(false);
                    }}
                    className={`p-2.5 border-2 border-[#1A1A2E] font-pixel text-xs cursor-pointer ${
                      isHere ? 'bg-[#1E88E5] text-white' : 'bg-white'
                    }`}
                  >
                    {rainy ? '⛱ ' : ''}{slot}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4 Recycling Stations */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-pixel text-center">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="py-1.5 bg-[#1A1A2E] text-[#A5D6A7]">
                ♻ 분리배출 스테이션 {n}
              </div>
            ))}
          </div>
        </div>

        {/* Rule Simulation Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setWarningState(15)}
              className="pixel-btn px-3 py-2 bg-[#FFD54F] text-[#1A1A2E] font-pixel text-xs cursor-pointer"
            >
              ⏱ 15분 자리비움 경고 테스트
            </button>
            <button
              type="button"
              onClick={() => setWarningState(20)}
              className="pixel-btn px-3 py-2 bg-[#E53935] text-white font-pixel text-xs cursor-pointer"
            >
              🚨 20분 초과 퇴장 테스트
            </button>
            <button
              type="button"
              onClick={() => {
                setExited(true);
                setWarningState(0);
              }}
              className="pixel-btn inline-flex items-center gap-1.5 px-4 py-2 bg-[#2E7D32] text-white font-pixel text-xs cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" /> 분리배출 &amp; 깔끔 퇴장
            </button>
          </div>

          <button
            type="button"
            onClick={onCompleteAndNext}
            className="pixel-btn inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#1E88E5] text-white font-pixel text-xs sm:text-sm cursor-pointer"
          >
            <span>{completed ? 'STEP 5 막닭.ZIP 체험으로' : '식사 완료! 막닭.ZIP 부스로 이동'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {warningState === 15 && (
          <div className="p-3 bg-[#FFF8E1] border-2 border-[#FF5722] flex items-center gap-2 text-xs">
            <AlertTriangle className="w-4 h-4 text-[#FF5722] shrink-0" />
            <span>
              <strong>15분 자리 비움 경고!</strong> 순찰 요원이 입장 시각 기록판을 확인하고 경고 스티커를 부착했습니다.
            </span>
          </div>
        )}
        {warningState === 20 && (
          <div className="p-3 bg-[#FFEBEE] border-2 border-[#E53935] flex items-center gap-2 text-xs">
            <AlertTriangle className="w-4 h-4 text-[#E53935] shrink-0" />
            <span>
              <strong>20분 초과 정리 조치!</strong> 방치된 짐을 정리하고 다음 대기자에게 좌석을 배정해 회전율을 지킵니다.
            </span>
          </div>
        )}
        {exited && (
          <div className="p-3 bg-[#E8F5E9] border-2 border-[#2E7D32] text-xs font-bold text-[#2E7D32] animate-stamp">
            ✓ 분리배출 스테이션 정리 완료! 내 자리가 즉시 대기 순번 방문객에게 인계되었습니다.
          </div>
        )}
      </div>

      {/* Planning Rationale Box Below */}
      <div className="pixel-box-sm bg-[#FFFDF7] p-5 md:p-6 space-y-4">
        <div className="flex items-center gap-2 font-pixel text-sm text-[#1E88E5]">
          <Lightbulb className="w-4 h-4 text-[#FF5722]" aria-hidden="true" />
          <span>기획 의도 &amp; 상세 운영안 — 왜 〈번호 지정제 피크닉존〉을 기획했을까요?</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-[#1A1A2E]/85 leading-relaxed">
          <div className="p-3.5 bg-white border-2 border-[#1A1A2E]">
            <strong className="block text-[#E53935] mb-1">4대 확정 원칙 &amp; 공간 규격</strong>
            ① 행사 돗자리만 사용(개인 돗자리 금지) ② 돗자리 수 = 좌석 수 ③ 빈 칸 없을 시 대기번호 발급 ④ 주문 시 칸 번호 자동 배정. 총 350~700㎡(50~100칸)에 전날 돗자리를 고정 배치합니다.
          </div>
          <div className="p-3.5 bg-white border-2 border-[#1A1A2E]">
            <strong className="block text-[#1E88E5] mb-1">전담 인력 총 24명 배치 기준</strong>
            <div className="grid grid-cols-2 gap-1 text-xs mt-1">
              {PICNIC_STAFF_ROLES.map((r) => (
                <div key={r.role}>
                  · {r.role}: <strong>{r.count}명</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
