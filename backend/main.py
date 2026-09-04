from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
import os

from models import StockQuote, OrderRequest, PortfolioSummary, TradeRecord, BehavioralRiskAssessment
from simulation import market_engine
from portfolio import portfolio_engine
from ai_coach import ai_coach
from gemini_service import generate_aurelius_reply

app = FastAPI(
    title="FinQuest - Financial Life & Paper Trading API",
    description="Team Aurelius EdTech Engine: Learn Money by Managing Money",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[dict]] = None

@app.get("/")
def root():
    return {
        "app": "FinQuest by Team Aurelius",
        "tagline": "Learn Money by Managing Money",
        "status": "online",
        "version": "2.0.0",
        "gemini_configured": bool(os.getenv("GEMINI_API_KEY") and os.getenv("GEMINI_API_KEY") != "your_gemini_api_key_here")
    }

# 1. Market Endpoints
@app.get("/api/market/quotes", response_model=List[StockQuote])
def get_all_quotes():
    market_engine.tick()
    return market_engine.get_all_quotes()

@app.get("/api/market/quote/{symbol}", response_model=StockQuote)
def get_quote(symbol: str):
    market_engine.tick()
    try:
        return market_engine.get_quote(symbol)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@app.get("/api/market/orderbook/{symbol}")
def get_order_book(symbol: str):
    return market_engine.get_order_book(symbol)

@app.post("/api/market/regime/{regime}")
def set_market_regime(regime: str):
    if regime not in ["NORMAL", "BULL", "BEAR", "HIGH_VOLATILITY"]:
        raise HTTPException(status_code=400, detail="Invalid market regime")
    market_engine.set_regime(regime)
    return {"status": "success", "regime": regime}

# 2. Portfolio & Trading Endpoints
@app.get("/api/portfolio", response_model=PortfolioSummary)
def get_portfolio():
    return portfolio_engine.get_summary()

@app.post("/api/trade/order")
def execute_order(order: OrderRequest):
    result = portfolio_engine.execute_order(order)
    return result

@app.get("/api/trade/history", response_model=List[TradeRecord])
def get_trade_history():
    return portfolio_engine.trades

@app.post("/api/portfolio/reset")
def reset_portfolio():
    portfolio_engine.reset()
    return {"status": "success", "message": "Portfolio reset to ₹10,00,000 virtual cash"}

# 3. Behavioral Coach Assessment
@app.get("/api/coach/assessment", response_model=BehavioralRiskAssessment)
def get_coach_assessment():
    summary = portfolio_engine.get_summary()
    return ai_coach.assess_behavior(summary)

# 4. Aurelius Intelligence Chatbot (Gemini Proxy)
@app.post("/api/chat")
async def chat_with_aurelius(req: ChatRequest):
    if not req.message or not req.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")
    
    response = await generate_aurelius_reply(req.message, req.history)
    return response

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
