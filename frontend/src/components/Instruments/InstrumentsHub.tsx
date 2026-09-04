import React, { useState } from 'react';
import { Calculator, Percent } from 'lucide-react';

export const InstrumentsHub: React.FC = () => {
  const [sipMonthly, setSipMonthly] = useState<number>(5000);
  const [sipRate, setSipRate] = useState<number>(12);
  const [sipYears, setSipYears] = useState<number>(15);

  const i = sipRate / (12 * 100);
  const n = sipYears * 12;
  const investedTotal = sipMonthly * n;
  const futureValue = Math.round(sipMonthly * ((Math.pow(1 + i, n) - 1) / i) * (1 + i));
  const wealthGained = futureValue - investedTotal;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="p-6 rounded-3xl bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/5 dark:bg-[#111827] border border-orange-500/30">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-bold">
            <Calculator className="w-3.5 h-3.5" /> India-First Financial Calculators
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Mutual Fund SIP & Compounding Engine
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            See how small monthly disciplined investments into India\'s top companies multiply exponentially through compound growth.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-6 p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Percent className="w-4 h-4 text-orange-500" /> SIP Growth Parameters
          </h3>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-500">Monthly Investment:</span>
              <span className="font-mono font-bold text-orange-600 dark:text-orange-400">₹{sipMonthly.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="500"
              max="50000"
              step="500"
              value={sipMonthly}
              onChange={(e) => setSipMonthly(Number(e.target.value))}
              className="w-full accent-orange-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-500">Expected Annual Return (CAGR):</span>
              <span className="font-mono font-bold text-orange-600 dark:text-orange-400">{sipRate}%</span>
            </div>
            <input
              type="range"
              min="6"
              max="20"
              step="0.5"
              value={sipRate}
              onChange={(e) => setSipRate(Number(e.target.value))}
              className="w-full accent-orange-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-500">Investment Horizon:</span>
              <span className="font-mono font-bold text-orange-600 dark:text-orange-400">{sipYears} Years</span>
            </div>
            <input
              type="range"
              min="1"
              max="35"
              step="1"
              value={sipYears}
              onChange={(e) => setSipYears(Number(e.target.value))}
              className="w-full accent-orange-500"
            />
          </div>
        </div>

        <div className="md:col-span-6 p-6 rounded-3xl bg-gradient-to-br from-orange-500/10 to-amber-500/10 dark:bg-[#111827] border border-orange-500/30 shadow-sm space-y-4 flex flex-col justify-center">
          <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase">
            Estimated Wealth at Maturity
          </span>
          <div className="text-3xl sm:text-4xl font-black font-mono text-slate-900 dark:text-slate-100">
            ₹{futureValue.toLocaleString('en-IN')}
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
            <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800">
              <span className="text-slate-500 block text-[10px]">Total Invested</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                ₹{investedTotal.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <span className="text-emerald-500/80 block text-[10px]">Estimated Wealth Gain</span>
              <span className="font-mono font-bold">
                +₹{wealthGained.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
