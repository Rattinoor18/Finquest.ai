import React from 'react';
import { 
  TrendingUp, 
  ShieldCheck, 
  BookOpen, 
  AlertTriangle, 
  ShieldAlert, 
  Calculator, 
  Trophy, 
  Sun, 
  Moon, 
  Sparkles, 
  Flame, 
  Award,
  Bot
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  xp: number;
  streak: number;
  fhs: number;
  openCoach: () => void;
  virtualCash: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isDark,
  setIsDark,
  xp,
  streak,
  fhs,
  openCoach,
  virtualCash
}) => {
  const tabs = [
    { id: 'trading', label: 'Paper Trading', icon: TrendingUp, badge: '₹10L Virtual' },
    { id: 'gates', label: 'Knowledge Gates', icon: BookOpen, badge: '5 Gates' },
    { id: 'simulator', label: 'Life Stages', icon: ShieldCheck, badge: 'Ages 18-35' },
    { id: 'mistakes', label: 'Mistake Simulator', icon: AlertTriangle, badge: 'Traps' },
    { id: 'scams', label: 'Scam Buster', icon: ShieldAlert, badge: 'Fraud Lab' },
    { id: 'instruments', label: 'Instruments Hub', icon: Calculator, badge: 'SIP & FD' },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy, badge: 'Literacy Rank' },
  ];

  const getFhsColor = (score: number) => {
    if (score >= 800) return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30';
    if (score >= 650) return 'text-orange-500 bg-orange-500/10 border-orange-500/30';
    return 'text-red-500 bg-red-500/10 border-red-500/30';
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0B0F19]/95 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('trading')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg shadow-orange-500/20 text-white font-black text-xl tracking-tighter">
              FQ
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent">
                  FinQuest
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
                  Team Aurelius
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium -mt-0.5">
                Learn Money by Managing Money
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60">
              <span className="text-xs text-slate-500 dark:text-slate-400">Virtual Cash:</span>
              <span className="text-sm font-mono font-bold text-slate-900 dark:text-slate-100">
                ₹{virtualCash.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-bold text-xs">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
              <span>{streak}d Streak</span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-bold text-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>{xp} XP</span>
            </div>

            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border font-bold text-xs ${getFhsColor(fhs)}`}>
              <Award className="w-3.5 h-3.5" />
              <span>FHS: {fhs}/1000</span>
            </div>

            <button
              onClick={openCoach}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-semibold shadow-md shadow-orange-500/25 transition-all transform active:scale-95"
            >
              <Bot className="w-4 h-4" />
              <span className="hidden sm:inline">Coach Aurelius</span>
            </button>

            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>
          </div>
        </div>

        <nav className="flex space-x-1 overflow-x-auto py-2 scrollbar-none border-t border-slate-100 dark:border-slate-800/80">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/30'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
