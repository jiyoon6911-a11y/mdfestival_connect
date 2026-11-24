import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenFeedback: () => void;
}

const NAV_LINKS = [
  { href: '#overview', label: '프로젝트 개요' },
  { href: '#diagnosis', label: '현황 진단' },
  { href: '#quests', label: '개선 퀘스트' },
  { href: '#impact', label: '기대 효과' },
  { href: '#roadmap', label: '추진 로드맵' },
];

export function Navbar({ onOpenFeedback }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-zinc-50/95 backdrop-blur-sm border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#top"
          className="font-display text-lg font-extrabold tracking-tight text-zinc-950 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 rounded"
        >
          막국수용사
        </a>

        {/* Zone 2: 5 concise single-line nav links */}
        <nav
          aria-label="주요 섹션 이동"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-600"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="py-1 border-b border-transparent hover:border-zinc-900 hover:text-zinc-950 transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action + mobile menu trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenFeedback}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 active:scale-[0.99] rounded-lg transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
          >
            의견 제안하기
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? '메뉴 닫기' : '메뉴 열기'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-zinc-700 hover:bg-zinc-200/60 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-zinc-200 bg-zinc-50 px-6 py-4 space-y-2">
          <nav className="flex flex-col gap-1" aria-label="모바일 메뉴">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-2.5 text-sm font-medium text-zinc-700 hover:text-zinc-950 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 border-t border-zinc-200">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenFeedback();
              }}
              className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors cursor-pointer"
            >
              의견 제안하기
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
