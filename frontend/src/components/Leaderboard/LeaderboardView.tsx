import React from 'react';
import { Trophy, Award, Medal } from 'lucide-react';

interface LeaderboardProps {
  userFhs: number;
  userXp: number;
}

export const LeaderboardView: React.FC<LeaderboardProps> = ({ userFhs, userXp }) => {
  const leaderData = [
    { rank: 1, name: 'Nikita K. (Aurelius)', fhs: 920, xp: 4850, badge: 'Grandmaster' },
    { rank: 2, name: 'Prathamjot Singh (You)', fhs: userFhs, xp: userXp, badge: 'Disciplined Investor' },
    { rank: 3, name: 'Pragya Mehta', fhs: 880, xp: 4120, badge: 'SIP Veteran' },
    { rank: 4, name: 'Ratti Noor Singh', fhs: 850, xp: 3900, badge: 'Debt Slayer' },
    { rank: 5, name: 'Aarav Sharma', fhs: 810, xp: 3450, badge: 'Index Compounder' },
    { rank: 6, name: 'Pooja Iyer', fhs: 760, xp: 2980, badge: 'Budget Builder' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="p-6 rounded-3xl bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/5 dark:bg-[#111827] border border-orange-500/30">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-bold">
            <Trophy className="w-3.5 h-3.5" /> Innovation: Literacy-Score Leaderboard
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Financial Health Leaderboard
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            FinQuest ranks users by financial discipline, asset allocation, and literacy mastery — NOT lucky gambling P&L!
          </p>
        </div>
      </div>

      <div className="p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Medal className="w-4 h-4 text-orange-500" /> Community Rankings
        </h3>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {leaderData.map((user) => {
            const isUser = user.name.includes('(You)');
            return (
              <div
                key={user.rank}
                className={`flex items-center justify-between p-3.5 rounded-2xl transition-all ${
                  isUser ? 'bg-orange-500/10 border border-orange-500/30 font-bold' : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs ${
                    user.rank === 1 ? 'bg-amber-400 text-slate-900' : user.rank === 2 ? 'bg-orange-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}>
                    #{user.rank}
                  </span>
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">{user.name}</span>
                    <span className="text-[10px] text-orange-600 dark:text-orange-400 font-medium">{user.badge}</span>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-right font-mono">
                  <div>
                    <span className="text-[10px] text-slate-400 block">FHS Rating</span>
                    <span className="text-xs font-bold text-emerald-500">{user.fhs} / 1000</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">XP</span>
                    <span className="text-xs font-bold text-blue-500">{user.xp}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
