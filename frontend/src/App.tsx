import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { DynamicAtmosphereBackground } from './components/layout/DynamicAtmosphereBackground';
import { FloatingChatWidget } from './components/chat/FloatingChatWidget';
import { ThemeProvider } from './context/ThemeContext';

import { HomePage } from './pages/HomePage';
import { CourseLandingPage } from './pages/CourseLandingPage';
import { LessonDetailPage } from './pages/LessonDetailPage';
import { CertificatePage } from './pages/CertificatePage';
import { PaperTradingPage } from './pages/PaperTradingPage';
import { ToolsPage } from './pages/ToolsPage';
import { LifeSimulatorPage } from './pages/LifeSimulatorPage';
import { MistakeSimulatorPage } from './pages/MistakeSimulatorPage';
import { ScamDetectorPage } from './pages/ScamDetectorPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { ChatPage } from './pages/ChatPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

function PageRouteTracker() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    const titles: Record<string, { title: string; desc: string }> = {
      '/': {
        title: 'FinQuest - Learn Money by Managing Money | Team Aurelius',
        desc: 'Interactive gamified financial literacy, stochastic paper trading, and AI mentor for Indian youth.'
      },
      '/course': {
        title: 'Financial Mastery Curriculum (8 Modules) | FinQuest',
        desc: 'Comprehensive 8-module course covering cashflows, budgeting, debt, investing, and retirement.'
      },
      '/course/certificate': {
        title: 'Certificate of Financial Literacy Completion | FinQuest',
        desc: 'Official verifiable Certificate of Completion accredited by FinQuest and Team Aurelius.'
      },
      '/trading': {
        title: 'Live Paper Trading Window (₹10L Sim) | FinQuest',
        desc: 'Stochastic stock market simulation with live order books, market regimes, and zero financial risk.'
      },
      '/tools': {
        title: 'Interactive Financial Calculators | FinQuest',
        desc: 'Crunch SIP wealth compounding, FD real returns vs inflation, and emergency fund requirements.'
      },
      '/simulator': {
        title: 'Life Stages Financial Simulator (Ages 18-35+) | FinQuest',
        desc: 'Navigate 4 career stages, manage monthly cashflows, and solve critical wealth dilemmas.'
      },
      '/mistakes': {
        title: 'Financial Mistake Simulator & Consequence Engine | FinQuest',
        desc: 'Experience the brutal math of minimum dues and panic selling before making errors in real life.'
      },
      '/scams': {
        title: 'Scam Buster Fraud Immunity Lab | FinQuest',
        desc: 'Test your fraud radar against authentic WhatsApp, Telegram, and reverse UPI scams.'
      },
      '/leaderboard': {
        title: 'Financial Health Score (FHS) Rankings | FinQuest',
        desc: 'Community literacy leaderboard ranking financial discipline and course mastery.'
      },
      '/chat': {
        title: 'Aurelius Intelligence - AI Financial Mentor | FinQuest',
        desc: 'Chat with Aurelius, your patient financial mentor powered by Google Gemini.'
      },
      '/about': {
        title: 'About FinQuest & Team Aurelius | EdTech Innovation',
        desc: 'The story and mission behind FinQuest: bridging the gap between theoretical finance and real-world risk.'
      },
      '/contact': {
        title: 'Contact Support & Feedback | FinQuest',
        desc: 'Reach out to Team Aurelius for campus workshops, feedback, or financial curriculum questions.'
      },
    };

    const currentMeta = titles[location.pathname] || {
      title: 'FinQuest - Learn Money by Managing Money',
      desc: 'Gamified financial literacy for the modern era.'
    };

    document.title = currentMeta.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', currentMeta.desc);
    }
  }, [location.pathname]);

  return null;
}

export function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <PageRouteTracker />
      <div className="relative min-h-screen flex flex-col selection:bg-[var(--accent)] selection:text-white">
        {/* Dynamic Starry / Shimmery Atmosphere Background */}
        <DynamicAtmosphereBackground />
        
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/course" element={<CourseLandingPage />} />
            <Route path="/course/:moduleId/:lessonId" element={<LessonDetailPage />} />
            <Route path="/course/certificate" element={<CertificatePage />} />
            <Route path="/trading" element={<PaperTradingPage />} />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/simulator" element={<LifeSimulatorPage />} />
            <Route path="/mistakes" element={<MistakeSimulatorPage />} />
            <Route path="/scams" element={<ScamDetectorPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <FloatingChatWidget />
        <Footer />
      </div>
    </BrowserRouter>
  </ThemeProvider>
  );
}

export default App;
