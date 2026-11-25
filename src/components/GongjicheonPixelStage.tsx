import { MapPin } from 'lucide-react';

interface GongjicheonPixelStageProps {
  mode?: 'wedThu' | 'friSun';
  cheering?: boolean;
  spiceActive?: boolean;
  compact?: boolean;
}

/**
 * 공지천 조각공원 · 잔디광장 픽셀 현장
 * - mode='wedThu': 낮 요리대회 「막닭 소스 대첩」 — 셰프·시민 페어의 불판 조리 & 김·불꽃 & 심사·관람 애니메이션
 * - mode='friSun': 밤 밴드 공연 〈닭같이 막 즐겨〉 × 〈풀무원 스테이지〉 — 4인조 풀 밴드 라이브 & 야광봉 관객 애니메이션
 */
export function GongjicheonPixelStage({
  mode = 'wedThu',
  cheering = false,
  spiceActive = false,
  compact = false,
}: GongjicheonPixelStageProps) {
  const isContest = mode === 'wedThu';

  return (
    <div className="border-3 border-[#1A1A2E] bg-[#1A1A2E] text-[#F5E6D3] overflow-hidden">
      {/* Header Status Bar (Synced automatically with 수·목 / 금·토·일 selection below) */}
      <div className="px-3.5 sm:px-4 py-2.5 bg-[#262646] border-b-2 border-[#F5E6D3]/20 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 font-pixel text-xs text-[#FFD54F]">
          <MapPin className="w-3.5 h-3.5 text-[#FF5722] shrink-0" aria-hidden="true" />
          <span>공지천 조각공원 픽셀 현장</span>
        </div>

        <span
          className={`px-2.5 py-1 text-[11px] font-pixel border border-white/70 ${
            isContest ? 'bg-[#FF5722] text-white' : 'bg-[#1E88E5] text-white'
          }`}
        >
          {isContest
            ? '☀️ 낮 현장 · 요리대회 「막닭 소스 대첩」'
            : '🌙 밤 현장 · 〈닭같이 막 즐겨〉 × 풀무원 스테이지'}
        </span>
      </div>

      {/* Pixel Art Venue Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-7 bg-[#0F1224] relative overflow-hidden border-b-2 lg:border-b-0 lg:border-r-2 border-[#F5E6D3]/20">
          {isContest ? (
            /* Scene 1: 낮 요리대회 「막닭 소스 대첩」 — 햇살 아래 셰프들이 모락모락 불판 요리하고 시민들이 시식·응원하는 낮 현장 */
            <svg
              viewBox="0 0 160 96"
              shapeRendering="crispEdges"
              className={`w-full block ${compact ? 'h-52 sm:h-60' : 'h-56 sm:h-72'}`}
              role="img"
              aria-label="낮 시간 공지천에서 요리사들이 막닭 소스 대첩 요리 경연을 펼치는 픽셀 애니메이션"
            >
              {/* 화창한 낮 하늘 & 햇님 */}
              <rect x="0" y="0" width="160" height="44" fill="#B3E5FC" />
              <rect x="0" y="28" width="160" height="16" fill="#E1F5FE" />
              <rect x="136" y="5" width="10" height="10" fill="#FFD54F" />
              <rect x="134" y="7" width="14" height="6" fill="#FFD54F" />
              <rect x="138" y="3" width="6" height="14" fill="#FFD54F" />

              {/* 떠가는 낮 구름 */}
              <g className="animate-park-stroll-a">
                <rect x="12" y="7" width="16" height="4" fill="#FFFFFF" />
                <rect x="15" y="4" width="10" height="3" fill="#FFFFFF" />
                <rect x="86" y="9" width="14" height="4" fill="#FFFFFF" />
                <rect x="89" y="6" width="8" height="3" fill="#FFFFFF" />
              </g>

              {/* 공지천 공원 나무 */}
              <rect x="0" y="20" width="32" height="26" fill="#2E7D32" />
              <rect x="28" y="24" width="24" height="22" fill="#388E3C" />
              <rect x="110" y="22" width="28" height="24" fill="#2E7D32" />
              <rect x="134" y="18" width="26" height="28" fill="#1B5E20" />

              {/* 야외 요리 경연 데크 & 현수막 */}
              <rect x="18" y="16" width="4" height="40" fill="#5D4037" />
              <rect x="138" y="16" width="4" height="40" fill="#5D4037" />
              <rect x="18" y="16" width="124" height="10" fill="#1A1A2E" />
              <rect x="20" y="18" width="120" height="6" fill="#FF5722" />
              {/* '막닭 소스 대첩' 픽셀 타이틀 블록 */}
              <rect x="44" y="20" width="72" height="2" fill="#FFD54F" />

              {/* 뒷배경 심사 스코어보드 */}
              <rect x="64" y="28" width="32" height="14" fill="#FFF8E1" />
              <rect x="65" y="29" width="30" height="12" fill="#1A1A2E" />
              <rect x="68" y="32" width="10" height="3" fill="#FF5722" />
              <rect x="82" y="32" width="10" height="3" fill="#1E88E5" />
              <rect x="70" y="37" width="20" height="2" fill="#FFD54F" />

              {/* 야외 조리 무대 데크 바닥 */}
              <rect x="14" y="54" width="132" height="6" fill="#D7CCC8" />
              <rect x="14" y="59" width="132" height="3" fill="#8D6E63" />

              {/* 좌측 팀 조리대 (레드 팀) */}
              <rect x="22" y="45" width="40" height="9" fill="#FFF8E1" />
              <rect x="22" y="45" width="40" height="2" fill="#FF5722" />
              <rect x="26" y="43" width="12" height="2" fill="#263238" />
              <rect x="44" y="43" width="12" height="2" fill="#263238" />

              {/* 우측 팀 조리대 (블루 팀) */}
              <rect x="98" y="45" width="40" height="9" fill="#FFF8E1" />
              <rect x="98" y="45" width="40" height="2" fill="#1E88E5" />
              <rect x="102" y="43" width="12" height="2" fill="#263238" />
              <rect x="120" y="43" width="12" height="2" fill="#263238" />

              {/* 불타오르는 조리 불꽃 (깜빡임 애니메이션) */}
              <g className="animate-flame">
                <rect x="29" y="40" width="2" height="3" fill="#FF5722" />
                <rect x="33" y="39" width="2" height="4" fill="#FFD54F" />
                <rect x="49" y="40" width="2" height="3" fill="#FF5722" />
                <rect x="105" y="40" width="2" height="3" fill="#FF5722" />
                <rect x="109" y="39" width="2" height="4" fill="#FFD54F" />
                <rect x="124" y="40" width="2" height="3" fill="#FF5722" />
              </g>

              {/* 좌측 셰프 + 시민 파트너 (하얀 셰프 모자 쓰고 요리 중!) */}
              <g className="animate-pixel-jump-a">
                {/* 셰프 1 */}
                <rect x="28" y="31" width="6" height="4" fill="#FFFFFF" />
                <rect x="27" y="34" width="8" height="2" fill="#ECEFF1" />
                <rect x="29" y="36" width="5" height="4" fill="#FFE0B2" />
                <rect x="28" y="40" width="7" height="5" fill="#FFFFFF" />
                <rect x="29" y="41" width="5" height="4" fill="#FF5722" />
                <rect x="35" y="40" width="4" height="2" fill="#FFE0B2" />

                {/* 셰프 3 (우측 팀) */}
                <rect x="104" y="31" width="6" height="4" fill="#FFFFFF" />
                <rect x="103" y="34" width="8" height="2" fill="#ECEFF1" />
                <rect x="105" y="36" width="5" height="4" fill="#FFE0B2" />
                <rect x="104" y="40" width="7" height="5" fill="#FFFFFF" />
                <rect x="105" y="41" width="5" height="4" fill="#1E88E5" />
                <rect x="111" y="40" width="4" height="2" fill="#FFE0B2" />
              </g>

              <g className="animate-pixel-jump-b">
                {/* 시민 파트너 1 */}
                <rect x="47" y="35" width="5" height="4" fill="#FFE0B2" />
                <rect x="46" y="39" width="7" height="6" fill="#FFD54F" />
                <rect x="47" y="40" width="5" height="4" fill="#FFFFFF" />
                <rect x="43" y="40" width="3" height="2" fill="#FFE0B2" />

                {/* 시민 파트너 2 */}
                <rect x="123" y="35" width="5" height="4" fill="#FFE0B2" />
                <rect x="122" y="39" width="7" height="6" fill="#FF8A65" />
                <rect x="123" y="40" width="5" height="4" fill="#FFFFFF" />
                <rect x="119" y="40" width="3" height="2" fill="#FFE0B2" />
              </g>

              {/* 중앙 진행자 & 매운맛 챌린지 불꽃 */}
              <g className="animate-pixel-bob">
                <rect x="77" y="41" width="6" height="5" fill="#FFE0B2" />
                <rect x="76" y="46" width="8" height="8" fill="#1A1A2E" />
                <rect x="84" y="46" width="2" height="3" fill="#FFD54F" />
              </g>

              {/* 모락모락 피어오르는 요리 김과 향기 */}
              <g className="animate-pixel-float">
                <rect x="31" y="32" width="2" height="3" fill="#FFFFFF" />
                <rect x="47" y="30" width="2" height="3" fill="#FFE082" />
                <rect x="53" y="33" width="2" height="2" fill="#FFFFFF" />
                <rect x="107" y="32" width="2" height="3" fill="#FFFFFF" />
                <rect x="125" y="30" width="2" height="3" fill="#FFE082" />
                {spiceActive && (
                  <>
                    <rect x="74" y="34" width="2" height="4" fill="#E53935" />
                    <rect x="79" y="31" width="3" height="5" fill="#FFD54F" />
                    <rect x="84" y="34" width="2" height="4" fill="#FF5722" />
                  </>
                )}
              </g>

              {/* 공지천 낮 잔디광장 */}
              <rect x="0" y="62" width="160" height="34" fill="#689F38" />
              <rect x="0" y="76" width="160" height="20" fill="#7CB342" />

              {/* 앞쪽 심사위원 시식 테이블 */}
              <rect x="52" y="68" width="56" height="8" fill="#FFF8E1" />
              <rect x="52" y="68" width="56" height="2" fill="#1A1A2E" />
              <rect x="60" y="66" width="8" height="2" fill="#FF5722" />
              <rect x="76" y="66" width="8" height="2" fill="#FFD54F" />
              <rect x="92" y="66" width="8" height="2" fill="#1E88E5" />

              {/* 시식·구경하는 낮 관람객 & 심사단 */}
              <g className="animate-pixel-jump-a">
                {[
                  { x: 16, y: 74, shirt: '#FF5722' },
                  { x: 34, y: 76, shirt: '#FFFFFF' },
                  { x: 60, y: 76, shirt: '#1A1A2E' },
                  { x: 94, y: 76, shirt: '#1E88E5' },
                  { x: 122, y: 74, shirt: '#FFD54F' },
                ].map((person, i) => (
                  <g key={i}>
                    <rect x={person.x + 1} y={person.y} width="5" height="5" fill="#FFE0B2" />
                    <rect x={person.x + 1} y={person.y} width="5" height="2" fill="#3E2723" />
                    <rect x={person.x} y={person.y + 5} width="7" height="8" fill={person.shirt} />
                    <rect x={person.x + 7} y={person.y + 6} width="2" height="3" fill="#FF8A65" />
                  </g>
                ))}
              </g>

              <g className="animate-park-stroll-a">
                <rect x="134" y="75" width="5" height="5" fill="#FFE0B2" />
                <rect x="133" y="80" width="7" height="7" fill="#2E7D32" />
                <rect x="140" y="81" width="2" height="3" fill="#FFD54F" />
              </g>
            </svg>
          ) : (
            /* Scene 2: 밤 밴드 공연 〈닭같이 막 즐겨〉 × 〈풀무원 스테이지〉 — 야간 조명, 4인조 풀 밴드, 야광봉 흔드는 관객! */
            <svg
              viewBox="0 0 160 96"
              shapeRendering="crispEdges"
              className={`w-full block ${compact ? 'h-52 sm:h-60' : 'h-56 sm:h-72'}`}
              role="img"
              aria-label="밤 시간 공지천 풀무원 스테이지에서 밴드가 연주하고 관객들이 야광봉을 흔들며 열광하는 픽셀 애니메이션"
            >
              {/* 깊은 별빛 밤 하늘 */}
              <rect x="0" y="0" width="160" height="54" fill="#090C1C" />
              <rect x="0" y="34" width="160" height="20" fill="#131836" />

              {/* 초승달 & 반짝이는 밤 별들 */}
              <rect x="14" y="6" width="5" height="6" fill="#FFF59D" />
              <rect x="16" y="7" width="3" height="4" fill="#090C1C" />
              <g className="animate-pixel-float">
                <rect x="34" y="7" width="1" height="1" fill="#FFFFFF" />
                <rect x="60" y="4" width="1" height="1" fill="#FFD54F" />
                <rect x="108" y="6" width="1" height="1" fill="#90CAF9" />
                <rect x="138" y="5" width="2" height="2" fill="#FFFFFF" />
                <rect x="148" y="10" width="1" height="1" fill="#FFD54F" />
              </g>

              {/* 야간 공지천 나무 실루엣 */}
              <rect x="0" y="18" width="24" height="36" fill="#0F261C" />
              <rect x="136" y="16" width="24" height="38" fill="#0F261C" />

              {/* 대형 풀무원 스테이지 트러스 & 화려한 서치라이트 */}
              <rect x="18" y="14" width="4" height="44" fill="#37474F" />
              <rect x="138" y="14" width="4" height="44" fill="#37474F" />
              <rect x="18" y="14" width="124" height="5" fill="#1E272E" />
              {[32, 54, 80, 106, 126].map((lx, idx) => (
                <g key={lx}>
                  <rect
                    x={lx}
                    y="19"
                    width="4"
                    height="3"
                    fill={idx % 2 === 0 ? '#FFD54F' : '#4FC3F7'}
                  />
                  <polygon
                    points={`${lx},22 ${lx + 4},22 ${lx + 14},56 ${lx - 10},56`}
                    fill={idx % 3 === 0 ? '#FFD54F' : idx % 3 === 1 ? '#4FC3F7' : '#E040FB'}
                    opacity={cheering ? '0.26' : '0.16'}
                  />
                </g>
              ))}

              {/* 무대 백드롭 LED & '풀무원 스테이지' 브랜드 배너 */}
              <rect x="26" y="24" width="108" height="28" fill="#101935" />
              <rect x="44" y="21" width="72" height="9" fill="#1B5E20" />
              <rect x="45" y="22" width="70" height="7" fill="#2E7D32" />
              <rect x="52" y="24" width="56" height="3" fill="#FFD54F" />

              {/* 좌우 대형 스피커 스택 */}
              <rect x="24" y="36" width="12" height="18" fill="#212121" />
              <rect x="27" y="39" width="6" height="5" fill="#455A64" />
              <rect x="27" y="46" width="6" height="5" fill="#455A64" />
              <rect x="124" y="36" width="12" height="18" fill="#212121" />
              <rect x="127" y="39" width="6" height="5" fill="#455A64" />
              <rect x="127" y="46" width="6" height="5" fill="#455A64" />

              {/* 지상형 대형 스테이지 데크 */}
              <rect x="14" y="54" width="132" height="6" fill="#263238" />
              <rect x="14" y="59" width="132" height="3" fill="#00E676" opacity="0.65" />

              {/* 4인조 라이브 밴드 on Stage */}
              {/* 1. 드러머 & 드럼 세트 (중앙 뒤) */}
              <g className="animate-pixel-jump-b">
                <rect x="74" y="33" width="6" height="5" fill="#FFE0B2" />
                <rect x="74" y="32" width="6" height="2" fill="#212121" />
                <rect x="73" y="38" width="8" height="6" fill="#FF5722" />
              </g>
              <rect x="71" y="43" width="12" height="9" fill="#ECEFF1" />
              <rect x="73" y="45" width="8" height="5" fill="#1A1A2E" />
              <rect x="66" y="41" width="5" height="2" fill="#FFD54F" />
              <rect x="83" y="41" width="5" height="2" fill="#FFD54F" />

              {/* 2. 기타리스트 (좌측) */}
              <g className="animate-pixel-jump-a">
                <rect x="45" y="37" width="6" height="5" fill="#FFE0B2" />
                <rect x="45" y="36" width="6" height="2" fill="#4FC3F7" />
                <rect x="44" y="42" width="8" height="8" fill="#1E88E5" />
                {/* 일렉 기타 */}
                <rect x="42" y="45" width="10" height="3" fill="#FF5722" />
                <rect x="52" y="44" width="5" height="2" fill="#D7CCC8" />
                <rect x="45" y="50" width="2" height="4" fill="#1A1A2E" />
                <rect x="49" y="50" width="2" height="4" fill="#1A1A2E" />
              </g>

              {/* 3. 리드 보컬 (중앙 앞 & 마이크 스탠드) */}
              <g className="animate-pixel-jump-a">
                <rect x="87" y="37" width="6" height="5" fill="#FFE0B2" />
                <rect x="87" y="36" width="6" height="2" fill="#1A1A2E" />
                <rect x="86" y="42" width="8" height="8" fill="#FFD54F" />
                <rect x="84" y="41" width="2" height="4" fill="#FFE0B2" />
                <rect x="87" y="50" width="2" height="4" fill="#1A1A2E" />
                <rect x="91" y="50" width="2" height="4" fill="#1A1A2E" />
              </g>
              <rect x="95" y="41" width="1" height="13" fill="#CFD8DC" />
              <rect x="94" y="40" width="3" height="2" fill="#ECEFF1" />

              {/* 4. 베이시스트 (우측) */}
              <g className="animate-pixel-jump-b">
                <rect x="108" y="37" width="6" height="5" fill="#FFE0B2" />
                <rect x="108" y="36" width="6" height="2" fill="#E040FB" />
                <rect x="107" y="42" width="8" height="8" fill="#E91E63" />
                <rect x="104" y="45" width="10" height="3" fill="#FFFFFF" />
                <rect x="108" y="50" width="2" height="4" fill="#1A1A2E" />
                <rect x="112" y="50" width="2" height="4" fill="#1A1A2E" />
              </g>

              {/* 무대 위로 떠오르는 음표 & 불꽃 스파크 */}
              <g className="animate-pixel-float">
                <rect x="40" y="30" width="2" height="3" fill="#FFD54F" />
                <rect x="42" y="29" width="2" height="2" fill="#FFD54F" />
                <rect x="90" y="28" width="2" height="3" fill="#4FC3F7" />
                <rect x="114" y="31" width="2" height="3" fill="#69F0AE" />
                <rect x="64" y="33" width="2" height="2" fill="#FF5722" />
              </g>

              {/* 밤 잔디광장 관객석 */}
              <rect x="0" y="62" width="160" height="34" fill="#121A24" />
              <rect x="0" y="76" width="160" height="20" fill="#0B1018" />

              {/* 야광봉 흔들며 방방 뛰는 관객 A 그룹 */}
              <g className="animate-pixel-jump-a">
                {[
                  { x: 10, y: 74, shirt: '#37474F', stick: '#FFD54F' },
                  { x: 38, y: 72, shirt: '#FF5722', stick: '#4FC3F7' },
                  { x: 68, y: 73, shirt: '#1E88E5', stick: '#69F0AE' },
                  { x: 98, y: 72, shirt: '#455A64', stick: '#FF4081' },
                  { x: 130, y: 73, shirt: '#2E7D32', stick: '#FFD54F' },
                ].map((fan, i) => (
                  <g key={i}>
                    <rect x={fan.x + 2} y={fan.y} width="6" height="5" fill="#1A1A2E" />
                    <rect x={fan.x} y={fan.y + 5} width="10" height="14" fill={fan.shirt} />
                    {/* 양손 + 빛나는 야광봉 좌우 흔들기 */}
                    <g className="animate-lightstick-a">
                      <rect x={fan.x - 2} y={fan.y - 1} width="2" height="6" fill="#FFE0B2" />
                      <rect x={fan.x - 3} y={fan.y - 7} width="3" height="6" fill={fan.stick} />
                      <rect
                        x={fan.x - 4}
                        y={fan.y - 8}
                        width="5"
                        height="8"
                        fill={fan.stick}
                        opacity={cheering ? '0.5' : '0.3'}
                      />
                    </g>
                    <g className="animate-lightstick-b">
                      <rect x={fan.x + 10} y={fan.y - 1} width="2" height="6" fill="#FFE0B2" />
                      <rect x={fan.x + 10} y={fan.y - 7} width="3" height="6" fill={fan.stick} />
                      <rect
                        x={fan.x + 9}
                        y={fan.y - 8}
                        width="5"
                        height="8"
                        fill={fan.stick}
                        opacity={cheering ? '0.5' : '0.3'}
                      />
                    </g>
                  </g>
                ))}
              </g>

              {/* 앞줄에서 엇박자로 야광봉 흔드는 관객 B 그룹 */}
              <g className="animate-pixel-jump-b">
                {[
                  { x: 24, y: 77, shirt: '#263238', stick: '#E040FB' },
                  { x: 54, y: 76, shirt: '#37474F', stick: '#FFD54F' },
                  { x: 84, y: 77, shirt: '#1E88E5', stick: '#FF5722' },
                  { x: 114, y: 76, shirt: '#263238', stick: '#4FC3F7' },
                  { x: 144, y: 77, shirt: '#FF5722', stick: '#69F0AE' },
                ].map((fan, i) => (
                  <g key={i}>
                    <rect x={fan.x + 2} y={fan.y} width="6" height="5" fill="#0F1224" />
                    <rect x={fan.x} y={fan.y + 5} width="10" height="14" fill={fan.shirt} />
                    <g className="animate-lightstick-b">
                      <rect x={fan.x - 2} y={fan.y - 6} width="3" height="6" fill={fan.stick} />
                      <rect x={fan.x - 3} y={fan.y - 7} width="5" height="8" fill={fan.stick} opacity="0.35" />
                    </g>
                    <g className="animate-lightstick-a">
                      <rect x={fan.x + 9} y={fan.y - 6} width="3" height="6" fill={fan.stick} />
                      <rect x={fan.x + 8} y={fan.y - 7} width="5" height="8" fill={fan.stick} opacity="0.35" />
                    </g>
                  </g>
                ))}
              </g>
            </svg>
          )}

          {/* Bottom Pixel Caption Strip */}
          <div className="px-3 py-2 bg-[#13142B] border-t-2 border-[#F5E6D3]/20 flex flex-wrap items-center justify-between gap-2 text-[11px] font-pixel">
            <span className="text-[#FFD54F]">
              {isContest
                ? '낮 현장 · 셰프×시민 페어 「막닭 소스 대첩」 불판 조리 경연'
                : '밤 현장 · 〈닭같이 막 즐겨〉 × 〈풀무원 스테이지〉 밴드 & 야광봉'}
            </span>
            <span className="text-[#90CAF9]">LIVE PIXEL ANIMATION</span>
          </div>
        </div>

        {/* Right Side: Venue Improvement Summary */}
        <div className="lg:col-span-5 p-4 sm:p-5 flex flex-col justify-between gap-3 bg-[#1A1A2E]">
          <div className="space-y-2.5">
            <div className="font-pixel text-xs text-[#90CAF9]">공지천 조각공원 현장 구현</div>
            <h4 className="font-pixel text-base sm:text-lg text-white break-keep">
              {isContest
                ? '낮 요리대회 · 「막닭 소스 대첩」'
                : '밤 밴드 공연 · 「풀무원 스테이지」'}
            </h4>
            <p className="text-xs sm:text-sm text-[#F5E6D3]/85 leading-relaxed break-keep">
              {isContest
                ? '화창한 낮 공지천 야외 조리 무대에서 셰프 모자를 쓴 사장님과 시민 페어가 불판을 달구며 창의적인 닭갈비 소스 요리를 선보이고, 심사위원과 관객이 시식·투표로 함께 즐깁니다.'
                : '별빛 아래 대형 지상형 〈풀무원 스테이지〉에서 4인조 라이브 밴드가 연주하고, 공지천 잔디광장을 가득 메운 관객들이 화려한 야광봉을 흔들며 스탠딩과 피크닉을 오가며 떼창합니다.'}
            </p>
          </div>

          <div className="p-3 bg-[#262646] border-2 border-[#FFD54F]/60 text-xs space-y-1">
            <div className="font-pixel text-[#FFD54F]">CON:NECT가 기획한 축제 굿즈 오프라인 현장 DP</div>
            <p className="text-[#F5E6D3]/90">
              CON:NECT가 기획한 축제 굿즈 실물은 <strong>12월 1일 ~ 12월 3일 오프라인 현장 부스</strong>에 DP(전시)됩니다!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
