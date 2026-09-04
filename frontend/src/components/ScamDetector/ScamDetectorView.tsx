import React, { useState } from 'react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  AlertOctagon, 
  Sparkles, 
  MessageSquare
} from 'lucide-react';
import { ScamScenario } from '../../types';

interface ScamDetectorProps {
  scenarios: ScamScenario[];
  onSolveScam: (id: string, isCorrect: boolean) => void;
  fhs: number;
}

export const ScamDetectorView: React.FC<ScamDetectorProps> = ({ scenarios, onSolveScam, fhs }) => {
  const [activeScamId, setActiveScamId] = useState<string>(scenarios[0]?.id || 'scam-1');
  const [verdictGiven, setVerdictGiven] = useState<boolean | null>(null);

  const activeScam = scenarios.find(s => s.id === activeScamId) || scenarios[0];

  const handleVerdict = (isScamClaim: boolean) => {
    const isCorrect = isScamClaim === activeScam.isScam;
    setVerdictGiven(isCorrect);
    onSolveScam(activeScam.id, isCorrect);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="p-6 rounded-3xl bg-gradient-to-r from-red-500/10 via-orange-500/10 to-amber-500/5 dark:bg-[#111827] border border-red-500/30">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-600 dark:text-red-400 text-xs font-bold">
            <ShieldAlert className="w-3.5 h-3.5" /> Scam Buster Fraud Academy
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Spot Financial Scams & Fraud Traps
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            73% of Indian youth learn about investing through unverified social media and WhatsApp forwards. 
            Test your fraud resistance against realistic WhatsApp, Telegram, and UPI scam attempts!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {scenarios.map((sc, i) => {
          const isActive = sc.id === activeScamId;
          return (
            <button
              key={sc.id}
              onClick={() => {
                setActiveScamId(sc.id);
                setVerdictGiven(null);
              }}
              className={`p-4 rounded-2xl border text-left transition-all ${
                isActive
                  ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/25'
                  : 'bg-white dark:bg-[#111827] border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{sc.senderAvatar}</span>
                <div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider block ${isActive ? 'text-white/80' : 'text-orange-500'}`}>
                    {sc.platform} Case #{i + 1}
                  </span>
                  <span className="font-bold text-xs truncate max-w-[180px] block">{sc.sender}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-3xl bg-[#0F172A] border border-slate-800 shadow-2xl overflow-hidden">
            <div className="p-4 bg-[#1E293B] flex items-center justify-between border-b border-slate-700">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-xl">
                  {activeScam.senderAvatar}
                </span>
                <div>
                  <h4 className="font-bold text-sm text-slate-100">{activeScam.sender}</h4>
                  <span className="text-[10px] text-emerald-400 font-mono">online ({activeScam.platform})</span>
                </div>
              </div>
              <span className="text-xs text-slate-400 font-mono">Encrypted</span>
            </div>

            <div className="p-5 space-y-3 min-h-[260px] bg-slate-950/60">
              {activeScam.messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${msg.isIncoming ? 'items-start' : 'items-end'}`}
                >
                  <div className={`max-w-[85%] p-3.5 rounded-2xl text-xs font-medium ${
                    msg.isIncoming 
                      ? 'bg-[#1E293B] text-slate-100 rounded-tl-none border border-slate-700/60' 
                      : 'bg-orange-600 text-white rounded-tr-none'
                  }`}>
                    <p className="leading-relaxed">{msg.text}</p>
                    <span className="text-[9px] text-slate-400 font-mono block text-right mt-1">
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-[#1E293B] border-t border-slate-700 space-y-2">
              <span className="text-xs font-bold text-slate-300 block text-center">
                Is this message legitimate or a fraudulent scam?
              </span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleVerdict(false)}
                  className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-600 transition-all"
                >
                  Legitimate Offer
                </button>
                <button
                  onClick={() => handleVerdict(true)}
                  className="py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg shadow-red-600/30 transition-all"
                >
                  🚨 Definite Scam / Report
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase">
              Fraud Detection Analysis
            </span>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Key Red Flags:
              </h4>
              <div className="space-y-2">
                {activeScam.redFlags.map((flag, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-start gap-2.5 text-xs text-red-800 dark:text-red-300 font-medium"
                  >
                    <AlertOctagon className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span>{flag}</span>
                  </div>
                ))}
              </div>
            </div>

            {verdictGiven !== null && (
              <div className={`p-4 rounded-2xl text-xs space-y-1.5 ${
                verdictGiven 
                  ? 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-200 border border-emerald-500/30' 
                  : 'bg-red-500/10 text-red-800 dark:text-red-200 border border-red-500/30'
              }`}>
                <div className="font-bold text-sm flex items-center gap-1.5">
                  {verdictGiven ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <XCircle className="w-4 h-4 text-red-500" />}
                  {verdictGiven ? 'Spot on! You correctly identified the scam.' : 'Careful! You fell for the scam trap.'}
                </div>
                <p className="text-[11px] leading-relaxed opacity-90">
                  {activeScam.explanation}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
