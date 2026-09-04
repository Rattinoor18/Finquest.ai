import React, { useState } from 'react';
import { 
  AlertTriangle, 
  TrendingDown, 
  ArrowRight, 
  ShieldAlert, 
  CheckCircle2, 
  Flame, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { MistakeScenario } from '../../types';

interface MistakeSimulatorProps {
  scenarios: MistakeScenario[];
  fhs: number;
}

export const MistakeSimulatorView: React.FC<MistakeSimulatorProps> = ({ scenarios, fhs }) => {
  const [activeScenarioId, setActiveScenarioId] = useState<string>(scenarios[0]?.id || 'mistake-1');
  const [selectedChoiceIdx, setSelectedChoiceIdx] = useState<number | null>(null);

  const activeScenario = scenarios.find(s => s.id === activeScenarioId) || scenarios[0];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="p-6 rounded-3xl bg-gradient-to-r from-red-500/10 via-orange-500/10 to-amber-500/5 dark:bg-[#111827] border border-red-500/30">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-600 dark:text-red-400 text-xs font-bold">
            <AlertTriangle className="w-3.5 h-3.5" /> Engineered Mistake Simulator
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Experience Expensive Financial Traps
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Real financial education happens by witnessing the consequences of bad financial decisions before you risk real money. 
            Select a scenario below to play out both the Trap and Wise paths.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {scenarios.map((sc) => {
          const isActive = sc.id === activeScenarioId;
          return (
            <button
              key={sc.id}
              onClick={() => {
                setActiveScenarioId(sc.id);
                setSelectedChoiceIdx(null);
              }}
              className={`p-4 rounded-2xl border text-left transition-all ${
                isActive
                  ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/25'
                  : 'bg-white dark:bg-[#111827] border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
              }`}
            >
              <span className={`text-[10px] font-bold uppercase tracking-wider block ${isActive ? 'text-white/80' : 'text-orange-500'}`}>
                {sc.badge}
              </span>
              <span className="font-bold text-sm block mt-1">{sc.title}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase">
              The Scenario
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {activeScenario.hook}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {activeScenario.description}
            </p>

            <div className="space-y-3 pt-2">
              <span className="text-xs font-semibold text-slate-500">Pick a path to simulate:</span>
              {activeScenario.options.map((opt, i) => {
                const isSelected = selectedChoiceIdx === i;
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedChoiceIdx(i)}
                    className={`w-full p-4 rounded-2xl border text-left text-xs font-semibold transition-all ${
                      isSelected
                        ? opt.isMistake 
                          ? 'border-red-500 bg-red-500/10 text-red-700 dark:text-red-300 ring-2 ring-red-500/20' 
                          : 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{opt.isMistake ? '⚠️' : '🛡️'}</span>
                      <span>{opt.choice}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <span className="text-xs font-bold text-slate-400 uppercase">
              Multi-Month Consequence Timeline
            </span>

            {selectedChoiceIdx === null ? (
              <div className="py-16 text-center text-slate-400 text-xs space-y-2">
                <AlertTriangle className="w-8 h-8 mx-auto text-amber-500 opacity-50" />
                <p>Select either the Trap Path or Wise Path on the left to play out the timeline consequences.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  {activeScenario.options[selectedChoiceIdx].consequenceMonths.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-start justify-between gap-4 text-xs"
                    >
                      <div>
                        <span className="font-bold text-slate-900 dark:text-slate-100 block">{m.month}</span>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{m.note}</p>
                      </div>
                      <div className="text-right whitespace-nowrap">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Stress Level</span>
                        <span className={`font-bold font-mono text-xs ${
                          m.stressLevel === 'Zero' || m.stressLevel === 'Peace' ? 'text-emerald-500' : 'text-red-500'
                        }`}>
                          {m.stressLevel}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-500/15 to-amber-500/10 border border-orange-500/30 text-xs space-y-1">
                  <span className="font-bold text-orange-600 dark:text-orange-400 uppercase text-[10px] tracking-wider">
                    Core Aurelius Lesson
                  </span>
                  <p className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                    {activeScenario.options[selectedChoiceIdx].takeawayLesson}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
