/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ArrowDown, ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { BriefingStage } from './components/BriefingStage';
import { SimulationStage } from './components/SimulationStage';
import { OutroStage } from './components/OutroStage';
import { SimulatorLoader } from './components/SimulatorLoader';
import { KingdomSavedCutscene } from './components/KingdomSavedCutscene';
import {
  DakgalbiWarriorSprite,
  MakguksuWarriorSprite,
} from './components/PixelSprites';
import { soundEngine } from './utils/soundEngine';

type AppView = 'briefing' | 'simulation' | 'outro';

export default function App() {
  const [view, setView] = useState<AppView>('briefing');
  const [isLoadingSim, setIsLoadingSim] = useState(false);
  const [showEndingCutscene, setShowEndingCutscene] = useState(false);
  const [simKey, setSimKey] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const ensureAudioStarted = () => {
    soundEngine.startBgm();
  };

  const handleToggleSound = () => {
    ensureAudioStarted();
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  const enterSimulationWithLoader = (reset = false) => {
    ensureAudioStarted();
    soundEngine.playSfx('click');
    if (reset) {
      setSimKey((k) => k + 1);
    }
    setShowEndingCutscene(false);
    setIsLoadingSim(true);
  };

  const handleLoaderDone = () => {
    setIsLoadingSim(false);
    setView('simulation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBriefing = () => {
    ensureAudioStarted();
    soundEngine.playSfx('click');
    const el = document.getElementById('briefing-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col pixel-grid-bg text-[#1A1A2E]">
      {/* Intentional Virtual Simulator Transition Loader */}
      {isLoadingSim && <SimulatorLoader onComplete={handleLoaderDone} />}

      {/* Heroic Kingdom Saved Pixel Cutscene after Step 6 */}
      {showEndingCutscene && (
        <KingdomSavedCutscene
          onContinueToOutro={() => {
            setShowEndingCutscene(false);
            setView('outro');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* Strict 3-Zone Pixel Top Bar (Responsive 2-row on mobile, 1-row on md+) */}
      <header className="sticky top-0 z-40 bg-[#1A1A2E] text-[#F5E6D3] border-b-4 border-[#FF5722]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 md:h-16 flex flex-col md:flex-row md:items-center md:justify-between md:gap-6">
          {/* Top Row (Mobile): Zone 1 Brand + Zone 3 Controls */}
          <div className="h-12 md:h-auto flex items-center justify-between gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                ensureAudioStarted();
                soundEngine.playSfx('click');
                setView('briefing');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="font-pixel text-xs sm:text-base text-white hover:text-[#FFD54F] whitespace-nowrap shrink-0 cursor-pointer transition-colors"
            >
              막국수 용사 · CON:NECT
            </button>

            <div className="flex items-center gap-1.5 md:hidden shrink-0">
              <button
                type="button"
                onClick={handleToggleSound}
                aria-label={isMuted ? '배경음 및 효과음 켜기' : '배경음 및 효과음 끄기'}
                className="inline-flex items-center gap-1 px-2 py-1 bg-[#2B2B4B] hover:bg-[#3A3A66] text-[#FFD54F] font-pixel text-[11px] border-2 border-[#F5E6D3]/50 whitespace-nowrap cursor-pointer"
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>음소거</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>사운드</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => enterSimulationWithLoader(true)}
                className="px-2 py-1 bg-[#1E88E5] text-white font-pixel text-[11px] border-2 border-white whitespace-nowrap cursor-pointer"
              >
                다시하기
              </button>
            </div>
          </div>

          {/* Zone 2: Stage Navigation Tabs */}
          <nav
            aria-label="프로젝트 단계 이동"
            className="grid grid-cols-3 md:flex items-center gap-1.5 sm:gap-2.5 pb-2 md:pb-0 border-t border-[#F5E6D3]/15 md:border-t-0 pt-2 md:pt-0"
          >
            {[
              { id: 'briefing' as const, label: '1. 배경 및 문제점', short: '1. 배경·문제' },
              { id: 'simulation' as const, label: '2. 축제 현장 체험', short: '2. 축제 체험' },
              { id: 'outro' as const, label: '3. 기대효과 & 굿즈', short: '3. 효과·굿즈' },
            ].map((tab) => {
              const active = view === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    ensureAudioStarted();
                    soundEngine.playSfx('click');
                    if (tab.id === 'simulation' && view !== 'simulation') {
                      enterSimulationWithLoader(false);
                    } else {
                      setView(tab.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className={`px-2 sm:px-3.5 py-1.5 text-[11px] sm:text-xs font-pixel border-2 text-center whitespace-nowrap cursor-pointer transition-colors ${
                    active
                      ? 'bg-[#FF5722] text-white border-white'
                      : 'bg-transparent text-[#F5E6D3]/80 border-[#F5E6D3]/20 md:border-transparent hover:border-[#F5E6D3]/40 hover:text-white'
                  }`}
                >
                  <span className="sm:hidden">{tab.short}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Zone 3 (Desktop): Sound Mute Toggle + Primary Action */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleToggleSound}
              aria-label={isMuted ? '배경음 및 효과음 켜기' : '배경음 및 효과음 끄기'}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-[#2B2B4B] hover:bg-[#3A3A66] text-[#FFD54F] font-pixel text-xs border-2 border-[#F5E6D3]/50 whitespace-nowrap shrink-0 cursor-pointer"
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>음소거</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>사운드 ON</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => enterSimulationWithLoader(true)}
              className="inline-flex px-3.5 py-1.5 bg-[#1E88E5] hover:bg-[#1565C0] text-white font-pixel text-xs border-2 border-white whitespace-nowrap shrink-0 cursor-pointer"
            >
              체험 다시하기
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {view === 'briefing' && (
          <>
            {/* Intro Screen that smoothly scrolls into the Briefing section */}
            <section
              id="intro-screen"
              className="min-h-[calc(100dvh-6.5rem)] md:min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-3 sm:px-6 py-8 sm:py-12 border-b-4 border-[#1A1A2E] bg-[#FFFDF8]"
            >
              <div className="max-w-4xl w-full pixel-box bg-white p-5 sm:p-10 md:p-12 text-center space-y-6 sm:space-y-8">
                <div className="flex items-center justify-center gap-3 sm:gap-6">
                  <div className="p-2.5 sm:p-3 bg-[#FFF3E0] border-3 border-[#1A1A2E] animate-pixel-bob">
                    <DakgalbiWarriorSprite className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" />
                  </div>
                  <span className="font-arcade text-xs sm:text-sm md:text-base text-[#E53935]">VS</span>
                  <div className="p-2.5 sm:p-3 bg-[#E3F2FD] border-3 border-[#1A1A2E] animate-pixel-bob">
                    <MakguksuWarriorSprite className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" />
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <p className="font-pixel text-[11px] sm:text-sm text-[#E53935] break-keep leading-relaxed">
                    한림대학교 문화기획동아리 CON:NECT · 춘천 막국수닭갈비축제 문제 개선 프로젝트
                  </p>
                  <h1 className="font-pixel text-2xl sm:text-4xl md:text-5xl text-[#1A1A2E] leading-tight text-balance break-keep">
                    막국수 용사,
                    <br className="sm:hidden" /> 닭갈비 왕국을 구해라
                  </h1>
                  <p className="text-xs sm:text-base text-[#1A1A2E]/80 max-w-2xl mx-auto leading-relaxed break-keep">
                    2025년 30만 명에서 2026년 50만 명 규모로 급성장하는 춘천 막국수닭갈비축제.
                    현장 답사로 발굴한 4대 문제점과, 이를 해결하기 위한 개선 축제를 직접 체험해 보세요.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-1">
                  <button
                    type="button"
                    onClick={scrollToBriefing}
                    className="pixel-btn w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 bg-[#1E88E5] hover:bg-[#1565C0] text-white font-pixel text-xs sm:text-sm md:text-base cursor-pointer"
                  >
                    <span>기획 배경 및 문제점 보기</span>
                    <ArrowDown className="w-4 h-4 shrink-0" aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    onClick={() => enterSimulationWithLoader(false)}
                    className="pixel-btn w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 bg-[#FF5722] hover:bg-[#E53935] text-white font-pixel text-xs sm:text-sm md:text-base cursor-pointer"
                  >
                    <span>가상 축제 바로 체험하기</span>
                    <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </section>

            {/* Briefing: Background & 4 Field Problems -> Full-Screen Simulator Gate */}
            <BriefingStage onStartSimulation={() => enterSimulationWithLoader(false)} />
          </>
        )}

        {view === 'simulation' && (
          <SimulationStage
            key={simKey}
            onFinishToOutro={() => setShowEndingCutscene(true)}
          />
        )}

        {view === 'outro' && (
          <OutroStage
            onRestart={() => enterSimulationWithLoader(true)}
            onGoToBriefing={() => {
              ensureAudioStarted();
              soundEngine.playSfx('click');
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
