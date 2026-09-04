import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Briefcase, 
  RefreshCw, 
  Zap, 
  Layers, 
  AlertCircle, 
  CheckCircle2, 
  ShieldAlert, 
  HelpCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine 
} from 'recharts';

interface StockQuote {
  symbol: string;
  name: string;
  category: string;
  price: number;
  change: number;
  change_pct: number;
  open: number;
  high: number;
  low: number;
  prev_close: number;
  volume: number;
  pe_ratio?: number;
  market_cap_cr?: number;
  history: Array<{
    time: string;
    price: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  }>;
}

interface Position {
  symbol: string;
  name: string;
  quantity: number;
  avg_price: number;
  current_price: number;
  invested_value: number;
  current_value: number;
  unrealized_pnl: number;
  unrealized_pnl_pct: number;
}

interface OrderBookLevel {
  price: number;
  quantity: number;
  orders: number;
}

export const PaperTradingPage: React.FC = () => {
  const [quotes, setQuotes] = useState<StockQuote[]>([]);
  const [selectedSymbol, setSelectedSymbol] = useState<string>("RELIANCE");
  const [cashBalance, setCashBalance] = useState<number>(1000000);
  const [positions, setPositions] = useState<Position[]>([]);
  const [realizedPnl, setRealizedPnl] = useState<number>(0);
  const [marketRegime, setMarketRegime] = useState<string>("NORMAL");
  const [orderType, setOrderType] = useState<"MARKET" | "LIMIT">("MARKET");
  const [orderSide, setOrderSide] = useState<"BUY" | "SELL">("BUY");
  const [quantity, setQuantity] = useState<number>(10);
  const [limitPrice, setLimitPrice] = useState<number>(0);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [orderBook, setOrderBook] = useState<{ bids: OrderBookLevel[]; asks: OrderBookLevel[] }>({ bids: [], asks: [] });
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch Quotes and Portfolio
  const fetchMarketData = async () => {
    try {
      const res = await fetch('/api/market/quotes');
      if (res.ok) {
        const data = await res.json();
        setQuotes(data);
      }
      
      const portRes = await fetch('/api/portfolio');
      if (portRes.ok) {
        const portData = await portRes.json();
        setCashBalance(portData.cash_balance);
        setPositions(portData.positions);
        setRealizedPnl(portData.total_realized_pnl);
      }
    } catch (e) {
      console.warn("Backend offline or unreachable. Using client-side simulation tick.");
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderBook = async (sym: string) => {
    try {
      const res = await fetch(`/api/market/orderbook/${sym}`);
      if (res.ok) {
        const data = await res.json();
        setOrderBook({ bids: data.bids || [], asks: data.asks || [] });
      }
    } catch (e) {
      // Mock orderbook if offline
      const quote = quotes.find(q => q.symbol === sym);
      if (quote) {
        const p = quote.price;
        setOrderBook({
          bids: [1, 2, 3, 4, 5].map(i => ({ price: Math.round(p * (1 - i * 0.0008) * 100) / 100, quantity: (6 - i) * 120, orders: 4 })),
          asks: [1, 2, 3, 4, 5].map(i => ({ price: Math.round(p * (1 + i * 0.0008) * 100) / 100, quantity: (6 - i) * 120, orders: 4 })),
        });
      }
    }
  };

  useEffect(() => {
    fetchMarketData();
    const interval = setInterval(fetchMarketData, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedSymbol) {
      fetchOrderBook(selectedSymbol);
      const quote = quotes.find(q => q.symbol === selectedSymbol);
      if (quote && limitPrice === 0) {
        setLimitPrice(quote.price);
      }
    }
  }, [selectedSymbol, quotes]);

  const activeQuote = quotes.find(q => q.symbol === selectedSymbol) || quotes[0];

  const handleExecuteOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeQuote) return;

    const payload = {
      symbol: selectedSymbol,
      side: orderSide,
      order_type: orderType,
      quantity: Number(quantity),
      limit_price: orderType === "LIMIT" ? Number(limitPrice) : null,
    };

    try {
      const res = await fetch('/api/trade/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.status === 'EXECUTED') {
        setFeedback({ type: 'success', message: data.message });
        fetchMarketData();
      } else {
        setFeedback({ type: 'error', message: data.message || "Order was rejected" });
      }
    } catch (err) {
      // Offline fallback order execution
      const execPrice = activeQuote.price;
      const totalCost = execPrice * quantity;
      if (orderSide === 'BUY') {
        if (cashBalance < totalCost) {
          setFeedback({ type: 'error', message: `Insufficient virtual cash! Required: ₹${totalCost.toLocaleString()}` });
          return;
        }
        setCashBalance(prev => prev - totalCost);
        setPositions(prev => {
          const existing = prev.find(p => p.symbol === selectedSymbol);
          if (existing) {
            const newQty = existing.quantity + quantity;
            const newAvg = ((existing.avg_price * existing.quantity) + totalCost) / newQty;
            return prev.map(p => p.symbol === selectedSymbol ? { ...p, quantity: newQty, avg_price: Math.round(newAvg * 100) / 100 } : p);
          }
          return [...prev, {
            symbol: selectedSymbol,
            name: activeQuote.name,
            quantity: quantity,
            avg_price: execPrice,
            current_price: execPrice,
            invested_value: totalCost,
            current_value: totalCost,
            unrealized_pnl: 0,
            unrealized_pnl_pct: 0
          }];
        });
        setFeedback({ type: 'success', message: `Bought ${quantity} shares of ${selectedSymbol} at ₹${execPrice.toFixed(2)}` });
      } else {
        const existing = positions.find(p => p.symbol === selectedSymbol);
        if (!existing || existing.quantity < quantity) {
          setFeedback({ type: 'error', message: `You do not hold enough shares of ${selectedSymbol} to sell.` });
          return;
        }
        const saleProceeds = execPrice * quantity;
        const costBasis = existing.avg_price * quantity;
        const pnl = saleProceeds - costBasis;
        setCashBalance(prev => prev + saleProceeds);
        setRealizedPnl(prev => prev + pnl);
        setPositions(prev => prev.map(p => p.symbol === selectedSymbol ? { ...p, quantity: p.quantity - quantity } : p).filter(p => p.quantity > 0));
        setFeedback({ type: 'success', message: `Sold ${quantity} shares of ${selectedSymbol} at ₹${execPrice.toFixed(2)} (P&L: ₹${pnl.toFixed(2)})` });
      }
    }

    setTimeout(() => setFeedback(null), 5000);
  };

  const handleRegimeChange = async (reg: string) => {
    setMarketRegime(reg);
    try {
      await fetch(`/api/market/regime/${reg}`, { method: 'POST' });
    } catch (e) {
      console.log("Regime changed locally");
    }
  };

  const currentInvested = positions.reduce((acc, p) => acc + (p.avg_price * p.quantity), 0);
  const currentHoldingsVal = positions.reduce((acc, p) => {
    const q = quotes.find(item => item.symbol === p.symbol);
    const cp = q ? q.price : p.avg_price;
    return acc + (cp * p.quantity);
  }, 0);
  const totalPortfolioValue = cashBalance + currentHoldingsVal;
  const totalUnrealizedPnl = currentHoldingsVal - currentInvested;

  const isQuotePositive = (activeQuote?.change || 0) >= 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Portfolio HUD Banner */}
      <div className="p-6 rounded-3xl glass-panel border border-[var(--border-glass-strong)] space-y-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-light)] text-[var(--accent)] text-xs font-bold mb-2">
              <Zap className="w-3.5 h-3.5" /> Live Stochastic Market Terminal
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">
              FinQuest Paper Trading Window
            </h1>
            <p className="text-xs text-[var(--text-secondary)]">
              Before you risk ₹1 in the real world, test your conviction with ₹10,00,000 virtual capital.
            </p>
          </div>

          {/* Market Regime Switcher */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block">
              Inject Market Regime:
            </span>
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl glass-card border border-[var(--border-glass)]">
              {[
                { id: "NORMAL", label: "Normal" },
                { id: "BULL", label: "Bull Run 🚀" },
                { id: "BEAR", label: "Bear Dip 📉" },
                { id: "HIGH_VOLATILITY", label: "High Vol ⚡" }
              ].map(r => (
                <button
                  key={r.id}
                  onClick={() => handleRegimeChange(r.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    marketRegime === r.id
                      ? 'bg-[var(--accent)] text-white shadow-md'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Financial HUD Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-[var(--border-glass)] font-mono">
          <div className="p-3 rounded-2xl bg-[var(--surface)] border border-[var(--border-glass)]">
            <span className="text-[10px] text-[var(--text-muted)] uppercase block">Virtual Cash</span>
            <span className="text-sm sm:text-base font-bold text-[var(--text-primary)]">
              ₹{cashBalance.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-[var(--surface)] border border-[var(--border-glass)]">
            <span className="text-[10px] text-[var(--text-muted)] uppercase block">Holdings Value</span>
            <span className="text-sm sm:text-base font-bold text-[var(--text-primary)]">
              ₹{currentHoldingsVal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-[var(--surface)] border border-[var(--border-glass)]">
            <span className="text-[10px] text-[var(--text-muted)] uppercase block">Unrealized P&L</span>
            <span className={`text-sm sm:text-base font-bold ${totalUnrealizedPnl >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
              {totalUnrealizedPnl >= 0 ? '+' : ''}₹{totalUnrealizedPnl.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-[var(--surface)] border border-[var(--border-glass)]">
            <span className="text-[10px] text-[var(--text-muted)] uppercase block">Total Net Worth</span>
            <span className="text-sm sm:text-base font-bold text-[var(--accent)]">
              ₹{totalPortfolioValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>

      {/* Execution Alert Feedback */}
      {feedback && (
        <div className={`p-4 rounded-2xl text-xs font-semibold flex items-center justify-between border ${
          feedback.type === 'success' 
            ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-800 dark:text-emerald-300' 
            : 'bg-red-500/15 border-red-500/30 text-red-800 dark:text-red-300'
        }`}>
          <div className="flex items-center gap-2">
            {feedback.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <AlertCircle className="w-4 h-4 text-red-500" />}
            <span>{feedback.message}</span>
          </div>
          <button onClick={() => setFeedback(null)} className="text-xs opacity-70 hover:opacity-100">✕</button>
        </div>
      )}

      {/* Main Terminal Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Watchlist Column */}
        <div className="lg:col-span-3 space-y-3">
          <div className="p-4 rounded-3xl glass-panel border border-[var(--border-glass)] space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] block">
              Watchlist & Indices
            </span>
            <div className="space-y-1.5 max-h-[580px] overflow-y-auto pr-1">
              {quotes.map(q => {
                const isPos = q.change >= 0;
                const isSelected = q.symbol === selectedSymbol;
                return (
                  <button
                    key={q.symbol}
                    onClick={() => setSelectedSymbol(q.symbol)}
                    className={`w-full p-3 rounded-2xl text-left border transition-all flex items-center justify-between ${
                      isSelected 
                        ? 'bg-[var(--accent)] text-white border-[var(--accent)] shadow-md' 
                        : 'glass-card border-[var(--border-glass)] text-[var(--text-primary)] hover:border-[var(--accent)]'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs">{q.symbol}</div>
                      <div className={`text-[10px] truncate max-w-[120px] ${isSelected ? 'text-white/80' : 'text-[var(--text-muted)]'}`}>
                        {q.category}
                      </div>
                    </div>
                    <div className="text-right font-mono">
                      <div className="font-bold text-xs">₹{q.price.toFixed(2)}</div>
                      <div className={`text-[10px] font-bold ${
                        isSelected 
                          ? 'text-white' 
                          : isPos ? 'text-emerald-500' : 'text-red-500'
                      }`}>
                        {isPos ? '+' : ''}{q.change_pct.toFixed(2)}%
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Center Live Chart & Quote Statistics */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-3xl glass-panel border border-[var(--border-glass-strong)] space-y-4">
            {activeQuote && (
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-glass)] pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)]">
                      {activeQuote.symbol}
                    </h2>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--surface)] border border-[var(--border-glass)] text-[var(--text-muted)] font-mono">
                      {activeQuote.category}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)]">{activeQuote.name}</p>
                </div>

                <div className="text-right font-mono">
                  <div className="text-2xl sm:text-3xl font-black text-[var(--text-primary)]">
                    ₹{activeQuote.price.toFixed(2)}
                  </div>
                  <div className={`text-xs font-bold flex items-center justify-end gap-1 ${isQuotePositive ? 'text-emerald-500' : 'text-red-500'}`}>
                    {isQuotePositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    <span>{isQuotePositive ? '+' : ''}₹{activeQuote.change.toFixed(2)} ({isQuotePositive ? '+' : ''}{activeQuote.change_pct.toFixed(2)}%)</span>
                  </div>
                </div>
              </div>
            )}

            {/* Recharts Area Chart */}
            <div className="h-64 sm:h-80 w-full pt-2">
              {activeQuote?.history && activeQuote.history.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={activeQuote.history.slice(-40)}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={isQuotePositive ? "#10B981" : "#EF4444"} stopOpacity={0.35}/>
                        <stop offset="95%" stopColor={isQuotePositive ? "#10B981" : "#EF4444"} stopOpacity={0.0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" hide />
                    <YAxis 
                      domain={['auto', 'auto']} 
                      orientation="right" 
                      tick={{ fontSize: 10, fill: 'var(--text-muted)' }} 
                      stroke="transparent"
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'var(--surface)',
                        borderColor: 'var(--border-glass)',
                        borderRadius: '1rem',
                        fontSize: '11px',
                        fontFamily: 'monospace',
                        color: 'var(--text-primary)'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="price" 
                      stroke={isQuotePositive ? "#10B981" : "#EF4444"} 
                      strokeWidth={2.5} 
                      fillOpacity={1} 
                      fill="url(#colorPrice)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-xs text-[var(--text-muted)] font-mono">
                  Loading chart ticks...
                </div>
              )}
            </div>

            {/* Stats bar */}
            {activeQuote && (
              <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono pt-3 border-t border-[var(--border-glass)]">
                <div>
                  <span className="text-[10px] text-[var(--text-muted)] block">Open</span>
                  <span className="font-bold text-[var(--text-primary)]">₹{activeQuote.open.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[var(--text-muted)] block">High</span>
                  <span className="font-bold text-emerald-500">₹{activeQuote.high.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[var(--text-muted)] block">Low</span>
                  <span className="font-bold text-red-500">₹{activeQuote.low.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[var(--text-muted)] block">Prev Close</span>
                  <span className="font-bold text-[var(--text-primary)]">₹{activeQuote.prev_close.toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>

          {/* Level-2 Order Book Microstructure */}
          <div className="p-5 rounded-3xl glass-panel border border-[var(--border-glass)] space-y-3 font-mono text-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] block">
              Level-2 Order Book Depth
            </span>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-[var(--text-muted)] border-b border-[var(--border-glass)] pb-1">
                  <span>Bid (Buy)</span>
                  <span>Qty</span>
                </div>
                {orderBook.bids.slice(0, 5).map((b, i) => (
                  <div key={i} className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]">
                    <span>₹{b.price.toFixed(2)}</span>
                    <span>{b.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-[var(--text-muted)] border-b border-[var(--border-glass)] pb-1">
                  <span>Ask (Sell)</span>
                  <span>Qty</span>
                </div>
                {orderBook.asks.slice(0, 5).map((a, i) => (
                  <div key={i} className="flex justify-between text-red-600 dark:text-red-400 font-semibold text-[11px]">
                    <span>₹{a.price.toFixed(2)}</span>
                    <span>{a.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Order Execution Pad */}
        <div className="lg:col-span-3 space-y-4">
          <div className="p-6 rounded-3xl glass-panel border border-[var(--border-glass-strong)] space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] block">
              Order Pad
            </span>

            {/* Buy / Sell Toggle */}
            <div className="grid grid-cols-2 gap-1.5 p-1 rounded-2xl glass-card border border-[var(--border-glass)]">
              <button
                type="button"
                onClick={() => setOrderSide("BUY")}
                className={`py-2 rounded-xl text-xs font-black transition-all ${
                  orderSide === 'BUY'
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                BUY
              </button>
              <button
                type="button"
                onClick={() => setOrderSide("SELL")}
                className={`py-2 rounded-xl text-xs font-black transition-all ${
                  orderSide === 'SELL'
                    ? 'bg-red-500 text-white shadow-md'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                SELL
              </button>
            </div>

            {/* Order Type Toggle */}
            <div className="grid grid-cols-2 gap-1.5 text-xs font-bold">
              <button
                type="button"
                onClick={() => setOrderType("MARKET")}
                className={`py-1.5 rounded-xl border transition-all ${
                  orderType === 'MARKET'
                    ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                    : 'glass-card border-[var(--border-glass)] text-[var(--text-secondary)]'
                }`}
              >
                Market Order
              </button>
              <button
                type="button"
                onClick={() => setOrderType("LIMIT")}
                className={`py-1.5 rounded-xl border transition-all ${
                  orderType === 'LIMIT'
                    ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                    : 'glass-card border-[var(--border-glass)] text-[var(--text-secondary)]'
                }`}
              >
                Limit Order
              </button>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleExecuteOrder} className="space-y-3 font-mono text-xs">
              <div className="space-y-1">
                <label className="text-[10px] text-[var(--text-muted)] uppercase">Shares Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border-glass)] text-[var(--text-primary)] font-bold focus:ring-2 focus:ring-[var(--accent)]"
                />
              </div>

              {/* Quick Sizing Buttons */}
              <div className="grid grid-cols-4 gap-1.5 text-[10px] font-bold">
                {[25, 50, 75, 100].map(pct => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => {
                      if (activeQuote) {
                        const maxAffordable = Math.floor(cashBalance / activeQuote.price);
                        setQuantity(Math.max(1, Math.floor(maxAffordable * (pct / 100))));
                      }
                    }}
                    className="p-1 rounded-lg glass-card border border-[var(--border-glass)] text-[var(--text-muted)] hover:text-[var(--accent)]"
                  >
                    {pct}%
                  </button>
                ))}
              </div>

              {orderType === "LIMIT" && (
                <div className="space-y-1">
                  <label className="text-[10px] text-[var(--text-muted)] uppercase">Limit Price (₹)</label>
                  <input
                    type="number"
                    step="0.05"
                    value={limitPrice}
                    onChange={(e) => setLimitPrice(parseFloat(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border-glass)] text-[var(--text-primary)] font-bold focus:ring-2 focus:ring-[var(--accent)]"
                  />
                </div>
              )}

              {/* Estimated Total */}
              <div className="p-3 rounded-2xl bg-[var(--surface)] border border-[var(--border-glass)] space-y-1">
                <div className="flex justify-between text-[11px] text-[var(--text-muted)]">
                  <span>Estimated Total:</span>
                  <span className="font-bold text-[var(--text-primary)]">
                    ₹{((orderType === 'LIMIT' ? limitPrice : (activeQuote?.price || 0)) * quantity).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between text-[10px] text-[var(--text-muted)]">
                  <span>Available Funds:</span>
                  <span>₹{cashBalance.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                </div>
              </div>

              <button
                type="submit"
                className={`w-full py-3.5 rounded-2xl font-black text-xs text-white shadow-lg transition-all transform active:scale-95 ${
                  orderSide === 'BUY'
                    ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/25'
                    : 'bg-red-500 hover:bg-red-600 shadow-red-500/25'
                }`}
              >
                Place {orderSide} Order
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="p-6 rounded-3xl glass-panel border border-[var(--border-glass)] space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-[var(--accent)]" /> Active Portfolio Holdings ({positions.length})
          </h3>
          <span className="text-xs font-mono text-[var(--text-muted)]">Realized P&L: ₹{realizedPnl.toFixed(2)}</span>
        </div>

        {positions.length === 0 ? (
          <div className="p-8 text-center text-xs text-[var(--text-muted)] font-mono">
            No active positions. Execute a buy order on any stock or index above to start building your paper portfolio.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-[var(--border-glass)] text-[var(--text-muted)] text-[10px] uppercase">
                  <th className="pb-3">Asset</th>
                  <th className="pb-3">Qty</th>
                  <th className="pb-3">Avg Price</th>
                  <th className="pb-3">Current Price</th>
                  <th className="pb-3">Invested</th>
                  <th className="pb-3">Current Value</th>
                  <th className="pb-3 text-right">Unrealized P&L</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-glass)]">
                {positions.map(p => {
                  const q = quotes.find(item => item.symbol === p.symbol);
                  const cmp = q ? q.price : p.current_price;
                  const curVal = cmp * p.quantity;
                  const pnl = curVal - (p.avg_price * p.quantity);
                  const pnlPct = ((cmp - p.avg_price) / p.avg_price) * 100;
                  const isPos = pnl >= 0;

                  return (
                    <tr key={p.symbol} className="hover:bg-[var(--surface-glass-hover)] transition-colors">
                      <td className="py-3 font-bold text-[var(--text-primary)]">{p.symbol}</td>
                      <td className="py-3">{p.quantity}</td>
                      <td className="py-3">₹{p.avg_price.toFixed(2)}</td>
                      <td className="py-3 font-bold">₹{cmp.toFixed(2)}</td>
                      <td className="py-3">₹{(p.avg_price * p.quantity).toFixed(2)}</td>
                      <td className="py-3 font-bold">₹{curVal.toFixed(2)}</td>
                      <td className={`py-3 text-right font-bold ${isPos ? 'text-emerald-500' : 'text-red-500'}`}>
                        {isPos ? '+' : ''}₹{pnl.toFixed(2)} ({isPos ? '+' : ''}{pnlPct.toFixed(2)}%)
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
