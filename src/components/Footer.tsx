export function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-800 py-14">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="space-y-2">
          <div className="font-display text-lg font-extrabold text-white tracking-tight">
            막국수용사 닭갈비 왕국을 구해라
          </div>
          <p className="text-xs text-zinc-400">
            춘천 막국수 닭갈비 축제 문제 개선 프로젝트 · 팀 소개 및 최종 자료 추후 업데이트 예정
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs">
          <a href="#overview" className="hover:text-white transition-colors">
            프로젝트 개요
          </a>
          <a href="#diagnosis" className="hover:text-white transition-colors">
            현황 진단
          </a>
          <a href="#quests" className="hover:text-white transition-colors">
            개선 퀘스트
          </a>
          <a href="#impact" className="hover:text-white transition-colors">
            기대 효과
          </a>
          <a href="#roadmap" className="hover:text-white transition-colors">
            추진 로드맵
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-10 pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-zinc-500">
        <span>© 2026 막국수용사 프로젝트 팀. All rights reserved.</span>
        <span>Chuncheon Makguksu &amp; Dakgalbi Festival Improvement Initiative</span>
      </div>
    </footer>
  );
}
