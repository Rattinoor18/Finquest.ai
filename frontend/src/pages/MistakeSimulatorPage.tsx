import React, { useState } from 'react';
import { AlertTriangle, TrendingDown, CheckCircle2, XCircle } from 'lucide-react';

export const MistakeSimulatorPage: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<number>(0);

  const scenarios = [
    {
      id: "credit-card",
      title: "The 'Minimum Due' Credit Card Trap",
      premise: "You charge ₹50,000 on a credit card for a new laptop. You decide to pay only the 5% minimum due each month.",
      trapPath: {
        title: "Trap: Minimum Due Revolver (5%)",
        timeline: "Takes 11 Years & 4 Months to clear",
        totalPaid: "₹1,18,400 (Interest: ₹68,400)",
        impact: "Severe CIBIL drop due to 80%+ credit utilization. Paid over 2.3x the laptop cost in pure bank financing fees.",
      },
      wisePath: {
        title: "Wise: Total Balance Clear (30 Days)",
        timeline: "Cleared in 1 Month (Grace Period)",
        totalPaid: "₹50,000 (Interest: ₹0.00)",
        impact: "Zero interest paid, earned reward points, and built an impeccable 780+ CIBIL credit reputation.",
      }
    },
    {
      id: "panic-sell",
      title: "Panic Selling During a Routine Market Dip",
      premise: "You invested ₹2,00,000 in a NIFTY 50 index fund. A geopolitical crisis hits and markets plunge 22% in 3 weeks.",
      trapPath: {
        title: "Trap: Distress Panic Selling",
        timeline: "Liquidated at the market bottom (₹1,56,000)",
        totalPaid: "Permanent capital loss of ₹44,000",
        impact: "You locked in your losses. 12 months later, the market rebounded 38% to all-time highs, leaving you behind.",
      },
      wisePath: {
        title: "Wise: Disciplined Rupee-Cost Averaging",
        timeline: "Continued monthly SIPs through the dip",
        totalPaid: "Accumulated discount units at 22% off",
        impact: "Portfolio surged to ₹2,64,000 on market recovery. Turned panic into long-term compounding alpha.",
      }
    },
    {
      id: "no-emergency",
      title: "Zero Emergency Buffer Medical Crisis",
      premise: "You invested 100% of your savings in high-beta stocks with ₹0 cash reserves. A family medical crisis demands ₹1,50,000.",
      trapPath: {
        title: "Trap: High-Interest Distress Loans",
        timeline: "Forced into instant personal loan at 24% APR",
        totalPaid: "Monthly EMI of ₹7,500 eating 25% of salary",
        impact: "Trapped in monthly debt payments for 3 years, halting all future investments.",
      },
      wisePath: {
        title: "Wise: 6-Month Liquid Sweep-in Buffer",
        timeline: "Instantly paid via hospital debit card in 5 minutes",
        totalPaid: "Zero debt, zero equity liquidation",
        impact: "Stock investments remained untouched and continued compounding uninterrupted.",
      }
    }
  ];

  const current = scenarios[selectedScenario];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="p-8 rounded-3xl glass-panel border border-[var(--border-glass-strong)] space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-xs font-bold">
          <AlertTriangle className="w-3.5 h-3.5" /> Engineered Consequence Engine
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
          Financial Mistake Simulator
        </h1>
        <p className="text-sm text-[var(--text-secondary)] max-w-3xl">
          Experience the brutal compounding math of financial errors before they happen in your real life. Compare the Trap Path vs the Wise Path side-by-side.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {scenarios.map((sc, i) => (
          <button
            key={sc.id}
            onClick={() => setSelectedScenario(i)}
            className={`p-4 rounded-2xl border text-xs font-bold text-left transition-all ${
              selectedScenario === i
                ? 'bg-[var(--accent)] text-white border-[var(--accent)] shadow-md'
                : 'glass-card border-[var(--border-glass)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <div className="text-[10px] opacity-80 font-mono">Scenario 0{i + 1}</div>
            <div className="truncate">{sc.title}</div>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border-glass)] text-xs text-[var(--text-primary)] font-medium">
          <strong>Premise:</strong> {current.premise}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-red-500/5 border border-red-500/20 space-y-4">
            <div className="flex items-center gap-2 text-red-500 font-bold text-sm">
              <XCircle className="w-5 h-5" />
              <span>{current.trapPath.title}</span>
            </div>
            <div className="space-y-2 text-xs font-mono">
              <div className="p-3 rounded-xl bg-red-500/10 text-red-600 dark:text-red-300">
                <span className="text-[10px] uppercase block opacity-80">Duration</span>
                <span className="font-bold text-sm">{current.trapPath.timeline}</span>
              </div>
              <div className="p-3 rounded-xl bg-red-500/10 text-red-600 dark:text-red-300">
                <span className="text-[10px] uppercase block opacity-80">Total Cost</span>
                <span className="font-bold text-sm">{current.trapPath.totalPaid}</span>
              </div>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {current.trapPath.impact}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-emerald-500/5 border border-emerald-500/20 space-y-4">
            <div className="flex items-center gap-2 text-emerald-500 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5" />
              <span>{current.wisePath.title}</span>
            </div>
            <div className="space-y-2 text-xs font-mono">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
                <span className="text-[10px] uppercase block opacity-80">Duration</span>
                <span className="font-bold text-sm">{current.wisePath.timeline}</span>
              </div>
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
                <span className="text-[10px] uppercase block opacity-80">Total Cost</span>
                <span className="font-bold text-sm">{current.wisePath.totalPaid}</span>
              </div>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {current.wisePath.impact}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
