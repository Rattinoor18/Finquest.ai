import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  ArrowDownRight, 
  Clock, 
  Zap, 
  Lock, 
  AlertCircle, 
  BarChart3, 
  PieChart, 
  DollarSign, 
  ShieldAlert, 
  RefreshCw,
  Search,
  CheckCircle2,
  Sliders
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { StockQuote, Position, TradeRecord } from '../../types';

interface PaperTradingProps {
  quotes: StockQuote[];
  selectedSymbol: string;
  setSelectedSymbol: (sym: string) => void;
  virtualCash: number;
  positions: Position[];
  trades: TradeRecord[];
  onPlaceOrder: (order: { symbol: string; side: 'BUY' | 'SELL'; order_type: 'MARKET' | 'LIMIT'; quantity: number; limit_price?: number }) => { success: boolean; message: string };
  onSquareOff: (symbol: string) => void;
  isEquityUnlocked: boolean;
  marketRegime: string;
  setMarketRegime: (regime: string) => void;
  onResetPortfolio: () => void;
  openGates: () => void;
}

export const PaperTradingWindow: React.FC<PaperTradingProps> = ({
  quotes,
  selectedSymbol,
  setSelectedSymbol,
  virtualCash,
  positions,
  trades,
  onPlaceOrder,
  onSquareOff,
  isEquityUnlocked,
  marketRegime,
  setMarketRegime,
  onResetPortfolio,
  openGates
}) => {
  const [orderSide, setOrderSide] = useState<'BUY' | 'SELL'>('BUY');
  const [orderType, setOrderType] = useState<'MARKET' | 'LIMIT'>('MARKET');
  const [quantity, setQuantity] = useState<number>(10);
  const [limitPrice, setLimitPrice] = useState<number>(0);
  const [chartTimeframe, setChartTimeframe] = useState<'1D' | '1W' | '1M' | '1Y'>('1D');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [feedbackToast, setFeedbackToast] = useState<{ show: boolean; success: boolean; message: string } | null>(null);

  const activeStock = quotes.find(q => q.symbol === selectedSymbol) || quotes[0] || {
    symbol: 'RELIANCE',
    name: 'Reliance Industries Ltd.',
    price: 2980.0,
    change: 32.5,
    change_pct: 1.1,
    high: 2995.0,
    low: 2940.0,
    open: 2950.0,
    prev_close: 2947.5,
    volume: 1250000,
    pe_ratio: 27.2,
    market_cap_cr: 2016000,
    category: 'LargeCap',
    history: []
  };

  useEffect(() => {
    if (activeStock && limitPrice === 0) {
      setLimitPrice(activeStock.price);
    }
  }, [selectedSymbol]);

  const showToast = (success: boolean, message: string) => {
    setFeedbackToast({ show: true, success, message });
    setTimeout(() => setFeedbackToast(null), 4000);
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEquityUnlocked) {
      showToast(false, 'Knowledge Gate Locked! Complete Gate 4: Direct Equity Trading to unlock the trading terminal.');
      return;
    }
    if (quantity <= 0) {
      showToast(false, 'Quantity must be greater than 0');
      return;
    }
    const res = onPlaceOrder({
      symbol: selectedSymbol,
      side: orderSide,
      order_type: orderType,
      quantity: Number(quantity),
      limit_price: orderType === 'LIMIT' ? Number(limitPrice) : undefined
    });
    showToast(res.success, res.message);
  };

  const filteredQuotes = quotes.filter(q => {
    const matchesSearch = q.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || q.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === 'ALL' || q.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const activePosition = positions.find(p => p.symbol === selectedSymbol);
  const totalInvested = positions.reduce((acc, p) => acc + p.invested_value, 0);
  const totalHoldingsValue = positions.reduce((acc, p) => acc + p.current_value, 0);
  const totalUnrealizedPnl = positions.reduce((acc, p) => acc + p.unrealized_pnl, 0);
  const totalPortfolioNetWorth = virtualCash + totalHoldingsValue;

  const orderPrice = orderType === 'LIMIT' ? limitPrice : activeStock.price;
  const estimatedTotal = orderPrice * quantity;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {feedbackToast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border transition-all animate-bounce ${
          feedbackToast.success 
            ? 'bg-emerald-50 dark:bg-emerald-950/90 text-emerald-800 dark:text-emerald-200 border-emerald-500/40' 
            : 'bg-red-50 dark:bg-red-950/90 text-red-800 dark:text-red-200 border-red-500/40'
        }`}>
          {feedbackToast.success ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <AlertCircle className="w-5 h-5 text-red-500" />}
          <span className="text-sm font-semibold">{feedbackToast.message}</span>
        </div>
      )}

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Net Worth</span>
          <div className="text-2xl font-black text-slate-900 dark:text-slate-100 font-mono mt-1">
            ₹{totalPortfolioNetWorth.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </div>
          <div className="flex items-center gap-1.5 mt-1 text-xs">
            <span className="text-slate-500">Starting:</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">₹10,00,000</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Available Virtual Cash</span>
          <div className="text-2xl font-black text-slate-900 dark:text-slate-100 font-mono mt-1">
            ₹{virtualCash.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Invested: ₹{totalHoldingsValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Unrealized P&L</span>
          <div className={`text-2xl font-black font-mono mt-1 flex items-center gap-1 ${
            totalUnrealizedPnl >= 0 ? 'text-emerald-500' : 'text-red-500'
          }`}>
            {totalUnrealizedPnl >= 0 ? '+' : ''}₹{totalUnrealizedPnl.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
          </div>
          <div className="text-xs font-semibold text-slate-500 mt-1">
            {totalInvested > 0 ? `${((totalUnrealizedPnl / totalInvested) * 100).toFixed(2)}% ROI` : 'No active holdings'}
          </div>
        </div>

        {/* Market Scenarios Controller */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-500/10 to-amber-500/5 dark:bg-[#111827] border border-orange-500/30 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" /> Market Regime
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-600 dark:text-orange-400 font-bold font-mono">
              {marketRegime}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-1.5 mt-2">
            {[
              { id: 'NORMAL', label: 'Normal 📈' },
              { id: 'BULL', label: 'Bull Run 🚀' },
              { id: 'BEAR', label: 'Bear Dip 📉' },
              { id: 'HIGH_VOLATILITY', label: 'High Vol ⚡' },
            ].map(r => (
              <button
                key={r.id}
                onClick={() => setMarketRegime(r.id)}
                className={`text-[11px] font-semibold py-1 px-2 rounded-lg border transition-all ${
                  marketRegime === r.id
                    ? 'bg-orange-500 text-white border-orange-500 shadow-sm'
                    : 'bg-white/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-orange-50 dark:hover:bg-slate-700'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gate Alert */}
      {!isEquityUnlocked && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 border border-amber-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                Knowledge Gate Active: Direct Equity Trading is Locked
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                To prevent reckless gambling, you must clear <strong>Gate 4: Direct Equity Trading</strong> before executing live orders.
              </p>
            </div>
          </div>
          <button
            onClick={openGates}
            className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold shadow-md shadow-orange-500/25 whitespace-nowrap"
          >
            Unlock Gate in Knowledge Tree →
          </button>
        </div>
      )}

      {/* Main Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Watchlist */}
        <div className="lg:col-span-3 space-y-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Market Watchlist</h3>
              <span className="text-[11px] font-mono text-emerald-500 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /> LIVE
              </span>
            </div>

            <div className="relative mb-3">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search stocks, indices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl text-xs bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-none">
              {['ALL', 'Index', 'LargeCap', 'MidCap', 'ETF'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-lg transition-all ${
                    categoryFilter === cat
                      ? 'bg-orange-500 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="space-y-1.5 max-h-[480px] overflow-y-auto pr-1">
              {filteredQuotes.map((stock) => {
                const isSelected = stock.symbol === selectedSymbol;
                const isPositive = stock.change >= 0;
                return (
                  <div
                    key={stock.symbol}
                    onClick={() => setSelectedSymbol(stock.symbol)}
                    className={`p-2.5 rounded-xl cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-orange-50 dark:bg-orange-500/10 border-orange-500/50 shadow-sm'
                        : 'bg-slate-50/50 dark:bg-slate-800/40 border-transparent hover:border-slate-200 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-xs text-slate-900 dark:text-slate-100">{stock.symbol}</span>
                          <span className="text-[9px] px-1 py-0.2 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 font-mono">
                            {stock.category}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[130px]">
                          {stock.name}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-mono font-bold text-xs text-slate-900 dark:text-slate-100">
                          ₹{stock.price.toFixed(2)}
                        </div>
                        <div className={`text-[10px] font-bold font-mono flex items-center justify-end gap-0.5 ${
                          isPositive ? 'text-emerald-500' : 'text-red-500'
                        }`}>
                          {isPositive ? '+' : ''}{stock.change_pct.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Center: Chart */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                    {activeStock.symbol}
                  </h2>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {activeStock.name}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-2xl font-black font-mono text-slate-900 dark:text-slate-100">
                    ₹{activeStock.price.toFixed(2)}
                  </span>
                  <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded-md flex items-center gap-0.5 ${
                    activeStock.change >= 0 
                      ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10' 
                      : 'text-red-600 dark:text-red-400 bg-red-500/10'
                  }`}>
                    {activeStock.change >= 0 ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                    {activeStock.change >= 0 ? '+' : ''}{activeStock.change.toFixed(2)} ({activeStock.change_pct.toFixed(2)}%)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                  {(['1D', '1W', '1M', '1Y'] as const).map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setChartTimeframe(tf)}
                      className={`text-xs font-bold px-2.5 py-1 rounded-lg transition-all ${
                        chartTimeframe === tf
                          ? 'bg-orange-500 text-white shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activeStock.history}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={activeStock.change >= 0 ? "#10B981" : "#EF4444"} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={activeStock.change >= 0 ? "#10B981" : "#EF4444"} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" stroke="#94A3B8" fontSize={10} tickLine={false} />
                  <YAxis domain={['auto', 'auto']} stroke="#94A3B8" fontSize={10} tickLine={false} orientation="right" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1E293B', 
                      borderColor: '#334155', 
                      borderRadius: '12px', 
                      color: '#F8FAFC',
                      fontSize: '12px',
                      fontFamily: 'monospace'
                    }}
                    formatter={(val: any) => [`₹${Number(val).toFixed(2)}`, 'Price']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="price" 
                    stroke={activeStock.change >= 0 ? "#10B981" : "#EF4444"} 
                    strokeWidth={2.5}
                    fillOpacity={1} 
                    fill="url(#colorPrice)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                <span className="text-slate-500 dark:text-slate-400 block text-[10px]">24h High</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">₹{activeStock.high.toFixed(2)}</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                <span className="text-slate-500 dark:text-slate-400 block text-[10px]">24h Low</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">₹{activeStock.low.toFixed(2)}</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                <span className="text-slate-500 dark:text-slate-400 block text-[10px]">P/E Ratio</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{activeStock.pe_ratio || 'N/A'}</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Market Cap</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                  {activeStock.market_cap_cr ? `₹${(activeStock.market_cap_cr / 1000).toFixed(1)}k Cr` : 'ETF'}
                </span>
              </div>
            </div>
          </div>

          {/* Holdings */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-orange-500" /> Active Holdings ({positions.length})
              </h3>
              <span className="text-xs text-slate-500">Live P&L</span>
            </div>

            {positions.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs">
                No active positions held. Select an instrument on the watchlist to execute a paper trade.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 text-[10px] uppercase">
                      <th className="pb-2 font-semibold">Instrument</th>
                      <th className="pb-2 font-semibold">Qty</th>
                      <th className="pb-2 font-semibold">Avg Buy</th>
                      <th className="pb-2 font-semibold">CMP</th>
                      <th className="pb-2 font-semibold">Value</th>
                      <th className="pb-2 font-semibold">P&L</th>
                      <th className="pb-2 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
                    {positions.map((pos) => {
                      const isProfit = pos.unrealized_pnl >= 0;
                      return (
                        <tr key={pos.symbol} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                          <td className="py-2.5 font-bold text-slate-900 dark:text-slate-100 font-sans">
                            {pos.symbol}
                          </td>
                          <td className="py-2.5 text-slate-700 dark:text-slate-300">{pos.quantity}</td>
                          <td className="py-2.5 text-slate-700 dark:text-slate-300">₹{pos.avg_price.toFixed(2)}</td>
                          <td className="py-2.5 text-slate-900 dark:text-slate-100 font-bold">₹{pos.current_price.toFixed(2)}</td>
                          <td className="py-2.5 text-slate-900 dark:text-slate-100">₹{pos.current_value.toFixed(2)}</td>
                          <td className={`py-2.5 font-bold ${isProfit ? 'text-emerald-500' : 'text-red-500'}`}>
                            {isProfit ? '+' : ''}₹{pos.unrealized_pnl.toFixed(2)} ({isProfit ? '+' : ''}{pos.unrealized_pnl_pct.toFixed(2)}%)
                          </td>
                          <td className="py-2.5 text-right">
                            <button
                              onClick={() => onSquareOff(pos.symbol)}
                              className="px-2.5 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 font-bold text-[10px] transition-colors"
                            >
                              Exit All
                            </button>
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

        {/* Right: Order Pad */}
        <div className="lg:col-span-3 space-y-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Order Terminal</h3>
              <span className="text-[11px] font-mono text-slate-500">Live order pad</span>
            </div>

            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
              <button
                type="button"
                onClick={() => setOrderSide('BUY')}
                className={`py-2 rounded-lg font-bold text-xs transition-all ${
                  orderSide === 'BUY'
                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                BUY / LONG
              </button>
              <button
                type="button"
                onClick={() => setOrderSide('SELL')}
                className={`py-2 rounded-lg font-bold text-xs transition-all ${
                  orderSide === 'SELL'
                    ? 'bg-red-500 text-white shadow-md shadow-red-500/25'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                SELL / SHORT
              </button>
            </div>

            <form onSubmit={handleOrderSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Order Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['MARKET', 'LIMIT'] as const).map(ot => (
                    <button
                      key={ot}
                      type="button"
                      onClick={() => setOrderType(ot)}
                      className={`py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                        orderType === ot
                          ? 'border-orange-500 bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold'
                          : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {ot}
                    </button>
                  ))}
                </div>
              </div>

              {orderType === 'LIMIT' && (
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Limit Price (₹)</label>
                  <input
                    type="number"
                    step="0.05"
                    value={limitPrice}
                    onChange={(e) => setLimitPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl text-sm font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              )}

              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-slate-500 dark:text-slate-400">Quantity</span>
                  {activePosition && (
                    <span className="text-slate-500">Held: {activePosition.quantity}</span>
                  )}
                </div>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-3 py-2 rounded-xl text-sm font-mono font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <div className="grid grid-cols-4 gap-1 pt-1">
                  {[25, 50, 75, 100].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => {
                        if (orderSide === 'BUY') {
                          const maxAffordable = Math.floor((virtualCash * (pct / 100)) / (orderPrice || 1));
                          setQuantity(Math.max(1, maxAffordable));
                        } else if (activePosition) {
                          setQuantity(Math.max(1, Math.floor(activePosition.quantity * (pct / 100))));
                        }
                      }}
                      className="py-1 text-[10px] font-bold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-orange-500 hover:text-white transition-colors"
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>CMP:</span>
                  <span className="font-mono text-slate-800 dark:text-slate-200">₹{orderPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Order Cost:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
                    ₹{estimatedTotal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between text-slate-500 border-t border-slate-200 dark:border-slate-700 pt-1">
                  <span>Cash Left:</span>
                  <span className="font-mono text-slate-700 dark:text-slate-300">
                    ₹{virtualCash.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className={`w-full py-3 rounded-xl font-bold text-xs text-white shadow-lg transition-all transform active:scale-95 ${
                  orderSide === 'BUY'
                    ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/25'
                    : 'bg-red-500 hover:bg-red-600 shadow-red-500/25'
                }`}
              >
                {orderSide === 'BUY' ? `Buy ${quantity} ${activeStock.symbol}` : `Sell ${quantity} ${activeStock.symbol}`}
              </button>
            </form>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-slate-900 dark:text-slate-100 block">Reset Simulator</span>
              <span className="text-[11px] text-slate-500">Restore ₹10,00,000 cash balance</span>
            </div>
            <button
              onClick={onResetPortfolio}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
              title="Reset Virtual Portfolio"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
