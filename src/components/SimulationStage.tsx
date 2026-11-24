import { useEffect, useRef, useState } from 'react';
import { Award, X } from 'lucide-react';
import { GAME_STEPS, type HeroTeam } from '../data/festivalData';
import { GameProgressWalker } from './GameProgressWalker';
import { Step1Decorate } from './game/Step1Decorate';
import { Step2ExplorerMap } from './game/Step2ExplorerMap';
import { Step3TasteKiosk } from './game/Step3TasteKiosk';
import { Step4PicnicZone } from './game/Step4PicnicZone';
import { Step5MakdagZipEmbed } from './game/Step5MakdagZipEmbed';
import { Step6StageAndPassport } from './game/Step6StageAndPassport';

interface SimulationStageProps {
  onFinishToOutro: () => void;
}

interface StampPopupData {
  step: number;
  title: string;
  venue: string;
}

export function SimulationStage({ onFinishToOutro }: SimulationStageProps) {
  const [selectedTeam, setSelectedTeam] = useState<HeroTeam>('makguksu');
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [assignedSeat, setAssignedSeat] = useState<string | null>(null);
  const [isWalking, setIsWalking] = useState(false);
  const [stampPopup, setStampPopup] = useState<StampPopupData | null>(null);
  const walkTimerRef = useRef<number | null>(null);
  const popupTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (walkTimerRef.current) window.clearTimeout(walkTimerRef.current);
      if (popupTimerRef.current) window.clearTimeout(popupTimerRef.current);
    };
  }, []);

  const triggerWalkAndStamp = (
    completedStepNum: number | null,
    targetStep: number,
    onArrival?: () => void
  ) => {
    if (walkTimerRef.current) window.clearTimeout(walkTimerRef.current);
    if (popupTimerRef.current) window.clearTimeout(popupTimerRef.current);

    setIsWalking(true);
    setCurrentStep(targetStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    walkTimerRef.current = window.setTimeout(() => {
      setIsWalking(false);

      if (completedStepNum !== null) {
        const meta = GAME_STEPS.find((s) => s.step === completedStepNum);
        setStampPopup({
          step: completedStepNum,
          title: meta ? `${meta.shortLabel} 미션 클리어!` : `STEP ${completedStepNum} 완료!`,
          venue: meta ? meta.venue : '축제장 거점 이동 완료',
        });

        popupTimerRef.current = window.setTimeout(() => {
          setStampPopup(null);
        }, 2600);
      }

      if (onArrival) {
        onArrival();
      }
    }, 650);
  };

  const completeStepAndGo = (stepNum: number, nextStep?: number) => {
    setCompletedSteps((prev) => (prev.includes(stepNum) ? prev : [...prev, stepNum]));

    if (nextStep) {
      triggerWalkAndStamp(stepNum, nextStep);
    } else {
      const meta = GAME_STEPS.find((s) => s.step === stepNum);
      setStampPopup({
        step: stepNum,
        title: meta ? `${meta.shortLabel} 최종 도장 완료!` : `STEP ${stepNum} 완료!`,
        venue: meta ? meta.venue : '전 코스 정복 완료',
      });
    }
  };

  const handleSelectStep = (step: number) => {
    if (step === currentStep) return;
    triggerWalkAndStamp(null, step);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8 space-y-6 relative">
      {/* Top In-Venue Walking Character Promenade Track (GATE A <-> GATE B) */}
      <GameProgressWalker
        currentStep={currentStep}
        completedSteps={completedSteps}
        selectedTeam={selectedTeam}
        isWalking={isWalking}
        onSelectStep={handleSelectStep}
        onToggleTeam={() =>
          setSelectedTeam((prev) => (prev === 'dakgalbi' ? 'makguksu' : 'dakgalbi'))
        }
      />

      {/* Step-Completion Stamp Popup Effect on Arrival */}
      {stampPopup && (
        <div
          role="status"
          aria-live="polite"
          className="fixed inset-x-4 bottom-6 sm:inset-x-auto sm:right-6 z-50 max-w-sm ml-auto animate-stamp-popup"
        >
          <div className="pixel-box bg-[#FFF8E1] p-4 flex items-start gap-3.5">
            <div className="p-2.5 bg-[#FF5722] border-2 border-[#1A1A2E] text-white shrink-0 animate-stamp">
              <Award className="w-6 h-6" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0 space-y-1">
              <div className="font-pixel text-[11px] text-[#E53935]">
                STEP 0{stampPopup.step} 도장 획득 완료!
              </div>
              <div className="font-pixel text-sm sm:text-base text-[#1A1A2E]">
                {stampPopup.title}
              </div>
              <div className="text-xs text-[#1A1A2E]/75 truncate">{stampPopup.venue}</div>
            </div>
            <button
              type="button"
              onClick={() => setStampPopup(null)}
              aria-label="도장 팝업 닫기"
              className="p-1 text-[#1A1A2E]/70 hover:text-[#1A1A2E] cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Focused Single-Stage In-Venue Experience + Planning Rationale Below */}
      {currentStep === 1 && (
        <Step1Decorate
          completed={completedSteps.includes(1)}
          onCompleteAndNext={() => completeStepAndGo(1, 2)}
        />
      )}

      {currentStep === 2 && (
        <Step2ExplorerMap
          completed={completedSteps.includes(2)}
          onCompleteAndNext={() => completeStepAndGo(2, 3)}
        />
      )}

      {currentStep === 3 && (
        <Step3TasteKiosk
          completed={completedSteps.includes(3)}
          assignedSeat={assignedSeat}
          onAssignSeat={(seat) => setAssignedSeat(seat)}
          onCompleteAndNext={() => completeStepAndGo(3, 4)}
        />
      )}

      {currentStep === 4 && (
        <Step4PicnicZone
          completed={completedSteps.includes(4)}
          assignedSeat={assignedSeat}
          onCompleteAndNext={() => completeStepAndGo(4, 5)}
        />
      )}

      {currentStep === 5 && (
        <Step5MakdagZipEmbed
          completed={completedSteps.includes(5)}
          onCompleteAndNext={() => completeStepAndGo(5, 6)}
        />
      )}

      {currentStep === 6 && (
        <Step6StageAndPassport
          completed={completedSteps.includes(6)}
          onCompleteAndFinish={() => {
            completeStepAndGo(6);
            onFinishToOutro();
          }}
        />
      )}
    </section>
  );
}
