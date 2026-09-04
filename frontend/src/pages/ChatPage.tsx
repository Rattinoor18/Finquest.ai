import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, AlertCircle, RefreshCw, User } from 'lucide-react';

interface Message {
  sender: 'user' | 'model';
  text: string;
}

export const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'model',
      text: "### Welcome to Aurelius Intelligence\n\nI am your dedicated **Financial Literacy Mentor**, powered by the Google Gemini API.\n\nYou can ask me questions about:\n- **Cashflow Architecture**: 50/30/20 budgeting, avoiding impulse spending.\n- **Debt & Credit**: Escaping the 42% credit card APR trap, boosting CIBIL score.\n- **Investing Basics**: Demystifying NIFTY 50 index funds, SIP compounding, and asset allocation.\n- **Fraud Protection**: Identifying WhatsApp stock tips and fake QR code scams.\n\n*What financial milestone or question is on your mind today?*"
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const quickPrompts = [
    "What is the difference between active and passive income?",
    "Explain the 50/30/20 budgeting rule with ₹50,000 monthly salary",
    "Why should I never pay only the minimum due on a credit card?",
    "How does an SIP turn market crashes into buying discounts?",
    "Is ULIP an insurance or an investment? Explain simply."
  ];

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text || loading) return;

    setInputVal('');
    setErrorBanner(null);
    const updatedHistory: Message[] = [...messages, { sender: 'user', text }];
    setMessages(updatedHistory);
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: updatedHistory.map(m => ({ sender: m.sender, text: m.text }))
        })
      });

      if (!response.ok) {
        throw new Error(`Server status ${response.status}`);
      }

      const data = await response.json();
      setMessages(prev => [
        ...prev, 
        { sender: 'model', text: data.reply || "I received your question but could not generate a reply." }
      ]);
    } catch (err) {
      setErrorBanner("Could not contact the server backend proxy. Please ensure backend is running (`uvicorn main:app`).");
      setMessages(prev => [
        ...prev,
        {
          sender: 'model',
          text: "⚠️ **Connection Error**: I could not reach the Gemini server proxy. Please verify your backend server is running on port 8000 and has `GEMINI_API_KEY` configured in `backend/.env`."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl glass-panel border border-[var(--border-glass-strong)] flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-hover)] text-white flex items-center justify-center font-bold shadow-lg shadow-[var(--accent-glow)]">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-[var(--text-primary)]">
                Aurelius Intelligence
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--accent-light)] text-[var(--accent)] font-bold">
                Gemini Proxy
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)]">
              Your patient, structured AI financial literacy mentor.
            </p>
          </div>
        </div>
      </div>

      {/* Error Banner */}
      {errorBanner && (
        <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorBanner}</span>
        </div>
      )}

      {/* Main Chat Log Window */}
      <div className="p-6 rounded-3xl glass-panel border border-[var(--border-glass)] min-h-[480px] max-h-[640px] overflow-y-auto space-y-4">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.sender === 'model' && (
              <div className="w-8 h-8 rounded-xl bg-[var(--accent)] text-white flex items-center justify-center shrink-0 mt-1 shadow-md">
                <Bot className="w-4 h-4" />
              </div>
            )}
            <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed max-w-[85%] ${
              m.sender === 'user'
                ? 'bg-[var(--accent)] text-white rounded-tr-none shadow-md'
                : 'glass-card text-[var(--text-primary)] rounded-tl-none border border-[var(--border-glass)]'
            }`}>
              <div className="whitespace-pre-wrap">{m.text}</div>
            </div>
            {m.sender === 'user' && (
              <div className="w-8 h-8 rounded-xl bg-[var(--surface-glass-hover)] border border-[var(--border-glass)] text-[var(--text-primary)] flex items-center justify-center shrink-0 mt-1">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] p-2">
            <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-bounce" />
            <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-bounce delay-100" />
            <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-bounce delay-200" />
            <span className="font-mono text-[11px]">Aurelius is composing guidance...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block">
          Quick Prompts:
        </span>
        <div className="flex flex-wrap gap-2">
          {quickPrompts.map((qp, i) => (
            <button
              key={i}
              onClick={() => handleSend(qp)}
              className="text-xs px-3 py-1.5 rounded-xl glass-card text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all font-medium"
            >
              {qp}
            </button>
          ))}
        </div>
      </div>

      {/* Input Field */}
      <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
        <input
          type="text"
          placeholder="Ask Aurelius any question on personal finance, investing, or debt..."
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          className="flex-1 px-4 py-3.5 rounded-2xl bg-[var(--surface)] border border-[var(--border-glass)] text-xs sm:text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] font-medium"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !inputVal.trim()}
          className="px-6 py-3.5 rounded-2xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-bold shadow-lg shadow-[var(--accent-glow)] disabled:opacity-40 transition-all flex items-center gap-2"
        >
          <span>Send</span>
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
