import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, Printer, Download, CheckCircle2, Lock, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useCourseProgress } from '../hooks/useCourseProgress';

export const CertificatePage: React.FC = () => {
  const { 
    state, 
    progressPct, 
    isCourseComplete, 
    setLearnerName, 
    completedLessons, 
    totalLessons,
    unlockAllForTesting
  } = useCourseProgress();

  const [inputName, setInputName] = useState(state.learnerName || 'Prathamjot Singh');
  const [showPreviewAnyway, setShowPreviewAnyway] = useState(false);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputName.trim()) {
      setLearnerName(inputName.trim());
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const completionDate = state.certificateEarnedDate || new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner (hidden in print) */}
      <div className="no-print p-6 rounded-3xl glass-panel border border-[var(--border-glass-strong)] space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-light)] text-[var(--accent)] text-xs font-bold mb-2">
              <Award className="w-3.5 h-3.5" /> Official FinQuest Certification
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">
              Certificate of Financial Literacy Completion
            </h1>
            <p className="text-xs text-[var(--text-secondary)]">
              Verifiable proof of completing all 8 modules and 24 mastery quizzes in the FinQuest curriculum.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-5 py-2.5 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-bold shadow-md shadow-[var(--accent-glow)] flex items-center gap-2 transition-all print-allow"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>

        {/* Lock warning if not complete */}
        {!isCourseComplete && !showPreviewAnyway && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Lock className="w-4 h-4 text-amber-500 shrink-0" />
              <span>
                You have completed <strong>{completedLessons.length} of {totalLessons} lessons</strong> ({progressPct}%). Finish all lessons to officially claim this credential.
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowPreviewAnyway(true)}
                className="font-bold underline hover:text-[var(--accent)]"
              >
                Preview Certificate Anyway
              </button>
              <Link 
                to="/course"
                className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs"
              >
                Resume Course →
              </Link>
            </div>
          </div>
        )}

        {/* Name input editor */}
        <form onSubmit={handleSaveName} className="pt-2 border-t border-[var(--border-glass)] flex flex-wrap items-center gap-3 text-xs">
          <label className="font-semibold text-[var(--text-secondary)]">
            Recipient Name on Certificate:
          </label>
          <input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-[var(--surface)] border border-[var(--border-glass)] text-[var(--text-primary)] font-bold text-xs focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
          <button
            type="submit"
            className="px-3.5 py-1.5 rounded-xl bg-[var(--surface-glass-hover)] border border-[var(--border-glass)] font-bold text-[var(--text-primary)] hover:border-[var(--accent)]"
          >
            Update Name
          </button>
        </form>
      </div>

      {/* CERTIFICATE DISPLAY CANVAS (Designed for print and screen) */}
      <div className="certificate-container relative p-8 sm:p-14 rounded-3xl bg-[var(--surface)] border-4 border-[#D4AF37] shadow-2xl space-y-8 text-center overflow-hidden">
        {/* Decorative corner borders */}
        <div className="absolute top-3 left-3 w-12 h-12 border-t-2 border-l-2 border-[#D4AF37]" />
        <div className="absolute top-3 right-3 w-12 h-12 border-t-2 border-r-2 border-[#D4AF37]" />
        <div className="absolute bottom-3 left-3 w-12 h-12 border-b-2 border-l-2 border-[#D4AF37]" />
        <div className="absolute bottom-3 right-3 w-12 h-12 border-b-2 border-r-2 border-[#D4AF37]" />

        {/* Organization & Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-black tracking-widest uppercase border border-[#D4AF37]/30">
            Team Aurelius EdTech & FinTech Platform
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[var(--text-primary)] tracking-wide">
            Certificate of Financial Literacy
          </h2>
          <p className="text-xs text-[var(--text-muted)] font-mono tracking-widest uppercase">
            Accredited by FinQuest Interactive Academy
          </p>
        </div>

        {/* Recipient Details */}
        <div className="py-4 space-y-3">
          <p className="text-xs text-[var(--text-secondary)] uppercase tracking-wider">
            This is proudly presented to
          </p>
          <div className="text-3xl sm:text-5xl font-black text-[var(--accent)] font-serif tracking-tight border-b-2 border-[#D4AF37]/40 pb-3 max-w-xl mx-auto">
            {inputName}
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed pt-2">
            For successfully demonstrating mastery across all 8 core competencies of modern financial literacy: 
            cashflow budgeting (50/30/20), emergency reserve architecture, debt elimination (avalanche/snowball), index fund SIP compounding, insurance risk management, personal taxation (Old/New regimes), and financial fraud defense.
          </p>
        </div>

        {/* Certificate Credential Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-[var(--border-glass)] text-left items-end">
          {/* Certificate ID */}
          <div className="space-y-1">
            <span className="text-[10px] text-[var(--text-muted)] uppercase block font-mono">Verification ID</span>
            <span className="text-xs font-mono font-bold text-[var(--text-primary)]">{state.certificateId}</span>
            <span className="text-[10px] text-emerald-500 block font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Digitally Verified
            </span>
          </div>

          {/* Golden Seal */}
          <div className="text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F5C542] text-slate-950 p-1 flex items-center justify-center shadow-xl shadow-[#D4AF37]/30">
              <div className="w-full h-full rounded-full border-2 border-dashed border-slate-950/40 flex flex-col items-center justify-center text-[9px] font-black uppercase tracking-tighter">
                <Sparkles className="w-4 h-4 text-slate-950 mb-0.5" />
                <span>AURELIUS</span>
                <span>HONORS</span>
              </div>
            </div>
          </div>

          {/* Signatures & Date */}
          <div className="text-right space-y-1">
            <span className="text-[10px] text-[var(--text-muted)] uppercase block font-mono">Issued On</span>
            <span className="text-xs font-mono font-bold text-[var(--text-primary)]">{completionDate}</span>
            <span className="text-[10px] text-[var(--text-muted)] block font-serif italic pt-1">
              Nikita Khatter & Prathamjot Singh • Team Aurelius
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
