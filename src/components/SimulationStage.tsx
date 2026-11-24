import { useState } from 'react';
import type { HeroTeam } from '../data/festivalData';
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

export function SimulationStage({ onFinishToOutro }: SimulationStageProps) {
  const [selectedTeam, setSelectedTeam] = useState<HeroTeam>('makguksu');
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [assignedSeat, setAssignedSeat] = useState<string | null>(null);

  const completeStepAndGo = (stepNum: number, nextStep?: number) => {
    setCompletedSteps((prev) => (prev.includes(stepNum) ? prev : [...prev, stepNum]));
    if (nextStep) {
      setCurrentStep(nextStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8 space-y-6">
      {/* Top In-Venue Walking Character Promenade Track */}
      <GameProgressWalker
        currentStep={currentStep}
        completedSteps={completedSteps}
        selectedTeam={selectedTeam}
        onSelectStep={(step) => {
          setCurrentStep(step);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onToggleTeam={() =>
          setSelectedTeam((prev) => (prev === 'dakgalbi' ? 'makguksu' : 'dakgalbi'))
        }
      />

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
