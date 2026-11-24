export type HeroTeam = 'dakgalbi' | 'makguksu';

export const BACKGROUND_METRICS = [
  {
    code: '01',
    label: '방문객 급증과 수용력 한계',
    stat: '30만 → 50만 명 (+67%)',
    detail:
      '2025년 가격 정찰제·수변 이전으로 30만 명을 유치했고 2026년 50만 명 성장이 예상되나, 석사천 산책로(폭 3~4m)는 병목 시 유효 폭 1.5m 미만으로 급감합니다.',
  },
  {
    code: '02',
    label: '외지 관광객 유입 & 체류 한계',
    stat: '지역민 59% vs 외지인 30~40%',
    detail:
      '지역민 신뢰는 회복했으나, 불친절한 위치 안내와 화제성 공연 부족으로 외지인 유인이 약하며 음식 축제 특유의 짧은 체류(1.5~2시간)를 원도심 소비로 잇지 못했습니다.',
  },
  {
    code: '03',
    label: '축제 트렌드의 전환',
    stat: '관람형 → 참여·체험형 + 공연',
    detail:
      '원주 K-매운맛 페스티벌 사례처럼 화제성 있는 공연·기업 협업으로 초기 유입을 만들고, 미션형 스토리텔링과 로컬 상권 연계로 체류를 늘려야 합니다.',
  },
];

export const AS_IS_PROBLEMS = [
  {
    id: 'space',
    num: '01',
    title: '공간·동선 문제 (안전·접근성)',
    badge: '석사천 3~4m 병목',
    points: [
      '석사천 산책로(폭 3~4m)에 양방향 통행과 대기 줄이 겹쳐 보행 유효 폭 1.5m 미만 급감',
      '수면 위 메인 무대의 우천·수위 리스크, 측면 스크린 간접 관람, 통행로 의자 배치 불편',
      "'석사천 일대'라는 모호한 안내로 외지인 내비게이션 검색 난항 및 구역 경계 불분명",
    ],
  },
  {
    id: 'food',
    num: '02',
    title: '먹거리·취식 환경 (피로도·회전율)',
    badge: '자리 눈치싸움',
    points: [
      '웹/키오스크 일괄 주문 불가 및 메뉴·가게 설명 없이 이름만 나열되어 선택 피로도 극심',
      "직관적 구역명 없이 단순 '몇 번 부스' 표기로 위치 탐색 어려움",
      '좌석 부족으로 흙바닥·길가 무단 돗자리, 짐 선점 눈치싸움, 돗자리 방치로 회전율 저하',
    ],
  },
  {
    id: 'identity',
    num: '03',
    title: '콘텐츠 정체성 (브랜딩 희석)',
    badge: '백화점식 부스',
    points: [
      '독서존·말타기 체험 등 막국수·닭갈비와 무관한 지역 행사 부스 단순 압축 배치',
      '단순 홍보·음식 부스 위주 구성으로 방문객 체험 몰입도 저조',
      '기존 닭·막국수 마스코트가 통일된 스토리 없이 산발 노출되어 정체성 약화',
    ],
  },
  {
    id: 'commerce',
    num: '04',
    title: '공연·홍보·상권 연계 한계',
    badge: '원도심 전이 부재',
    points: [
      '타 지역 관광객의 발길을 끌 화제성 있는 대형 공연·브랜드 협업 라인업 아쉬움',
      '단순 SNS 게시물·현수막 위주 사전 홍보로 2030 바이럴 파급력 낮음',
      '축제장 식사 후 춘천 관내 로컬 맛집 재방문으로 이어지는 사후 연결 장치 전무',
    ],
  },
];

export const GAME_STEPS = [
  {
    step: 1,
    shortLabel: '나만의 막닭',
    venue: '집 출발 전 · 사전 웹 이벤트',
    walkerLine: '축제장 출발 전! 나만의 막닭부터 꾸며서 설레는 마음으로 떠나볼까?',
  },
  {
    step: 2,
    shortLabel: '탐험지도',
    venue: '석사천 수변 산책로 입구',
    walkerLine: '드디어 석사천 축제장 도착! 산책로를 걸으며 숨은 닭 마스코트를 찾아보자!',
  },
  {
    step: 3,
    shortLabel: '취향·주문',
    venue: '먹거리 부스 거리 · 키오스크 앞',
    walkerLine: '맛있는 냄새가 진동하네! 취향 지도로 내 입맛에 딱 맞는 부스를 한 번에 주문!',
  },
  {
    step: 4,
    shortLabel: '피크닉존',
    venue: '공지천 옆 지정 피크닉존',
    walkerLine: '눈치싸움 ZERO! 내 번호 칸에 편하게 앉아서 먹고 깔끔하게 정리하자!',
  },
  {
    step: 5,
    shortLabel: '막닭.ZIP',
    venue: '공지천 체험존 〈막닭.ZIP〉 부스',
    walkerLine: '배도 부르니 이제 〈막닭.ZIP〉 부스에서 신나게 놀고 카드팩도 뽑아볼까?',
  },
  {
    step: 6,
    shortLabel: '공연·여권',
    venue: '공지천 잔디광장 메인 스테이지',
    walkerLine: '탁 트인 공지천 무대에서 공연 즐기고, 끼끼 여권 들고 춘천 맛집으로 출발!',
  },
];

export const EXPLORER_MASCOTS = [
  {
    id: 'm1',
    name: '냄새를 따라온 닭',
    spot: '석사천 먹거리 초입',
    x: '16%',
    y: '34%',
    prompt: '춘천 철판 닭갈비의 대표 핵심 재료 3가지는?',
    choices: ['닭다리살·양배추·고추장양념', '소고기·숙주·간장소스'],
    answer: 0,
    reward: '닭갈비 부스 1,000원 할인 스티커',
  },
  {
    id: 'm2',
    name: '면에 빠진 닭',
    spot: '석사천 징검다리',
    x: '37%',
    y: '62%',
    prompt: '춘천 막국수 본연의 풍미를 살리는 조합은?',
    choices: ['우동면·버터·간장', '메밀면·동치미·들기름'],
    answer: 1,
    reward: '막국수 사리 무료 추가 스티커',
  },
  {
    id: 'm3',
    name: '길을 안내하는 닭',
    spot: '공지천 연결 산책로',
    x: '55%',
    y: '28%',
    prompt: '2026 개선 축제에서 석사천 산책로의 통행 방식은?',
    choices: ['일방통행 보행 전용 + 징검다리 순환', '양방향 통행 + 길가 돗자리 허용'],
    answer: 0,
    reward: '피크닉존 우선 안내 배지',
  },
  {
    id: 'm4',
    name: '놀고 싶은 닭',
    spot: '막닭.ZIP 체험 광장',
    x: '73%',
    y: '64%',
    prompt: '기존 독서존·말타기를 대체한 체험존 이름은?',
    choices: ['백화점 종합 체험장', '막닭.ZIP (5종 체험 + 달랑달랑 참)'],
    answer: 1,
    reward: '참여 점포 음료 1잔 쿠폰',
  },
  {
    id: 'm5',
    name: '흥에 취한 닭',
    spot: '공지천 메인 스테이지',
    x: '86%',
    y: '35%',
    prompt: '도장 5개 완성 시 교환받는 지역 화폐 리워드는?',
    choices: ['춘천사랑상품권 5,000원권', '행사장 전용 100원 쿠폰'],
    answer: 0,
    reward: '탐험지도 5마리 올클리어 인증!',
  },
];

export type TasteType = 'spicy' | 'mild' | 'classic' | 'set';

export interface TasteStoreItem {
  id: string;
  taste: TasteType;
  storeName: string;
  zone: string;
  menuName: string;
  portion: string;
  price: number;
  spiceLevel: 0 | 1 | 2 | 3;
  desc: string;
}

export const TASTE_FILTERS: { id: TasteType; label: string; emoji: string }[] = [
  { id: 'spicy', label: '매운맛파', emoji: '🔥' },
  { id: 'mild', label: '순하고 담백파', emoji: '🌿' },
  { id: 'classic', label: '춘천 정통파', emoji: '🍗' },
  { id: 'set', label: '막닭 세트파', emoji: '✨' },
];

export const TASTE_STORES: TasteStoreItem[] = [
  {
    id: 's1',
    taste: 'spicy',
    storeName: '불꽃철판 1번가',
    zone: '레드-A1',
    menuName: '불닭 콜라보 화끈 컵닭갈비',
    portion: '250g',
    price: 9000,
    spiceLevel: 3,
    desc: '삼양 불닭 소스로 입안이 얼얼한 스트레스 해소 맛',
  },
  {
    id: 's2',
    taste: 'mild',
    storeName: '소양메밀 방앗간',
    zone: '블루-B2',
    menuName: '시원 동치미 메밀 막국수',
    portion: '320g',
    price: 8000,
    spiceLevel: 0,
    desc: '살얼음 동치미 육수와 고소한 들기름의 깔끔함',
  },
  {
    id: 's3',
    taste: 'classic',
    storeName: '명동 60년 본가',
    zone: '레드-A3',
    menuName: '춘천 정통 숯불 닭갈비 도시락',
    portion: '280g',
    price: 11000,
    spiceLevel: 1,
    desc: '참숯 향을 입혀 겉바속촉으로 구워낸 오리지널',
  },
  {
    id: 's4',
    taste: 'set',
    storeName: '막닭 연합 콤보존',
    zone: '중앙-C1',
    menuName: '1인 막닭 테이스팅 듀오 세트',
    portion: '닭180g+막국수',
    price: 13000,
    spiceLevel: 1,
    desc: '혼자 와도 두 가지를 한 번에 즐기는 황금 조합',
  },
  {
    id: 's5',
    taste: 'spicy',
    storeName: '고추장 떡볶닭',
    zone: '레드-A4',
    menuName: '매콤 치즈폭탄 닭갈비 컵',
    portion: '260g',
    price: 10000,
    spiceLevel: 2,
    desc: '고추장 양념 위에 모짜렐라 치즈를 듬뿍 녹인 인기 메뉴',
  },
  {
    id: 's6',
    taste: 'mild',
    storeName: '구봉산 간장닭',
    zone: '레드-A2',
    menuName: '어린이·순한 간장 닭갈비',
    portion: '250g',
    price: 9500,
    spiceLevel: 0,
    desc: '달콤 짭짤한 간장 베이스로 아이와 가족 모두 추천',
  },
];

export const PICNIC_STAFF_ROLES = [
  { role: '대기표 부스 · 안내', count: 10, task: '대기번호 발급·호출, 칸 배정, 보상 지급' },
  { role: '구역 순찰 요원', count: 5, task: '15분 경고 스티커 부착, 20분 초과 정리' },
  { role: '입구 규칙 안내', count: 4, task: '개인 돗자리 금지 및 길가 착석자 안내' },
  { role: '쓰레기 · 청결 관리', count: 5, task: '분리배출 스테이션 4곳 및 회전 정리' },
];

export const KKIKKI_LOCAL_RESTAURANTS = [
  {
    tag: '처음 춘천 온 사람',
    name: '우미닭갈비 본점 (명동 골목)',
    citizenQuote: '"춘천 사람들은 여기서 마지막 볶음밥까지 꼭 먹고 가요!" — 28세 춘천 시민',
    info: '춘천시 금강로62번길 · 10:30~21:30',
    benefit: '끼끼 여권 제시 시 우동사리 또는 음료 1병 무료',
  },
  {
    tag: '가족과 함께(주차·놀이)',
    name: '샘밭막국수 본점 (신북읍)',
    citizenQuote: '"넓은 주차장과 좌석 덕분에 아이 데리고 가기 최고예요!" — 39세 춘천 시민',
    info: '춘천시 신북읍 천전리 · 10:30~20:30',
    benefit: '감자전 주문 시 메밀전병 1접시 서비스',
  },
  {
    tag: '매운맛 도전(맵기 조절)',
    name: '통나무집 닭갈비 (소양강댐)',
    citizenQuote: '"매운맛 단계가 확실하고 감자사리 조합이 진짜 별미예요!" — 24세 대학생',
    info: '춘천시 신북읍 신샘밭로 · 10:30~21:30',
    benefit: '제휴 바우처 제시 시 테이블당 2,000원 즉시 할인',
  },
  {
    tag: '학생 가성비 맛집',
    name: '남부막국수 (효자동·대학가)',
    citizenQuote: '"동치미 국물이 끝내주고 양도 푸짐해서 매주 갑니다!" — 한림대 재학생',
    info: '춘천시 효자동 공지로 · 11:00~20:00',
    benefit: '학생증 + 여권 제시 시 곱배기 무료 업그레이드',
  },
];

export const OFFICIAL_GOODS = [
  {
    id: 'g1',
    type: 'mejirus' as const,
    name: '자유형 아크릴 메지루시 키링',
    spec: '투명 / 4종 규격',
    usage: '체험존 〈막닭.ZIP〉 미션 달성 시 지급하는 "달랑달랑 참" 수집형 키링 파츠',
  },
  {
    id: 'g2',
    type: 'malang' as const,
    name: '원형 말랑키링',
    spec: '화이트 / 양면 인쇄 / 5 × 15.9cm',
    usage: '닭·막국수 메인 캐릭터를 입체감 있게 담은 폭신한 소장용 키링',
  },
  {
    id: 'g3',
    type: 'pin' as const,
    name: '벨보아 핀버튼',
    spec: '직사각 6.2×4.1cm / 원형 6cm',
    usage: '앞치마, 가방, 옷깃에 달아 팀 정체성을 표현하는 벨보아 소재 뱃지',
  },
  {
    id: 'g4',
    type: 'lightstick' as const,
    name: 'LED 응원봉 키링',
    spec: '투명 / 4.7 × 12.3cm',
    usage: '공지천 메인 스테이지 야간 공연 및 〈막닭 소스 대첩〉 응원 미니 굿즈',
  },
  {
    id: 'g5',
    type: 'towel' as const,
    name: '팀별 슬로건 타올',
    spec: '화이트 / 100 × 20cm',
    usage: 'TEAM 닭갈비 vs TEAM 막국수 라이벌 응원 및 포토 소품 공식 슬로건 타올',
  },
  {
    id: 'g6',
    type: 'tshirt' as const,
    name: '축제 공식 오리지널 티셔츠',
    spec: '길단 2000 화이트',
    usage: '현장 스태프 및 관람객이 함께 착용해 축제장 전체의 시각적 브랜딩 통일',
  },
];

export const FINAL_IMPACTS = [
  {
    num: '01',
    title: '안전 및 현장 운영 효율 극대화',
    summary:
      '석사천 일방통행, 공지천 대형 스테이지 분산 배치, 번호 지정 피크닉존(50~100칸 · 15분 자리 비움 관리 · 24명 전담 인력 배치)으로 보행 병목과 자리 갈등을 해소하고 50만 명 수용력을 확보합니다.',
  },
  {
    num: '02',
    title: '외지 관광객 유입 & 원도심 매출 견인',
    summary:
      '기업 후원 연계 공연, 사전 웹 게임 바이럴, 춘천사랑상품권 5,000원권 리워드, 끼끼 여권 제휴 바우처를 통해 단기 체류(1.5~2시간)를 넘어 춘천 시내 외식 상권의 지속 매출로 연결합니다.',
  },
  {
    num: '03',
    title: '춘천 대표 시즌제 로컬 축제 자산 확립',
    summary:
      '맥락 없는 백화점식 부스를 걷어내고 막국수·닭갈비 정체성을 담은 〈막닭.ZIP〉, 〈막닭 소스 대첩〉, 실제 제작 견적 기반 공식 굿즈 6종(141개)으로 자생적 축제 모델을 완성합니다.',
  },
];
