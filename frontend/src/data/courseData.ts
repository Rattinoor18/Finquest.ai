export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  readTime: string;
  summary: string;
  content: string[];
  keyTakeaways: string[];
  quiz: QuizQuestion;
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  iconName: string;
  lessons: Lesson[];
}

export const COURSE_MODULES: CourseModule[] = [
  {
    id: "module-1",
    title: "Money Basics & Cashflow Architecture",
    description: "Understand where money goes, master the 50/30/20 rule, and stop micro-leaks.",
    iconName: "Wallet",
    lessons: [
      {
        id: "lesson-1-1",
        title: "Income Streams & Cashflow Mapping",
        readTime: "5 min",
        summary: "Differentiate active vs passive income and learn how to track monthly net cashflow.",
        content: [
          "Money management does not start with investing; it starts with cashflow architecture. Most young professionals confuse income with wealth. Income is what enters your bank account; wealth is what you retain and compound.",
          "Active income requires your direct time and physical presence (salary, hourly wages, freelance client work). Passive income is generated through assets that work autonomously (dividends, rental yields, mutual fund growth).",
          "The first golden rule of personal finance: Net Cashflow = Total Inflows - Total Outflows. If this number is zero or negative, no investment strategy will ever save you from financial vulnerability."
        ],
        keyTakeaways: [
          "Track every rupee for 30 days to uncover invisible spending leaks.",
          "Focus on widening the gap between your income and mandatory burn rate.",
          "Treat savings as a non-negotiable expense that gets deducted first on salary day."
        ],
        quiz: {
          id: "q-1-1",
          question: "What is the primary difference between Income and Wealth?",
          options: [
            "Income is earned in cash, whereas wealth is only held in real estate",
            "Income is the cash flowing in, while wealth is the accumulated capital you retain and compound",
            "Income is subject to taxes, but wealth is always tax-free",
            "There is no difference; high income always guarantees high wealth"
          ],
          correctIndex: 1,
          explanation: "Income is your inflow rate, but wealth is what you preserve, invest, and grow. Someone earning ₹20 Lakhs who spends ₹20 Lakhs has zero wealth accumulation."
        }
      },
      {
        id: "lesson-1-2",
        title: "The 50/30/20 Budgeting Framework",
        readTime: "6 min",
        summary: "A battle-tested framework for balancing mandatory living needs, personal desires, and future wealth.",
        content: [
          "The 50/30/20 rule, popularized by bankruptcy experts and financial planners, creates clear guardrails for your post-tax monthly income.",
          "50% for Needs: Absolute essentials required for survival and contractually obligated expenses. This includes rent/mortgage, basic groceries, utilities (water, electricity), minimum debt payments, and basic healthcare.",
          "30% for Wants: Discretionary lifestyle choices that enhance life quality but aren't strictly necessary. Examples: weekend dining out, OTT streaming subscriptions, vacations, premium apparel, and gadgets.",
          "20% for Savings & Investments: Capital allocated to secure your future. This funds your 6-month emergency buffer, index fund SIPs, debt pre-payments, and retirement accounts."
        ],
        keyTakeaways: [
          "Needs should never exceed 50% of your take-home pay. If they do, downsize fixed commitments.",
          "Wants are flexible—cut them first whenever financial shocks hit.",
          "The 20% savings rule is a floor, not a ceiling. Aim to increase it to 30-40% as your career advances."
        ],
        quiz: {
          id: "q-1-2",
          question: "If your monthly take-home salary is ₹60,000, what is the ideal allocation under the 50/30/20 rule?",
          options: [
            "Needs: ₹20,000 | Wants: ₹20,000 | Savings: ₹20,000",
            "Needs: ₹30,000 | Wants: ₹18,000 | Savings: ₹12,000",
            "Needs: ₹40,000 | Wants: ₹15,000 | Savings: ₹5,000",
            "Needs: ₹15,000 | Wants: ₹30,000 | Savings: ₹15,000"
          ],
          correctIndex: 1,
          explanation: "50% of ₹60,000 = ₹30,000 (Needs), 30% = ₹18,000 (Wants), and 20% = ₹12,000 (Savings/Investments)."
        }
      },
      {
        id: "lesson-1-3",
        title: "Needs vs Wants & The 48-Hour Purchase Rule",
        readTime: "5 min",
        summary: "Overcome behavioral impulse spending triggered by e-commerce flash sales and social media pressure.",
        content: [
          "Modern marketing is engineered to disguise 'Wants' as urgent 'Needs'. A new smartphone when your current one functions smoothly is a want. High-speed internet for your remote job is a need.",
          "Impulse spending is driven by dopamine spikes rather than genuine utility. The best psychological defense is the '48-Hour Delay Rule'.",
          "Whenever you feel the urge to purchase a non-essential item costing more than ₹2,000, add it to your wishlist and wait 48 hours. In over 70% of cases, the emotional urge dissipates, saving you thousands every month."
        ],
        keyTakeaways: [
          "Marketing creates artificial scarcity ('Only 2 items left at 40% off'). Resist the urgency.",
          "Calculate purchases in work hours: 'Does this ₹6,000 jacket equal 3 full days of my desk labor?'",
          "Automate investments on day 1 so you never see disposable cash sitting idle in your checking account."
        ],
        quiz: {
          id: "q-1-3",
          question: "How does the '48-Hour Delay Rule' help prevent financial leakage?",
          options: [
            "It gives the store time to offer you a bigger discount coupon",
            "It forces banks to cancel credit card processing fees",
            "It cools down the emotional dopamine spike of impulse purchases, allowing rational utility evaluation",
            "It guarantees that the item will go out of stock so you never buy it"
          ],
          correctIndex: 2,
          explanation: "Impulse spending is driven by emotional dopamine triggers. Pausing for 48 hours restores rational evaluation of whether you truly need the item."
        }
      }
    ]
  },
  {
    id: "module-2",
    title: "Saving, Liquidity & Emergency Cushion",
    description: "Protect yourself from unexpected real-world shocks without liquidating investments at a loss.",
    iconName: "Shield",
    lessons: [
      {
        id: "lesson-2-1",
        title: "The 6-Month Emergency Shield",
        readTime: "5 min",
        summary: "Why an emergency fund is your financial seatbelt and the first milestone before any equity investing.",
        content: [
          "Life is inherently volatile: medical emergencies, sudden layoffs, vehicle breakdowns, or family obligations can strike at any moment. Without cash reserves, you are forced into high-interest debt or distress selling.",
          "Your emergency fund should cover between 3 to 6 months of mandatory expenses (Needs: rent + groceries + utilities + insurance premiums + EMIs).",
          "If your monthly burn rate is ₹35,000, your emergency target is between ₹1,05,000 and ₹2,10,000. This capital is an insurance policy for your peace of mind, not a high-return investment vehicle."
        ],
        keyTakeaways: [
          "Never invest in the stock market before establishing at least 3 months of emergency buffer.",
          "Calculate emergency sizing based on mandatory survival expenses, not lifestyle wants.",
          "A solid emergency fund prevents you from selling stocks at the bottom during a market downturn."
        ],
        quiz: {
          id: "q-2-1",
          question: "Why should an Emergency Fund NEVER be invested in direct equities or stocks?",
          options: [
            "Because stock profits are legally prohibited from being used for medical expenses",
            "Because markets can crash 20-30% exactly when an emergency occurs, forcing distress sales at the worst possible time",
            "Because banks charge a 50% penalty for withdrawing money from stock accounts",
            "Because emergency funds must only be held in physical gold coins"
          ],
          correctIndex: 1,
          explanation: "Emergencies often correlate with broader economic downturns. Liquidating equity during a crash locks in permanent capital losses."
        }
      },
      {
        id: "lesson-2-2",
        title: "Where to Park Your Emergency Capital",
        readTime: "5 min",
        summary: "Explore high-yield savings accounts, sweep-in accounts, and liquid mutual funds.",
        content: [
          "The two cardinal rules of emergency funds are Capital Preservation and Instant Liquidity. Yield/return is strictly a secondary priority.",
          "Best options for emergency storage in India:",
          "1. Sweep-in Fixed Deposits (Auto-Sweep): Your savings account automatically converts balance above a threshold into FDs earning 6.5-7.5% interest, but instantly breaks the FD if an ATM withdrawal or UPI transfer is made.",
          "2. Liquid Mutual Funds: Low-risk debt funds investing in 91-day government treasury bills with T+1 instant redemption up to ₹50,000.",
          "Keep 1 month of expenses in your primary bank account and the remaining 5 months in a sweep-in FD or dedicated liquid fund."
        ],
        keyTakeaways: [
          "Emergency funds should be accessible within 10 minutes via ATM or UPI debit card.",
          "Avoid locking emergency reserves into tax-saving fixed deposits with 5-year lock-in clauses.",
          "Separate your emergency bank account from your everyday spending account to prevent accidental spending."
        ],
        quiz: {
          id: "q-2-2",
          question: "What is the primary benefit of an Auto-Sweep (Sweep-in) Savings Account?",
          options: [
            "It gives you a free credit card with zero annual fee",
            "It earns higher FD-rate interest on idle cash while providing instant liquidity whenever money is spent",
            "It eliminates all income tax on interest earned",
            "It automatically buys Nifty 50 shares every Friday"
          ],
          correctIndex: 1,
          explanation: "Auto-sweep combines the high interest rate of Fixed Deposits with the instant liquidity and debit access of a regular savings account."
        }
      },
      {
        id: "lesson-2-3",
        title: "Inflation: The Silent Purchasing Power Destroyer",
        readTime: "6 min",
        summary: "Understand why keeping excessive idle cash in low-interest checking accounts actively destroys wealth.",
        content: [
          "While emergency capital requires safety, holding 100% of your net worth in savings accounts is a guaranteed way to lose wealth due to inflation.",
          "Inflation is the rate at which the price of goods and services rises over time. In India, consumer price inflation typically averages 5.5% to 7% annually.",
          "If a regular savings account pays 3% interest while inflation is 6%, your real purchasing power drops by 3% every year. ₹1,00,000 today will only buy ₹74,000 worth of groceries in 5 years if left idle."
        ],
        keyTakeaways: [
          "Real Return = Nominal Interest Rate - Inflation Rate - Income Taxes.",
          "Idle cash sitting in zero-return current accounts is actively decaying every single day.",
          "Once your 6-month emergency fortress is complete, deploy every surplus rupee into growth assets."
        ],
        quiz: {
          id: "q-2-3",
          question: "If inflation is 6.5% and your bank savings account pays 3.0% interest, what is your real annual return?",
          options: [
            "+9.5% real gain",
            "+3.0% real gain",
            "-3.5% real purchasing power loss",
            "Zero change"
          ],
          correctIndex: 2,
          explanation: "Real return = 3.0% - 6.5% = -3.5%. Your money is actively losing 3.5% of its real purchasing power each year."
        }
      }
    ]
  },
  {
    id: "module-3",
    title: "Banking, Fixed Income & Compounding",
    description: "Master simple vs compound interest, the Rule of 72, and debt instruments.",
    iconName: "Landmark",
    lessons: [
      {
        id: "lesson-3-1",
        title: "The Magic of Compounding & The Rule of 72",
        readTime: "6 min",
        summary: "Discover why Einstein called compound interest the 8th wonder of the world and how time beats timing.",
        content: [
          "Simple interest only earns returns on the initial principal. Compound interest earns returns on both the principal AND the accumulated interest.",
          "Formula for compound interest: A = P(1 + r/n)^(nt). In the early years, the growth curve looks linear. But after 10-15 years, the curve turns hockey-stick exponential.",
          "The Rule of 72 is a quick mental shortcut: Divide 72 by the expected annual interest rate to find out how many years it takes to double your money. At 12% returns, money doubles in 72 / 12 = 6 years!"
        ],
        keyTakeaways: [
          "Starting early is more valuable than investing huge amounts late. A 22-year-old investing ₹5,000/mo will beat a 32-year-old investing ₹15,000/mo.",
          "Compound interest needs uninterrupted time to work its mathematical miracle.",
          "The Rule of 72 helps you quickly evaluate any investment or debt payoff timeline."
        ],
        quiz: {
          id: "q-3-1",
          question: "Using the Rule of 72, approximately how long will it take an investment to double at a 12% annual return?",
          options: [
            "3 years",
            "6 years",
            "12 years",
            "72 years"
          ],
          correctIndex: 1,
          explanation: "72 divided by 12 = 6 years. At a 12% annual compounded rate, your money will double every 6 years."
        }
      },
      {
        id: "lesson-3-2",
        title: "Fixed Deposits (FD) vs Recurring Deposits (RD)",
        readTime: "5 min",
        summary: "Learn how guaranteed debt products work, their advantages, and their limitations.",
        content: [
          "Fixed Deposits (FD) involve depositing a lump sum amount for a fixed tenure (7 days to 10 years) at a guaranteed interest rate. Recurring Deposits (RD) let you deposit a fixed monthly installment instead.",
          "Fixed income instruments are backed by sovereign regulations. In India, bank deposits are insured up to ₹5,00,000 per bank per depositor by the DICGC (Deposit Insurance and Credit Guarantee Corporation).",
          "Use FDs for short-term financial goals (<3 years), such as saving for a car down payment, a semester tuition fee, or emergency buffer storage."
        ],
        keyTakeaways: [
          "FDs guarantee capital safety and predictable interest payouts.",
          "Never break FDs unnecessarily to avoid pre-mature withdrawal penalty fees (typically 0.5% - 1%).",
          "Compare senior citizen benefits: banks offer 0.5% extra interest for parents/grandparents."
        ],
        quiz: {
          id: "q-3-2",
          question: "What is the maximum bank deposit insurance provided by DICGC per depositor in an Indian bank?",
          options: [
            "₹1,00,000",
            "₹5,00,000",
            "₹10,00,000",
            "Unlimited full amount"
          ],
          correctIndex: 1,
          explanation: "The DICGC insures bank deposits (savings, FD, RD) up to ₹5 Lakhs per depositor per bank (including principal and interest)."
        }
      },
      {
        id: "lesson-3-3",
        title: "Taxes on Fixed Deposits: The Real Return Trap",
        readTime: "5 min",
        summary: "Understand TDS, income tax slabs, and why FDs fail as long-term wealth multipliers.",
        content: [
          "Many people assume an 8% Fixed Deposit means they gain 8% wealth. However, FD interest is added to your 'Income from Other Sources' and taxed at your personal income tax slab rate!",
          "If you are in the 30% tax bracket, an 8% FD leaves you with: 8% * (1 - 0.312) = 5.5% post-tax return.",
          "If inflation is 6%, your real post-tax return is 5.5% - 6.0% = -0.5%! Over 20 years, relying solely on FDs results in purchasing power erosion. That is why equity participation is mandatory for long-term goals."
        ],
        keyTakeaways: [
          "Always calculate post-tax returns when evaluating fixed-income debt products.",
          "Banks deduct TDS (Tax Deducted at Source) at 10% if interest exceeds ₹40,000 (₹50,000 for seniors).",
          "Use debt products for capital safety and equity products for wealth multiplication."
        ],
        quiz: {
          id: "q-3-3",
          question: "If you earn 7.0% on a Fixed Deposit and fall in the 30% income tax slab, what is your approximate post-tax return?",
          options: [
            "7.0%",
            "4.9%",
            "2.1%",
            "5.8%"
          ],
          correctIndex: 1,
          explanation: "7.0% * (1 - 0.30) = 4.9% post-tax return. After taxes, the nominal yield drops substantially."
        }
      }
    ]
  },
  {
    id: "module-4",
    title: "Debt, Credit Cards & Interest Traps",
    description: "Decode credit scores, avoid 42% APR spirals, and use debt to build wealth.",
    iconName: "CreditCard",
    lessons: [
      {
        id: "lesson-4-1",
        title: "Credit Scores (CIBIL) & Why They Rule Your Future",
        readTime: "6 min",
        summary: "How credit bureaus evaluate your trustworthiness and why 750+ opens the door to cheap loans.",
        content: [
          "Your credit score (typically CIBIL in India, ranging from 300 to 900) is your financial reputation score. A score above 750 qualifies you for prime interest rates on home loans, personal loans, and premium credit cards.",
          "Key factors influencing your credit score:",
          "1. Payment History (35%): Did you pay every single bill on time? Even a single 30-day default can shave 60+ points.",
          "2. Credit Utilization Ratio (30%): How much of your available credit card limit do you use? Always keep it below 30%.",
          "3. Credit Age (15%): Length of your credit history. Never close your oldest active credit card.",
          "4. Inquiries & Mix (20%): Avoid applying for 5 credit cards simultaneously (hard inquiries damage your score)."
        ],
        keyTakeaways: [
          "Always maintain a CIBIL score of 750+ to save lakhs of rupees on future home loan interest.",
          "Never max out credit cards. If your limit is ₹1 Lakh, keep statements below ₹30,000.",
          "Check your credit report for free once a year to spot fraudulent accounts or reporting errors."
        ],
        quiz: {
          id: "q-4-1",
          question: "What is the recommended maximum Credit Utilization Ratio on a credit card to maintain an excellent score?",
          options: [
            "90% of total limit",
            "30% of total limit",
            "100% of total limit",
            "50% of total limit"
          ],
          correctIndex: 1,
          explanation: "Financial bureaus view utilization above 30% as credit-hungry behavior, which negatively impacts your CIBIL score."
        }
      },
      {
        id: "lesson-4-2",
        title: "The 'Minimum Due' Credit Card Trap",
        readTime: "6 min",
        summary: "Expose how banks make billions when you pay only the minimum due on your credit card statement.",
        content: [
          "Credit cards offer up to 45-50 days of interest-free money IF you pay the total statement balance in full every single month. When used this way, you earn reward points and build credit for free.",
          "However, if you pay only the 'Minimum Amount Due' (typically 5% of the total balance), the bank removes the grace period on ALL previous and new transactions!",
          "The remaining balance begins accruing interest at 3.5% to 4.0% PER MONTH, which compounds to an astronomical 42% to 48% APR (Annual Percentage Rate). A ₹50,000 debt paying minimum dues can take 15 years and ₹1,50,000+ to clear!"
        ],
        keyTakeaways: [
          "The Minimum Due button is a psychological trap. Always pay the TOTAL statement balance.",
          "Treat your credit card like a debit card: never swipe for something you don't already have cash for in your bank.",
          "If you cannot pay the full balance, immediately convert the purchase into a lower-interest EMI (12-16%) rather than revolving at 42%."
        ],
        quiz: {
          id: "q-4-2",
          question: "What happens to your credit card balance when you pay only the 'Minimum Due'?",
          options: [
            "The bank forgives the remaining balance as a loyalty bonus",
            "The grace period is canceled and the remaining balance compounds at a brutal 42-48% annual interest rate",
            "Your credit score automatically reaches 900",
            "The interest rate drops to 0% for the next 6 months"
          ],
          correctIndex: 1,
          explanation: "Paying minimum due revokes your interest-free grace period and triggers financing charges of 3.5% per month (42%+ annually), creating an exponential debt spiral."
        }
      },
      {
        id: "lesson-4-3",
        title: "Good Debt vs Bad Debt & Payoff Strategies",
        readTime: "6 min",
        summary: "Understand leverage: when debt builds wealth vs when debt destroys families, and how to eliminate it.",
        content: [
          "Good Debt is used to acquire appreciating assets or enhance earning capacity at low interest rates. Examples: a sensible home loan (8-8.5%), or an education loan for a high-ROI degree.",
          "Bad Debt finances depreciating consumer lifestyle wants at exorbitant interest rates. Examples: personal loans for vacations (14-20%), payday loan apps (36-100%), and revolving credit cards (42%).",
          "Two proven debt elimination strategies:",
          "1. Debt Avalanche: Pay minimums on all debts, and put every extra rupee towards the debt with the HIGHEST interest rate. Mathematically saves the most money.",
          "2. Debt Snowball: Pay off the SMALLEST balance first to gain quick psychological momentum and confidence."
        ],
        keyTakeaways: [
          "Never borrow money to purchase depreciating luxury goods or speculative assets.",
          "Debt Avalanche is mathematically optimal; Debt Snowball is psychologically empowering.",
          "Never let total monthly EMIs exceed 40% of your net monthly salary."
        ],
        quiz: {
          id: "q-4-3",
          question: "Which payoff strategy prioritizes clearing debts with the HIGHEST interest rate first?",
          options: [
            "Debt Snowball method",
            "Debt Avalanche method",
            "Minimum Due Revolver",
            "Credit Shuffle method"
          ],
          correctIndex: 1,
          explanation: "The Debt Avalanche method attacks high-interest debt (e.g. credit cards at 42%) first, mathematically minimizing total interest paid."
        }
      }
    ]
  },
  {
    id: "module-5",
    title: "Investing Fundamentals & Equity Markets",
    description: "Understand asset classes, market indices, and building wealth via Rupee-Cost Averaging SIPs.",
    iconName: "TrendingUp",
    lessons: [
      {
        id: "lesson-5-1",
        title: "Asset Classes & The Risk-Return Spectrum",
        readTime: "6 min",
        summary: "Compare Equities, Fixed Income, Gold, and Real Estate to build a resilient asset allocation.",
        content: [
          "An asset class is a category of investments with similar financial characteristics and regulatory behaviors.",
          "1. Equities (Stocks): Represent partial business ownership. Highest historical returns (11-14% CAGR in India), but with short-term volatility.",
          "2. Fixed Income (Debt): Loans you give to governments or corporations in exchange for interest. Lower returns (6-8%), but low volatility.",
          "3. Commodities (Gold): Historical store of value and hedge against currency devaluation. Modest returns (8-10%), performs best during geopolitical crises.",
          "4. Real Estate: Physical land and residential/commercial property. High capital requirement, illiquid, high transaction costs."
        ],
        keyTakeaways: [
          "Asset allocation determines over 90% of portfolio return variability, not individual stock picking.",
          "Young investors should hold higher equity exposure (60-80%) to maximize long-term compounding.",
          "Never put 100% of your net worth into any single asset class."
        ],
        quiz: {
          id: "q-5-1",
          question: "Why is Asset Allocation considered the most important investment decision?",
          options: [
            "It guarantees that you will never experience a day of negative returns",
            "It balances risk and reward across non-correlated asset classes to protect and grow capital over market cycles",
            "It allows you to bypass all capital gains taxation",
            "It forces companies to pay you quarterly dividends in cash"
          ],
          correctIndex: 1,
          explanation: "Asset allocation spreads capital across equities, debt, and gold, dampening overall volatility while ensuring positive long-term compounding."
        }
      },
      {
        id: "lesson-5-2",
        title: "Index Funds vs Active Mutual Funds vs Direct Stocks",
        readTime: "6 min",
        summary: "Demystify index funds: why low-cost passive investing beats 85% of professional fund managers.",
        content: [
          "Direct Stocks: Buying shares in individual companies (e.g., Reliance, TCS). High reward potential, but requires in-depth balance sheet analysis and carries company-specific bankruptcy risk.",
          "Active Mutual Funds: A professional fund manager picks stocks aiming to beat the benchmark. They charge high expense ratios (1.5% to 2.5% annually), which compound against your returns.",
          "Index Funds (Passive): Mirror a benchmark index like the NIFTY 50 (India's top 50 bluechip companies). Charges ultra-low expense ratios (<0.15%). Globally and in India, over 80% of active fund managers fail to beat the index over a 10-year period after accounting for fees!"
        ],
        keyTakeaways: [
          "Expense ratios matter tremendously: a 2% fee over 30 years can consume over 40% of your final wealth.",
          "NIFTY 50 gives you automatic instant diversification across banking, IT, energy, consumer, and auto sectors.",
          "When you invest in the index, you are betting on the long-term economic growth of the country."
        ],
        quiz: {
          id: "q-5-2",
          question: "What is the primary advantage of a low-cost Nifty 50 Index Fund over an Active Mutual Fund?",
          options: [
            "Index funds guarantee a fixed 20% annual return",
            "Index funds have rock-bottom expense ratios (<0.15%) and eliminate manager-selection risk while capturing broad economic growth",
            "Index funds never experience short-term market dips",
            "Index funds allow you to vote in shareholder board meetings"
          ],
          correctIndex: 1,
          explanation: "Index funds eliminate high management fees and human error, providing broad market exposure at minimal expense."
        }
      },
      {
        id: "lesson-5-3",
        title: "The Power of SIP & Rupee-Cost Averaging",
        readTime: "6 min",
        summary: "How Systematic Investment Plans turn market volatility into an unfair wealth-building advantage.",
        content: [
          "A Systematic Investment Plan (SIP) is a disciplined method of investing a fixed rupee amount into a mutual fund at regular intervals (usually monthly).",
          "Rupee-Cost Averaging is the secret engine of a SIP: Because you invest a fixed amount (e.g., ₹5,000 every month), you automatically purchase MORE units when the market crashes and prices are low, and FEWER units when the market is expensive.",
          "When the market inevitably recovers, those extra accumulated discount units supercharge your portfolio returns. Market corrections are not catastrophes for a SIP investor—they are massive accumulation sales!"
        ],
        keyTakeaways: [
          "Never pause your SIP during a market crash; that is the highest-return accumulation phase!",
          "Step-Up SIP: Increasing your monthly SIP by just 10% each year can double your 20-year retirement corpus.",
          "Discipline beats IQ: Consistent automated investing outperforms erratic market-timing bets."
        ],
        quiz: {
          id: "q-5-3",
          question: "What should a disciplined long-term investor do with their SIP when the stock market crashes 20%?",
          options: [
            "Immediately stop the SIP and withdraw all money to cash",
            "Continue the SIP as scheduled (or increase it) to accumulate more units at discounted prices",
            "Switch the entire portfolio into speculative penny stocks",
            "File a complaint with SEBI"
          ],
          correctIndex: 1,
          explanation: "During market drops, your fixed monthly SIP buys more units at lower NAVs, which accelerates long-term compounding upon market recovery."
        }
      }
    ]
  },
  {
    id: "module-6",
    title: "Risk Management & Insurance Shield",
    description: "Protect your family wealth with pure Term Insurance, Health Cover, and avoid ULIP traps.",
    iconName: "ShieldAlert",
    lessons: [
      {
        id: "lesson-6-1",
        title: "Why Insurance is Risk Transfer, NOT an Investment",
        readTime: "5 min",
        summary: "Understand the core purpose of insurance: protecting against catastrophic financial ruin.",
        content: [
          "The greatest mistake in personal finance is viewing insurance as an investment. The fundamental objective of insurance is Risk Transfer: paying a small known premium to protect against a catastrophic, life-destroying financial loss.",
          "If you buy insurance expecting a cash return, you will end up with both poor insurance coverage and terrible investment yields.",
          "Rule of Thumb: Keep your insurance and your investments strictly separate. Buy pure insurance for risk, and invest in pure equity/debt instruments for wealth."
        ],
        keyTakeaways: [
          "Insurance protects downside ruin; investments build upside wealth. Never mix them.",
          "If someone depends on your income (parents, spouse, children), you need Term Life Insurance.",
          "Health insurance is mandatory for every single individual, regardless of age or fitness."
        ],
        quiz: {
          id: "q-6-1",
          question: "What is the primary objective of purchasing an insurance policy?",
          options: [
            "To earn higher annual returns than the stock market",
            "To transfer the risk of catastrophic financial loss to an insurance company in exchange for a small premium",
            "To get a loan without any credit check",
            "To gamble on market fluctuations"
          ],
          correctIndex: 1,
          explanation: "Insurance is a risk-transfer mechanism designed to prevent catastrophic events (death, medical emergency) from wiping out your family's finances."
        }
      },
      {
        id: "lesson-6-2",
        title: "Pure Term Insurance vs The Traditional ULIP/Endowment Trap",
        readTime: "6 min",
        summary: "Expose why insurance agents sell high-commission Endowment policies and why pure Term is superior.",
        content: [
          "Traditional Endowment plans, Money-Back policies, and ULIPs (Unit Linked Insurance Plans) market themselves as 'Insurance + Investment'. They promise life cover plus a payout after 15-20 years.",
          "The reality: They charge massive hidden agent commissions (up to 30% in year one), provide pathetic life cover (barely 10x annual premium), and yield an inflation-losing return of 4% to 5.5%!",
          "The Pure Term Insurance Solution: A pure term plan provides massive cover (e.g., ₹1 Crore to ₹2 Crore) for a tiny annual premium (₹10,000 - ₹15,000/year for a 25-year-old). You take the money you saved and invest it in a NIFTY 50 SIP!"
        ],
        keyTakeaways: [
          "Target 15x to 20x of your annual income as pure Term Life Insurance cover.",
          "Buy term insurance as early as possible (premiums stay locked at your entry age for the entire tenure).",
          "Never buy an insurance policy just because a bank relationship manager or relative pushed it for tax savings."
        ],
        quiz: {
          id: "q-6-2",
          question: "Why is a Pure Term Plan far superior to an Endowment or Money-Back policy?",
          options: [
            "Because term plans offer 25% guaranteed stock market returns",
            "Because term plans provide huge life cover (e.g. ₹1 Cr+) for very low premiums, freeing capital to invest in high-growth index funds",
            "Because term plans pay cash bonuses every 6 months",
            "Because endowment policies are illegal in India"
          ],
          correctIndex: 1,
          explanation: "Pure term insurance gives massive life cover at low cost, allowing you to invest the difference into mutual funds for vastly superior wealth creation."
        }
      },
      {
        id: "lesson-6-3",
        title: "Comprehensive Health Insurance & Deductibles",
        readTime: "5 min",
        summary: "Why corporate group health insurance is not enough and how to structure personal health cover.",
        content: [
          "A single major medical illness or hospitalization can easily cost ₹5 Lakhs to ₹15 Lakhs in private Indian hospitals, instantly vaporizing years of savings.",
          "Why corporate employer cover is risky: If you switch jobs, get laid off, or retire, your corporate coverage vanishes instantly. You cannot buy new cheap health insurance later in life with pre-existing conditions.",
          "Key components of a robust personal health policy: Minimum ₹10 Lakh to ₹25 Lakh cover (or base ₹5L + Super Top-up of ₹20L), zero room-rent capping, restore benefits, and pre/post-hospitalization coverage."
        ],
        keyTakeaways: [
          "Always maintain an independent personal health insurance policy outside of your employer.",
          "Beware of 'Room Rent Capping' clauses—they trigger proportionate deduction penalties on all medical bills!",
          "Disclose all pre-existing medical conditions honestly during application to prevent claim rejection."
        ],
        quiz: {
          id: "q-6-3",
          question: "Why should you never rely exclusively on your employer's corporate health insurance?",
          options: [
            "Because corporate health insurance is banned in private hospitals",
            "Because your cover terminates the day you leave or lose your job, leaving you uninsured when you may need it most",
            "Because corporate insurance charges 50% extra tax",
            "Because employer policies do not cover accidents"
          ],
          correctIndex: 1,
          explanation: "Corporate health cover is tied to your employment. Losing or changing jobs leaves you and your family uninsured unless you hold an independent personal policy."
        }
      }
    ]
  },
  {
    id: "module-7",
    title: "Taxes 101 for Young Earners",
    description: "Navigate Old vs New tax regimes, Section 80C, and Capital Gains Tax in India.",
    iconName: "Receipt",
    lessons: [
      {
        id: "lesson-7-1",
        title: "Old vs New Tax Regime: Choosing What Fits You",
        readTime: "6 min",
        summary: "Understand income tax slabs, rebates under Section 87A, and how to select the right regime.",
        content: [
          "India currently operates two parallel personal income tax regimes:",
          "1. The New Tax Regime (Default): Offers lower, simplified tax slab rates, but eliminates almost all itemized deductions (like 80C, 80D, HRA). Under Section 87A rebate, income up to ₹7 Lakhs incurs ZERO income tax.",
          "2. The Old Tax Regime: Features higher tax slab rates, but permits substantial deductions: ₹1.5 Lakh under 80C, ₹50,000 standard deduction, ₹50,000 NPS (80CCD(1B)), House Rent Allowance (HRA), and health insurance (80D).",
          "Rule of Thumb: If your total deductions exceed ₹3.75 Lakhs, the Old Regime usually saves more tax. For young earners with lower deductions, the New Regime is cleaner and more tax-efficient."
        ],
        keyTakeaways: [
          "Salaried individuals can choose between Old and New regimes every financial year at the time of filing ITR.",
          "Under the New Regime, income up to ₹7 Lakhs is effectively tax-free due to full tax rebate.",
          "Calculate both regimes using official income tax calculators before committing tax declarations to your employer."
        ],
        quiz: {
          id: "q-7-1",
          question: "Under the New Tax Regime in India, up to what annual taxable income is effectively tax-free due to Section 87A rebate?",
          options: [
            "₹2,50,000",
            "₹5,00,000",
            "₹7,00,000",
            "₹10,00,000"
          ],
          correctIndex: 2,
          explanation: "Under the New Tax Regime, taxable income up to ₹7,00,000 qualifies for full tax rebate under Section 87A, resulting in zero net tax liability."
        }
      },
      {
        id: "lesson-7-2",
        title: "Key Tax-Saving Vehicles: 80C, 80D & NPS",
        readTime: "6 min",
        summary: "Explore ELSS mutual funds, Public Provident Fund (PPF), and health insurance deductions.",
        content: [
          "If using the Old Regime, maximize legitimate deductions:",
          "1. Section 80C (Up to ₹1,50,000): ELSS (Equity Linked Savings Scheme) mutual funds have the shortest lock-in (only 3 years) and high equity growth potential. PPF (Public Provident Fund) offers sovereign debt safety with 15-year tenure.",
          "2. Section 80D: Up to ₹25,000 deduction for health insurance premiums for self/family, and an additional ₹50,000 for senior citizen parents.",
          "3. Section 80CCD(1B) - NPS: Additional exclusive deduction of ₹50,000 over and above the 80C limit for contributions to the National Pension System."
        ],
        keyTakeaways: [
          "ELSS mutual funds have the lowest lock-in (3 years) compared to PPF (15 years) or Tax-Saver FDs (5 years).",
          "Never invest in poor insurance endowment products merely to exhaust your ₹1.5 Lakh 80C limit.",
          "National Pension System (NPS) provides an extra ₹50,000 tax deduction while enforcing retirement compounding."
        ],
        quiz: {
          id: "q-7-2",
          question: "Which Section 80C tax-saving instrument has the shortest mandatory lock-in period?",
          options: [
            "Public Provident Fund (PPF) - 15 years",
            "Tax-Saving Bank FD - 5 years",
            "ELSS Mutual Funds - 3 years",
            "National Savings Certificate (NSC) - 5 years"
          ],
          correctIndex: 2,
          explanation: "ELSS (Equity Linked Savings Scheme) has a lock-in of only 3 years, the shortest among all 80C eligible investment options."
        }
      },
      {
        id: "lesson-7-3",
        title: "Capital Gains Tax: STCG vs LTCG on Equities",
        readTime: "6 min",
        summary: "Understand short-term vs long-term capital gains tax on stocks and mutual funds.",
        content: [
          "When you sell shares or equity mutual funds at a profit, the profit is categorized as Capital Gains.",
          "Short-Term Capital Gains (STCG): If you hold equity for 12 months or less before selling, profits are taxed at 20% flat.",
          "Long-Term Capital Gains (LTCG): If you hold equity for more than 12 months, profits are taxed at 12.5% on gains exceeding ₹1.25 Lakh in a financial year (the first ₹1.25 Lakh of profit each year is completely tax-exempt!).",
          "Tax Harvesting: Smart investors sell and repurchase equity up to the annual tax-free threshold to reset their cost basis without paying capital gains tax."
        ],
        keyTakeaways: [
          "Holding equity for more than 1 year drastically cuts your tax rate from 20% down to 12.5%.",
          "The first ₹1.25 Lakh of Long-Term Capital Gains each financial year is tax-free.",
          "Trading frequently (day trading / F&O) generates high short-term tax liabilities and brokerage friction."
        ],
        quiz: {
          id: "q-7-3",
          question: "What holding period qualifies an equity share or equity mutual fund for Long-Term Capital Gains (LTCG) in India?",
          options: [
            "More than 3 months",
            "More than 6 months",
            "More than 12 months (1 year)",
            "More than 5 years"
          ],
          correctIndex: 2,
          explanation: "In India, holding listed equity shares or equity mutual funds for more than 12 months qualifies the profit as Long-Term Capital Gains (LTCG)."
        }
      }
    ]
  },
  {
    id: "module-8",
    title: "Retirement & Wealth Independence",
    description: "Harness long-term compounding, the EEE tax advantage, and portfolio rebalancing.",
    iconName: "Award",
    lessons: [
      {
        id: "lesson-8-1",
        title: "The 30-Year Compounding Miracle & FIRE",
        readTime: "6 min",
        summary: "Calculate your Financial Independence number and understand the 4% Safe Withdrawal Rule.",
        content: [
          "Financial Independence (FIRE) means reaching a state where your accumulated investment portfolio generates sufficient passive cashflow to cover 100% of your living expenses forever.",
          "The 25x Rule: To calculate your target financial independence corpus, multiply your annual living expenses by 25 (or 30 in high-inflation emerging markets like India). If you need ₹10 Lakhs per year, your target corpus is ₹2.5 Crore to ₹3 Crore.",
          "The 4% Safe Withdrawal Rule: Historical simulations show that withdrawing 4% of your initial portfolio value (adjusted for inflation each year) ensures a 95%+ probability that your capital will last 30+ years without running out."
        ],
        keyTakeaways: [
          "Target Corpus = Annual Expenses * 25 to 30.",
          "Retirement is not an age; it is a financial number.",
          "Focus on growing your savings rate: Saving 50% of your income cuts your time to financial independence down to ~17 years."
        ],
        quiz: {
          id: "q-8-1",
          question: "Under the standard 25x Financial Independence rule, what corpus is required if your annual living expenses are ₹8,00,000?",
          options: [
            "₹50 Lakhs",
            "₹1 Crore",
            "₹2 Crores",
            "₹5 Crores"
          ],
          correctIndex: 2,
          explanation: "Annual expenses of ₹8,00,000 * 25 = ₹2,00,00,000 (₹2 Crores). Withdrawing 4% annually yields exactly ₹8 Lakhs."
        }
      },
      {
        id: "lesson-8-2",
        title: "PPF, EPF & The Sovereign Triple-Tax Advantage (EEE)",
        readTime: "6 min",
        summary: "Understand the highest tax status in Indian finance: Exempt-Exempt-Exempt.",
        content: [
          "In financial taxation, EEE stands for: Exempt on Investment, Exempt on Interest Accrual, and Exempt on Maturity Withdrawal. It is the gold standard of tax-free wealth compounding.",
          "1. EPF (Employees\' Provident Fund): Mandatory 12% basic salary contribution matched by your employer. Currently earns ~8.25% sovereign guaranteed interest.",
          "2. PPF (Public Provident Fund): Available to all Indian citizens. 15-year tenure with sovereign guarantee, currently paying ~7.1% tax-free interest with up to ₹1.5 Lakh annual deposit limit.",
          "Combining EPF/PPF with equity index funds creates the ultimate all-weather wealth engine: risk-free EEE debt compounding alongside high-growth equity compounding."
        ],
        keyTakeaways: [
          "EEE is the highest tax-advantaged status available under Indian law.",
          "Maximize your voluntary EPF (VPF) or PPF to build a rock-solid, tax-free debt foundation.",
          "Never withdraw EPF balances prematurely when switching jobs—transfer the UAN to preserve compounding."
        ],
        quiz: {
          id: "q-8-2",
          question: "What does the 'EEE' tax status of PPF (Public Provident Fund) signify?",
          options: [
            "Emergency, Equity, Expense",
            "Exempt at investment, Exempt on interest earned, and Exempt on final maturity withdrawal",
            "Early, Easy, Electronic banking",
            "Employer Exclusive Enrollment"
          ],
          correctIndex: 1,
          explanation: "EEE means contributions qualify for tax deduction (under 80C), interest earned is 100% tax-free, and maturity proceeds are completely tax-free."
        }
      },
      {
        id: "lesson-8-3",
        title: "Annual Portfolio Rebalancing & Asset Glide Paths",
        readTime: "6 min",
        summary: "Learn how institutional investors lock in stock profits at the top and buy discounts at the bottom.",
        content: [
          "Suppose your target asset allocation is 70% Equity and 30% Debt. After a massive 2-year bull market, your equity surges and now accounts for 85% of your portfolio.",
          "If you do nothing, you are now dangerously exposed to a major market crash. Rebalancing means selling 15% of your appreciated equity and moving it into safe debt/gold funds.",
          "By rebalancing once every year, you are mechanically forced to do what human psychology resists: SELL HIGH (trimming overvalued stocks) and BUY LOW (accumulating undervalued assets). This systematic rule maximizes risk-adjusted returns over decades."
        ],
        keyTakeaways: [
          "Rebalance your portfolio once a year or whenever an asset class deviates by >5% from target.",
          "Glide Path: As you age, gradually reduce equity and increase debt allocation to protect capital against sequence-of-returns risk.",
          "Rebalancing is the mechanical antidote to fear and greed."
        ],
        quiz: {
          id: "q-8-3",
          question: "What is the primary psychological and financial benefit of Annual Portfolio Rebalancing?",
          options: [
            "It guarantees that you will never pay any brokerage fees",
            "It mechanically forces you to sell high (trim over-weighted winning assets) and buy low (replenish undervalued assets) without emotional bias",
            "It eliminates the need for emergency funds",
            "It doubles your dividend income automatically"
          ],
          correctIndex: 1,
          explanation: "Rebalancing forces the investor to trim assets that have surged (selling high) and reallocate into lagging or safer assets (buying low), maintaining target risk."
        }
      }
    ]
  }
];
