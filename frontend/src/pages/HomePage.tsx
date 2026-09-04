import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  TrendingUp, 
  GraduationCap, 
  Bot, 
  ShieldAlert, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  Calculator, 
  ShieldCheck,
  ChevronRight,
  Star,
  Users,
  Clock,
  Layers
} from 'lucide-react';
import { useCourseProgress } from '../hooks/useCourseProgress';

export const HomePage: React.FC = () => {
  const { progressPct, isCourseComplete } = useCourseProgress();

  const competencies = [
    "50/30/20 Budgeting",
    "Emergency Cushion",
    "Rule of 72 Compounding",
    "Credit Card APR Defense",
    "Index Fund SIPs",
    "Pure Term Insurance",
    "Tax Regimes 101",
    "Scam & Ponzi Immunity"
  ];

  const stats = [
    { value: "8", label: "Structured Modules", sub: "From cashflow to retirement" },
    { value: "24", label: "Interactive Lessons", sub: "Real Indian finance scenarios" },
    { value: "₹10,00,000", label: "Virtual Trading Capital", sub: "Live stochastic market terminal" },
    { value: "100%", label: "Zero Real-Money Risk", sub: "Learn without costly mistakes" },
  ];

  const testimonials = [
    {
      name: "Rohan Verma",
      role: "Software Engineer, Bengaluru",
      quote: "Before FinQuest, I kept ₹4 Lakhs idle in a 3% savings account losing to inflation. The course taught me how to automate an index SIP and build an emergency fortress.",
      rating: 5
    },
    {
      name: "Ananya Iyer",
      role: "MBA Student, Mumbai",
      quote: "The Mistake Simulator on the Credit Card Minimum Due trap literally saved me from a 42% APR disaster. This should be taught in every college across India.",
      rating: 5
    },
    {
      name: "Karan Singhania",
      role: "Product Analyst, Gurugram",
      quote: "Practicing on the Paper Trading window with simulated market crashes gave me the conviction to never panic-sell during routine dips. Coach Aurelius is brilliant.",
      rating: 5
    }
  ];

  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      {/* 1. HERO SECTION (Peachweb Inspiration Rhythm) */}
      <section className="relative pt-12 sm:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Glow shape behind hero */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[450px] bg-gradient-to-tr from-[var(--accent-light)] to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[var(--border-glass-strong)] text-[var(--accent)] text-xs font-bold mb-6 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Team Aurelius • EdTech & FinTech Innovation</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[var(--text-primary)] max-w-5xl mx-auto leading-[1.1] mb-6">
          Before you risk <span className="text-[var(--accent)] font-mono">₹1</span> in the real world, risk <span className="text-[var(--accent)] font-mono">₹1 crore</span> here.
        </h1>

        <p className="text-base sm:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed mb-10 font-normal">
          A gamified financial-life simulator and complete curriculum where every money concept is learned by experiencing it—not reading boring theory. Master cashflow, escape debt spirals, and paper trade with zero real risk.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <Link
            to="/course"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold text-sm shadow-xl shadow-[var(--accent-glow)] flex items-center justify-center gap-2.5 transition-all transform active:scale-95 group"
          >
            <span>Start Financial Course</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/trading"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-card text-[var(--text-primary)] hover:border-[var(--accent)] font-bold text-sm flex items-center justify-center gap-2 transition-all"
          >
            <TrendingUp className="w-4 h-4 text-[var(--accent)]" />
            <span>Paper Trading Terminal</span>
          </Link>
        </div>

        {/* Progress teaser if started */}
        {progressPct > 0 && (
          <div className="mt-8 inline-flex items-center gap-3 px-4 py-2 rounded-2xl glass-panel text-xs text-[var(--text-secondary)]">
            <GraduationCap className="w-4 h-4 text-[var(--accent)]" />
            <span>Course in progress: <strong>{progressPct}% completed</strong></span>
            <Link to="/course" className="text-[var(--accent)] font-bold hover:underline">Continue →</Link>
          </div>
        )}
      </section>

      {/* 2. INTRO BLOCK: What This Platform Does */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
          The Problem We Solve
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
          73% of Indian youth have never invested—and the ones who do often learn from a WhatsApp forward.
        </h2>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-3xl mx-auto">
          Traditional education is either too theoretical ("An FD is a fixed-income instrument...") or live trading accounts are too risky. 
          FinQuest bridges the gap by immersing you in simulated salaries, rent, EMIs, stochastic stock markets, and fraud traps where every expensive mistake costs zero real rupees.
        </p>
      </section>

      {/* 3. COMPETENCIES STRIP */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-4 rounded-3xl glass-panel flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 border border-[var(--border-glass)]">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mr-2 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent)]" /> Core Competencies:
          </span>
          {competencies.map((comp, i) => (
            <span 
              key={i} 
              className="text-xs font-semibold px-3 py-1 rounded-xl bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border-glass)] shadow-sm"
            >
              {comp}
            </span>
          ))}
        </div>
      </section>

      {/* 4. ALTERNATING NUMBERED FEATURE SECTIONS (01, 02, 03, 04) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20 sm:space-y-28">
        {/* 01. The Course & Certification */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="font-mono text-3xl sm:text-4xl font-black text-[var(--accent)]">01</div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
              A Complete Curriculum with Verifiable Certification
            </h3>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              No lorem ipsum, no vague advice. 8 comprehensive modules covering cashflow architecture, debt elimination, index fund compounding, tax minimization, and retirement planning. Each lesson concludes with an interactive mastery quiz.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-[var(--text-secondary)]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <span>24 complete lessons with real Indian Rupee (₹) case studies</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <span>Immediate interactive quiz feedback on every lesson</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <span>Downloadable, printable Certificate of Completion upon finishing</span>
              </li>
            </ul>
            <div className="pt-2">
              <Link 
                to="/course"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-bold shadow-lg shadow-[var(--accent-glow)] transition-all"
              >
                <span>Explore Full Syllabus</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="p-6 rounded-3xl glass-card border border-[var(--border-glass-strong)] space-y-4">
              <div className="flex items-center justify-between border-b border-[var(--border-glass)] pb-3">
                <span className="text-xs font-bold uppercase text-[var(--accent)]">Course Curriculum</span>
                <span className="text-xs font-mono text-[var(--text-muted)]">8 Modules • 24 Lessons</span>
              </div>
              <div className="space-y-2.5">
                {[
                  { num: "M1", title: "Money Basics & Cashflow Architecture", badge: "Needs vs Wants" },
                  { num: "M2", title: "Saving, Liquidity & Emergency Cushion", badge: "6-Month Buffer" },
                  { num: "M3", title: "Banking, Fixed Income & Compounding", badge: "Rule of 72" },
                  { num: "M4", title: "Debt, Credit Cards & Interest Traps", badge: "42% APR Defense" },
                ].map((m, i) => (
                  <div key={i} className="p-3 rounded-2xl bg-[var(--surface)] border border-[var(--border-glass)] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-[var(--accent-light)] text-[var(--accent)] font-mono font-bold flex items-center justify-center text-xs">
                        {m.num}
                      </span>
                      <span className="font-semibold text-[var(--text-primary)]">{m.title}</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--accent-light)] text-[var(--accent)] font-mono hidden sm:inline">
                      {m.badge}
                    </span>
                  </div>
                ))}
              </div>
              <div className="p-3 rounded-2xl bg-[var(--accent-light)] border border-[var(--border-glass)] text-xs text-center font-semibold text-[var(--accent)]">
                + 4 More Modules: Equities, Insurance, Taxes 101 & Retirement Independence
              </div>
            </div>
          </div>
        </div>

        {/* 02. Paper Trading Window */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 lg:order-2 space-y-5">
            <div className="font-mono text-3xl sm:text-4xl font-black text-[var(--accent)]">02</div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
              Real-Time Paper Trading & Market Sim
            </h3>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              Experience the adrenaline and psychology of the stock market without risking real money. Practice buying, selling, and setting limit orders on Indian indices and bluechip stocks with ₹10,00,000 in virtual funds.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-[var(--text-secondary)]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <span>Live stochastic price movements for NIFTY 50, TCS, Reliance, Zomato & Gold ETF</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <span>Market & Limit order pads with real-time portfolio P&L tracking</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <span>Inject market regimes: Normal, Bull Run 🚀, Bear Dip 📉, High Volatility ⚡</span>
              </li>
            </ul>
            <div className="pt-2">
              <Link 
                to="/trading"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-bold shadow-lg shadow-[var(--accent-glow)] transition-all"
              >
                <span>Launch Trading Terminal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 lg:order-1">
            <div className="p-6 rounded-3xl glass-card border border-[var(--border-glass-strong)] space-y-4">
              <div className="flex items-center justify-between border-b border-[var(--border-glass)] pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-[var(--text-primary)]">RELIANCE</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-bold font-mono">+1.85%</span>
                </div>
                <span className="text-xs font-mono font-bold text-[var(--text-primary)]">₹2,980.50</span>
              </div>
              <div className="h-44 w-full rounded-2xl bg-[var(--surface)] border border-[var(--border-glass)] flex items-center justify-center text-xs text-[var(--text-muted)] font-mono p-4">
                <div className="text-center space-y-2">
                  <TrendingUp className="w-8 h-8 text-emerald-500 mx-auto animate-pulse" />
                  <p>Stochastic Spline Chart Engine Active</p>
                  <span className="text-[10px] text-[var(--text-muted)]">50 ticks • Monotone Hermite Interpolation</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border-glass)]">
                  <span className="text-[10px] text-[var(--text-muted)] block">Virtual Capital</span>
                  <span className="font-bold text-[var(--text-primary)]">₹10,00,000</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border-glass)]">
                  <span className="text-[10px] text-[var(--text-muted)] block">Execution Mode</span>
                  <span className="font-bold text-emerald-500">Live Paper Orders</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 03. Aurelius Intelligence AI Assistant */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="font-mono text-3xl sm:text-4xl font-black text-[var(--accent)]">03</div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
              Aurelius Intelligence: Your AI Financial Mentor
            </h3>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              Powered by the Google Gemini API with a secure server-side proxy. Aurelius is patient, empathetic, and strictly focused on financial literacy. Ask questions on budgeting, emergency funds, debt payoffs, or course lessons without confusing jargon.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-[var(--text-secondary)]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <span>Strictly scoped system prompt: Explains concepts cleanly in structured Markdown</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <span>Secure API proxy: Client never has access to server environment keys</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <span>Available via dedicated full-page chat or floating assistant widget on every screen</span>
              </li>
            </ul>
            <div className="pt-2">
              <Link 
                to="/chat"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-bold shadow-lg shadow-[var(--accent-glow)] transition-all"
              >
                <span>Chat with Aurelius</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="p-6 rounded-3xl glass-card border border-[var(--border-glass-strong)] space-y-3">
              <div className="flex items-center gap-2.5 pb-2 border-b border-[var(--border-glass)]">
                <div className="w-8 h-8 rounded-xl bg-[var(--accent)] text-white flex items-center justify-center font-bold">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[var(--text-primary)]">Aurelius Intelligence</h4>
                  <span className="text-[10px] text-[var(--accent)] font-mono">Gemini Financial Mentor</span>
                </div>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-2xl bg-[var(--accent-light)] text-[var(--accent)] font-medium max-w-[85%] ml-auto">
                  "Should I pay off my credit card before starting an index fund SIP?"
                </div>
                <div className="p-3 rounded-2xl bg-[var(--surface)] border border-[var(--border-glass)] text-[var(--text-primary)] max-w-[90%] space-y-1.5">
                  <p className="font-bold text-[11px] text-[var(--accent)]">Coach Aurelius:</p>
                  <p className="leading-relaxed text-[11px]">
                    Yes, 100%! Credit card balances compound against you at <strong>42% to 48% APR</strong>. Even an aggressive equity fund averages 12-14% annually. Paying off credit debt gives you a guaranteed 42% risk-free return!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 04. Consequence & Fraud Defense Labs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 lg:order-2 space-y-5">
            <div className="font-mono text-3xl sm:text-4xl font-black text-[var(--accent)]">04</div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
              Mistake Simulators & Fraud Defense Labs
            </h3>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              We engineered scenarios specifically to produce expensive mistakes. Experience the brutal math of paying only the 'Minimum Due' or selling at the bottom of a crash. Practice spotting fake WhatsApp gurus and reverse UPI scams in authentic chat environments.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link 
                to="/mistakes"
                className="p-4 rounded-2xl glass-card border border-[var(--border-glass)] space-y-1 hover:border-[var(--accent)]"
              >
                <div className="font-bold text-xs text-[var(--text-primary)]">Mistake Simulator</div>
                <div className="text-[11px] text-[var(--text-muted)]">Play out multi-month debt consequence graphs</div>
              </Link>
              <Link 
                to="/scams"
                className="p-4 rounded-2xl glass-card border border-[var(--border-glass)] space-y-1 hover:border-[var(--accent)]"
              >
                <div className="font-bold text-xs text-[var(--text-primary)]">Scam Buster Lab</div>
                <div className="text-[11px] text-[var(--text-muted)]">Spot red flags in simulated WhatsApp fraud</div>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 lg:order-1">
            <div className="p-6 rounded-3xl glass-card border border-[var(--border-glass-strong)] space-y-3">
              <div className="flex items-center justify-between border-b border-[var(--border-glass)] pb-2">
                <span className="text-xs font-bold uppercase text-red-500 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4" /> WhatsApp Scam Simulation
                </span>
                <span className="text-[10px] font-mono text-[var(--text-muted)]">Fraud Defense</span>
              </div>
              <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border-glass)] text-xs space-y-2">
                <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 font-medium">
                  "🔥 GUARANTEED 35% MONTHLY RETURN with zero risk! Send ₹10,000 on UPI today."
                </div>
                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="text-[var(--text-muted)] font-semibold">Flagged: Unrealistic guaranteed return & personal UPI</span>
                  <span className="px-2 py-0.5 rounded bg-red-500 text-white font-bold text-[10px]">100% SCAM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. METRICS & BENEFITS BAR */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-[var(--border-glass-strong)]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((st, i) => (
              <div key={i} className="space-y-1">
                <div className="text-3xl sm:text-5xl font-black font-mono text-[var(--accent)]">
                  {st.value}
                </div>
                <div className="text-sm font-bold text-[var(--text-primary)]">
                  {st.label}
                </div>
                <div className="text-xs text-[var(--text-muted)]">
                  {st.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHAT LEARNERS SAY (Testimonials Reassurance) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
            Verified Outcomes
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
            What Learners Say
          </h2>
          <p className="text-sm text-[var(--text-secondary)]">
            Real feedback from students and early career professionals who transformed their financial habits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="p-6 rounded-3xl glass-card border border-[var(--border-glass)] space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex text-[var(--accent)]">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>
              <div className="pt-2 border-t border-[var(--border-glass)]">
                <div className="font-bold text-xs text-[var(--text-primary)]">{t.name}</div>
                <div className="text-[11px] text-[var(--text-muted)]">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CLOSING FULL-WIDTH CTA BAND */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-8 sm:p-16 rounded-3xl bg-gradient-to-r from-[var(--accent-light)] via-[var(--surface-glass)] to-[var(--accent-light)] glass-panel border border-[var(--border-glass-strong)] text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent)] text-white text-xs font-bold">
            <Award className="w-3.5 h-3.5" /> Start Free • Earn Your Certificate
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight max-w-3xl mx-auto">
            Take Control of Your Financial Future Today.
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto">
            Join thousands of young adults learning money by managing money. 8 complete modules, interactive quizzes, and practical simulators.
          </p>
          <div className="pt-2">
            <Link
              to="/course"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold text-sm shadow-xl shadow-[var(--accent-glow)] transition-all transform active:scale-95"
            >
              <span>Enroll in Financial Course Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
