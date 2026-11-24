/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { BriefingStage } from './components/BriefingStage';
import { SimulationStage } from './components/SimulationStage';
import { OutroStage } from './components/OutroStage';
import { SimulatorLoader } from './components/SimulatorLoader';

type AppView = 'briefing' | 'simulation' | 'outro';

export default function App() {
  const [view, setView] = useState<AppView>('briefing');
  const [isLoadingSim, setIsLoadingSim] = useState(false);
  const [simKey, setSimKey] = useState(0);

  const enterSimulationWithLoader = (reset = false) => {
    if (reset) {
      setSimKey((k) => k + 1);
    }
    setIsLoadingSim(true);
  };

  const handleLoaderDone = () => {
    setIsLoadingSim(false);
    setView('simulation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col pixel-grid-bg text-[#1A1A2E]">
      {/* Intentional Virtual Simulator Transition Loader */}
      {isLoadingSim && <SimulatorLoader onComplete={handleLoaderDone} />}

      {/* Strict 3-Zone Pixel Top Bar */}
      <header className="sticky top-0 z-40 bg-[#1A1A2E] text-[#F5E6D3] border-b-4 border-[#FF5722]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
          {/* Zone 1: Brand Title */}
          <button
            type="button"
            onClick={() => {
              setView('briefing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-pixel text-sm sm:text-base text-white hover:text-[#FFD54F] whitespace-nowrap shrink-0 cursor-pointer transition-colors"
          >
            막국수 용사 · CON:NECT
          </button>

          {/* Zone 2: Stage Navigation Tabs */}
          <nav
            aria-label="프로젝트 단계 이동"
            className="flex items-center gap-2 sm:gap-3 overflow-x-auto"
          >
            {[
              { id: 'briefing' as const, label: '1. 배경 및 문제점' },
              { id: 'simulation' as const, label: '2. 축제 현장 체험' },
              { id: 'outro' as const, label: '3. 기대효과·굿즈' },
            ].map((tab) => {
              const active = view === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    if (tab.id === 'simulation' && view !== 'simulation') {
                      enterSimulationWithLoader(false);
                    } else {
                      setView(tab.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className={`px-2.5 sm:px-3.5 py-1.5 text-xs font-pixel border-2 whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                    active
                      ? 'bg-[#FF5722] text-white border-white'
                      : 'bg-transparent text-[#F5E6D3]/80 border-transparent hover:border-[#F5E6D3]/40 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="hidden md:flex items-center shrink-0">
            <button
              type="button"
              onClick={() => enterSimulationWithLoader(true)}
              className="px-3.5 py-1.5 bg-[#1E88E5] hover:bg-[#1565C0] text-white font-pixel text-xs border-2 border-white whitespace-nowrap shrink-0 cursor-pointer"
            >
              체험 다시하기
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {view === 'briefing' && (
          <BriefingStage onStartSimulation={() => enterSimulationWithLoader(false)} />
        )}

        {view === 'simulation' && (
          <SimulationStage
            key={simKey}
            onFinishToOutro={() => {
              setView('outro');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {view === 'outro' && (
          <OutroStage
            onRestart={() => enterSimulationWithLoader(true)}
            onGoToBriefing={() => {
              setView('briefing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Quiet Institutional Footer */}
      <footer className="bg-[#1A1A2E] text-[#F5E6D3]/80 border-t-4 border-[#1A1A2E] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
          <div className="space-y-1">
            <div className="font-pixel text-sm text-white">
              막국수 용사, 닭갈비 왕국을 구해라
            </div>
            <p className="text-[#F5E6D3]/70">
              한림대학교 문화기획동아리 CON:NECT · 춘천 막국수닭갈비축제 문제 개선 프로젝트
            </p>
          </div>
          <div className="font-pixel text-[11px] text-[#90CAF9]">
            © 2026 CON:NECT ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </div>
  );
}
