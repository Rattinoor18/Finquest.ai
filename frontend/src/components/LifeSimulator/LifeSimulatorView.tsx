import React, { useState } from 'react';
import { 
  ShieldCheck, 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  Sparkles, 
  ArrowRight, 
  AlertCircle, 
  HeartHandshake,
  CreditCard,
  Building,
  CheckCircle2
} from 'lucide-react';
import { LifeStage } from '../../types';

interface LifeSimulatorProps {
  stages: LifeStage[];
  currentStageIndex: number;
  onAdvanceStage: (stageIndex: number) => void;
  fhs: number;
  xp: number;
}

export const LifeSimulatorView: React.FC<LifeSimulatorProps> = ({
  stages,
  currentStageIndex,
  onAdvanceStage,
  fhs,
  xp
}) => {
  const [selectedDilemmaOption, setSelectedDilemmaOption] = useState<number | null>(null);
  const [dilemmaSubmitted, setDilemmaSubmitted] = useState<boolean>(false);
  const [currentMonth, setCurrentMonth] = useState<number>(1);
  const [sipInvestment, setSipInvestment] = useState<number>(5000);

  const activeStage = stages[currentStageIndex] || stages[0];
  const mandatoryTotal = Object.values(activeStage.mandatoryExpenses).reduce((a, b) => (a || 0) + (b || 0), 0);
  const discretionarySurplus = Math.max(0, activeStage.monthlyIncome - mandatoryTotal - sipInvestment);

  const handleDilemmaSubmit = () => {
    if (selectedDilemmaOption === null) return;
    setDilemmaSubmitted(true);
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => prev + 1);
    setSelectedDilemmaOption(null);
    setDilemmaSubmitted(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="p-6 rounded-3xl bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/5 dark:bg-[#111827] border border-orange-500/30">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-bold">
            <Calendar className="w-3.5 h-3.5" /> Simulated Financial Life Timeline
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Life Stages Simulator (Ages 18 – 35+)
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Experience real-world salaries, rent, EMIs, insurance, and life decisions across career stages without losing real money.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stages.map((stage, idx) => {
          const isActive = idx === currentStageIndex;
          const isPassed = idx < currentStageIndex;
          return (
            <div
              key={stage.id}
              onClick={() => {
                onAdvanceStage(idx);
                setSelectedDilemmaOption(null);
                setDilemmaSubmitted(false);
              }}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                isActive
                  ? 'bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/25'
                  : isPassed
                  ? 'bg-white dark:bg-[#111827] border-emerald-500/40 text-slate-900 dark:text-slate-100'
                  : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500'
              }`}
            >
              <div className="text-[10px] font-bold uppercase tracking-wider opacity-80">
                Stage {stage.id} • {stage.ageRange}
              </div>
              <div className="font-bold text-sm mt-1">{stage.title}</div>
              <div className={`text-xs mt-2 font-mono ${isActive ? 'text-white/90' : 'text-slate-400'}`}>
                ₹{stage.monthlyIncome.toLocaleString('en-IN')}/mo
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase">
                  Monthly Cashflow
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  Month #{currentMonth} Overview
                </h3>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500">
                Income: ₹{activeStage.monthlyIncome.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <span className="font-semibold text-slate-500 dark:text-slate-400 text-[11px]">
                Mandatory Outflows (Needs)
              </span>
              {Object.entries(activeStage.mandatoryExpenses).map(([key, val]) => (
                <div key={key} className="flex justify-between items-center p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                  <span className="capitalize text-slate-700 dark:text-slate-300">{key}</span>
                  <span className="font-mono font-semibold text-slate-900 dark:text-slate-100">
                    -₹{(val || 0).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-500">Monthly Index SIP Allocation:</span>
                <span className="font-mono text-orange-600 dark:text-orange-400">₹{sipInvestment.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="0"
                max={activeStage.monthlyIncome * 0.4}
                step="1000"
                value={sipInvestment}
                onChange={(e) => setSipInvestment(Number(e.target.value))}
                className="w-full accent-orange-500"
              />
            </div>

            <div className="p-3 rounded-2xl bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Remaining Surplus:</span>
              <span className="font-mono font-bold text-sm text-slate-900 dark:text-slate-100">
                ₹{discretionarySurplus.toLocaleString('en-IN')}
              </span>
            </div>

            <button
              onClick={handleNextMonth}
              className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/25 transition-all flex items-center justify-center gap-2"
            >
              <span>Advance to Next Month →</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                ⚡
              </span>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Decision Dilemma</span>
                <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                  {activeStage.dilemma.title}
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {activeStage.dilemma.description}
            </p>

            <div className="space-y-3 pt-2">
              {activeStage.dilemma.options.map((opt, i) => {
                const isSelected = selectedDilemmaOption === i;
                return (
                  <div
                    key={i}
                    onClick={() => !dilemmaSubmitted && setSelectedDilemmaOption(i)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-orange-500 bg-orange-500/10 ring-2 ring-orange-500/20'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full border flex items-center justify-center text-xs font-bold mt-0.5">
                        {i + 1}
                      </span>
                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">{opt.text}</p>
                        {dilemmaSubmitted && (
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1 leading-relaxed border-t border-slate-200 dark:border-slate-700 mt-2">
                            {opt.explanation}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end pt-2">
              {!dilemmaSubmitted ? (
                <button
                  onClick={handleDilemmaSubmit}
                  disabled={selectedDilemmaOption === null}
                  className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-orange-500/25 transition-all"
                >
                  Confirm Financial Decision
                </button>
              ) : (
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-500">
                  <CheckCircle2 className="w-4 h-4" /> Decision Evaluated
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
