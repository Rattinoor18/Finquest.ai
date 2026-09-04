import React from 'react';
import { Trophy, Award, ShieldCheck, TrendingUp, Star } from 'lucide-react';
import { useCourseProgress } from '../hooks/useCourseProgress';

export const LeaderboardPage: React.FC = () => {
  const { state, progressPct } = useCourseProgress();

  const leaders = [
    { rank: 1, name: "Prathamjot Singh", score: 940, badge: "Grandmaster Investor", streak: "14 Days" },
    { rank: 2, name: "Nikita Khatter", score: 915, badge: "Master Strategist", streak: "12 Days" },
    { rank: 3, name: "Pragya Mehta", score: 890, badge: "Risk Analyst", streak: "9 Days" },
    { rank: 4, name: "Ratti Noor Singh", score: 865, badge: "Debt Eliminator", streak: "8 Days" },
    { rank: 5, name: "Ananya Iyer", score: 830, badge: "Budget Architect", streak: "7 Days" },
    { rank: 6, name: "Rohan Verma", score: 795, badge: "Compounding Cadet", streak: "5 Days" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="p-8 rounded-3xl glass-panel border border-[var(--border-glass-strong)] space-y-3 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-light)] text-[var(--accent)] text-xs font-bold">
          <Trophy className="w-3.5 h-3.5" /> Literacy Leaderboard
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
          Financial Health Score (FHS) Rankings
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-xl mx-auto">
          Unlike standard trading apps that reward lucky gambling bets, FinQuest ranks disciplined risk management, diversification, and course completion.
        </p>
      </div>

      <div className="p-6 rounded-3xl glass-card border border-[var(--border-glass-strong)] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[var(--accent)] text-white flex items-center justify-center font-bold text-lg shadow-md">
            #1
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--text-primary)]">{state.learnerName || "You"}</div>
            <span className="text-[10px] text-[var(--accent)] font-semibold">Course Progress: {progressPct}%</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <span className="text-[10px] text-[var(--text-muted)] block">FHS Rating</span>
            <span className="text-base font-bold text-emerald-500">940 / 1000</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-[var(--text-muted)] block">Honors Seal</span>
            <span className="text-base font-bold text-[var(--accent)]">Grandmaster</span>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-3xl glass-panel border border-[var(--border-glass)] overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-[var(--border-glass)] text-[var(--text-muted)] text-[10px] uppercase">
              <th className="pb-3">Rank</th>
              <th className="pb-3">Learner</th>
              <th className="pb-3">Badge Title</th>
              <th className="pb-3">Streak</th>
              <th className="pb-3 text-right">FHS Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-glass)]">
            {leaders.map(l => (
              <tr key={l.rank} className="hover:bg-[var(--surface-glass-hover)] transition-colors">
                <td className="py-3.5 font-bold text-[var(--accent)]">#{l.rank}</td>
                <td className="py-3.5 font-bold text-[var(--text-primary)]">{l.name}</td>
                <td className="py-3.5 text-[var(--text-secondary)]">{l.badge}</td>
                <td className="py-3.5 text-amber-500 font-semibold">{l.streak}</td>
                <td className="py-3.5 text-right font-bold text-emerald-500">{l.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
