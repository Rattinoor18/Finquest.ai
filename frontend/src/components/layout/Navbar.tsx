import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  GraduationCap, 
  TrendingUp, 
  Calculator, 
  Bot, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  ChevronDown, 
  Award, 
  ShieldCheck, 
  AlertTriangle, 
  ShieldAlert, 
  Trophy,
  Info,
  Mail
} from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useCourseProgress } from '../../hooks/useCourseProgress';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme, isDark } = useTheme();
  const { progressPct } = useCourseProgress();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [simulatorsDropdown, setSimulatorsDropdown] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSimulatorsDropdown(false);
  }, [location.pathname]);

  // Keyboard accessibility: Close mobile menu on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setSimulatorsDropdown(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/course', label: 'Course', badge: `${progressPct}%` },
    { to: '/trading', label: 'Paper Trading', badge: 'Live Sim' },
    { to: '/tools', label: 'Tools' },
    { to: '/chat', label: 'Aurelius Intelligence', icon: Bot },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  const simulatorLinks = [
    { to: '/simulator', label: 'Life Stages Simulator', icon: ShieldCheck, desc: 'Ages 18 to 35+ cashflows' },
    { to: '/mistakes', label: 'Mistake Simulator', icon: AlertTriangle, desc: 'Engineered financial traps' },
    { to: '/scams', label: 'Scam Buster Lab', icon: ShieldAlert, desc: 'WhatsApp & Telegram fraud tests' },
    { to: '/leaderboard', label: 'Literacy Leaderboard', icon: Trophy, desc: 'Financial health rankings' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border-glass)] bg-[var(--surface-glass)] backdrop-blur-xl transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-[var(--accent)] rounded-xl p-1"
            aria-label="FinQuest Home"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-hover)] flex items-center justify-center text-white font-black text-xl shadow-lg shadow-[var(--accent-glow)] group-hover:scale-105 transition-transform">
              FQ
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-[var(--text-primary)]">
                  FinQuest
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--accent-light)] text-[var(--accent)] border border-[var(--border-glass)]">
                  Team Aurelius
                </span>
              </div>
              <p className="text-[11px] text-[var(--text-muted)] font-medium -mt-0.5">
                Learn Money by Managing Money
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5" aria-label="Main Navigation">
            {navLinks.slice(0, 4).map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isActive(link.to)
                    ? 'bg-[var(--accent)] text-white shadow-sm shadow-[var(--accent-glow)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-glass-hover)]'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                    isActive(link.to) ? 'bg-white/20 text-white' : 'bg-[var(--accent-light)] text-[var(--accent)]'
                  }`}>
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}

            {/* Simulators Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setSimulatorsDropdown(!simulatorsDropdown)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                  location.pathname === '/simulator' || location.pathname === '/mistakes' || location.pathname === '/scams' || location.pathname === '/leaderboard'
                    ? 'bg-[var(--accent)] text-white'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-glass-hover)]'
                }`}
                aria-expanded={simulatorsDropdown}
                aria-haspopup="true"
              >
                <span>Simulators</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {simulatorsDropdown && (
                <div 
                  className="absolute left-0 mt-2 w-64 rounded-2xl glass-panel p-2 shadow-2xl z-50 border border-[var(--border-glass-strong)] space-y-1"
                  role="menu"
                >
                  {simulatorLinks.map((sim) => {
                    const Icon = sim.icon;
                    return (
                      <Link
                        key={sim.to}
                        to={sim.to}
                        onClick={() => setSimulatorsDropdown(false)}
                        className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-[var(--accent-light)] transition-colors group text-left"
                        role="menuitem"
                      >
                        <div className="w-7 h-7 rounded-lg bg-[var(--surface)] border border-[var(--border-glass)] flex items-center justify-center text-[var(--accent)] group-hover:scale-105 transition-transform shrink-0 mt-0.5">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[var(--text-primary)]">{sim.label}</div>
                          <div className="text-[10px] text-[var(--text-muted)]">{sim.desc}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {navLinks.slice(4).map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isActive(link.to)
                    ? 'bg-[var(--accent)] text-white shadow-sm shadow-[var(--accent-glow)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-glass-hover)]'
                }`}
              >
                {link.icon && <link.icon className="w-3.5 h-3.5" />}
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* Right Controls: Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center gap-2">
            {/* Light / Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-[var(--border-glass)] bg-[var(--surface-glass)] hover:bg-[var(--surface-glass-hover)] text-[var(--text-primary)] transition-all focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              aria-label={isDark ? "Switch to White & Purple Glass Light Theme" : "Switch to Black & Gold Glass Dark Theme"}
              title={isDark ? "Switch to White & Purple Glass" : "Switch to Black & Gold Glass"}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-[#F5C542] animate-spin-slow" />
              ) : (
                <Moon className="w-4 h-4 text-[#7C3AED]" />
              )}
            </button>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl border border-[var(--border-glass)] bg-[var(--surface-glass)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 top-16 z-50 bg-black/60 backdrop-blur-md flex flex-col"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className="w-full max-h-[85vh] overflow-y-auto glass-panel border-b border-[var(--border-glass-strong)] p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Core Pages</span>
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive(link.to)
                      ? 'bg-[var(--accent)] text-white'
                      : 'text-[var(--text-primary)] hover:bg-[var(--accent-light)]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {link.icon && <link.icon className="w-4 h-4" />}
                    <span>{link.label}</span>
                  </div>
                  {link.badge && (
                    <span className="text-xs px-2 py-0.5 rounded-full font-mono bg-white/20 text-white font-bold">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            <div className="space-y-1 pt-3 border-t border-[var(--border-glass)]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Interactive Simulators</span>
              {simulatorLinks.map((sim) => {
                const Icon = sim.icon;
                return (
                  <Link
                    key={sim.to}
                    to={sim.to}
                    className="flex items-center gap-3 p-3 rounded-xl text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--accent-light)]"
                  >
                    <Icon className="w-4 h-4 text-[var(--accent)]" />
                    <div>
                      <div>{sim.label}</div>
                      <div className="text-[11px] text-[var(--text-muted)] font-normal">{sim.desc}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
