import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, DollarSign, Heart, AlertTriangle, Briefcase, Award } from 'lucide-react';

export const LifeSimulatorPage: React.FC = () => {
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const [selectedDilemma, setSelectedDilemma] = useState<number | null>(null);

  const stages = [
    {
      id: "student",
      title: "Stage 1: College Student (Age 19)",
      salary: 12000,
      expenses: { rent: 4000, food: 3500, lifestyle: 2500 },
      dilemma: {
        question: "A popular peer-to-peer crypto app promises 15% guaranteed monthly returns. You have ₹8,000 saved.",
        optA: "Deposit all ₹8,000 to maximize easy passive income.",
        optB: "Keep ₹5,000 in an emergency sweep-in account and invest ₹3,000 in a NIFTY 50 index fund.",
        outcomeA: "❌ The P2P platform was an unregulated Ponzi scheme that halted withdrawals. Your ₹8,000 is permanently lost.",
        outcomeB: "✅ Your emergency cushion stayed safe, and your index investment established early compounding habits."
      }
    },
    {
      id: "first-job",
      title: "Stage 2: First Job (Age 23)",
      salary: 45000,
      expenses: { rent: 15000, food: 9000, lifestyle: 8000 },
      dilemma: {
        question: "Your bank offers you a pre-approved Gold Credit Card with a ₹1.5 Lakh limit. A flagship smartphone is on sale for ₹85,000.",
        optA: "Swipe the credit card and pay the 5% 'Minimum Due' every month so your wallet doesn't feel the hit.",
        optB: "Wait 48 hours, resist impulse buying, and buy a reliable ₹20,000 phone with cash savings.",
        outcomeA: "❌ Paying minimum due triggered 42% APR. In 2 years, you paid ₹45,000 just in interest and damaged your CIBIL score.",
        outcomeB: "✅ You avoided the credit trap, kept monthly cashflow positive, and automated a ₹10,000 monthly SIP."
      }
    },
    {
      id: "family",
      title: "Stage 3: Family & Dependents (Age 30)",
      salary: 95000,
      expenses: { rent: 30000, food: 18000, emi: 15000, lifestyle: 12000 },
      dilemma: {
        question: "An insurance agent recommends a 'Money Back Endowment Policy' for ₹60,000/year promising insurance + returns.",
        optA: "Buy the endowment plan because you get money back while you are alive.",
        optB: "Buy a Pure Term Insurance policy (₹1 Cr cover for ₹12,000/yr) and invest the remaining ₹48,000 in mutual funds.",
        outcomeA: "❌ The endowment plan yielded barely 4.5% returns, losing to inflation and providing only a pathetic ₹6 Lakh life cover.",
        outcomeB: "✅ Your family got a solid ₹1 Crore security shield, and the mutual fund corpus grew to ₹18 Lakhs over 8 years."
      }
    },
    {
      id: "wealth",
      title: "Stage 4: Wealth Acceleration (Age 38)",
      salary: 180000,
      expenses: { rent: 45000, food: 25000, emi: 30000, lifestyle: 20000 },
      dilemma: {
        question: "The stock market experiences a sudden 25% geopolitical crash. Your portfolio is down by ₹6 Lakhs.",
        optA: "Panic, sell all equity investments to cash, and wait for markets to become safe again.",
        optB: "Rebalance, stay calm, and continue automated monthly SIPs to accumulate units at a discount.",
        outcomeA: "❌ You permanently locked in the loss. The market rebounded 40% in the following 18 months, leaving you behind.",
        outcomeB: "✅ Your discipline paid off. The discounted units accumulated during the dip propelled your net worth to new highs."
      }
    }
  ];

  const currentStage = stages[activeStageIdx];
  const totalExp = Object.values(currentStage.expenses).reduce((a, b) => a + b, 0);
  const netSavings = currentStage.salary - totalExp;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="p-8 rounded-3xl glass-panel border border-[var(--border-glass-strong)] space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-light)] text-[var(--accent)] text-xs font-bold">
          <ShieldCheck className="w-3.5 h-3.5" /> Interactive Cashflow Simulator
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
          Life Stages Financial Simulator
        </h1>
        <p className="text-sm text-[var(--text-secondary)] max-w-3xl">
          Travel through 4 critical milestones of an Indian earning journey (Ages 19 to 38+). Make real-world choices, balance cashflows, and discover how early decisions shape lifetime wealth.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {stages.map((st, i) => (
          <button
            key={st.id}
            onClick={() => { setActiveStageIdx(i); setSelectedDilemma(null); }}
            className={`p-3.5 rounded-2xl border text-xs font-bold transition-all text-left ${
              activeStageIdx === i
                ? 'bg-[var(--accent)] text-white border-[var(--accent)] shadow-md'
                : 'glass-card border-[var(--border-glass)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <div className="text-[10px] opacity-80 font-mono">Stage 0{i + 1}</div>
            <div className="truncate">{st.title.split(':')[1]}</div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl glass-card border border-[var(--border-glass)] space-y-2 font-mono">
          <span className="text-[10px] text-[var(--text-muted)] uppercase block">Monthly Take-Home</span>
          <div className="text-2xl font-black text-[var(--accent)]">
            ₹{currentStage.salary.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-[var(--text-muted)]">Inflow Rate</span>
        </div>

        <div className="p-6 rounded-3xl glass-card border border-[var(--border-glass)] space-y-2 font-mono">
          <span className="text-[10px] text-[var(--text-muted)] uppercase block">Mandatory Outflows</span>
          <div className="text-2xl font-black text-amber-500">
            ₹{totalExp.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-[var(--text-muted)]">Fixed Burn Rate</span>
        </div>

        <div className="p-6 rounded-3xl glass-card border border-[var(--border-glass)] space-y-2 font-mono">
          <span className="text-[10px] text-[var(--text-muted)] uppercase block">Net Free Cashflow</span>
          <div className="text-2xl font-black text-emerald-500">
            +₹{netSavings.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-[var(--text-muted)]">Available for SIP & Reserves</span>
        </div>
      </div>

      <div className="p-8 rounded-3xl glass-panel border border-[var(--border-glass-strong)] space-y-6">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-[var(--accent)]" />
          <h3 className="text-lg font-bold text-[var(--text-primary)]">
            Milestone Decision Dilemma
          </h3>
        </div>

        <p className="text-sm sm:text-base font-medium text-[var(--text-primary)] leading-relaxed">
          {currentStage.dilemma.question}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <button
            onClick={() => setSelectedDilemma(1)}
            className={`p-5 rounded-2xl border text-left transition-all ${
              selectedDilemma === 1
                ? 'bg-red-500/15 border-red-500 text-red-700 dark:text-red-300 font-semibold'
                : 'glass-card border-[var(--border-glass)] text-[var(--text-secondary)] hover:border-[var(--accent)]'
            }`}
          >
            <div className="font-bold text-xs uppercase mb-1">Option A:</div>
            <div>{currentStage.dilemma.optA}</div>
          </button>

          <button
            onClick={() => setSelectedDilemma(2)}
            className={`p-5 rounded-2xl border text-left transition-all ${
              selectedDilemma === 2
                ? 'bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-semibold'
                : 'glass-card border-[var(--border-glass)] text-[var(--text-secondary)] hover:border-[var(--accent)]'
            }`}
          >
            <div className="font-bold text-xs uppercase mb-1">Option B:</div>
            <div>{currentStage.dilemma.optB}</div>
          </button>
        </div>

        {selectedDilemma !== null && (
          <div className={`p-5 rounded-2xl text-xs sm:text-sm leading-relaxed animate-in fade-in duration-200 border ${
            selectedDilemma === 2 
              ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-800 dark:text-emerald-200'
              : 'bg-red-500/15 border-red-500/30 text-red-800 dark:text-red-200'
          }`}>
            <div className="font-bold mb-1">
              {selectedDilemma === 2 ? "Wisdom Proven:" : "Consequence Reality:"}
            </div>
            {selectedDilemma === 1 ? currentStage.dilemma.outcomeA : currentStage.dilemma.outcomeB}
          </div>
        )}
      </div>
    </div>
  );
};
