import React from 'react';
import { Sparkles, Heart, ShieldCheck, Users, GraduationCap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="p-8 rounded-3xl glass-panel border border-[var(--border-glass-strong)] space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-light)] text-[var(--accent)] text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" /> The Team Aurelius Story
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
          About FinQuest
        </h1>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          Learn Money by Managing Money. Built for the EdTech & FinTech Innovation Track.
        </p>
      </div>

      <div className="p-8 rounded-3xl glass-panel border border-[var(--border-glass)] space-y-6 text-sm text-[var(--text-secondary)] leading-relaxed">
        <h2 className="text-xl font-bold text-[var(--text-primary)]">
          The Problem: The Real Cost of Theoretical Financial Education
        </h2>
        <p>
          In India and emerging economies worldwide, money management is rarely taught in schools or colleges. Young adults enter the workforce and are immediately bombarded with aggressive credit card marketing, predatory loan apps, and unverified social media "trading gurus" promising overnight riches.
        </p>
        <p>
          Traditional personal finance resources fail in two opposite directions:
        </p>
        <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm">
          <li><strong>Too Theoretical:</strong> Textbooks and articles explain textbook definitions like "Compound Interest" or "Fixed Deposits" without letting students feel what happens when market corrections or unexpected emergencies hit.</li>
          <li><strong>Too Dangerous:</strong> Real trading accounts require risking hard-earned capital, leading to expensive tuition fees paid directly to the stock market.</li>
        </ul>

        <h2 className="text-xl font-bold text-[var(--text-primary)] pt-4">
          Our Solution: FinQuest by Team Aurelius
        </h2>
        <p>
          FinQuest creates a risk-free playground governed by the exact mathematical models of the financial world. 
          Before our users ever risk ₹1 in the real world, they can risk ₹1 crore here—experiencing market regimes, managing realistic cashflows across 4 life stages, escaping credit card APR traps, and consulting an AI mentor.
        </p>

        <div className="p-6 rounded-2xl bg-[var(--accent-light)] border border-[var(--border-glass)] space-y-2 mt-4">
          <h3 className="font-bold text-xs text-[var(--accent)] uppercase tracking-wider">
            Team Aurelius Founders
          </h3>
          <p className="text-xs text-[var(--text-primary)] font-semibold">
            Nikita Khatter • Pragya Mehta • Prathamjot Singh • Ratti Noor Singh
          </p>
          <p className="text-[11px] text-[var(--text-muted)]">
            Dedicated to empowering youth across India with actionable financial independence.
          </p>
        </div>
      </div>
    </div>
  );
};
