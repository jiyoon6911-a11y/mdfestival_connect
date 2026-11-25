import { useState } from 'react';
import { Flame, Plus, Minus, Receipt, ArrowRight, Lightbulb } from 'lucide-react';
import {
  TASTE_FILTERS,
  TASTE_STORES,
  type HeroTeam,
  type TasteStoreItem,
  type TasteType,
} from '../../data/festivalData';
import { soundEngine } from '../../utils/soundEngine';
import {
  DakgalbiWarriorSprite,
  MakguksuWarriorSprite,
  type FoodHoldType,
} from '../PixelSprites';

interface Step3Props {
  completed: boolean;
  selectedTeam: HeroTeam;
  assignedSeat: string | null;
  orderedFood: FoodHoldType;
  onAssignOrder: (seat: string, foodType: FoodHoldType) => void;
  onCompleteAndNext: () => void;
}

export function Step3TasteKiosk({
  completed,
  selectedTeam,
  assignedSeat,
  orderedFood,
  onAssignOrder,
  onCompleteAndNext,
}: Step3Props) {
  const [selectedTaste, setSelectedTaste] = useState<TasteType>('spicy');
  const [cart, setCart] = useState<Record<string, number>>({ s4: 1 });
  const [diningMode, setDiningMode] = useState<'picnic' | 'general' | 'standing'>('picnic');
  const [receipt, setReceipt] = useState<{
    seat: string;
    time: string;
    total: number;
  } | null>(null);

  const visibleStores = TASTE_STORES.filter((s) => s.taste === selectedTaste);

  const updateCart = (id: string, delta: number) => {
    soundEngine.playSfx('click');
    setCart((prev) => {
      const next = Math.max(0, (prev[id] || 0) + delta);
      if (next === 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: next };
    });
  };

  const cartEntries = Object.entries(cart)
    .map(([id, qty]) => {
      const store = TASTE_STORES.find((s) => s.id === id);
      return store ? { store, qty } : null;
    })
    .filter((v): v is { store: TasteStoreItem; qty: number } => Boolean(v));

  const totalPrice = cartEntries.reduce((sum, item) => sum + item.store.price * item.qty, 0);

  const detectFoodType = (): FoodHoldType => {
    const names = cartEntries.map((e) => e.store.menuName).join(' ');
    const hasDak = names.includes('닭갈비') || names.includes('간장닭');
    const hasMak = names.includes('막국수');
    if (names.includes('막닭') || (hasDak && hasMak)) return 'set';
    if (hasMak) return 'makguksu';
    if (hasDak) return 'dakgalbi';
    return 'set';
  };

  const handleOrder = () => {
    if (cartEntries.length === 0) return;
    soundEngine.playSfx('stamp');
    const seat =
      diningMode === 'picnic'
        ? '피크닉존 A-12 (4인 칸)'
        : diningMode === 'general'
          ? '일반 좌석 08번'
          : '스탠딩 선반 바 S-03';
    const now = new Date();
    const ready = new Date(now.getTime() + 10 * 60000);
    const time = `${String(ready.getHours()).padStart(2, '0')}:${String(
      ready.getMinutes()
    ).padStart(2, '0')}`;

    const foodType = detectFoodType();
    setReceipt({ seat, time, total: totalPrice });
    onAssignOrder(seat, foodType);
  };

  const displayHeldFood: FoodHoldType = receipt ? orderedFood : 'none';

  return (
    <div className="space-y-6">
      {/* Kiosk Simulation Frame */}
      <div className="pixel-box bg-white p-4 sm:p-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b-3 border-[#1A1A2E]">
          <div>
            <span className="font-pixel text-xs text-[#FF5722]">
              STEP 03 · 〈취향 지도〉 &amp; 원클릭 통합 주문 키오스크
            </span>
            <h3 className="font-pixel text-base sm:text-xl text-[#1A1A2E]">
              🔥 취향 골라 주문하고 음식 + 돗자리 번호표 손에 쥐기!
            </h3>
          </div>
          {completed && (
            <span className="font-pixel text-xs text-[#2E7D32]">★ 주문 완료</span>
          )}
        </div>

        {/* 1. Taste Tabs (Focused 1-category view to avoid text wall!) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {TASTE_FILTERS.map((t) => {
            const active = selectedTaste === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  soundEngine.playSfx('click');
                  setSelectedTaste(t.id);
                }}
                className={`pixel-btn py-2.5 px-3 font-pixel text-xs sm:text-sm cursor-pointer ${
                  active ? 'bg-[#FF5722] text-white' : 'bg-[#F5E6D3]/60 text-[#1A1A2E]'
                }`}
              >
                {t.emoji} {t.label}
              </button>
            );
          })}
        </div>

        {/* 2. Store Cards + Unified Cart & Pickup Counter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-7 space-y-3">
            {visibleStores.map((store) => {
              const qty = cart[store.id] || 0;
              return (
                <div
                  key={store.id}
                  className="p-4 border-3 border-[#1A1A2E] bg-[#FFFDF8] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs">
                      <span className="font-pixel px-2 py-0.5 bg-[#1A1A2E] text-[#FFD54F] shrink-0">
                        {store.zone}
                      </span>
                      <span className="font-bold text-[#1A1A2E]/70">{store.storeName}</span>
                      <span className="inline-flex items-center gap-0.5 text-[#E53935]">
                        {store.spiceLevel === 0 ? (
                          <span className="text-[#2E7D32] font-bold">순한맛</span>
                        ) : (
                          Array.from({ length: store.spiceLevel }).map((_, i) => (
                            <Flame key={i} className="w-3.5 h-3.5 fill-[#E53935]" />
                          ))
                        )}
                      </span>
                    </div>
                    <div className="font-bold text-base text-[#1A1A2E]">{store.menuName}</div>
                    <div className="text-xs text-[#1A1A2E]/75">
                      {store.desc} · <strong>{store.portion}</strong>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                    <span className="font-pixel text-base font-tabular text-[#E53935]">
                      {store.price.toLocaleString()}원
                    </span>

                    {qty === 0 ? (
                      <button
                        type="button"
                        onClick={() => updateCart(store.id, 1)}
                        className="pixel-btn px-3.5 py-1.5 bg-[#1E88E5] text-white font-pixel text-xs cursor-pointer"
                      >
                        + 장바구니 담기
                      </button>
                    ) : (
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => updateCart(store.id, -1)}
                          className="w-7 h-7 flex items-center justify-center border-2 border-[#1A1A2E] bg-white cursor-pointer"
                          aria-label="수량 감소"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-pixel text-xs w-5 text-center font-tabular">{qty}</span>
                        <button
                          type="button"
                          onClick={() => updateCart(store.id, 1)}
                          className="w-7 h-7 flex items-center justify-center border-2 border-[#1A1A2E] bg-[#FFD54F] cursor-pointer"
                          aria-label="수량 증가"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Unified Cart & Hero Pickup Preview */}
          <div className="lg:col-span-5 border-3 border-[#1A1A2E] bg-[#FFF8E1] p-4 flex flex-col justify-between gap-4">
            <div className="space-y-3">
              {/* Hero Character at Pickup Counter */}
              <div className="p-3 bg-[#1A1A2E] text-white border-2 border-[#1A1A2E] flex items-center gap-3">
                <div className="p-1.5 bg-[#2B2B4B] border border-[#FFD54F] shrink-0 animate-pixel-bob">
                  {selectedTeam === 'dakgalbi' ? (
                    <DakgalbiWarriorSprite
                      className="w-12 h-12"
                      holdingFood={displayHeldFood}
                    />
                  ) : (
                    <MakguksuWarriorSprite
                      className="w-12 h-12"
                      holdingFood={displayHeldFood}
                    />
                  )}
                </div>
                <div className="min-w-0 text-xs space-y-0.5">
                  <div className="font-pixel text-[#FFD54F]">
                    {receipt ? '🍔 주문 음식 수령 완료!' : '🛒 부스 픽업 카운터'}
                  </div>
                  <p className="text-[#F5E6D3]/85 leading-snug break-keep">
                    {receipt
                      ? '용사가 손에 음식을 들었어요! 번호표를 들고 피크닉존으로 걸어가 앉아볼까요?'
                      : '메뉴를 골라 결제하면 용사가 손에 음식을 받아들고 자리를 배정받습니다.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pb-2 border-b-2 border-[#1A1A2E]">
                <span className="font-pixel text-sm text-[#1A1A2E]">통합 장바구니</span>
                <span className="font-pixel text-xs text-[#E53935]">
                  {cartEntries.length}개 가게 동시 주문
                </span>
              </div>

              {cartEntries.length === 0 ? (
                <p className="text-xs text-[#1A1A2E]/70 py-3 text-center">
                  메뉴를 담아보세요! 다른 가게 메뉴도 한 번에 결제됩니다.
                </p>
              ) : (
                <ul className="space-y-1.5 text-xs">
                  {cartEntries.map(({ store, qty }) => (
                    <li key={store.id} className="flex justify-between gap-2">
                      <span className="truncate">
                        [{store.zone}] {store.menuName} × {qty}
                      </span>
                      <span className="font-pixel font-tabular shrink-0">
                        {(store.price * qty).toLocaleString()}원
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="space-y-1.5 pt-2 border-t-2 border-dashed border-[#1A1A2E]/30">
                <span className="text-xs font-bold block">먹고 가기 장소 선택 (운영 원칙 4번):</span>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'picnic' as const, label: '피크닉존' },
                    { id: 'general' as const, label: '좌석 구역' },
                    { id: 'standing' as const, label: '서서 선반' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => {
                        soundEngine.playSfx('click');
                        setDiningMode(m.id);
                      }}
                      className={`py-2 px-1 text-[11px] sm:text-xs font-pixel border-2 border-[#1A1A2E] cursor-pointer leading-tight ${
                        diningMode === m.id ? 'bg-[#1E88E5] text-white' : 'bg-white'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                disabled={cartEntries.length === 0}
                onClick={handleOrder}
                className={`pixel-btn w-full py-2.5 font-pixel text-xs sm:text-sm cursor-pointer ${
                  cartEntries.length > 0
                    ? 'bg-[#FF5722] text-white'
                    : 'bg-zinc-300 text-zinc-500 cursor-not-allowed'
                }`}
              >
                ▶ {totalPrice.toLocaleString()}원 원클릭 결제 &amp; 번호표 발급
              </button>
            </div>

            {(receipt || assignedSeat) && (
              <div className="p-3.5 bg-white border-2 border-[#1A1A2E] space-y-2 animate-stamp">
                <div className="flex items-center gap-1.5 font-pixel text-xs text-[#2E7D32]">
                  <Receipt className="w-4 h-4" />
                  <span>알림톡 · 스마트 영수증 발급 완료!</span>
                </div>
                <div className="font-pixel text-base text-[#1A1A2E]">
                  배정 자리: {receipt?.seat || assignedSeat}
                </div>
                <div className="text-xs text-[#1A1A2E]/75">
                  입장 예정 시각: <strong>{receipt?.time || '즉시 입장 가능'}</strong>
                </div>
                <button
                  type="button"
                  onClick={onCompleteAndNext}
                  className="pixel-btn w-full inline-flex items-center justify-center gap-1.5 py-2 bg-[#2E7D32] text-white font-pixel text-xs cursor-pointer"
                >
                  <span>음식 들고 피크닉존 입장하기</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Planning Rationale Box Below */}
      <div className="pixel-box-sm bg-[#FFFDF7] p-5 md:p-6 space-y-3">
        <div className="flex items-center gap-2 font-pixel text-sm text-[#1E88E5]">
          <Lightbulb className="w-4 h-4 text-[#FF5722]" aria-hidden="true" />
          <span>기획 의도 &amp; 상세 내용 — 왜 〈취향 지도 &amp; 통합 키오스크〉를 기획했을까요?</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-[#1A1A2E]/85 leading-relaxed">
          <div className="p-3.5 bg-white border-2 border-[#1A1A2E]">
            <strong className="block text-[#E53935] mb-1">발견한 문제</strong>
            기존 키오스크는 여러 가게를 한 번에 주문할 수 없고 메뉴 설명 없이 이름만 나열돼 선택 피로도가 컸으며, &lsquo;몇 번 부스&rsquo; 표기만 있어 위치 탐색이 어려웠습니다.
          </div>
          <div className="p-3.5 bg-white border-2 border-[#1A1A2E]">
            <strong className="block text-[#1E88E5] mb-1">기획 해결책</strong>
            온·오프라인 취향 지도(맵기·1인분 양·구역명·한 줄 설명)와 한입 시식존을 결합하고, &ldquo;먹고 가기&rdquo;에서 좌석/피크닉 자리를 고르면 돗자리 대기번호가 함께 발급됩니다.
          </div>
        </div>
      </div>
    </div>
  );
}
