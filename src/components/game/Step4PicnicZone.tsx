import { useEffect, useRef, useState } from 'react';
import {
  Umbrella,
  AlertTriangle,
  Trash2,
  ArrowRight,
  FileText,
  Ban,
  Utensils,
  CheckCircle2,
} from 'lucide-react';
import { PICNIC_STAFF_ROLES, type HeroTeam } from '../../data/festivalData';
import { soundEngine } from '../../utils/soundEngine';
import {
  DakgalbiWarriorSprite,
  MakguksuWarriorSprite,
  type FoodHoldType,
} from '../PixelSprites';

interface Step4Props {
  completed: boolean;
  selectedTeam: HeroTeam;
  assignedSeat: string | null;
  orderedFood: FoodHoldType;
  onFinishDining: () => void;
  onCompleteAndNext: () => void;
}

type ZonePhase = 'entry' | 'seated' | 'ate' | 'cleaned';

interface MapSpot {
  id: string;
  label: string;
  x: number;
  y: number;
  kind: 'booth' | 'disperse' | 'a-slot' | 'b-slot' | 'walkway' | 'trash' | 'outer';
  occupied?: boolean;
}

const A_SLOTS: MapSpot[] = [
  { id: 'A-10', label: 'A-10', x: 14, y: 40, kind: 'a-slot', occupied: true },
  { id: 'A-11', label: 'A-11', x: 38, y: 40, kind: 'a-slot', occupied: true },
  { id: 'A-12', label: 'A-12 (내 칸)', x: 62, y: 40, kind: 'a-slot', occupied: false },
  { id: 'A-13', label: 'A-13', x: 86, y: 40, kind: 'a-slot', occupied: false },
];

const B_SLOTS: MapSpot[] = [
  { id: 'B-01', label: 'B-01', x: 14, y: 69, kind: 'b-slot', occupied: true },
  { id: 'B-02', label: 'B-02', x: 38, y: 69, kind: 'b-slot', occupied: false },
  { id: 'B-03', label: 'B-03', x: 62, y: 69, kind: 'b-slot', occupied: false },
  { id: 'B-04', label: 'B-04', x: 86, y: 69, kind: 'b-slot', occupied: true },
];

const SPACE_SPECS = [
  { item: '피크닉존 총 면적', content: '약 350~700㎡ (50~100 칸 기준, 제안)' },
  { item: '1 칸 크기', content: '약 2m × 2m (4인 기준)' },
  { item: '소형 칸', content: '약 1.5m × 1.5m (1~2인 기준)' },
  { item: '칸 사이 통로 폭', content: '1.5m 이상' },
  { item: '칸 수', content: '50~100 칸' },
  { item: '확장 부지', content: '공지천 옆 공원' },
];

const ZONE_COMPOSITION = [
  { name: 'A 구역 4인 칸', desc: '가족, 단체 (2m × 2m 고정 돗자리)' },
  { name: 'B 구역 2인 칸', desc: '혼자, 커플 (1.5m × 1.5m 소형 칸)' },
  { name: '서서 먹는 선반 구역 / 좌석 구역', desc: '메뉴존 옆, 피크닉존 좌석 수요 분산용' },
  { name: '대기표 · 안내 부스', desc: '피크닉존 입구 2곳, 대기 줄과 순번 안내' },
  { name: '쓰레기 분리배출 스테이션', desc: '구역 출입구 근처 4곳 배치' },
];

export function Step4PicnicZone({
  completed,
  selectedTeam,
  assignedSeat,
  orderedFood,
  onFinishDining,
  onCompleteAndNext,
}: Step4Props) {
  const [rainy, setRainy] = useState(false);
  const [phase, setPhase] = useState<ZonePhase>('entry');
  const [heroPos, setHeroPos] = useState<{ x: number; y: number }>({ x: 18, y: 14 });
  const [heroSpotId, setHeroSpotId] = useState<string>('entrance-1');
  const [isWalking, setIsWalking] = useState(false);
  const [statusBanner, setStatusBanner] = useState<{
    tone: 'info' | 'warn' | 'success';
    text: string;
  }>({
    tone: 'info',
    text: `음식과 번호표(${assignedSeat || 'A-12'})를 들고 입구 안내부스 ①에 도착했습니다! 내 번호 칸 A-12를 클릭해 걸어가 앉아보세요.`,
  });
  const [warningState, setWarningState] = useState<0 | 15 | 20>(0);
  const walkRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (walkRef.current) window.clearTimeout(walkRef.current);
    };
  }, []);

  const walkHeroTo = (
    x: number,
    y: number,
    spotId: string,
    onArrive: () => void
  ) => {
    if (walkRef.current) window.clearTimeout(walkRef.current);
    soundEngine.playSfx('walk');
    setIsWalking(true);
    setHeroPos({ x, y });
    setHeroSpotId(spotId);
    setWarningState(0);

    walkRef.current = window.setTimeout(() => {
      setIsWalking(false);
      onArrive();
    }, 520);
  };

  const handleSpotClick = (spot: MapSpot) => {
    if (spot.kind === 'walkway') {
      walkHeroTo(50, 54, 'walkway', () => {
        setStatusBanner({
          tone: 'warn',
          text: '🚫 원칙 3 위반! 1.5m 이상 보행 통로와 길가는 앉기 금지 구역입니다. 행사가 깔아둔 지정 칸(A-12 등)에만 앉아 주세요!',
        });
      });
      return;
    }

    if (spot.kind === 'outer') {
      walkHeroTo(spot.x, spot.y, spot.id, () => {
        setStatusBanner({
          tone: 'info',
          text: '🌳 여기는 외곽 공원입니다! 피크닉 지정 존 안에서는 개인 돗자리가 금지되지만, 외곽 공원에서는 개인 돗자리 사용이 가능합니다.',
        });
      });
      return;
    }

    if (spot.kind === 'disperse') {
      walkHeroTo(spot.x, spot.y, spot.id, () => {
        setPhase('seated');
        setStatusBanner({
          tone: 'info',
          text: '🥢 메뉴존 옆 서서 먹는 선반 / 일반 좌석 구역에 도착! 돗자리 빈 칸이 부족할 때 대기 수요를 분산해 빠르게 식사할 수 있습니다.',
        });
      });
      return;
    }

    if (spot.kind === 'a-slot' || spot.kind === 'b-slot') {
      if (spot.occupied) {
        walkHeroTo(spot.x, spot.y - 10, spot.id, () => {
          setStatusBanner({
            tone: 'warn',
            text: `⛔ ${spot.label} 칸은 이미 다른 관람객이 이용 중입니다! 빈 칸이 없을 때는 입구 부스에서 대기번호를 받아 기다립니다.`,
          });
        });
        return;
      }

      walkHeroTo(spot.x, spot.y, spot.id, () => {
        soundEngine.playSfx('stamp');
        setPhase('seated');
        setStatusBanner({
          tone: 'success',
          text: `🧺 ${spot.label} 돗자리 칸에 착석했습니다! 이제 들고 온 음식을 맛있게 먹어볼까요?`,
        });
      });
      return;
    }

    if (spot.kind === 'trash') {
      walkHeroTo(spot.x, spot.y, spot.id, () => {
        soundEngine.playSfx('stamp');
        setPhase('cleaned');
        onFinishDining();
        setStatusBanner({
          tone: 'success',
          text: '♻ 분리배출 스테이션 정리 완료! 내 자리가 즉시 빈 칸으로 전환되어 입구 대기 순번 다음 손님에게 인계되었습니다.',
        });
      });
    }
  };

  const handleEatFood = () => {
    soundEngine.playSfx('stamp');
    setPhase('ate');
    onFinishDining();
    setStatusBanner({
      tone: 'success',
      text: '😋 음식을 맛있게 다 먹었습니다! 이제 아래 출입구 근처 ♻ 분리배출 스테이션(1~4번)을 클릭해 걸어가 정리하세요.',
    });
  };

  const handlePersonalMatTest = () => {
    soundEngine.playSfx('click');
    setStatusBanner({
      tone: 'warn',
      text: '🚨 원칙 1 안내: 피크닉 지정 존 내에서는 행사 제공 돗자리만 사용해야 하며 개인 돗자리 펼치기는 금지됩니다! (외곽 공원은 허용)',
    });
  };

  const isSeatedOnMat =
    !isWalking &&
    (phase === 'seated' || phase === 'ate') &&
    (heroSpotId.startsWith('A-') || heroSpotId.startsWith('B-'));

  const heroFoodToShow: FoodHoldType =
    phase === 'ate' || phase === 'cleaned' ? 'none' : orderedFood;

  return (
    <div className="space-y-6">
      <div className="pixel-box bg-white p-4 sm:p-6 space-y-5">
        {/* Header & Rainy Mode Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b-3 border-[#1A1A2E]">
          <div>
            <span className="font-pixel text-xs text-[#2E7D32] block">
              STEP 04 · 공지천 옆 공원 확장 부지 (350~700㎡ · 50~100칸)
            </span>
            <h3 className="font-pixel text-base sm:text-xl text-[#1A1A2E]">
              🧺 용사를 움직여 지정 칸({assignedSeat || 'A-12'})에 앉고 식사 후 분리배출하기!
            </h3>
          </div>

          <button
            type="button"
            onClick={() => {
              soundEngine.playSfx('click');
              setRainy((r) => !r);
            }}
            className={`pixel-btn inline-flex items-center justify-center gap-1.5 px-3 py-1.5 font-pixel text-xs cursor-pointer shrink-0 ${
              rainy ? 'bg-[#1E88E5] text-white' : 'bg-[#F5E6D3]'
            }`}
          >
            <Umbrella className="w-3.5 h-3.5" />
            <span>{rainy ? '☔ 우천 모드: 칸별 파라솔 지급' : '☀ 맑음 (우천 파라솔 보기)'}</span>
          </button>
        </div>

        {/* Live Action Status + Quick Mission Progress */}
        <div
          className={`p-3 border-2 border-[#1A1A2E] text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 ${
            statusBanner.tone === 'warn'
              ? 'bg-[#FFEBEE] text-[#B71C1C]'
              : statusBanner.tone === 'success'
                ? 'bg-[#E8F5E9] text-[#1B5E20]'
                : 'bg-[#FFF8E1] text-[#1A1A2E]'
          }`}
        >
          <div className="font-bold leading-snug break-keep">{statusBanner.text}</div>

          {phase === 'seated' && (
            <button
              type="button"
              onClick={handleEatFood}
              className="pixel-btn inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 bg-[#FF5722] text-white font-pixel text-xs cursor-pointer shrink-0 animate-pixel-bob"
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>음식 맛있게 먹기!</span>
            </button>
          )}
        </div>

        {/* 2D RPG Interactive Venue Map (With Moving Character Sprite) */}
        <div className="relative border-4 border-[#1A1A2E] bg-[#DFF3E2] p-3 sm:p-4 overflow-hidden select-none">
          {/* Top Zone: Entrance Booths (2) + Standing Shelf / Seating Disperse + Outer Park */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3 relative z-10">
            <div className="p-2 bg-[#1E88E5] text-white border-2 border-[#1A1A2E] font-pixel text-[11px] flex items-center justify-between gap-1">
              <span>🎫 대기표·안내 부스 ①</span>
              <span className="px-1.5 py-0.5 bg-[#FFD54F] text-[#1A1A2E] text-[10px]">
                호출 A-12
              </span>
            </div>

            <button
              type="button"
              onClick={() =>
                handleSpotClick({
                  id: 'disperse-shelf',
                  label: '서서 먹는 선반 / 일반 좌석',
                  x: 50,
                  y: 16,
                  kind: 'disperse',
                })
              }
              className="p-2 bg-[#FFD54F] hover:bg-[#FFE082] text-[#1A1A2E] border-2 border-[#1A1A2E] font-pixel text-[11px] text-center cursor-pointer"
            >
              🥢 메뉴존 옆: 서서 먹는 선반·좌석
            </button>

            <div className="p-2 bg-[#1E88E5] text-white border-2 border-[#1A1A2E] font-pixel text-[11px] flex items-center justify-between gap-1">
              <span>🎫 대기표·안내 부스 ②</span>
              <span className="text-[10px] text-[#E3F2FD]">대기줄·순번 안내</span>
            </div>
          </div>

          {/* Interactive Field Grid Where Hero Physically Walks */}
          <div className="relative min-h-[340px] sm:min-h-[360px] border-2 border-dashed border-[#1A1A2E]/35 bg-[#E8F5E9] p-2.5 sm:p-3 flex flex-col justify-between gap-3">
            {/* Moving Hero Character Sprite */}
            <div
              className="absolute z-30 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out pointer-events-none flex flex-col items-center"
              style={{ left: `${heroPos.x}%`, top: `${heroPos.y}%` }}
            >
              <span className="px-1.5 py-0.5 bg-[#1A1A2E] text-[#FFD54F] font-pixel text-[9px] border border-white mb-0.5 whitespace-nowrap">
                {isWalking
                  ? '이동 중...'
                  : phase === 'cleaned'
                    ? '정리 완료!'
                    : phase === 'ate'
                      ? '빈 그릇 들고 이동'
                      : isSeatedOnMat
                        ? '착석 식사 중'
                        : '내 용사'}
              </span>
              <div
                className={`drop-shadow-[0_2px_0_#000] ${
                  isWalking ? 'animate-avatar-walk' : isSeatedOnMat ? '' : 'animate-pixel-bob'
                }`}
              >
                {selectedTeam === 'dakgalbi' ? (
                  <DakgalbiWarriorSprite
                    className="w-11 h-11 sm:w-12 sm:h-12"
                    holdingFood={heroFoodToShow}
                    isSitting={isSeatedOnMat}
                  />
                ) : (
                  <MakguksuWarriorSprite
                    className="w-11 h-11 sm:w-12 sm:h-12"
                    holdingFood={heroFoodToShow}
                    isSitting={isSeatedOnMat}
                  />
                )}
              </div>
            </div>

            {/* Patrol NPC Badge when testing 15/20 min */}
            {warningState !== 0 && (
              <div className="absolute right-3 top-14 z-30 px-2.5 py-1 bg-[#E53935] text-white border-2 border-[#1A1A2E] font-pixel text-[10px] animate-stamp">
                👮 순찰 요원: {warningState === 15 ? '15분 경고 스티커 부착!' : '20분 초과 정리!'}
              </div>
            )}

            {/* A Zone (4인 칸: 2m x 2m) */}
            <div className="space-y-1.5 pt-2">
              <div className="text-[11px] font-bold text-[#1A1A2E] flex flex-wrap items-center justify-between gap-1">
                <span>A 구역 · 4인 칸 (약 2m × 2m / 가족·단체)</span>
                <span className="font-pixel text-[#2E7D32]">배정 칸(A-12)을 클릭하세요!</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {A_SLOTS.map((slot) => {
                  const isMine = slot.id === 'A-12';
                  const isHere = heroSpotId === slot.id && !isWalking;
                  const cleared = isMine && phase === 'cleaned';
                  return (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => handleSpotClick(slot)}
                      className={`p-2.5 sm:p-3 border-3 border-[#1A1A2E] font-pixel text-xs text-center cursor-pointer transition-all min-h-[64px] flex flex-col items-center justify-center ${
                        isHere
                          ? 'bg-[#FF5722] text-white shadow-[3px_3px_0px_#1A1A2E]'
                          : cleared
                            ? 'bg-[#C8E6C9] text-[#1B5E20]'
                            : slot.occupied
                              ? 'bg-zinc-200 text-zinc-600'
                              : isMine
                                ? 'bg-[#FFF59D] text-[#1A1A2E]'
                                : 'bg-white text-[#1A1A2E]'
                      }`}
                    >
                      <div>
                        {rainy ? '⛱ ' : ''}
                        {slot.label}
                      </div>
                      <div className="text-[10px] mt-0.5">
                        {isHere
                          ? '용사 착석!'
                          : cleared
                            ? '빈 칸(대기 배정)'
                            : slot.occupied
                              ? '이용 중'
                              : isMine
                                ? '내 배정 칸'
                                : '빈 돗자리'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 1.5m+ Walkway (No Sitting Allowed - Clickable Rule Trap!) */}
            <button
              type="button"
              onClick={() =>
                handleSpotClick({
                  id: 'walkway',
                  label: '1.5m 보행 통로',
                  x: 50,
                  y: 54,
                  kind: 'walkway',
                })
              }
              className="w-full py-2 px-3 bg-[#FFF8E1] hover:bg-[#FFECB3] border-2 border-dashed border-[#FF5722] text-center font-pixel text-[11px] sm:text-xs text-[#E53935] cursor-pointer"
            >
              ⛔ 칸 사이 보행 통로 (폭 1.5m 이상) — 보행로·길가 앉기 금지! (눌러서 규칙 확인)
            </button>

            {/* B Zone (1~2인 소형 칸: 1.5m x 1.5m) */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-bold text-[#1A1A2E]">
                B 구역 · 2인 소형 칸 (약 1.5m × 1.5m / 혼자·커플)
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {B_SLOTS.map((slot) => {
                  const isHere = heroSpotId === slot.id && !isWalking;
                  return (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => handleSpotClick(slot)}
                      className={`p-2 border-2 border-[#1A1A2E] font-pixel text-xs cursor-pointer min-h-[48px] ${
                        isHere
                          ? 'bg-[#1E88E5] text-white'
                          : slot.occupied
                            ? 'bg-zinc-200 text-zinc-600'
                            : 'bg-white text-[#1A1A2E]'
                      }`}
                    >
                      {rainy ? '⛱ ' : ''}
                      {slot.label}{' '}
                      <span className="text-[10px]">
                        ({isHere ? '착석' : slot.occupied ? '이용중' : '빈 칸'})
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Exits: 4 Recycling Stations + Outer Park Zone */}
            <div className="space-y-2 pt-1">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[11px] font-pixel">
                {[1, 2, 3, 4].map((n) => {
                  const x = 14 + (n - 1) * 24;
                  const active = heroSpotId === `trash-${n}` && !isWalking;
                  return (
                    <button
                      key={n}
                      type="button"
                      onClick={() =>
                        handleSpotClick({
                          id: `trash-${n}`,
                          label: `분리배출 ${n}`,
                          x,
                          y: 88,
                          kind: 'trash',
                        })
                      }
                      className={`py-2 px-1.5 border-2 border-[#1A1A2E] cursor-pointer text-center ${
                        active
                          ? 'bg-[#2E7D32] text-white'
                          : 'bg-[#1A1A2E] hover:bg-[#2B2B4B] text-[#A5D6A7]'
                      }`}
                    >
                      ♻ 분리배출 스테이션 {n}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() =>
                  handleSpotClick({
                    id: 'outer-park',
                    label: '외곽 공원',
                    x: 86,
                    y: 90,
                    kind: 'outer',
                  })
                }
                className="w-full py-1.5 px-3 bg-[#C8E6C9] hover:bg-[#A5D6A7] border-2 border-[#2E7D32] font-pixel text-[11px] text-[#1B5E20] cursor-pointer"
              >
                🌳 외곽 공원 구역 (개인 돗자리 사용 가능 — 지정 존 외곽으로 이동해 보기)
              </button>
            </div>
          </div>
        </div>

        {/* Rule Simulation Controls + Next Step CTA */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-1">
          <div className="grid grid-cols-1 sm:flex sm:flex-wrap gap-2">
            <button
              type="button"
              onClick={handlePersonalMatTest}
              className="pixel-btn inline-flex items-center justify-center gap-1 px-3 py-2 bg-white text-[#E53935] font-pixel text-xs cursor-pointer"
            >
              <Ban className="w-3.5 h-3.5 shrink-0" /> 개인 돗자리 반입 시도
            </button>
            <button
              type="button"
              onClick={() => {
                soundEngine.playSfx('click');
                setWarningState(15);
              }}
              className="pixel-btn px-3 py-2 bg-[#FFD54F] text-[#1A1A2E] font-pixel text-xs cursor-pointer"
            >
              ⏱ 15분 자리비움 경고
            </button>
            <button
              type="button"
              onClick={() => {
                soundEngine.playSfx('click');
                setWarningState(20);
              }}
              className="pixel-btn px-3 py-2 bg-[#E53935] text-white font-pixel text-xs cursor-pointer"
            >
              🚨 20분 초과 정리
            </button>
            <button
              type="button"
              onClick={() =>
                handleSpotClick({
                  id: 'trash-1',
                  label: '분리배출 1',
                  x: 14,
                  y: 88,
                  kind: 'trash',
                })
              }
              className="pixel-btn inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-[#2E7D32] text-white font-pixel text-xs cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5 shrink-0" /> 스테이션으로 걸어가 정리
            </button>
          </div>

          <button
            type="button"
            onClick={onCompleteAndNext}
            className="pixel-btn w-full lg:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-[#1E88E5] text-white font-pixel text-xs sm:text-sm cursor-pointer shrink-0"
          >
            <span>{completed ? 'STEP 5 막닭.ZIP 체험으로' : '식사·정리 완료! 막닭.ZIP 이동'}</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>
        </div>

        {warningState === 15 && (
          <div className="p-3 bg-[#FFF8E1] border-2 border-[#FF5722] flex items-center gap-2 text-xs">
            <AlertTriangle className="w-4 h-4 text-[#FF5722] shrink-0" />
            <span>
              <strong>15분 자리 비움 경고!</strong> 순찰 요원(5명)이 입장 시각 기록판을 확인하고 경고 스티커를 부착했습니다.
            </span>
          </div>
        )}
        {warningState === 20 && (
          <div className="p-3 bg-[#FFEBEE] border-2 border-[#E53935] flex items-center gap-2 text-xs">
            <AlertTriangle className="w-4 h-4 text-[#E53935] shrink-0" />
            <span>
              <strong>20분 초과 정리 조치!</strong> 방치된 짐을 정리하고 입구 대기 순번 다음 방문객에게 즉시 좌석을 배정합니다.
            </span>
          </div>
        )}
        {phase === 'cleaned' && (
          <div className="p-3 bg-[#E8F5E9] border-2 border-[#2E7D32] text-xs font-bold text-[#2E7D32] flex items-center gap-2 animate-stamp">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>✓ 식사 및 분리배출 스테이션 정리 완료! 용사의 손이 깔끔하게 비워졌습니다.</span>
          </div>
        )}
      </div>

      {/* Full Complete Picnic Zone Operating Plan Below (Faithful to Attached Document) */}
      <div className="pixel-box-sm bg-[#FFFDF7] p-4 sm:p-6 space-y-5">
        <div className="flex items-center gap-2 font-pixel text-sm sm:text-base text-[#1E88E5] border-b-2 border-[#1A1A2E] pb-2.5">
          <FileText className="w-4 h-4 text-[#FF5722] shrink-0" aria-hidden="true" />
          <span>막국수 닭갈비 축제 피크닉존 운영안 (기획 상세 전문)</span>
        </div>

        {/* 1. 목적과 해결할 문제 + 2. 확정된 원칙 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs sm:text-sm text-[#1A1A2E]/90 leading-relaxed">
          <div className="p-4 bg-white border-2 border-[#1A1A2E] space-y-2.5">
            <h4 className="font-pixel text-sm text-[#E53935]">1. 목적과 해결할 문제</h4>
            <ul className="list-disc pl-4 space-y-1.5">
              <li>
                흙바닥, 길가에 돗자리를 펴고 앉아 보행로가 막히고 위생과 안전이 나빠지는 문제를 해결한다.
              </li>
              <li>
                자리 찜과 자리 다툼을 줄이고, 누구나 같은 규칙으로 자리를 이용하게 한다.
              </li>
              <li>
                먹는 자리가 부족해도 대기 순서가 분명해서 불만이 쌓이지 않게 한다.
              </li>
            </ul>
          </div>

          <div className="p-4 bg-white border-2 border-[#1A1A2E] space-y-2.5">
            <h4 className="font-pixel text-sm text-[#1E88E5]">2. 확정된 원칙</h4>
            <ol className="list-decimal pl-4 space-y-1.5">
              <li>
                <strong>행사에서 제공하는 돗자리만 사용한다.</strong> 개인 돗자리는 피크닉 지정 존에서 펼치는 걸 금지한다. (외곽 공원에서 개인 돗자리 사용 가능.)
              </li>
              <li>
                <strong>돗자리 수가 곧 좌석 수다.</strong>
              </li>
              <li>
                <strong>행사가 미리 깔아둔 칸에만 앉는다.</strong> 빈 칸이 없으면 대기번호를 받고 기다린다. 보행로와 길가는 앉기 금지 구역이다.
              </li>
              <li>
                키오스크에서 &ldquo;먹고 가기&rdquo;를 고른 다음, 좌석 자리와 피크닉 자리를 택한다. 만약 피크닉 자리를 선택한다면, 돗자리 대기번호가 함께 발급된다.
              </li>
            </ol>
          </div>
        </div>

        {/* 3. 공간 기준 (표) + 4. 구역 구성 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 text-xs sm:text-sm">
          <div className="lg:col-span-6 p-4 bg-white border-2 border-[#1A1A2E] space-y-2.5">
            <h4 className="font-pixel text-sm text-[#1A1A2E]">3. 공간 기준</h4>
            <div className="border-2 border-[#1A1A2E] overflow-hidden">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#1A1A2E] text-[#FFD54F] font-pixel">
                    <th className="p-2 border-b border-r border-[#1A1A2E] w-2/5">항목</th>
                    <th className="p-2 border-b border-[#1A1A2E]">내용</th>
                  </tr>
                </thead>
                <tbody>
                  {SPACE_SPECS.map((row, idx) => (
                    <tr key={row.item} className={idx % 2 === 0 ? 'bg-[#FFFDF8]' : 'bg-white'}>
                      <td className="p-2 border-t border-r border-[#1A1A2E]/30 font-bold">
                        {row.item}
                      </td>
                      <td className="p-2 border-t border-[#1A1A2E]/30">{row.content}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="lg:col-span-6 p-4 bg-white border-2 border-[#1A1A2E] space-y-3">
            <h4 className="font-pixel text-sm text-[#1A1A2E]">4. 구역 구성</h4>
            <ul className="space-y-2">
              {ZONE_COMPOSITION.map((z) => (
                <li key={z.name} className="p-2 bg-[#FFFDF8] border border-[#1A1A2E]/30">
                  <strong className="text-[#1E88E5]">{z.name}</strong>
                  <span className="text-[#1A1A2E]/80"> — {z.desc}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2 border-t-2 border-dashed border-[#1A1A2E]/25">
              <strong className="block font-pixel text-xs text-[#2E7D32] mb-1.5">
                5. 전담 인력 총 24명 배치 기준
              </strong>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
                {PICNIC_STAFF_ROLES.map((r) => (
                  <div key={r.role} className="p-1.5 bg-[#E8F5E9] border border-[#2E7D32]/40">
                    · {r.role}: <strong>{r.count}명</strong> ({r.task})
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
