/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DiagnosisSection } from './components/DiagnosisSection';
import { QuestSection } from './components/QuestSection';
import { RoadmapSection } from './components/RoadmapSection';
import { FeedbackSection } from './components/FeedbackSection';
import { Footer } from './components/Footer';
import { DetailModal } from './components/DetailModal';
import type { ProblemItem } from './data/projectData';

export default function App() {
  const [modalMode, setModalMode] = useState<'brief' | 'problem' | null>(null);
  const [selectedProblem, setSelectedProblem] = useState<ProblemItem | null>(null);

  const handleOpenBrief = () => {
    setSelectedProblem(null);
    setModalMode('brief');
  };

  const handleOpenProblem = (problem: ProblemItem) => {
    setSelectedProblem(problem);
    setModalMode('problem');
  };

  const handleCloseModal = () => {
    setModalMode(null);
  };

  const handleScrollToFeedback = () => {
    const el = document.getElementById('participate');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      const input = document.getElementById('idea-author');
      if (input) {
        setTimeout(() => input.focus(), 350);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 text-zinc-950">
      <Navbar onOpenFeedback={handleScrollToFeedback} />

      <main className="flex-1">
        <HeroSection onOpenBriefModal={handleOpenBrief} />
        <DiagnosisSection onSelectProblem={handleOpenProblem} />
        <QuestSection />
        <RoadmapSection />
        <FeedbackSection />
      </main>

      <Footer />

      <DetailModal
        mode={modalMode}
        problem={selectedProblem}
        onClose={handleCloseModal}
      />
    </div>
  );
}
