import React from 'react';

export type FoodHoldType = 'none' | 'dakgalbi' | 'makguksu' | 'set';

interface SpriteProps {
  className?: string;
  holdingFood?: FoodHoldType;
  holdingMap?: boolean;
  holdingLightstick?: boolean;
  isSitting?: boolean;
}

function PixelAccessoryOverlay({
  holdingFood = 'none',
  holdingMap = false,
  holdingLightstick = false,
}: Pick<SpriteProps, 'holdingFood' | 'holdingMap' | 'holdingLightstick'>) {
  return (
    <>
      {/* 손에 든 탐험지도 */}
      {holdingMap && (
        <>
          <rect x="0" y="7" width="4" height="4" fill="#FFF8E1" />
          <rect x="0" y="7" width="4" height="1" fill="#8D6E63" />
          <rect x="0" y="10" width="4" height="1" fill="#8D6E63" />
          <rect x="1" y="8" width="2" height="1" fill="#E53935" />
          <rect x="2" y="9" width="1" height="1" fill="#1E88E5" />
        </>
      )}

      {/* 손에 든 LED 응원봉 */}
      {holdingLightstick && (
        <>
          <rect x="13" y="2" width="3" height="3" fill="#FFD54F" />
          <rect x="14" y="3" width="1" height="1" fill="#FF5722" />
          <rect x="14" y="5" width="1" height="5" fill="#1A1A2E" />
        </>
      )}

      {/* 손에 든 음식 트레이 (닭갈비 컵 / 막국수 그릇 / 막닭 콤보) */}
      {holdingFood === 'dakgalbi' && (
        <>
          {/* 빨간 닭갈비 컵 */}
          <rect x="11" y="8" width="5" height="4" fill="#FFFFFF" />
          <rect x="11" y="8" width="5" height="1" fill="#1A1A2E" />
          <rect x="12" y="6" width="3" height="2" fill="#E53935" />
          <rect x="12" y="7" width="1" height="1" fill="#FFD54F" />
          <rect x="14" y="6" width="1" height="1" fill="#FF8A65" />
        </>
      )}
      {holdingFood === 'makguksu' && (
        <>
          {/* 파란 막국수 사발 */}
          <rect x="11" y="9" width="5" height="3" fill="#1E88E5" />
          <rect x="11" y="8" width="5" height="1" fill="#F5E6D3" />
          <rect x="12" y="7" width="3" height="1" fill="#D7CCC8" />
          <rect x="13" y="6" width="1" height="1" fill="#FFFFFF" />
        </>
      )}
      {holdingFood === 'set' && (
        <>
          {/* 닭갈비 + 막국수 막닭 콤보 쟁반 */}
          <rect x="10" y="10" width="6" height="2" fill="#37474F" />
          <rect x="10" y="7" width="3" height="3" fill="#E53935" />
          <rect x="11" y="6" width="1" height="1" fill="#FFD54F" />
          <rect x="13" y="7" width="3" height="3" fill="#1E88E5" />
          <rect x="14" y="6" width="1" height="1" fill="#F5E6D3" />
        </>
      )}
    </>
  );
}

/** 열정파 닭갈비 용사 16비트 픽셀 스프라이트 */
export function DakgalbiWarriorSprite({
  className = 'w-16 h-16',
  holdingFood = 'none',
  holdingMap = false,
  holdingLightstick = false,
  isSitting = false,
}: SpriteProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      className={className}
      aria-label="열정파 닭갈비 용사 픽셀 캐릭터"
    >
      {/* 벼슬 */}
      <rect x="6" y="1" width="4" height="1" fill="#E53935" />
      <rect x="5" y="2" width="5" height="1" fill="#FF5722" />
      {/* 투구/머리 */}
      <rect x="4" y="3" width="8" height="5" fill="#FFE0B2" />
      <rect x="3" y="4" width="1" height="3" fill="#1A1A2E" />
      <rect x="12" y="4" width="1" height="3" fill="#1A1A2E" />
      <rect x="4" y="2" width="1" height="2" fill="#1A1A2E" />
      <rect x="11" y="2" width="1" height="2" fill="#1A1A2E" />
      {/* 눈 & 부리 */}
      <rect x="5" y="5" width="2" height="1" fill="#1A1A2E" />
      <rect x="9" y="5" width="2" height="1" fill="#1A1A2E" />
      <rect x="7" y="6" width="2" height="1" fill="#FF9800" />
      {/* 갑옷 (딥 오렌지 & 레드) */}
      <rect x="4" y="8" width="8" height="4" fill="#FF5722" />
      <rect x="5" y="9" width="6" height="2" fill="#E53935" />
      <rect x="3" y="8" width="1" height="4" fill="#1A1A2E" />
      <rect x="12" y="8" width="1" height="4" fill="#1A1A2E" />
      {/* 기본 무기/방패 (소지품이 없을 때) */}
      {!holdingMap && (
        <>
          <rect x="1" y="7" width="3" height="5" fill="#37474F" />
          <rect x="2" y="8" width="1" height="3" fill="#FFAB91" />
        </>
      )}
      {holdingFood === 'none' && !holdingLightstick && (
        <>
          <rect x="13" y="5" width="1" height="6" fill="#B0BEC5" />
          <rect x="13" y="10" width="2" height="1" fill="#1A1A2E" />
        </>
      )}
      {/* 부츠 (착석 시 접힌 다리 포즈) */}
      {isSitting ? (
        <>
          <rect x="3" y="12" width="4" height="2" fill="#1A1A2E" />
          <rect x="9" y="12" width="4" height="2" fill="#1A1A2E" />
          <rect x="2" y="13" width="2" height="1" fill="#FF5722" />
          <rect x="12" y="13" width="2" height="1" fill="#FF5722" />
        </>
      ) : (
        <>
          <rect x="4" y="12" width="3" height="2" fill="#1A1A2E" />
          <rect x="9" y="12" width="3" height="2" fill="#1A1A2E" />
          <rect x="4" y="14" width="3" height="1" fill="#FF5722" />
          <rect x="9" y="14" width="3" height="1" fill="#FF5722" />
        </>
      )}
      <PixelAccessoryOverlay
        holdingFood={holdingFood}
        holdingMap={holdingMap}
        holdingLightstick={holdingLightstick}
      />
    </svg>
  );
}

/** 쿨해파 막국수 용사 16비트 픽셀 스프라이트 */
export function MakguksuWarriorSprite({
  className = 'w-16 h-16',
  holdingFood = 'none',
  holdingMap = false,
  holdingLightstick = false,
  isSitting = false,
}: SpriteProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      className={className}
      aria-label="쿨해파 막국수 용사 픽셀 캐릭터"
    >
      {/* 메밀 모자 */}
      <rect x="5" y="1" width="6" height="1" fill="#1E88E5" />
      <rect x="4" y="2" width="8" height="2" fill="#F5E6D3" />
      <rect x="3" y="3" width="10" height="1" fill="#1A1A2E" />
      {/* 얼굴 */}
      <rect x="4" y="4" width="8" height="4" fill="#FFE0B2" />
      <rect x="3" y="4" width="1" height="4" fill="#1A1A2E" />
      <rect x="12" y="4" width="1" height="4" fill="#1A1A2E" />
      {/* 눈 */}
      <rect x="5" y="5" width="2" height="2" fill="#1A1A2E" />
      <rect x="9" y="5" width="2" height="2" fill="#1A1A2E" />
      <rect x="5" y="5" width="1" height="1" fill="#FFFFFF" />
      <rect x="9" y="5" width="1" height="1" fill="#FFFFFF" />
      {/* 동치미 블루 망토 & 도복 */}
      <rect x="4" y="8" width="8" height="4" fill="#1E88E5" />
      <rect x="6" y="8" width="4" height="4" fill="#F5E6D3" />
      <rect x="3" y="8" width="1" height="4" fill="#1A1A2E" />
      <rect x="12" y="8" width="1" height="4" fill="#1A1A2E" />
      {/* 기본 방패/검 (소지품이 없을 때) */}
      {!holdingMap && (
        <>
          <rect x="1" y="8" width="3" height="3" fill="#8D6E63" />
          <rect x="1" y="7" width="3" height="1" fill="#F5E6D3" />
        </>
      )}
      {holdingFood === 'none' && !holdingLightstick && (
        <>
          <rect x="13" y="4" width="1" height="7" fill="#90CAF9" />
          <rect x="14" y="5" width="1" height="4" fill="#E3F2FD" />
          <rect x="13" y="11" width="2" height="1" fill="#1A1A2E" />
        </>
      )}
      {/* 부츠 (착석 시 접힌 다리 포즈) */}
      {isSitting ? (
        <>
          <rect x="3" y="12" width="4" height="2" fill="#1A1A2E" />
          <rect x="9" y="12" width="4" height="2" fill="#1A1A2E" />
          <rect x="2" y="13" width="2" height="1" fill="#1E88E5" />
          <rect x="12" y="13" width="2" height="1" fill="#1E88E5" />
        </>
      ) : (
        <>
          <rect x="4" y="12" width="3" height="2" fill="#1A1A2E" />
          <rect x="9" y="12" width="3" height="2" fill="#1A1A2E" />
          <rect x="4" y="14" width="3" height="1" fill="#1E88E5" />
          <rect x="9" y="14" width="3" height="1" fill="#1E88E5" />
        </>
      )}
      <PixelAccessoryOverlay
        holdingFood={holdingFood}
        holdingMap={holdingMap}
        holdingLightstick={holdingLightstick}
      />
    </svg>
  );
}

/** 달랑달랑 참 키링 파츠 픽셀 스프라이트 */
export function CharmPixelSprite({
  variant,
  className = 'w-10 h-10',
}: {
  variant: 'salon' | 'jump' | 'mole' | 'run' | 'sky';
  className?: string;
}) {
  const colors = {
    salon: { main: '#F5E6D3', accent: '#E91E63', rim: '#1E88E5' },
    jump: { main: '#FFD54F', accent: '#FF5722', rim: '#1A1A2E' },
    mole: { main: '#FF7043', accent: '#E53935', rim: '#1A1A2E' },
    run: { main: '#4FC3F7', accent: '#1E88E5', rim: '#1A1A2E' },
    sky: { main: '#AED581', accent: '#33691E', rim: '#1E88E5' },
  }[variant];

  return (
    <svg viewBox="0 0 12 12" shapeRendering="crispEdges" className={className} aria-hidden="true">
      {/* 고리 */}
      <rect x="5" y="0" width="2" height="1" fill="#90A4AE" />
      <rect x="4" y="1" width="1" height="1" fill="#90A4AE" />
      <rect x="7" y="1" width="1" height="1" fill="#90A4AE" />
      {/* 아크릴 테두리 */}
      <rect x="2" y="2" width="8" height="9" fill="#FFFFFF" />
      <rect x="2" y="2" width="8" height="1" fill="#1A1A2E" />
      <rect x="2" y="10" width="8" height="1" fill="#1A1A2E" />
      <rect x="1" y="3" width="1" height="7" fill="#1A1A2E" />
      <rect x="10" y="3" width="1" height="7" fill="#1A1A2E" />
      {/* 내부 아이콘 */}
      <rect x="3" y="4" width="6" height="5" fill={colors.main} />
      <rect x="4" y="5" width="4" height="3" fill={colors.accent} />
      <rect x="5" y="6" width="2" height="1" fill={colors.rim} />
    </svg>
  );
}

/** 공식 굿즈 6종 픽셀 일러스트 */
export function GoodsPixelSprite({
  type,
  className = 'w-16 h-16',
}: {
  type: 'mejirus' | 'malang' | 'pin' | 'lightstick' | 'towel' | 'tshirt';
  className?: string;
}) {
  return (
    <svg viewBox="0 0 16 16" shapeRendering="crispEdges" className={className} aria-hidden="true">
      {type === 'mejirus' && (
        <>
          <rect x="7" y="1" width="2" height="2" fill="#90A4AE" />
          <rect x="4" y="3" width="8" height="10" fill="#E3F2FD" />
          <rect x="4" y="3" width="8" height="1" fill="#1A1A2E" />
          <rect x="4" y="12" width="8" height="1" fill="#1A1A2E" />
          <rect x="3" y="4" width="1" height="8" fill="#1A1A2E" />
          <rect x="12" y="4" width="1" height="8" fill="#1A1A2E" />
          <rect x="5" y="5" width="6" height="6" fill="#FF5722" />
          <rect x="6" y="7" width="4" height="2" fill="#F5E6D3" />
        </>
      )}
      {type === 'malang' && (
        <>
          <rect x="7" y="1" width="2" height="2" fill="#FFD54F" />
          <rect x="4" y="3" width="8" height="10" fill="#FFFFFF" />
          <rect x="3" y="5" width="10" height="6" fill="#FFFFFF" />
          <rect x="5" y="3" width="6" height="1" fill="#1A1A2E" />
          <rect x="5" y="12" width="6" height="1" fill="#1A1A2E" />
          <rect x="3" y="5" width="1" height="6" fill="#1A1A2E" />
          <rect x="12" y="5" width="1" height="6" fill="#1A1A2E" />
          <rect x="5" y="6" width="2" height="2" fill="#1A1A2E" />
          <rect x="9" y="6" width="2" height="2" fill="#1A1A2E" />
          <rect x="7" y="8" width="2" height="2" fill="#FF5722" />
        </>
      )}
      {type === 'pin' && (
        <>
          <rect x="2" y="3" width="12" height="10" fill="#F5E6D3" />
          <rect x="2" y="3" width="12" height="1" fill="#1A1A2E" />
          <rect x="2" y="12" width="12" height="1" fill="#1A1A2E" />
          <rect x="1" y="4" width="1" height="8" fill="#1A1A2E" />
          <rect x="14" y="4" width="1" height="8" fill="#1A1A2E" />
          <rect x="4" y="5" width="4" height="6" fill="#FF5722" />
          <rect x="8" y="5" width="4" height="6" fill="#1E88E5" />
          <rect x="6" y="7" width="4" height="2" fill="#FFFFFF" />
        </>
      )}
      {type === 'lightstick' && (
        <>
          <rect x="6" y="1" width="4" height="1" fill="#FFE082" />
          <rect x="5" y="2" width="6" height="6" fill="#FF5722" />
          <rect x="6" y="3" width="4" height="4" fill="#FFD54F" />
          <rect x="4" y="2" width="1" height="6" fill="#1A1A2E" />
          <rect x="11" y="2" width="1" height="6" fill="#1A1A2E" />
          <rect x="7" y="8" width="2" height="6" fill="#1A1A2E" />
          <rect x="6" y="14" width="4" height="1" fill="#90A4AE" />
        </>
      )}
      {type === 'towel' && (
        <>
          <rect x="1" y="5" width="14" height="6" fill="#FFFFFF" />
          <rect x="1" y="5" width="14" height="1" fill="#1A1A2E" />
          <rect x="1" y="10" width="14" height="1" fill="#1A1A2E" />
          <rect x="1" y="5" width="1" height="6" fill="#1A1A2E" />
          <rect x="14" y="5" width="1" height="6" fill="#1A1A2E" />
          <rect x="2" y="6" width="6" height="4" fill="#E53935" />
          <rect x="8" y="6" width="6" height="4" fill="#1E88E5" />
          <rect x="4" y="7" width="8" height="2" fill="#FFFFFF" />
        </>
      )}
      {type === 'tshirt' && (
        <>
          <rect x="4" y="2" width="8" height="1" fill="#1A1A2E" />
          <rect x="2" y="3" width="12" height="4" fill="#FFFFFF" />
          <rect x="1" y="4" width="2" height="3" fill="#FFFFFF" />
          <rect x="13" y="4" width="2" height="3" fill="#FFFFFF" />
          <rect x="4" y="7" width="8" height="7" fill="#FFFFFF" />
          <rect x="4" y="13" width="8" height="1" fill="#1A1A2E" />
          <rect x="3" y="7" width="1" height="7" fill="#1A1A2E" />
          <rect x="12" y="7" width="1" height="7" fill="#1A1A2E" />
          <rect x="6" y="6" width="4" height="3" fill="#FF5722" />
          <rect x="7" y="7" width="2" height="1" fill="#1E88E5" />
        </>
      )}
    </svg>
  );
}
