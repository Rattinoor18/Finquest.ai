import React, { useState } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  AlertTriangle, 
  Sparkles, 
  CheckCircle2
} from 'lucide-react';
import { Position } from '../../types';

interface AICoachProps {
  isOpen: boolean;
  onClose: () => void;
  fhs: number;
  virtualCash: number;
  positions: Position[];
}

export const AICoachDrawer: React.FC<AICoachProps> = ({
  isOpen,
  onClose,
  fhs,
  virtualCash,
  positions
}) => {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'coach'; text: string }>>([
    {
      sender: 'coach',
      text: "Greetings! I am Coach Aurelius, your AI Financial Mentor. I continuously evaluate your portfolio diversification, risk concentration, and life decisions. How can I guide your financial journey today?"
    }
  ]);
  const [inputVal, setInputVal] = useState('');

  if (!isOpen) return null;

  const totalValue = virtualCash + positions.reduce((acc, p) => acc + p.current_value, 0);

  const flags = [];
  for (const pos of positions) {
    const conc = pos.current_value / totalValue;
    if (conc > 0.40) {
      flags.push(`High concentration risk: ${pos.symbol} makes up ${(conc * 100).toFixed(0)}% of your portfolio.`);
    }
  }

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userText = inputVal;
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInputVal('');

    setTimeout(() => {
      let reply = "In wealth management, consistency in index investing, maintaining a 6-month emergency buffer, and strictly paying credit card balances in full will always beat short-term market timing.";
      const q = userText.toLowerCase();
      if (q.includes('fd') || q.includes('fixed deposit')) {
        reply = "Fixed Deposits provide guaranteed 6.5-7.5% returns. Keep your emergency fund here, but remember inflation will erode long-term purchasing power if you don't invest in equities.";
      } else if (q.includes('sip') || q.includes('mutual fund')) {
        reply = "A monthly SIP in the Nifty 50 Index automatically uses Rupee-Cost Averaging: you buy more units during dips and fewer at peaks. Compounding does the heavy lifting!";
      } else if (q.includes('scam') || q.includes('fraud')) {
        reply = "Rule #1: Anyone promising guaranteed 20-30% monthly stock market returns or asking for UPI transfers for part-time tasks is running a scam. SEBI never allows guaranteed equity returns.";
      } else if (q.includes('paper trade') || q.includes('stock')) {
        reply = `You currently have ₹${virtualCash.toLocaleString('en-IN')} in cash and ${positions.length} holdings. Remember: Position sizing and having a stop-loss is what separates disciplined investors from gamblers.`;
      }
      setMessages(prev => [...prev, { sender: 'coach', text: reply }]);
    }, 600);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-white dark:bg-[#111827] border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col transition-all animate-in slide-in-from-right duration-300">
      <div className="p-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center font-bold">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm">Coach Aurelius Intelligence</h3>
            <span className="text-[10px] text-white/80 font-mono">Behavioral Risk Mentor</span>
          </div>
        </div>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/20 text-white transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {flags.length > 0 && (
        <div className="p-3 bg-red-500/10 border-b border-red-500/20 text-xs text-red-700 dark:text-red-300 space-y-1">
          <div className="font-bold flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5 text-red-500" /> Behavioral Nudge
          </div>
          <p className="text-[11px]">{flags[0]}</p>
        </div>
      )}

      <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-slate-50/50 dark:bg-slate-900/40">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-xs ${
              m.sender === 'user' 
                ? 'bg-orange-500 text-white rounded-tr-none shadow-sm' 
                : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-200 dark:border-slate-700 shadow-sm'
            }`}>
              <p className="leading-relaxed">{m.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-2 bg-slate-100 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700 flex gap-1.5 overflow-x-auto scrollbar-none">
        {['Why use SIP?', 'Explain FDs', 'Check my portfolio', 'How to spot scams'].map((pr, i) => (
          <button
            key={i}
            onClick={() => setInputVal(pr)}
            className="text-[10px] font-semibold px-2 py-1 rounded-lg bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 whitespace-nowrap hover:bg-orange-500 hover:text-white transition-colors"
          >
            {pr}
          </button>
        ))}
      </div>

      <form onSubmit={handleSend} className="p-3 bg-white dark:bg-[#111827] border-t border-slate-200 dark:border-slate-800 flex gap-2">
        <input
          type="text"
          placeholder="Ask Coach Aurelius..."
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          className="flex-1 px-3 py-2 rounded-xl text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          type="submit"
          className="p-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-500/25 transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
