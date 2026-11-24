import { ArrowDownRight, BookOpen } from 'lucide-react';
import { HERO_CONTENT, HERO_INDEX_STRIP } from '../data/projectData';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  onOpenBriefModal: () => void;
}

export function HeroSection({ onOpenBriefModal }: HeroSectionProps) {
  return (
    <section id="top" className="bg-zinc-50 pt-10 pb-0 md:pt-16">
      <div id="overview" className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Editorial Typographic Hierarchy */}
          <div className="lg:col-span-5 flex flex-col justify-between py-2">
            <div className="space-y-6">
              <p className="text-xs font-medium text-zinc-500 tracking-tight">
                {HERO_CONTENT.kicker}
              </p>

              <h1 className="font-display text-[clamp(2.25rem,4vw,3.35rem)] font-black tracking-tight leading-[1.12] text-zinc-950 text-balance">
                <span className="block">{HERO_CONTENT.titleLine1}</span>
                <span className="block text-red-600">{HERO_CONTENT.titleLine2}</span>
              </h1>

              <p className="text-base md:text-[17px] leading-[1.7] text-zinc-600 max-w-[44ch]">
                {HERO_CONTENT.lead}
              </p>
            </div>

            <div className="pt-8 flex flex-wrap items-center gap-5">
              <a
                href="#diagnosis"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-zinc-950 hover:bg-zinc-800 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
              >
                <span>{HERO_CONTENT.primaryCta}</span>
                <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <button
                type="button"
                onClick={onOpenBriefModal}
                className="inline-flex items-center gap-2 px-2 py-2.5 text-sm font-semibold text-zinc-700 hover:text-red-600 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 rounded"
              >
                <BookOpen className="w-4 h-4" aria-hidden="true" />
                <span>{HERO_CONTENT.secondaryCta}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Matching Height 16:9 Artwork Carrier */}
          <div className="lg:col-span-7 flex">
            <div className="w-full overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 aspect-video lg:aspect-auto lg:h-full">
              <ResilientImage
                src={HERO_CONTENT.image}
                alt={HERO_CONTENT.imageAlt}
                fallbackTitle="막국수용사 닭갈비 왕국 메인 비주얼"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Structural Index Strip below Hero Split */}
        <div className="mt-12 md:mt-16 border-t border-zinc-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-zinc-200">
          {HERO_INDEX_STRIP.map((item) => (
            <div key={item.index} className="py-6 sm:px-6 first:sm:pl-0 last:sm:pr-0">
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <span className="font-mono-tabular font-bold text-red-600">{item.index}</span>
                <span aria-hidden="true">·</span>
                <span>{item.label}</span>
              </div>
              <p className="mt-2 text-sm font-semibold text-zinc-900">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
