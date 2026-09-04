import { useState, useEffect } from 'react';
import { StockQuote, OrderRequest, Position, TradeRecord, PortfolioSummary, KnowledgeGate, LifeStage, MistakeScenario, ScamScenario } from '../types';

export const INITIAL_GATES: KnowledgeGate[] = [
  {
    id: 'gate-1',
    title: 'Budgeting, UPI & Emergency Cushion',
    category: 'Foundations',
    level: 1,
    requiredStage: 1,
    isUnlocked: true,
    isCompleted: true,
    unlocksInstrument: 'Savings Account & UPI',
    summary: 'Master cashflow tracking and the 50/30/20 rule before making any investment.',
    keyTakeaways: [
      '50% for Needs, 30% for Wants, 20% for Savings & Investments.',
      'Always maintain 3-6 months of basic living expenses in liquid savings.',
      'UPI makes micro-spending effortless — track daily outflows to prevent impulse leakage.'
    ],
    quiz: {
      question: 'What is the primary purpose of an Emergency Fund?',
      options: [
        'To invest in quick-return penny stocks during market dips',
        'To cover 3-6 months of mandatory living expenses without touching investments',
        'To earn maximum compound interest above 15% per year',
        'To pay for luxury impulse purchases without taking personal loans'
      ],
      correctIndex: 1,
      explanation: 'An emergency fund is your financial shield. It prevents you from selling long-term investments at a loss when unexpected life shocks hit.'
    }
  },
  {
    id: 'gate-2',
    title: 'Fixed Deposits (FD) & Debt Safety',
    category: 'Fixed Income',
    level: 2,
    requiredStage: 1,
    isUnlocked: true,
    isCompleted: false,
    unlocksInstrument: 'Fixed Deposits (FD) & Recurring Deposits (RD)',
    summary: 'Understand guaranteed capital preservation, inflation erosion, and deposit compounding.',
    keyTakeaways: [
      'FDs provide guaranteed return (6.5-7.5%) with zero market volatility.',
      'FD interest is taxable according to your income tax slab.',
      'Use FDs for short-term goals (<3 years) and emergency buffer storage.'
    ],
    quiz: {
      question: 'If inflation is 6% and your FD gives 7% before tax, why is it risky for 20-year wealth building?',
      options: [
        'Banks can default and lose all your money at any moment',
        'Post-tax real return is near zero (~0.5%), meaning purchasing power barely grows',
        'FDs force you to pay double tax on principal',
        'FD interest rates change daily based on stock market indices'
      ],
      correctIndex: 1,
      explanation: 'After paying income tax, real returns from FDs struggle to beat inflation over decades. Equity is needed for real wealth multiplication.'
    }
  },
  {
    id: 'gate-3',
    title: 'Mutual Funds, Indexing & The Magic of SIP',
    category: 'Mutual Funds',
    level: 3,
    requiredStage: 2,
    isUnlocked: false,
    isCompleted: false,
    unlocksInstrument: 'Mutual Funds & Index SIPs',
    summary: 'Harness Rupee-Cost Averaging and broad diversification through India\'s top 50 companies.',
    keyTakeaways: [
      'A Systematic Investment Plan (SIP) buys more units during market dips and fewer at peaks.',
      'Nifty 50 Index funds offer rock-bottom expense ratios (<0.1%) with broad sector diversification.',
      'Compounding needs time: 15% CAGR doubles your money every ~5 years (Rule of 72).'
    ],
    quiz: {
      question: 'Why does Rupee-Cost Averaging via SIP benefit a young investor during a market crash?',
      options: [
        'It automatically cancels your order so you never lose money',
        'It purchases MORE mutual fund units at discounted prices with the same monthly amount',
        'It guarantees a minimum 25% return fixed by SEBI',
        'It switches your funds into physical real estate automatically'
      ],
      correctIndex: 1,
      explanation: 'When markets drop, your fixed monthly SIP amount buys units on discount. When the market recovers, those extra units accelerate compounding!'
    }
  },
  {
    id: 'gate-4',
    title: 'Direct Equity Trading & Risk Management',
    category: 'Equities & Trading',
    level: 4,
    requiredStage: 2,
    isUnlocked: false,
    isCompleted: false,
    unlocksInstrument: 'Direct Stock Paper Trading Terminal',
    summary: 'Learn position sizing, Stop-Loss triggers, market psychology, and avoid FOMO gambling.',
    keyTakeaways: [
      'Never put more than 15-20% of your net portfolio in any single company.',
      'Always set a Stop-Loss before entering a swing trade to limit downside.',
      'Price follows business earnings over long horizons; short-term volatility is noise.'
    ],
    quiz: {
      question: 'What is the biggest risk of having 60% of your portfolio in a single trendy stock?',
      options: [
        'SEBI will freeze your account for lack of diversification',
        'Company-specific catastrophe or poor earnings can wipe out years of wealth gains',
        'You will be charged triple brokerage fees on order execution',
        'The stock exchange will force you to become a board director'
      ],
      correctIndex: 1,
      explanation: 'Concentration risk exposes you to single-company ruin. Diversification protects your net worth while letting winning businesses compound.'
    }
  },
  {
    id: 'gate-5',
    title: 'Advanced Allocation, Insurance & Tax Strategy',
    category: 'Wealth Mastery',
    level: 5,
    requiredStage: 3,
    isUnlocked: false,
    isCompleted: false,
    unlocksInstrument: 'Advanced Portfolio Rebalancing, Gold ETFs & PPF',
    summary: 'Protect your family wealth with Term & Health insurance, EPF/PPF, and asset rebalancing.',
    keyTakeaways: [
      'Insurance is for risk protection, not investment (Avoid traditional endowment / ULIP traps).',
      'PPF and EPF offer sovereign guaranteed tax-free compounding (EEE status).',
      'Annual rebalancing (e.g. 70% Equity / 20% Debt / 10% Gold) locks in profits during bull tops.'
    ],
    quiz: {
      question: 'Why should pure Term Insurance and Health Insurance be purchased separately from investments?',
      options: [
        'Because investment-linked insurance products (ULIPs/Endowments) charge high hidden commissions and give poor 4-5% returns',
        'Because Indian law bans investing in mutual funds if you have insurance',
        'Because health insurance pays cash bonuses every single month',
        'Because term insurance automatically pays off your home loan within 3 months'
      ],
      correctIndex: 0,
      explanation: 'Pure term and health insurance give massive cover for tiny premiums. Keep insurance and investing strictly separate to maximize both safety and wealth.'
    }
  }
];

export const LIFE_STAGES: LifeStage[] = [
  {
    id: 1,
    title: 'College Student',
    ageRange: '18 - 22 Years',
    statusTitle: 'Building Financial Foundations',
    monthlyIncome: 12000,
    mandatoryExpenses: {
      rent: 4500,
      food: 3500,
      utilities: 1000
    },
    unlockedInstruments: ['Savings Account', 'UPI Apps', 'Micro-FD'],
    description: 'You are living on pocket money and stipend. Your primary goal is avoiding debt, setting up your first emergency buffer of ₹25,000, and building healthy spending habits.',
    dilemma: {
      title: 'Dilemma: Flash Sale vs First Emergency Buffer',
      description: 'The Great Indian Festival sale is live. A flagship smartphone is available at ₹10,000 off with a "No Cost EMI" offer of ₹3,500/month for 6 months. Your savings account has ₹15,000.',
      options: [
        {
          text: 'Buy the phone on 6-month EMI — it is a great discount!',
          cashImpact: -3500,
          fhsImpact: -45,
          xpReward: 30,
          explanation: 'Trapped cashflow! At ₹12k income, committing ₹3.5k (30% of income) to EMI leaves zero margin for emergencies. You risk defaulting.'
        },
        {
          text: 'Pass on the phone, put ₹5,000 into a liquid emergency FD, and keep ₹10k liquid.',
          cashImpact: 0,
          fhsImpact: +60,
          xpReward: 120,
          explanation: 'Masterful discipline! You protected your cashflow and established your first emergency fortress. Compound interest begins with delayed gratification.'
        }
      ]
    }
  },
  {
    id: 2,
    title: 'First Job / Young Professional',
    ageRange: '23 - 26 Years',
    statusTitle: 'Cashflow Acceleration & First SIP',
    monthlyIncome: 55000,
    mandatoryExpenses: {
      rent: 16000,
      food: 10000,
      utilities: 4000,
      insurance: 1500
    },
    unlockedInstruments: ['Savings', 'Fixed Deposits', 'Mutual Funds / SIP', 'Credit Card', 'EPF'],
    description: 'You landed your first corporate job in Bengaluru/Gurugram! Monthly salary is ₹55,000 in hand. You have your first Credit Card and must start your wealth compounding journey.',
    dilemma: {
      title: 'Dilemma: First Bonus Allocation',
      description: 'You received a year-end performance bonus of ₹75,000! Your credit card has a pending balance of ₹35,000 from moving expenses.',
      options: [
        {
          text: 'Pay only the Minimum Due (₹2,500) and invest ₹70,000 into trendy meme crypto/stocks.',
          cashImpact: -2500,
          fhsImpact: -70,
          xpReward: 20,
          explanation: 'Credit card balance will now compound against you at 42% APR! Even a 20% stock return cannot outrun a 42% debt penalty.'
        },
        {
          text: 'Pay off the ₹35,000 credit card in FULL, and put the remaining ₹40,000 into a Nifty 50 SIP.',
          cashImpact: -35000,
          fhsImpact: +85,
          xpReward: 150,
          explanation: 'Flawless move! Eliminating 42% APR debt is an instant guaranteed 42% risk-free return. The remaining ₹40k starts compounding in the index.'
        }
      ]
    }
  },
  {
    id: 3,
    title: 'Family Life & Mid-Career',
    ageRange: '27 - 34 Years',
    statusTitle: 'Asset Allocation & Family Shield',
    monthlyIncome: 140000,
    mandatoryExpenses: {
      rent: 32000,
      food: 20000,
      utilities: 8000,
      emi: 35000,
      insurance: 5000
    },
    unlockedInstruments: ['All Equity', 'Index SIP', 'Home Loan', 'Term & Health Cover', 'Gold ETF', 'PPF'],
    description: 'Higher income with higher responsibilities! You are managing a home loan, child education planning, term insurance, and a growing investment portfolio.',
    dilemma: {
      title: 'Dilemma: The Market Crash Test',
      description: 'Global geopolitical tensions cause the Nifty 50 to tumble 16% in 3 weeks. Financial news anchors predict a massive recession. Your SIP portfolio is showing ₹85,000 in red.',
      options: [
        {
          text: 'Panic and stop all SIPs, redeem all mutual funds to prevent further losses.',
          cashImpact: 0,
          fhsImpact: -80,
          xpReward: 20,
          explanation: 'Classic retail mistake! You locked in a temporary paper loss and missed the highest-return accumulation phase of the market cycle.'
        },
        {
          text: 'Stay calm, continue existing SIPs, and deploy ₹25,000 extra cash on discount.',
          cashImpact: -25000,
          fhsImpact: +90,
          xpReward: 180,
          explanation: 'Legendary Warren Buffett discipline: "Be greedy when others are fearful." Buying units at a 16% discount supercharges 5-year compounding.'
        }
      ]
    }
  },
  {
    id: 4,
    title: 'Wealth Building & Independence',
    ageRange: '35+ Years',
    statusTitle: 'Financial Freedom & Legacy',
    monthlyIncome: 280000,
    mandatoryExpenses: {
      rent: 45000,
      food: 30000,
      utilities: 12000,
      emi: 0,
      insurance: 10000
    },
    unlockedInstruments: ['All Instruments', 'Direct Equities', 'Debt Funds', 'Sovereign Gold Bonds', 'PPF/NPS'],
    description: 'Debt-free milestone reached! Your passive investments generate significant cashflow. Focus on asset rebalancing, capital preservation, and early retirement corpus.',
    dilemma: {
      title: 'Dilemma: Portfolio Rebalancing at All-Time Highs',
      description: 'Your equity allocation has surged to 85% of your total net worth due to a multi-year bull run. The recommended target is 65% Equity, 25% Debt, 10% Gold.',
      options: [
        {
          text: 'Keep 100% in equity because stocks only go up!',
          cashImpact: 0,
          fhsImpact: -40,
          xpReward: 40,
          explanation: 'Over-concentration in late-stage bull market increases vulnerability to sudden 30% corrections without a safe debt anchor.'
        },
        {
          text: 'Rebalance by trimming 15% equity profits into High-Yield Debt Funds & Gold ETF.',
          cashImpact: 0,
          fhsImpact: +95,
          xpReward: 200,
          explanation: 'Institutional wealth management! You locked in equity gains at the top and fortified your portfolio against the next market cycle.'
        }
      ]
    }
  }
];

export const MISTAKE_SCENARIOS: MistakeScenario[] = [
  {
    id: 'mistake-1',
    title: 'The "Minimum Due" Credit Card Trap',
    badge: 'High-Cost Debt Spiral',
    hook: 'How a ₹50,000 laptop purchase turns into a ₹1,40,000 endless debt trap.',
    description: 'You bought a ₹50,000 laptop on your credit card. The statement arrives: "Total Due: ₹50,000 | Minimum Due: ₹2,500". The bank says paying ₹2,500 keeps your card active.',
    options: [
      {
        choice: 'Trap Path: Pay only ₹2,500 (Minimum Due) each month',
        isMistake: true,
        consequenceMonths: [
          { month: 'Month 1', balanceOrLoss: 49200, stressLevel: 'Mild', note: 'Interest of 3.5% (42% annual) added on remaining balance + new tax.' },
          { month: 'Month 6', balanceOrLoss: 46800, stressLevel: 'Moderate', note: 'You have paid ₹15,000 in cash, but principal only reduced by ₹3,200!' },
          { month: 'Month 18', balanceOrLoss: 39500, stressLevel: 'High', note: 'Paid ₹45,000 total already. Still owe ₹39,500. Credit score dropped 65 points.' },
          { month: 'Month 36', balanceOrLoss: 18000, stressLevel: 'Severe', note: 'Total money paid: ₹90,000 for a ₹50,000 laptop. Massive loss to compounding.' }
        ],
        takeawayLesson: 'Banks make billions because Minimum Due covers almost entirely interest and barely touches principal. ALWAYS pay the full statement balance.'
      },
      {
        choice: 'Wise Path: Pay the entire ₹50,000 statement in full before due date',
        isMistake: false,
        consequenceMonths: [
          { month: 'Month 1', balanceOrLoss: 0, stressLevel: 'Zero', note: '₹0 interest charged! Enjoyed 45 days of free interest-free credit.' },
          { month: 'Month 6', balanceOrLoss: 0, stressLevel: 'Zero', note: 'Credit score climbs to 790+. Saved ₹40,000+ in potential finance charges.' },
          { month: 'Month 18', balanceOrLoss: 0, stressLevel: 'Zero', note: 'Freed monthly cashflow deployed into index SIP compounding.' }
        ],
        takeawayLesson: 'Credit cards are an incredible financial tool if used like a debit card (full balance paid every billing cycle) to earn rewards and build high credit rating.'
      }
    ]
  },
  {
    id: 'mistake-2',
    title: 'The Market Crash Panic Sell',
    badge: 'Emotional Investing Error',
    hook: 'Locking in permanent capital loss during a routine market correction.',
    description: 'You invested ₹2,00,000 in an equity index fund. A sudden global recession news hits and the market crashes 20% in 30 days. Your balance drops to ₹1,60,000.',
    options: [
      {
        choice: 'Trap Path: Panic sell everything to "save what is left"',
        isMistake: true,
        consequenceMonths: [
          { month: 'Day 30 (Crash)', balanceOrLoss: 160000, stressLevel: 'Extreme', note: 'Sold at rock bottom. Converted temporary paper loss into permanent ₹40,000 cash loss.' },
          { month: 'Month 6', balanceOrLoss: 160000, stressLevel: 'Regret', note: 'Market bounces back +28%. Your cash sat in savings earning 3% while market surged.' },
          { month: 'Year 2', balanceOrLoss: 160000, stressLevel: 'Frustration', note: 'Index reaches all-time high. If you had stayed invested, portfolio would be ₹2,60,000.' }
        ],
        takeawayLesson: 'Volatility is the admission price for equity returns. Markets historically recover and reach new highs. Never sell in panic.'
      },
      {
        choice: 'Wise Path: Stay invested and continue your monthly SIP',
        isMistake: false,
        consequenceMonths: [
          { month: 'Day 30 (Crash)', balanceOrLoss: 160000, stressLevel: 'Calm', note: 'Paper loss of ₹40k ignored. SIP continues buying units at 20% discount.' },
          { month: 'Month 6', balanceOrLoss: 215000, stressLevel: 'Confident', note: 'Market begins recovery. Discounted units supercharge portfolio gains.' },
          { month: 'Year 2', balanceOrLoss: 285000, stressLevel: 'Wealthy', note: 'Portfolio surges to ₹2,85,000 (+42.5% total return). Discipline rewarded.' }
        ],
        takeawayLesson: 'Dollar-Cost Averaging through market crashes is how generational wealth is created. Time in the market always beats timing the market.'
      }
    ]
  },
  {
    id: 'mistake-3',
    title: 'Zero Emergency Cushion & Medical Shock',
    badge: 'Liquidity Crisis',
    hook: 'How having no liquid cash forces distress sale of investments at the worst time.',
    description: 'You invested 100% of your savings (₹3,00,000) into volatile equities. An unexpected medical surgery costing ₹1,50,000 occurs during a market dip when your stocks are down 25%.',
    options: [
      {
        choice: 'Trap Path: No emergency fund or health insurance — forced liquidation',
        isMistake: true,
        consequenceMonths: [
          { month: 'Day 1', balanceOrLoss: 75000, stressLevel: 'Severe', note: 'Forced to sell ₹1.5L worth of beaten-down stock at 25% loss to pay hospital cash.' },
          { month: 'Month 6', balanceOrLoss: 95000, stressLevel: 'High', note: 'Portfolio crushed. Lost compound momentum and left with no safety net.' }
        ],
        takeawayLesson: 'Always maintain 6 months of expenses in liquid savings/FD AND have comprehensive Health Insurance BEFORE investing in equity.'
      },
      {
        choice: 'Wise Path: Paid from dedicated Emergency Fund + Health Insurance',
        isMistake: false,
        consequenceMonths: [
          { month: 'Day 1', balanceOrLoss: 225000, stressLevel: 'Safe', note: 'Health insurance covers ₹1.2L, emergency cash covers ₹30k. Zero stocks sold!' },
          { month: 'Month 6', balanceOrLoss: 290000, stressLevel: 'Peace', note: 'Investments continued compounding untouched while you replenished emergency buffer.' }
        ],
        takeawayLesson: 'Emergency liquidity is the fortress that protects your long-term compounding engine from real-world shocks.'
      }
    ]
  }
];

export const SCAM_SCENARIOS: ScamScenario[] = [
  {
    id: 'scam-1',
    platform: 'WhatsApp',
    sender: '+91 98765 43210 (VIP Stock Profits)',
    senderAvatar: '📈',
    messages: [
      { sender: 'Scammer', text: 'Hello Sir/Madam! Congratulations! You are selected for our exclusive SEBI Approved High-Yield Institutional Trading Group.', time: '10:14 AM', isIncoming: true },
      { sender: 'Scammer', text: '🔥 GUARANTEED 25% - 35% MONTHLY RETURN with zero risk! Our AI institutional algorithm trades Nifty options with 100% accuracy.', time: '10:15 AM', isIncoming: true },
      { sender: 'Scammer', text: 'Deposit ₹10,000 today on this UPI ID: profitguru99@ybl and receive ₹13,500 directly in your bank account tomorrow morning. Limited slots!', time: '10:16 AM', isIncoming: true }
    ],
    redFlags: [
      'Promises "GUARANTEED" 25-35% monthly returns (Annualized 300%+ is impossible and illegal)',
      'Claims "Zero Risk" in options trading (Options have 90%+ retail loss probability)',
      'Asks for direct UPI payment to a personal ID rather than SEBI registered broker account',
      'Uses artificial urgency ("Limited slots!")'
    ],
    isScam: true,
    explanation: 'This is a classic Ponzi / Advance-Fee Investment Scam. SEBI strictly forbids anyone from guaranteeing returns in the stock market. Legitimate registered entities never ask for direct personal UPI transfers.'
  },
  {
    id: 'scam-2',
    platform: 'Telegram',
    sender: 'HR Priya - Google Reviews Task',
    senderAvatar: '💼',
    messages: [
      { sender: 'Scammer', text: 'Hi! Are you looking for Part-Time Work From Home? Earn ₹3,000 - ₹8,000 daily by simply rating 5-star reviews on Google Maps hotels!', time: '02:20 PM', isIncoming: true },
      { sender: 'Scammer', text: 'We just credited ₹150 to your UPI for completing Trial Task 1. Check your bank SMS!', time: '02:22 PM', isIncoming: true },
      { sender: 'Scammer', text: 'To unlock VIP Task Level with ₹15,000 payout, please recharge security deposit of ₹3,000 to merchant UPI.', time: '02:25 PM', isIncoming: true }
    ],
    redFlags: [
      'Pays small ₹150 initial bait to gain false psychological trust',
      'Requests "security deposit" or "recharge fee" to withdraw or unlock tasks',
      'Unrealistic daily income (₹8,000/day for 10 clicks is fraudulent)'
    ],
    isScam: true,
    explanation: 'This is the widespread "Part-Time Task Scam". Scammers pay ₹100-200 initially to lower your guard, then trick victims into sending thousands of rupees under the guise of "task deposits" which can never be withdrawn.'
  },
  {
    id: 'scam-3',
    platform: 'WhatsApp',
    sender: 'Aman (College Friend)',
    senderAvatar: '🙋‍♂️',
    messages: [
      { sender: 'Aman', text: 'Hey bro! I am sending you ₹2,000 for dinner yesterday via GooglePay. Please scan this QR code and enter your UPI PIN to accept the payment.', time: '07:45 PM', isIncoming: true }
    ],
    redFlags: [
      'Asks you to enter your UPI PIN to "RECEIVE" money',
      'Sends a QR code to receive funds (QR code scan + PIN is ONLY for paying/debiting money)'
    ],
    isScam: true,
    explanation: 'Golden UPI Rule: You NEVER need to enter your UPI PIN to receive money. Entering your PIN always DEBITS (deducts) money from your bank account.'
  }
];
