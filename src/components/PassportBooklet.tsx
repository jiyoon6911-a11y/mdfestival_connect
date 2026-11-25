import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, MapPin, Check, Camera } from 'lucide-react';
import { KKIKKI_LOCAL_RESTAURANTS } from '../data/festivalData';

export function PassportBooklet() {
  const [page, setPage] = useState(0);
  const [visitorName, setVisitorName] = useState('막국수 용사');
  const [companion, setCompanion] = useState('친구');
  const [foodPrefs, setFoodPrefs] = useState<string[]>(['매운맛', '고기파']);
  const [mealStamps, setMealStamps] = useState<string[]>(['닭갈비', '막국수']);
  const [dakStars, setDakStars] = useState({ spicy: 5, fire: 4, sweet: 4 });
  const [makStars, setMakStars] = useState({ clean: 5, sour: 4, nutty: 5 });
  const [tasteTags, setTasteTags] = useState<string[]>(['불향 강한 닭갈비파']);
  const [selectedSpotIdx, setSelectedSpotIdx] = useState(0);
  const [missionsDone, setMissionsDone] = useState<number[]>([0]);
  const [memo, setMemo] = useState({ best: '', revisit: '', note: '' });

  const toggleArr = (arr: string[], val: string, setter: (next: string[]) => void) => {
    setter(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
  };

  const PAGES = [
    '표지',
    '01 나의 미식 여권',
    '02 첫 끼 스탬프',
    '03 MY TASTE',
    '04 NEXT STOP : 춘천',
    '05 시민 추천 지도',
    '06 로컬 미션',
    '07 여권 완성!',
  ];

  const renderStars = (val: number, onSet: (n: number) => void) => (
    <div className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onSet(n)}
          className="cursor-pointer"
          aria-label={`${n}점`}
        >
          <Star
            className={`w-4 h-4 ${
              n <= val ? 'fill-[#FFB300] text-[#1A1A2E]' : 'text-zinc-300'
            }`}
          />
        </button>
      ))}
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Page Index Pills + Prev/Next */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          {PAGES.map((label, idx) => (
            <button
              key={label}
              type="button"
              onClick={() => setPage(idx)}
              className={`px-2 py-1 text-[11px] font-pixel border-2 border-[#1A1A2E] cursor-pointer ${
                page === idx ? 'bg-[#1A355B] text-[#FFD54F]' : 'bg-white text-[#1A1A2E]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-end gap-1.5 shrink-0">
          <button
            type="button"
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            className="pixel-btn p-1.5 bg-white disabled:opacity-40 cursor-pointer"
            aria-label="이전 페이지"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            disabled={page === PAGES.length - 1}
            onClick={() => setPage((p) => Math.min(PAGES.length - 1, p + 1))}
            className="pixel-btn p-1.5 bg-[#FFD54F] disabled:opacity-40 cursor-pointer"
            aria-label="다음 페이지"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Booklet Spread Card (Faithful to Uploaded Gourmet Passport Design) */}
      <div className="border-4 border-[#1A1A2E] shadow-[5px_5px_0px_#1A1A2E] rounded-xl overflow-hidden bg-[#FDF6E9] min-h-[340px] flex flex-col justify-between">
        {/* Page 0: Cover */}
        {page === 0 && (
          <div className="flex-1 bg-[#143059] text-white p-5 sm:p-6 md:p-10 flex flex-col items-center justify-center text-center space-y-4">
            <div className="text-xs font-pixel text-[#90CAF9]">
              춘천시 · K-FOOD 2026 UNIVERSE
            </div>
            <h4 className="font-pixel text-2xl sm:text-3xl text-[#FF8A3D] leading-snug">
              2026 춘천
              <br />
              닭갈비 막국수 축제
            </h4>
            <div className="px-4 sm:px-5 py-2 bg-[#FFB74D] text-[#1A1A2E] border-3 border-[#1A1A2E] font-pixel text-sm sm:text-lg">
              춘천 미식 여권 (끼끼 여권)
            </div>
            <p className="text-xs sm:text-sm text-[#F5E6D3]">축제에서 한 끼, 춘천에서 한 끼!</p>
            <button
              type="button"
              onClick={() => setPage(1)}
              className="pixel-btn px-5 py-2.5 bg-[#FF5722] text-white font-pixel text-xs cursor-pointer mt-2"
            >
              여권 펼치기 ▶
            </button>
          </div>
        )}

        {/* Page 1: 01 나의 미식 여권 */}
        {page === 1 && (
          <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-5 flex-1">
            <div className="flex items-center justify-between gap-2 border-b-2 border-[#1A1A2E] pb-2">
              <span className="font-pixel text-xs px-2 py-0.5 bg-[#FF8A3D] text-white border border-[#1A1A2E] shrink-0">
                01
              </span>
              <span className="text-xs text-[#1A1A2E]/70 text-right">오늘, 나는 춘천을 얼마나 맛볼까요?</span>
            </div>
            <h4 className="font-pixel text-xl text-[#143059]">나의 미식 여권</h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="p-4 bg-white border-2 border-[#1A1A2E] space-y-3">
                <label className="block text-xs font-bold">
                  이름
                  <input
                    type="text"
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    className="mt-1 w-full px-2.5 py-1.5 border-2 border-[#1A1A2E] bg-[#FDF6E9] text-sm"
                  />
                </label>
                <div>
                  <span className="text-xs font-bold block mb-1.5">오늘의 동행</span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {['혼자', '친구', '가족', '연인'].map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setCompanion(c)}
                        className={`py-1.5 text-xs border-2 border-[#1A1A2E] cursor-pointer ${
                          companion === c ? 'bg-[#143059] text-white font-bold' : 'bg-white'
                        }`}
                      >
                        {companion === c ? '☑ ' : '☐ '}
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white border-2 border-[#1A1A2E] space-y-2">
                <span className="text-xs font-bold block">오늘의 미식 취향 (다중 선택)</span>
                <div className="grid grid-cols-2 gap-2">
                  {['🌶 매운맛', '🌿 담백', '🍗 고기파', '🍜 면파'].map((p) => {
                    const active = foodPrefs.includes(p);
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => toggleArr(foodPrefs, p, setFoodPrefs)}
                        className={`py-2 px-2 text-xs border-2 border-[#1A1A2E] cursor-pointer ${
                          active ? 'bg-[#FF8A3D] text-white font-bold' : 'bg-white'
                        }`}
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Page 2: 02 축제에서 첫 끼를 완성하세요! */}
        {page === 2 && (
          <div className="p-6 md:p-8 space-y-5 flex-1">
            <div className="flex items-center justify-between border-b-2 border-[#1A1A2E] pb-2">
              <span className="font-pixel text-xs px-2 py-0.5 bg-[#FF8A3D] text-white border border-[#1A1A2E]">
                02
              </span>
              <span className="text-xs text-[#1A1A2E]/70">가게별 영수증을 붙여 인증해요!</span>
            </div>
            <h4 className="font-pixel text-xl text-[#143059]">
              축제에서 첫 끼를 완성하세요! ({mealStamps.length}/4)
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {['닭갈비', '막국수', '사이드', '음료'].map((item) => {
                const stamped = mealStamps.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleArr(mealStamps, item, setMealStamps)}
                    className={`h-28 border-3 border-dashed border-[#1A1A2E] flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${
                      stamped ? 'bg-[#FFF59D]' : 'bg-white hover:bg-[#FDF6E9]'
                    }`}
                  >
                    <span className="font-pixel text-base text-[#1A1A2E]">{item}</span>
                    <span
                      className={`text-xs font-pixel px-2 py-0.5 border border-[#1A1A2E] ${
                        stamped
                          ? 'bg-[#E53935] text-white animate-stamp'
                          : 'bg-zinc-100 text-zinc-500'
                      }`}
                    >
                      {stamped ? '영수증 인증★' : '눌러서 찍기'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Page 3: 03 MY TASTE */}
        {page === 3 && (
          <div className="p-6 md:p-8 space-y-4 flex-1">
            <div className="flex items-center justify-between border-b-2 border-[#1A1A2E] pb-2">
              <span className="font-pixel text-xs px-2 py-0.5 bg-[#FF8A3D] text-white border border-[#1A1A2E]">
                03
              </span>
              <span className="text-xs text-[#1A1A2E]/70">내가 먹어본 춘천의 맛은?</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white border-2 border-[#1A1A2E] space-y-2 text-xs">
                <div className="font-pixel text-sm text-[#E53935]">닭갈비 맛 기록</div>
                <div className="flex justify-between items-center">
                  <span>맵기</span>
                  {renderStars(dakStars.spicy, (n) => setDakStars((s) => ({ ...s, spicy: n })))}
                </div>
                <div className="flex justify-between items-center">
                  <span>불향</span>
                  {renderStars(dakStars.fire, (n) => setDakStars((s) => ({ ...s, fire: n })))}
                </div>
                <div className="flex justify-between items-center">
                  <span>달콤함</span>
                  {renderStars(dakStars.sweet, (n) => setDakStars((s) => ({ ...s, sweet: n })))}
                </div>
              </div>

              <div className="p-4 bg-white border-2 border-[#1A1A2E] space-y-2 text-xs">
                <div className="font-pixel text-sm text-[#1E88E5]">막국수 맛 기록</div>
                <div className="flex justify-between items-center">
                  <span>담백함</span>
                  {renderStars(makStars.clean, (n) => setMakStars((s) => ({ ...s, clean: n })))}
                </div>
                <div className="flex justify-between items-center">
                  <span>새콤함</span>
                  {renderStars(makStars.sour, (n) => setMakStars((s) => ({ ...s, sour: n })))}
                </div>
                <div className="flex justify-between items-center">
                  <span>고소함</span>
                  {renderStars(makStars.nutty, (n) => setMakStars((s) => ({ ...s, nutty: n })))}
                </div>
              </div>
            </div>

            <div className="p-3 bg-white border-2 border-[#1A1A2E] space-y-2">
              <div className="text-xs font-bold">나의 춘천 미식 취향은?</div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  '불향 강한 닭갈비파',
                  '슴슴한 막국수파',
                  '매운맛 도전파',
                  '정통 춘천파',
                  '퓨전 음식 탐험파',
                ].map((tag) => {
                  const on = tasteTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleArr(tasteTags, tag, setTasteTags)}
                      className={`px-2.5 py-1 text-xs border-2 border-[#1A1A2E] cursor-pointer ${
                        on ? 'bg-[#143059] text-white font-bold' : 'bg-[#FDF6E9]'
                      }`}
                    >
                      {on ? '☑ ' : '☐ '}
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Page 4: 04 NEXT STOP : 춘천 */}
        {page === 4 && (
          <div className="p-6 md:p-8 space-y-4 flex-1">
            <div className="flex items-center justify-between border-b-2 border-[#1A1A2E] pb-2">
              <span className="font-pixel text-xs px-2 py-0.5 bg-[#FF8A3D] text-white border border-[#1A1A2E]">
                04
              </span>
              <span className="text-xs text-[#1A1A2E]/70">이제 진짜 춘천을 맛볼 시간~!</span>
            </div>
            <h4 className="font-pixel text-xl text-[#143059]">
              NEXT STOP : 상황별 춘천 시민 추천 맛집
            </h4>

            <div className="flex flex-wrap gap-2">
              {KKIKKI_LOCAL_RESTAURANTS.map((r, idx) => (
                <button
                  key={r.name}
                  type="button"
                  onClick={() => setSelectedSpotIdx(idx)}
                  className={`px-3 py-1.5 text-xs font-pixel border-2 border-[#1A1A2E] cursor-pointer ${
                    selectedSpotIdx === idx ? 'bg-[#FF5722] text-white' : 'bg-white'
                  }`}
                >
                  {r.tag}
                </button>
              ))}
            </div>

            <div className="p-4 bg-white border-3 border-[#1A1A2E] space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-base text-[#143059]">
                  {KKIKKI_LOCAL_RESTAURANTS[selectedSpotIdx].name}
                </span>
                <span className="text-xs font-pixel text-[#E53935]">★ 시민 추천</span>
              </div>
              <div className="text-xs text-[#1A1A2E]/70 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{KKIKKI_LOCAL_RESTAURANTS[selectedSpotIdx].info}</span>
              </div>
              <div className="p-2.5 bg-[#FFF8E1] border-2 border-[#1A1A2E] text-xs font-bold text-[#E53935]">
                🎫 여권 제휴 혜택: {KKIKKI_LOCAL_RESTAURANTS[selectedSpotIdx].benefit}
              </div>
            </div>
          </div>
        )}

        {/* Page 5: 05 춘천 사람에게 물었습니다 */}
        {page === 5 && (
          <div className="p-6 md:p-8 space-y-4 flex-1">
            <div className="flex items-center justify-between border-b-2 border-[#1A1A2E] pb-2">
              <span className="font-pixel text-xs px-2 py-0.5 bg-[#FF8A3D] text-white border border-[#1A1A2E]">
                05
              </span>
              <span className="text-xs text-[#1A1A2E]/70">시민 설문 기반 진짜 춘천 맛집 지도</span>
            </div>
            <h4 className="font-pixel text-xl text-[#143059]">춘천 사람에게 물었습니다</h4>

            <div className="p-4 bg-[#E3F2FD] border-3 border-[#1A1A2E] space-y-3">
              <div className="flex flex-wrap gap-2">
                {KKIKKI_LOCAL_RESTAURANTS.map((r, idx) => (
                  <button
                    key={r.name}
                    type="button"
                    onClick={() => setSelectedSpotIdx(idx)}
                    className={`px-3 py-1.5 text-xs border-2 border-[#1A1A2E] cursor-pointer ${
                      selectedSpotIdx === idx ? 'bg-[#143059] text-[#FFD54F] font-bold' : 'bg-white'
                    }`}
                  >
                    📍 {r.name.split(' ')[0]}
                  </button>
                ))}
              </div>
              <div className="p-3.5 bg-white border-2 border-[#1A1A2E] text-xs sm:text-sm space-y-1">
                <div className="font-bold text-[#143059]">시민의 한마디!</div>
                <p className="text-[#1A1A2E]">
                  {KKIKKI_LOCAL_RESTAURANTS[selectedSpotIdx].citizenQuote}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Page 6: 06 춘천 로컬 미션 */}
        {page === 6 && (
          <div className="p-6 md:p-8 space-y-4 flex-1">
            <div className="flex items-center justify-between border-b-2 border-[#1A1A2E] pb-2">
              <span className="font-pixel text-xs px-2 py-0.5 bg-[#FF8A3D] text-white border border-[#1A1A2E]">
                06
              </span>
              <span className="text-xs text-[#1A1A2E]/70">축제의 맛을 넘어 춘천의 맛으로!</span>
            </div>
            <h4 className="font-pixel text-xl text-[#143059]">춘천 로컬 미션 (MISSION LIST)</h4>

            <div className="space-y-2">
              {[
                '축제 참여 음식점에서 한 끼 먹기 (영수증 인증)',
                '시민 추천 맛집 방문하기 (원도심 스탬프)',
                '내가 방문한 가게의 추천 메뉴 남기기',
                '친구/가족과 함께한 사진 찍기',
              ].map((m, idx) => {
                const done = missionsDone.includes(idx);
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() =>
                      setMissionsDone((prev) =>
                        prev.includes(idx) ? prev.filter((x) => x !== idx) : [...prev, idx]
                      )
                    }
                    className={`w-full text-left p-3 border-2 border-[#1A1A2E] flex items-center gap-2.5 text-xs sm:text-sm cursor-pointer ${
                      done ? 'bg-[#E8F5E9] font-bold' : 'bg-white'
                    }`}
                  >
                    <span className="w-5 h-5 flex items-center justify-center border-2 border-[#1A1A2E] bg-white">
                      {done && <Check className="w-3.5 h-3.5 text-[#2E7D32]" />}
                    </span>
                    <span>{m}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Page 7: 07 미식 여권 완성! */}
        {page === 7 && (
          <div className="p-6 md:p-8 space-y-4 flex-1">
            <div className="flex items-center justify-between border-b-2 border-[#1A1A2E] pb-2">
              <span className="font-pixel text-xs px-2 py-0.5 bg-[#FF8A3D] text-white border border-[#1A1A2E]">
                07
              </span>
              <span className="text-xs text-[#1A1A2E]/70">다음엔, 어디를 먹어볼까요?</span>
            </div>
            <h4 className="font-pixel text-xl text-[#143059]">
              {visitorName}님의 미식 여권 완성!
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border-2 border-dashed border-[#1A1A2E] bg-white flex flex-col items-center justify-center text-center gap-2 min-h-[140px]">
                <Camera className="w-6 h-6 text-[#143059]/60" />
                <span className="text-xs text-[#1A1A2E]/70">
                  여기에 춘천 추억 사진을 붙여주세요!
                </span>
              </div>

              <div className="p-4 bg-white border-2 border-[#1A1A2E] space-y-2 text-xs">
                <div className="font-bold text-[#143059]">내가 발견한 춘천 기록</div>
                <input
                  type="text"
                  value={memo.best}
                  onChange={(e) => setMemo((m) => ({ ...m, best: e.target.value }))}
                  placeholder="가장 맛있었던 음식"
                  className="w-full px-2.5 py-1.5 border border-[#1A1A2E] bg-[#FDF6E9]"
                />
                <input
                  type="text"
                  value={memo.revisit}
                  onChange={(e) => setMemo((m) => ({ ...m, revisit: e.target.value }))}
                  placeholder="다시 가고 싶은 곳"
                  className="w-full px-2.5 py-1.5 border border-[#1A1A2E] bg-[#FDF6E9]"
                />
                <input
                  type="text"
                  value={memo.note}
                  onChange={(e) => setMemo((m) => ({ ...m, note: e.target.value }))}
                  placeholder="오늘의 한마디"
                  className="w-full px-2.5 py-1.5 border border-[#1A1A2E] bg-[#FDF6E9]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Booklet Footer Bar */}
        <div className="px-5 py-2.5 bg-[#143059] text-[#F5E6D3] flex items-center justify-between text-xs font-pixel">
          <span>끼끼 여권 · {PAGES[page]}</span>
          <span>
            {page + 1} / {PAGES.length}
          </span>
        </div>
      </div>
    </div>
  );
}
