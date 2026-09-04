import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

export const ScamDetectorPage: React.FC = () => {
  const [activeScamIdx, setActiveScamIdx] = useState(0);
  const [userFlagged, setUserFlagged] = useState<boolean | null>(null);

  const scams = [
    {
      title: "Telegram VIP 'Guaranteed 40% Monthly' Stock Channel",
      sender: "Apex Trading Elite Guru",
      platform: "Telegram",
      message: "🚨 INSIDER INSTITUTIONAL LEAK 🚨\nJoin our VIP group today! We give 100% GUARANTEED 40% monthly returns on penny stocks. Send ₹5,000 registration fee to UPI: apexprofit99@upi to receive tomorrow's 10x stock code!",
      isScam: true,
      redFlags: [
        "Unrealistic claim of 'guaranteed 40% monthly return'",
        "Payment requested to personal unverified UPI ID",
        "Classic pump-and-dump operator tactic with penny stocks"
      ]
    },
    {
      title: "Reverse UPI QR Code 'Receive Payment' Scam",
      sender: "OLX Buyer 'Vikram'",
      platform: "WhatsApp",
      message: "Hi, I want to buy your second-hand sofa immediately. I am sending you a QR code for ₹15,000. Just scan this QR code on Google Pay and enter your 6-digit UPI PIN to receive the money in your bank account!",
      isScam: true,
      redFlags: [
        "You NEVER need to enter a UPI PIN to RECEIVE money",
        "Entering a PIN always authorizes money leaving your account",
        "Buyer refuses to meet in person or pay cash"
      ]
    },
    {
      title: "Part-Time YouTube Video Rating & Daily Deposit Task",
      sender: "HR Manager Shreya",
      platform: "WhatsApp",
      message: "Hello! Earn ₹2,00,000 per month working from home by just liking YouTube videos and rating hotels on Google Maps. We already sent you ₹150 demo reward! Now deposit ₹2,000 to unlock premium task tier with ₹8,000 payout!",
      isScam: true,
      redFlags: [
        "Advance-fee fraud: Small initial reward used as bait to solicit larger deposits",
        "Unsolicited WhatsApp job offer from international number",
        "Legitimate employers never demand cash deposits to work"
      ]
    }
  ];

  const current = scams[activeScamIdx];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="p-8 rounded-3xl glass-panel border border-[var(--border-glass-strong)] space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-xs font-bold">
          <ShieldAlert className="w-3.5 h-3.5" /> Fraud Immunity Lab
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
          Scam Buster Fraud Academy
        </h1>
        <p className="text-sm text-[var(--text-secondary)]">
          Test your fraud radar against real WhatsApp, Telegram, and UPI scam scripts that cost Indian citizens thousands of crores each year.
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {scams.map((sc, i) => (
          <button
            key={i}
            onClick={() => { setActiveScamIdx(i); setUserFlagged(null); }}
            className={`px-4 py-2.5 rounded-xl border text-xs font-bold shrink-0 transition-all ${
              activeScamIdx === i
                ? 'bg-[var(--accent)] text-white border-[var(--accent)] shadow-md'
                : 'glass-card border-[var(--border-glass)] text-[var(--text-secondary)]'
            }`}
          >
            Scenario 0{i + 1}
          </button>
        ))}
      </div>

      <div className="p-6 rounded-3xl glass-panel border border-[var(--border-glass-strong)] space-y-5">
        <div className="flex items-center justify-between border-b border-[var(--border-glass)] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-bold text-xs">
              {current.sender[0]}
            </div>
            <div>
              <div className="font-bold text-xs text-[var(--text-primary)]">{current.sender}</div>
              <div className="text-[10px] text-[var(--text-muted)]">{current.platform} Chat</div>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/10 text-red-500 font-bold">
            Simulated Conversation
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border-glass)] text-xs sm:text-sm font-sans leading-relaxed whitespace-pre-wrap text-[var(--text-primary)]">
          {current.message}
        </div>

        <div className="flex items-center justify-center gap-4 pt-2">
          <button
            onClick={() => setUserFlagged(true)}
            className="px-6 py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white text-xs font-bold shadow-md shadow-red-500/25 flex items-center gap-2 transition-all"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Flag as 100% Scam</span>
          </button>
          <button
            onClick={() => setUserFlagged(false)}
            className="px-6 py-3 rounded-2xl glass-card text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            Trust & Send Money
          </button>
        </div>

        {userFlagged !== null && (
          <div className={`p-5 rounded-2xl text-xs sm:text-sm space-y-3 animate-in fade-in duration-200 border ${
            userFlagged === current.isScam
              ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-800 dark:text-emerald-200'
              : 'bg-red-500/15 border-red-500/30 text-red-800 dark:text-red-200'
          }`}>
            <div className="font-bold flex items-center gap-2">
              {userFlagged === current.isScam ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <XCircle className="w-5 h-5 text-red-500" />}
              <span>{userFlagged === current.isScam ? "Brilliant! You identified the fraud." : "Warning! You fell for the scam trap."}</span>
            </div>
            <div className="space-y-1.5 pt-1">
              <span className="font-bold block text-xs">Exposed Red Flags:</span>
              <ul className="list-disc list-inside text-xs space-y-1 opacity-90">
                {current.redFlags.map((rf, rIdx) => (
                  <li key={rIdx}>{rf}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
