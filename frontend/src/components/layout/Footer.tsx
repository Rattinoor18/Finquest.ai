import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Shield, BookOpen, TrendingUp, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-[var(--border-glass)] bg-[var(--surface-glass)] backdrop-blur-xl mt-auto transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="space-y-3">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-hover)] flex items-center justify-center text-white font-bold text-sm shadow-md">
                FQ
              </div>
              <span className="font-extrabold text-lg tracking-tight text-[var(--text-primary)]">
                FinQuest
              </span>
            </Link>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Learn Money by Managing Money. Built by Team Aurelius for high-impact youth financial literacy, risk simulation, and fraud defense.
            </p>
            <div className="text-[11px] text-[var(--text-muted)] font-mono">
              Track: EdTech & FinTech • Team Aurelius
            </div>
          </div>

          {/* Education Links */}
          <div className="space-y-2.5 text-xs">
            <h4 className="font-bold uppercase tracking-wider text-[var(--text-primary)] text-[11px]">
              Curriculum & Tools
            </h4>
            <ul className="space-y-1.5 text-[var(--text-secondary)]">
              <li>
                <Link to="/course" className="hover:text-[var(--accent)] transition-colors">
                  Financial Course (8 Modules)
                </Link>
              </li>
              <li>
                <Link to="/course/certificate" className="hover:text-[var(--accent)] transition-colors">
                  Certificate of Completion
                </Link>
              </li>
              <li>
                <Link to="/trading" className="hover:text-[var(--accent)] transition-colors">
                  Paper Trading Window (₹10L Sim)
                </Link>
              </li>
              <li>
                <Link to="/tools" className="hover:text-[var(--accent)] transition-colors">
                  SIP & Compounding Calculators
                </Link>
              </li>
            </ul>
          </div>

          {/* Simulators */}
          <div className="space-y-2.5 text-xs">
            <h4 className="font-bold uppercase tracking-wider text-[var(--text-primary)] text-[11px]">
              Simulation Labs
            </h4>
            <ul className="space-y-1.5 text-[var(--text-secondary)]">
              <li>
                <Link to="/simulator" className="hover:text-[var(--accent)] transition-colors">
                  Life Stages Timeline (18-35+)
                </Link>
              </li>
              <li>
                <Link to="/mistakes" className="hover:text-[var(--accent)] transition-colors">
                  Engineered Mistake Traps
                </Link>
              </li>
              <li>
                <Link to="/scams" className="hover:text-[var(--accent)] transition-colors">
                  Scam Buster Fraud Lab
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="hover:text-[var(--accent)] transition-colors">
                  Literacy Health Score Board
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect & Contact */}
          <div className="space-y-2.5 text-xs">
            <h4 className="font-bold uppercase tracking-wider text-[var(--text-primary)] text-[11px]">
              Team & Connect
            </h4>
            <ul className="space-y-1.5 text-[var(--text-secondary)]">
              <li>
                <Link to="/about" className="hover:text-[var(--accent)] transition-colors">
                  About FinQuest
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[var(--accent)] transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <a 
                  href="mailto:team.aurelius.finquest@gmail.com" 
                  className="flex items-center gap-1.5 hover:text-[var(--accent)] transition-colors font-mono"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>team.aurelius.finquest@gmail.com</span>
                </a>
              </li>
              <li>
                <Link to="/chat" className="hover:text-[var(--accent)] transition-colors">
                  Aurelius Intelligence (AI Chat)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--border-glass)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
          <p>© {currentYear} FinQuest by Team Aurelius. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Built with discipline for Indian Youth</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>Before you risk ₹1 in the real world, risk ₹1 crore here.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
