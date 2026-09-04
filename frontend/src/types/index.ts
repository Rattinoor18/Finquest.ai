export type MarketRegime = 'NORMAL' | 'BULL' | 'BEAR' | 'HIGH_VOLATILITY';

export interface StockQuote {
  symbol: string;
  name: string;
  category: 'LargeCap' | 'MidCap' | 'Index' | 'Commodity' | 'ETF';
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

export interface OrderRequest {
  symbol: string;
  side: 'BUY' | 'SELL';
  order_type: 'MARKET' | 'LIMIT' | 'SL';
  quantity: number;
  limit_price?: number;
  trigger_price?: number;
}

export interface Position {
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

export interface TradeRecord {
  id: string;
  timestamp: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  order_type: string;
  quantity: number;
  price: number;
  total_amount: number;
  pnl?: number | null;
}

export interface PortfolioSummary {
  initial_capital: number;
  cash_balance: number;
  invested_amount: number;
  total_portfolio_value: number;
  total_unrealized_pnl: number;
  total_unrealized_pnl_pct: number;
  total_realized_pnl: number;
  positions: Position[];
  trades_count: number;
  financial_health_score: number;
  asset_allocation: Record<string, number>;
}

export interface KnowledgeGate {
  id: string;
  title: string;
  category: string;
  level: number;
  requiredStage: number;
  isUnlocked: boolean;
  isCompleted: boolean;
  unlocksInstrument: string;
  summary: string;
  keyTakeaways: string[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface LifeStage {
  id: number;
  title: string;
  ageRange: string;
  statusTitle: string;
  monthlyIncome: number;
  mandatoryExpenses: {
    rent: number;
    food: number;
    utilities: number;
    emi?: number;
    insurance?: number;
  };
  unlockedInstruments: string[];
  description: string;
  dilemma: {
    title: string;
    description: string;
    options: Array<{
      text: string;
      cashImpact: number;
      fhsImpact: number;
      xpReward: number;
      explanation: string;
    }>;
  };
}

export interface MistakeScenario {
  id: string;
  title: string;
  badge: string;
  hook: string;
  description: string;
  options: Array<{
    choice: string;
    isMistake: boolean;
    consequenceMonths: Array<{
      month: string;
      balanceOrLoss: number;
      stressLevel: string;
      note: string;
    }>;
    takeawayLesson: string;
  }>;
}

export interface ScamScenario {
  id: string;
  platform: 'WhatsApp' | 'Telegram' | 'SMS';
  sender: string;
  senderAvatar: string;
  messages: Array<{
    sender: string;
    text: string;
    time: string;
    isIncoming: boolean;
  }>;
  redFlags: string[];
  isScam: boolean;
  explanation: string;
}
