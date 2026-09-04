import React from 'react';
import { Link } from 'react-router-dom';
import { Home, BookOpen, AlertCircle } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6">
      <div className="p-8 rounded-3xl glass-panel border border-[var(--border-glass-strong)] space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-[var(--accent-light)] text-[var(--accent)] flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <div className="text-5xl font-black font-mono text-[var(--accent)]">404</div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Page Not Found</h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
          The route you are trying to visit does not exist or has been relocated to our structured course and simulator sections.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
          <Link
            to="/"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-bold shadow-md shadow-[var(--accent-glow)] flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            to="/course"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl glass-card text-xs font-bold text-[var(--text-primary)] flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            <span>Explore Course</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
