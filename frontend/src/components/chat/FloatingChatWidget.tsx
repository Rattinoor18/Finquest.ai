import React, { useState, useRef, useEffect } from 'react';
import { API_BASE_URL } from '../../config';
import { Bot, X, Send, Sparkles, AlertCircle, RefreshCw, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ChatMessage {
  sender: 'user' | 'model';
  text: string;
}

export const FloatingChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'model',
      text: "Hello! I am **Aurelius Intelligence**, your financial literacy mentor. Ask me anything about budgeting, emergency funds, SIP compounding, credit cards, or spotting scams."
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    "What is the 50/30/20 rule?",
    "Why is paying minimum due dangerous?",
    "How does an SIP beat inflation?",
    "How to spot Telegram task scams?"
  ];

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text || loading) return;

    setInputVal('');
    setErrorBanner(null);
    const newHistory: ChatMessage[] = [...messages, { sender: 'user', text }];
    setMessages(newHistory);
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: newHistory.map(m => ({ sender: m.sender, text: m.text }))
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();
      setMessages(prev => [...prev, { sender: 'model', text: data.reply || "I couldn't process that request." }]);
    } catch (err: any) {
      setErrorBanner("Could not reach Aurelius Intelligence. Ensure backend server is running on port 8000.");
      setMessages(prev => [
        ...prev,
        {
          sender: 'model',
          text: "⚠️ **Connection Error**: I could not reach the server proxy. Please verify the backend is running (`uvicorn main:app`). If offline, check your `GEMINI_API_KEY` in `backend/.env`."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 no-print">
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="floating-chat-trigger group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] text-white shadow-2xl shadow-[var(--accent-glow)] hover:scale-105 transition-all focus:outline-none focus:ring-4 focus:ring-[var(--accent-glow)] font-bold text-xs"
          aria-label="Open Aurelius Intelligence AI Assistant"
        >
          <Bot className="w-5 h-5 animate-pulse" />
          <span className="hidden sm:inline">Ask Aurelius Intelligence</span>
        </button>
      )}

      {/* Floating Chat Window */}
      {isOpen && (
        <div className="w-[90vw] sm:w-96 h-[520px] rounded-3xl glass-panel border border-[var(--border-glass-strong)] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center font-bold">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-xs tracking-tight">Aurelius Intelligence</h3>
                <span className="text-[10px] text-white/80 font-mono">Gemini Financial Mentor</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Link 
                to="/chat" 
                onClick={() => setIsOpen(false)} 
                className="text-[10px] bg-white/20 hover:bg-white/30 text-white px-2 py-1 rounded-lg font-semibold mr-1 transition-colors"
                title="Open full-page chat"
              >
                Expand ↗
              </Link>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-white/20 text-white transition-colors"
                aria-label="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Error Banner */}
          {errorBanner && (
            <div className="p-2.5 bg-red-500/10 border-b border-red-500/30 text-red-600 dark:text-red-400 text-[11px] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorBanner}</span>
            </div>
          )}

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[var(--surface-glass)]">
            {messages.map((msg, i) => (
              <div 
                key={i} 
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div 
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[var(--accent)] text-white rounded-tr-none shadow-md shadow-[var(--accent-glow)]'
                      : 'glass-card text-[var(--text-primary)] rounded-tl-none border border-[var(--border-glass)]'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] p-2">
                <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-bounce delay-100" />
                <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-bounce delay-200" />
                <span className="font-mono text-[11px]">Aurelius is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="p-2 border-t border-[var(--border-glass)] bg-[var(--surface-glass)] flex gap-1.5 overflow-x-auto scrollbar-none">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p)}
                className="text-[10px] font-semibold px-2.5 py-1 rounded-lg glass-card text-[var(--text-secondary)] whitespace-nowrap hover:text-[var(--accent)] transition-colors shrink-0"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }} 
            className="p-3 border-t border-[var(--border-glass)] bg-[var(--surface-glass)] flex gap-2"
          >
            <input
              type="text"
              placeholder="Ask financial question..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-1 px-3.5 py-2 rounded-xl text-xs bg-[var(--surface)] border border-[var(--border-glass)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !inputVal.trim()}
              className="p-2.5 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white disabled:opacity-40 shadow-md transition-all"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
