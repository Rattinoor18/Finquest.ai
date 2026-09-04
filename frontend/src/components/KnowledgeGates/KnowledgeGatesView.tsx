import React, { useState } from 'react';
import { 
  BookOpen, 
  Lock, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Award, 
  HelpCircle, 
  X
} from 'lucide-react';
import { KnowledgeGate } from '../../types';

interface KnowledgeGatesProps {
  gates: KnowledgeGate[];
  onCompleteGate: (gateId: string, passed: boolean) => void;
  xp: number;
  fhs: number;
}

export const KnowledgeGatesView: React.FC<KnowledgeGatesProps> = ({
  gates,
  onCompleteGate,
  xp,
  fhs
}) => {
  const [activeGateModal, setActiveGateModal] = useState<KnowledgeGate | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [isPassed, setIsPassed] = useState<boolean>(false);

  const openQuiz = (gate: KnowledgeGate) => {
    setActiveGateModal(gate);
    setSelectedOption(null);
    setQuizSubmitted(false);
    setIsPassed(false);
  };

  const handleQuizSubmit = () => {
    if (selectedOption === null || !activeGateModal) return;
    const passed = selectedOption === activeGateModal.quiz.correctIndex;
    setIsPassed(passed);
    setQuizSubmitted(true);
    if (passed) {
      onCompleteGate(activeGateModal.id, true);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="p-6 rounded-3xl bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/5 dark:bg-[#111827] border border-orange-500/30">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" /> Innovation: Knowledge-Gated Unlocking
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Financial Literacy Skill Tree
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            In FinQuest, you cannot jump straight into risky stock trading before mastering core money principles. 
            Pass each gate\'s challenge to unlock high-return financial instruments and level up your Financial Health Score!
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {gates.map((gate, index) => {
          const isUnlocked = gate.isUnlocked;
          const isCompleted = gate.isCompleted;

          return (
            <div
              key={gate.id}
              className={`p-6 rounded-2xl border transition-all ${
                isCompleted
                  ? 'bg-white dark:bg-[#111827] border-emerald-500/40 shadow-sm'
                  : isUnlocked
                  ? 'bg-white dark:bg-[#111827] border-orange-500/50 shadow-md ring-2 ring-orange-500/10'
                  : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 opacity-75'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg shadow-md ${
                    isCompleted
                      ? 'bg-emerald-500 text-white shadow-emerald-500/25'
                      : isUnlocked
                      ? 'bg-orange-500 text-white shadow-orange-500/25 animate-pulse'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                  }`}>
                    {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : isUnlocked ? `G${gate.level}` : <Lock className="w-5 h-5" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs uppercase font-bold text-orange-600 dark:text-orange-400">
                        Gate {gate.level} • {gate.category}
                      </span>
                      {isCompleted && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          Cleared ✓
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                      {gate.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
                      {gate.summary}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                      <span className="text-slate-400">Unlocks:</span>
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-[11px] text-orange-600 dark:text-orange-400">
                        {gate.unlocksInstrument}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  {isCompleted ? (
                    <button
                      onClick={() => openQuiz(gate)}
                      className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all"
                    >
                      Review Module
                    </button>
                  ) : isUnlocked ? (
                    <button
                      onClick={() => openQuiz(gate)}
                      className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold shadow-lg shadow-orange-500/25 flex items-center gap-2 transition-all transform active:scale-95"
                    >
                      <span>Take Gate Challenge</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/50">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Complete Gate {gate.level - 1} first</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {activeGateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-xl p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-orange-500 text-white flex items-center justify-center font-bold text-xs">
                  G{activeGateModal.level}
                </span>
                <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                  {activeGateModal.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveGateModal(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-orange-50/50 dark:bg-orange-500/10 border border-orange-500/20 space-y-2">
              <span className="text-[11px] font-bold uppercase text-orange-600 dark:text-orange-400 tracking-wider">
                Key Concepts to Master
              </span>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 list-disc list-inside">
                {activeGateModal.keyTakeaways.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-orange-500" />
                {activeGateModal.quiz.question}
              </h4>

              <div className="space-y-2">
                {activeGateModal.quiz.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === activeGateModal.quiz.correctIndex;

                  let borderClass = 'border-slate-200 dark:border-slate-700 hover:border-orange-500/50';
                  let bgClass = 'bg-slate-50/50 dark:bg-slate-800/40';

                  if (quizSubmitted) {
                    if (isCorrect) {
                      borderClass = 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300';
                    } else if (isSelected && !isCorrect) {
                      borderClass = 'border-red-500 bg-red-500/10 text-red-700 dark:text-red-300';
                    }
                  } else if (isSelected) {
                    borderClass = 'border-orange-500 bg-orange-500/10 ring-2 ring-orange-500/20';
                  }

                  return (
                    <div
                      key={idx}
                      onClick={() => !quizSubmitted && setSelectedOption(idx)}
                      className={`p-3 rounded-xl text-xs font-medium cursor-pointer border transition-all ${borderClass} ${bgClass}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {quizSubmitted && (
              <div className={`p-4 rounded-2xl text-xs space-y-1 ${
                isPassed ? 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-200 border border-emerald-500/30' : 'bg-red-500/10 text-red-800 dark:text-red-200 border border-red-500/30'
              }`}>
                <div className="font-bold text-sm">
                  {isPassed ? '🎉 Gate Cleared! +150 XP & +30 FHS Awarded' : '❌ Incorrect choice. Read explanation below and try again.'}
                </div>
                <p className="text-[11px] leading-relaxed opacity-90">
                  {activeGateModal.quiz.explanation}
                </p>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              {!quizSubmitted ? (
                <button
                  onClick={handleQuizSubmit}
                  disabled={selectedOption === null}
                  className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white text-xs font-bold shadow-md shadow-orange-500/25 transition-all"
                >
                  Verify Answer & Unlock Gate
                </button>
              ) : (
                <button
                  onClick={() => setActiveGateModal(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold transition-all"
                >
                  Continue Journey
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
