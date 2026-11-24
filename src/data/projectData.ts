// ============================================================================
// [콘텐츠 편집 가이드]
// 아래 데이터 구조를 수정하여 프로젝트의 실제 조사 내용, 이미지, 수치, 팀 정보를
// 손쉽게 반영할 수 있습니다.
// ============================================================================

export type ProblemCategory = 'all' | 'space' | 'operation' | 'content';

export interface ProblemItem {
  id: string;
  index: string;
  category: Exclude<ProblemCategory, 'all'>;
  categoryLabel: string;
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
  // 상세 모달용 확장 슬롯 (추후 실제 조사 데이터로 교체)
  detail: {
    backgroundSlot: string;
    fieldObservationSlot: string;
    improvementDirectionSlot: string;
    targetMetricSlot: string;
  };
}

export interface QuestStage {
  id: string;
  stepNumber: string;
  tabLabel: string;
  title: string;
  description: string;
  strategies: {
    code: string;
    title: string;
    summary: string;
  }[];
  comparison: {
    aspect: string;
    before: string;
    after: string;
  }[];
}

export interface ImpactCard {
  index: string;
  domain: string;
  title: string;
  metricPlaceholder: string;
  description: string;
}

export interface RoadmapPhase {
  phase: string;
  periodSlot: string;
  title: string;
  summary: string;
  deliverables: string[];
}

export const HERO_CONTENT = {
  kicker: '춘천 막국수 닭갈비 축제 문제 개선 프로젝트 · 2026',
  titleLine1: '막국수용사,',
  titleLine2: '닭갈비 왕국을 구해라',
  lead: '전통의 맛과 흥을 지닌 춘천 막국수 닭갈비 축제의 현장 불편 요소를 진단하고, 방문객 모두가 즐기는 서사형 개선안을 설계하는 프로젝트 아카이브입니다.',
  primaryCta: '개선 과제 살펴보기',
  secondaryCta: '프로젝트 기획 배경',
  image: '/src/assets/images/hero_dakgalbi_kingdom_1795505252385.jpg',
  imageAlt: '춘천 호반과 산을 배경으로 한 막국수용사와 닭갈비 왕국 일러스트',
  briefModal: {
    title: '프로젝트 기획 배경 및 목적',
    subtitle: '추후 팀의 문제의식과 프로젝트 발단 서사를 채워 넣는 공간입니다.',
    sections: [
      {
        heading: '01. 왜 닭갈비 왕국을 구해야 하는가',
        body: '지역을 대표하는 먹거리 축제임에도 불구하고, 반복적으로 지적되는 현장 동선 혼잡, 가격·정보 투명성 부족, 젊은 세대와 가족 단위를 아우르는 참여형 콘텐츠의 부재 등 핵심 문제를 재정의합니다.',
      },
      {
        heading: '02. 막국수용사 세계관의 역할',
        body: '딱딱한 행정 개선 보고서가 아니라, 축제를 찾은 시민과 관광객이 자연스럽게 미션을 수행하며 개선된 동선과 프로그램을 체험하도록 이끄는 스토리텔링 프레임워크입니다.',
      },
      {
        heading: '03. 향후 채워질 데이터 영역',
        body: '현장 답사 사진, 설문조사 통계, 상인회 및 방문객 인터뷰 인용문, 최종 제안 프로토타입 시안 등이 각 섹션의 지정된 슬롯에 순차적으로 업데이트될 예정입니다.',
      },
    ],
  },
};

export const HERO_INDEX_STRIP = [
  {
    index: '01',
    label: '프로젝트 배경',
    value: '지역 대표 축제 현안 분석',
  },
  {
    index: '02',
    label: '핵심 미션',
    value: '동선·운영·가격 신뢰 회복',
  },
  {
    index: '03',
    label: '서사 테마',
    value: '막국수용사 퀘스트형 경험 설계',
  },
  {
    index: '04',
    label: '콘텐츠 상태',
    value: '상세 내용 순차 업데이트 예정',
  },
];

export const PROBLEM_CATEGORIES: { id: ProblemCategory; label: string }[] = [
  { id: 'all', label: '전체 보기' },
  { id: 'space', label: '공간·동선' },
  { id: 'operation', label: '가격·운영' },
  { id: 'content', label: '콘텐츠·홍보' },
];

export const PROBLEM_ITEMS: ProblemItem[] = [
  {
    id: 'problem-space',
    index: '01',
    category: 'space',
    categoryLabel: '공간·동선 영역',
    title: '혼잡한 대기 줄과 불분명한 축제장 동선',
    summary:
      '입구부터 부스, 취식 공간까지의 안내 체계가 단절되어 피크 시간대 병목과 피로도가 누적되는 현상을 다룹니다. (추후 현장 실측 및 답사 사진 반영 예정)',
    image: '/src/assets/images/festival_plaza_scene_1795505254156.jpg',
    imageAlt: '춘천 강변 축제 광장과 정돈된 목조 부스 전경',
    detail: {
      backgroundSlot:
        '[배경 내용 추가 예정] 축제장 진입로, 주차장 연계, 부스 배치도 분석 텍스트를 이곳에 입력합니다.',
      fieldObservationSlot:
        '[현장 관찰 내용 추가 예정] 실제 방문객 동선 병목 구간, 그늘·취식 좌석 부족 사례, 안내 표지판 시인성 점검 결과를 기록합니다.',
      improvementDirectionSlot:
        '[개선 방향 초안] 구역별 컬러/아이콘 사이니지 통합, 스마트 웨이팅 또는 분산형 테이블 존 배치를 제안합니다.',
      targetMetricSlot: '목표 지표 입력 예정 (예: 평균 대기 시간 단축률)',
    },
  },
  {
    id: 'problem-operation',
    index: '02',
    category: 'operation',
    categoryLabel: '가격·운영 영역',
    title: '가격·중량 정보 불투명성과 신뢰 저하',
    summary:
      '대표 메뉴인 닭갈비의 제공량, 가격 기준, 추가 옵션 안내가 부스마다 상이해 방문객이 느끼는 가격 불신을 개선하는 과제입니다. (추후 설문 근거 추가 예정)',
    image: '/src/assets/images/chuncheon_dakgalbi_pan_1795505253636.jpg',
    imageAlt: '무쇠 철판 위에서 조리되는 춘천 닭갈비',
    detail: {
      backgroundSlot:
        '[배경 내용 추가 예정] 최근 지역 축제 바가지 요금 논란과 춘천 축제 내 가격 표기 현황 자료를 반영합니다.',
      fieldObservationSlot:
        '[현장 관찰 내용 추가 예정] 메뉴판 표기 방식, 1인분 기준 중량 안내 유무, 결제 및 영수증 처리 실태 조사 내용을 작성합니다.',
      improvementDirectionSlot:
        '[개선 방향 초안] 표준 정량·정찰 메뉴 보드 도입, 소량 시식(1인/커플) 메뉴 구성, 현장 피드백 QR 체계 구축을 제안합니다.',
      targetMetricSlot: '목표 지표 입력 예정 (예: 가격 만족도 개선 목표)',
    },
  },
  {
    id: 'problem-content',
    index: '03',
    category: 'content',
    categoryLabel: '콘텐츠·홍보 영역',
    title: '먹거리 편중을 넘는 체험형 서사의 부재',
    summary:
      '단순 식사 위주의 소비에서 벗어나, 막국수와 닭갈비의 고유한 매력을 게임형 미션과 스토리로 엮어 체류 시간을 늘리는 과제입니다. (추후 콘텐츠 기획안 추가)',
    image: '/src/assets/images/buckwheat_makguksu_bowl_1795505253888.jpg',
    imageAlt: '시원한 메밀 막국수 한 그릇',
    detail: {
      backgroundSlot:
        '[배경 내용 추가 예정] 기존 축제 프로그램 구성표 및 타 지역 성공 축제 벤치마킹 자료를 배치합니다.',
      fieldObservationSlot:
        '[현장 관찰 내용 추가 예정] 방문객 평균 체류 시간, MZ세대 및 가족 단위 참여율, 야간·비수기 시간대 공백 분석을 추가합니다.',
      improvementDirectionSlot:
        '[개선 방향 초안] "막국수용사" 스탬프 퀘스트, 메밀 반죽·철판 체험 부스, 로컬 상권 연계 리워드 시스템을 설계합니다.',
      targetMetricSlot: '목표 지표 입력 예정 (예: 평균 체류 시간 및 프로그램 참여율)',
    },
  },
];

export const QUEST_STAGES: QuestStage[] = [
  {
    id: 'stage-1',
    stepNumber: '01',
    tabLabel: '1단계 · 현장 질서 회복',
    title: '길 잃지 않는 왕국의 지도와 정직한 거래',
    description:
      '방문객이 축제장에 들어서는 순간부터 메뉴 선택, 대기, 취식까지 막힘없이 이동하고 신뢰할 수 있는 물리적·정보적 환경을 구축합니다.',
    strategies: [
      {
        code: '01',
        title: '왕국 구역별 직관적 사이니지 시스템',
        summary: '주요 지점별 동선 안내, 화장실·취식존·주차장 거리 표기 표준화 (세부 시안 추가 예정)',
      },
      {
        code: '02',
        title: '투명한 정량·정찰 메뉴 보드 통일',
        summary: '닭갈비·막국수 중량(g) 및 가격 사전 고지, 소분 시식 옵션 도입 (세부 기준 추가 예정)',
      },
      {
        code: '03',
        title: '분산형 쉼터 및 클린 스테이션 배치',
        summary: '취식 후 분리배출 동선 최적화 및 쾌적한 그늘 좌석 확충 (배치도 추가 예정)',
      },
    ],
    comparison: [
      {
        aspect: '진입 및 이동 동선',
        before: '부스 간 안내 부족으로 특정 구역 병목 발생 (상세 사례 입력 예정)',
        after: '구역 테마별 랜드마크 및 순환형 동선 설계 (최종 배치안 반영)',
      },
      {
        aspect: '메뉴 가격 표기',
        before: '부스별 상이한 표기 방식과 모호한 제공량 (조사 수치 입력 예정)',
        after: '공통 규격 메뉴판 + 정량 명시 + 간편 시식 세트 제공',
      },
      {
        aspect: '대기 및 취식 환경',
        before: '무작정 줄서기 및 좌석 부족으로 인한 조기 이탈',
        after: '구역별 분산 쉼터와 모바일·현장 연동 대기 안내',
      },
    ],
  },
  {
    id: 'stage-2',
    stepNumber: '02',
    tabLabel: '2단계 · 미식 경험 고도화',
    title: '춘천 본연의 맛을 재발견하는 미식 아카이브',
    description:
      '천편일률적인 먹거리 장터를 넘어, 춘천 메밀과 철판·숯불 닭갈비의 계보와 맛의 차이를 직접 비교하고 경험하는 미식 큐레이션을 제안합니다.',
    strategies: [
      {
        code: '01',
        title: '철판 vs 숯불 & 물 vs 비빔 큐레이션 존',
        summary: '취향에 따라 비교 시식할 수 있는 소용량 테이스팅 코스 구성 (참여 업소 기준 추가 예정)',
      },
      {
        code: '02',
        title: '친환경 다회용기 및 위생 인증 체계',
        summary: '일회용품 쓰레기 저감과 현장 조리 위생 신뢰도 제고 (운영 프로세스 추가 예정)',
      },
      {
        code: '03',
        title: '춘천 로컬 농특산물 페어링 부스',
        summary: '지역 메밀, 감자, 전통주 등과 연계한 상생 장터 구성 (협력 모델 추가 예정)',
      },
    ],
    comparison: [
      {
        aspect: '음식 구성 방식',
        before: '2~3인분 대용량 단일 메뉴 위주로 다양한 시식 어려움',
        after: '1인 컵·소분 테이스팅 세트로 다채로운 맛 경험 가능',
      },
      {
        aspect: '식기 및 환경',
        before: '일회용 플라스틱 용기 다량 배출 및 쓰레기 적체',
        after: '회수 스테이션 기반 다회용기 순환 시스템 운영',
      },
      {
        aspect: '지역 연계성',
        before: '축제장 내부 소비로 끝나 지역 상권 파급 제한적',
        after: '춘천 명동 닭갈비 골목 및 주변 상권 할인 연동',
      },
    ],
  },
  {
    id: 'stage-3',
    stepNumber: '03',
    tabLabel: '3단계 · 참여형 스토리 확장',
    title: '막국수용사와 함께하는 왕국 구출 퀘스트',
    description:
      '단순히 먹고 떠나는 축제가 아닌, 방문객 스스로 용사가 되어 축제장 곳곳의 미션을 완수하고 추억을 남기는 참여형 콘텐츠를 설계합니다.',
    strategies: [
      {
        code: '01',
        title: '현장 미션형 스탬프 투어 설계',
        summary: '문제 해결(다회용기 반납, 구역 탐방 등)과 연동된 게임화 미션 (미션 목록 추가 예정)',
      },
      {
        code: '02',
        title: '가족·청년층 참여형 체험 프로그램',
        summary: '메밀 제면 체험, 닭갈비 소스 블렌딩 등 세대 통합형 콘텐츠 (일정표 추가 예정)',
      },
      {
        code: '03',
        title: '디지털 가이드 & 실시간 혼잡도 안내',
        summary: 'QR 기반 모바일 웹 지도로 대기 현황과 퀘스트 진행도 확인 (프로토타입 연결 예정)',
      },
    ],
    comparison: [
      {
        aspect: '방문객 역할',
        before: '수동적인 대기 및 식사 중심의 단발성 방문',
        after: '미션을 수행하며 왕국을 구하는 능동적 참여자',
      },
      {
        aspect: '홍보 및 확산',
        before: '단순 음식 인증샷 위주의 일회성 노출',
        after: '퀘스트 완주 인증 및 캐릭터 굿즈 연계 자발적 바이럴',
      },
      {
        aspect: '정보 접근성',
        before: '종이 리플릿 분실 및 실시간 운영 변동 확인 불가',
        after: '모바일 QR 기반 실시간 축제 지도 및 미션 트래커',
      },
    ],
  },
];

export const IMPACT_CARDS: ImpactCard[] = [
  {
    index: '01',
    domain: '운영 신뢰성',
    title: '바가지 없는 투명한 축제 기준 확립',
    metricPlaceholder: '목표 지표 입력 예정',
    description:
      '표준 가격·중량 표시와 현장 모니터링 체계를 통해 방문객의 가격 불만을 해소하고 축제 브랜드 신뢰도를 회복합니다.',
  },
  {
    index: '02',
    domain: '방문객 경험',
    title: '기다림의 피로를 줄이고 즐거움을 채우는 체류',
    metricPlaceholder: '체류 시간 목표 입력 예정',
    description:
      '분산된 동선, 1인 시식 옵션, 막국수용사 퀘스트 콘텐츠로 머무는 시간 내내 지루할 틈 없는 경험을 제공합니다.',
  },
  {
    index: '03',
    domain: '지속 가능성',
    title: '친환경 운영과 춘천 골목 상권 동반 성장',
    metricPlaceholder: '상생 지표 입력 예정',
    description:
      '다회용기 순환 구조로 환경 부담을 줄이고, 축제장 방문객이 춘천 시내 닭갈비·막국수 명소로 이어지도록 설계합니다.',
  },
];

export const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    phase: 'Phase 01',
    periodSlot: '일정 입력 예정',
    title: '현황 조사 및 문제 정의',
    summary: '기존 춘천 막국수 닭갈비 축제 후기, 언론 보도, 현장 답사를 통해 핵심 불편 요소를 구조화합니다.',
    deliverables: [
      '방문객 리뷰 및 불만 키워드 분석표 (자료 추가 예정)',
      '축제장 물리적 동선 및 부스 배치 문제점 매핑',
      '개선 대상 핵심 페르소나 및 문제 정의서',
    ],
  },
  {
    phase: 'Phase 02',
    periodSlot: '일정 입력 예정',
    title: '개선 전략 및 세계관 설계',
    summary: '도출된 문제를 해결할 운영 기준안과 "막국수용사 닭갈비 왕국을 구해라" 스토리 콘셉트를 결합합니다.',
    deliverables: [
      '정량·정찰 메뉴 보드 및 사이니지 가이드라인',
      '막국수용사 퀘스트 여정 지도(User Journey) 초안',
      '1인 시식 및 다회용기 운영 프로세스 설계안',
    ],
  },
  {
    phase: 'Phase 03',
    periodSlot: '일정 입력 예정',
    title: '프로토타입 제작 및 검증',
    summary: '웹 가이드, 시각 디자인 시안, 체험 키트 목업을 제작하고 예비 방문객 피드백으로 완성도를 높입니다.',
    deliverables: [
      '모바일 축제 지도 및 퀘스트 UI 디자인 시안',
      '현장 적용 가능한 홍보물·표지판 그래픽 목업',
      '모의 테스트 및 설문 기반 개선 보완 내역',
    ],
  },
  {
    phase: 'Phase 04',
    periodSlot: '일정 입력 예정',
    title: '최종 제안서 공개 및 아카이빙',
    summary: '완성된 프로젝트 결과물과 기대 효과를 본 웹사이트에 최종 업데이트하여 공개합니다.',
    deliverables: [
      '최종 프로젝트 결과 보고서 및 요약 아카이브',
      '유관 기관·상인회 전달용 핵심 요약 리포트',
      '프로젝트 참여 팀원 및 제작 비하인드 기록',
    ],
  },
];
