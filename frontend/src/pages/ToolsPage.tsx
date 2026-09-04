import React, { useState } from 'react';
import { Calculator, TrendingUp, CreditCard, Shield, ArrowRight, Sparkles } from 'lucide-react';

export const ToolsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sip' | 'fd' | 'credit' | 'emergency'>('sip');

  // SIP Calculator State
  const [sipMonthly, setSipMonthly] = useState<number>(5000);
  const [sipRate, setSipRate] = useState<number>(12);
  const [sipYears, setSipYears] = useState<number>(15);

  // FD vs Inflation State
  const [fdAmount, setFdAmount] = useState<number>(100000);
  const [fdRate, setFdRate] = useState<number>(7.0);
  const [fdTaxSlab, setFdTaxSlab] = useState<number>(30);
  const [inflationRate, setInflationRate] = useState<number>(6.0);
  const [fdYears, setFdYears] = useState<number>(5);

  // Credit Card Spiral State
  const [ccDebt, setCcDebt] = useState<number>(50000);
  const [ccApr, setCcApr] = useState<number>(42);

  // Emergency Fund Sizer State
  const [rentExp, setRentExp] = useState<number>(15000);
  const [groceryExp, setGroceryExp] = useState<number>(8000);
  const [emiExp, setEmiExp] = useState<number>(5000);
  const [utilityExp, setUtilityExp] = useState<number>(4000);

  // Calculate SIP Returns
  const monthlyRate = sipRate / 12 / 100;
  const months = sipYears * 12;
  const totalInvested = sipMonthly * months;
  const totalSipValue = sipMonthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
  const sipGains = totalSipValue - totalInvested;

  // Calculate FD Post-Tax & Inflation
  const postTaxFdRate = fdRate * (1 - fdTaxSlab / 100);
  const realReturnRate = postTaxFdRate - inflationRate;
  const nominalFdMaturity = fdAmount * Math.pow(1 + postTaxFdRate / 100, fdYears);
  const realPurchasingPower = fdAmount * Math.pow(1 + realReturnRate / 100, fdYears);

  // Calculate Emergency Fund
  const monthlyBurn = rentExp + groceryExp + emiExp + utilityExp;
  const emergency3M = monthlyBurn * 3;
  const emergency6M = monthlyBurn * 6;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="p-8 rounded-3xl glass-panel border border-[var(--border-glass-strong)] space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-light)] text-[var(--accent)] text-xs font-bold">
          <Calculator className="w-3.5 h-3.5" /> Interactive Financial Calculators
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
          FinQuest Financial Tools Suite
        </h1>
        <p className="text-sm text-[var(--text-secondary)] max-w-3xl leading-relaxed">
          Crunch the real mathematical equations governing your money. Experience how compounding works, see through the illusion of FD returns after taxes, and size your emergency shield.
        </p>
      </div>

      {/* Tabs Switcher */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl glass-panel border border-[var(--border-glass)]">
        {[
          { id: 'sip', label: 'SIP Wealth Compounder', icon: TrendingUp },
          { id: 'fd', label: 'FD Real Return vs Inflation', icon: Shield },
          { id: 'credit', label: 'Credit Card 42% APR Spiral', icon: CreditCard },
          { id: 'emergency', label: '6-Month Emergency Sizer', icon: Calculator },
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-[var(--accent)] text-white shadow-md'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-glass-hover)]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: SIP CALCULATOR */}
      {activeTab === 'sip' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 p-6 rounded-3xl glass-panel border border-[var(--border-glass)] space-y-6">
            <h3 className="text-lg font-bold text-[var(--text-primary)]">SIP Parameters</h3>
            
            <div className="space-y-4 text-xs font-mono">
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[var(--text-secondary)]">Monthly Investment:</span>
                  <span className="font-bold text-[var(--text-primary)]">₹{sipMonthly.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="100000"
                  step="500"
                  value={sipMonthly}
                  onChange={(e) => setSipMonthly(Number(e.target.value))}
                  className="w-full accent-[var(--accent)]"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[var(--text-secondary)]">Expected Annual Return (CAGR):</span>
                  <span className="font-bold text-[var(--accent)]">{sipRate}%</span>
                </div>
                <input
                  type="range"
                  min="6"
                  max="20"
                  step="0.5"
                  value={sipRate}
                  onChange={(e) => setSipRate(Number(e.target.value))}
                  className="w-full accent-[var(--accent)]"
                />
                <span className="text-[10px] text-[var(--text-muted)]">Historical NIFTY 50 CAGR is ~12-14%</span>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[var(--text-secondary)]">Time Horizon:</span>
                  <span className="font-bold text-[var(--text-primary)]">{sipYears} Years</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="35"
                  step="1"
                  value={sipYears}
                  onChange={(e) => setSipYears(Number(e.target.value))}
                  className="w-full accent-[var(--accent)]"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 p-8 rounded-3xl glass-card border border-[var(--border-glass-strong)] space-y-6 font-mono text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">Projected Corpus</span>
            <div className="text-4xl sm:text-5xl font-black text-[var(--accent)]">
              ₹{Math.round(totalSipValue).toLocaleString('en-IN')}
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[var(--border-glass)] text-left text-xs">
              <div className="p-3 rounded-2xl bg-[var(--surface)] border border-[var(--border-glass)]">
                <span className="text-[10px] text-[var(--text-muted)] block">Total Invested</span>
                <span className="font-bold text-[var(--text-primary)]">₹{totalInvested.toLocaleString('en-IN')}</span>
              </div>
              <div className="p-3 rounded-2xl bg-[var(--surface)] border border-[var(--border-glass)]">
                <span className="text-[10px] text-[var(--text-muted)] block">Estimated Wealth Gain</span>
                <span className="font-bold text-emerald-500">+₹{Math.round(sipGains).toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--accent-light)] border border-[var(--border-glass)] text-xs text-[var(--text-secondary)] text-left leading-relaxed">
              💡 <strong>The Compounding Hockey Stick:</strong> Notice that your wealth gain of <strong>₹{Math.round(sipGains).toLocaleString()}</strong> is greater than your actual deposited capital of ₹{totalInvested.toLocaleString()}!
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: FD vs INFLATION */}
      {activeTab === 'fd' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 p-6 rounded-3xl glass-panel border border-[var(--border-glass)] space-y-5">
            <h3 className="text-lg font-bold text-[var(--text-primary)]">Fixed Deposit Inputs</h3>
            <div className="space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-[var(--text-secondary)]">Deposit Amount (₹):</label>
                <input 
                  type="number" 
                  value={fdAmount} 
                  onChange={(e) => setFdAmount(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border-glass)] font-bold text-[var(--text-primary)]" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-[var(--text-secondary)]">Bank FD Nominal Interest Rate (%):</label>
                <input 
                  type="number" 
                  step="0.1" 
                  value={fdRate} 
                  onChange={(e) => setFdRate(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border-glass)] font-bold text-[var(--text-primary)]" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-[var(--text-secondary)]">Your Income Tax Slab Rate (%):</label>
                <select 
                  value={fdTaxSlab} 
                  onChange={(e) => setFdTaxSlab(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border-glass)] font-bold text-[var(--text-primary)]"
                >
                  <option value={0}>0% (Nil / Low Income)</option>
                  <option value={10}>10% (TDS / Moderate)</option>
                  <option value={20}>20% (Mid Bracket)</option>
                  <option value={30}>30% (High Earner Bracket)</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[var(--text-secondary)]">Expected Inflation Rate (%):</label>
                <input 
                  type="number" 
                  step="0.1" 
                  value={inflationRate} 
                  onChange={(e) => setInflationRate(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border-glass)] font-bold text-[var(--text-primary)]" 
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 p-8 rounded-3xl glass-card border border-[var(--border-glass-strong)] space-y-5 font-mono text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">Real Wealth Outcome</span>
            <div className={`text-4xl font-black ${realReturnRate >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
              {realReturnRate >= 0 ? '+' : ''}{realReturnRate.toFixed(2)}% / yr
            </div>
            <p className="text-xs text-[var(--text-secondary)]">
              {realReturnRate < 0 ? "⚠️ Your FD is losing purchasing power every single year after taxes and inflation!" : "✅ Your FD is beating inflation."}
            </p>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[var(--border-glass)] text-left text-xs">
              <div className="p-3 rounded-2xl bg-[var(--surface)] border border-[var(--border-glass)]">
                <span className="text-[10px] text-[var(--text-muted)] block">Nominal Maturity Value</span>
                <span className="font-bold text-[var(--text-primary)]">₹{Math.round(nominalFdMaturity).toLocaleString()}</span>
              </div>
              <div className="p-3 rounded-2xl bg-[var(--surface)] border border-[var(--border-glass)]">
                <span className="text-[10px] text-[var(--text-muted)] block">Real Purchasing Power</span>
                <span className={`font-bold ${realPurchasingPower < fdAmount ? 'text-red-500' : 'text-emerald-500'}`}>
                  ₹{Math.round(realPurchasingPower).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CREDIT CARD SPIRAL */}
      {activeTab === 'credit' && (
        <div className="p-8 rounded-3xl glass-panel border border-[var(--border-glass-strong)] space-y-6">
          <div className="max-w-2xl space-y-2">
            <h3 className="text-xl font-bold text-red-500">The 42% APR Minimum Due Reality</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              When you owe ₹{ccDebt.toLocaleString()} and pay only the 5% minimum due, your balance continues accruing interest at 3.5% monthly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            <div className="p-6 rounded-3xl bg-red-500/10 border border-red-500/30 space-y-3">
              <span className="text-xs font-bold text-red-500 uppercase block">Path A: Paying Minimum Due (5%)</span>
              <div className="text-2xl font-black text-red-500">Takes ~11 Years</div>
              <p className="text-[11px] text-[var(--text-secondary)]">
                Total Interest Paid: <strong>₹1,18,000+</strong> (More than 2x the original purchase!)
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 space-y-3">
              <span className="text-xs font-bold text-emerald-500 uppercase block">Path B: Paying Full Statement Balance</span>
              <div className="text-2xl font-black text-emerald-500">Cleared in 30 Days</div>
              <p className="text-[11px] text-[var(--text-secondary)]">
                Total Interest Paid: <strong>₹0.00</strong> (100% Free 45-day credit + rewards)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: EMERGENCY FUND SIZER */}
      {activeTab === 'emergency' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 p-6 rounded-3xl glass-panel border border-[var(--border-glass)] space-y-4">
            <h3 className="text-lg font-bold text-[var(--text-primary)]">Monthly Mandatory Survival Expenses</h3>
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-[var(--text-muted)]">Rent / Housing:</label>
                <input type="number" value={rentExp} onChange={(e) => setRentExp(Number(e.target.value))} className="w-full p-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border-glass)] font-bold" />
              </div>
              <div className="space-y-1">
                <label className="text-[var(--text-muted)]">Groceries & Food:</label>
                <input type="number" value={groceryExp} onChange={(e) => setGroceryExp(Number(e.target.value))} className="w-full p-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border-glass)] font-bold" />
              </div>
              <div className="space-y-1">
                <label className="text-[var(--text-muted)]">Loan EMIs:</label>
                <input type="number" value={emiExp} onChange={(e) => setEmiExp(Number(e.target.value))} className="w-full p-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border-glass)] font-bold" />
              </div>
              <div className="space-y-1">
                <label className="text-[var(--text-muted)]">Utilities & Bills:</label>
                <input type="number" value={utilityExp} onChange={(e) => setUtilityExp(Number(e.target.value))} className="w-full p-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border-glass)] font-bold" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 p-8 rounded-3xl glass-card border border-[var(--border-glass-strong)] space-y-5 font-mono text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">Target Emergency Fortress</span>
            <div className="text-4xl sm:text-5xl font-black text-[var(--accent)]">
              ₹{emergency6M.toLocaleString('en-IN')}
            </div>
            <span className="text-xs text-[var(--text-muted)] block">6 Months of Non-Negotiable Living Needs</span>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[var(--border-glass)] text-left text-xs">
              <div className="p-3 rounded-2xl bg-[var(--surface)] border border-[var(--border-glass)]">
                <span className="text-[10px] text-[var(--text-muted)] block">3-Month Baseline</span>
                <span className="font-bold text-[var(--text-primary)]">₹{emergency3M.toLocaleString()}</span>
              </div>
              <div className="p-3 rounded-2xl bg-[var(--surface)] border border-[var(--border-glass)]">
                <span className="text-[10px] text-[var(--text-muted)] block">Monthly Burn Rate</span>
                <span className="font-bold text-[var(--text-primary)]">₹{monthlyBurn.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
