import os
import json
import httpx
from dotenv import load_dotenv

load_dotenv()

AURELIUS_SYSTEM_PROMPT = """You are Aurelius Intelligence, a calm, patient, and wise financial literacy mentor.
Your mission is to teach money management to beginners, students, and early-career professionals.

Core guidelines:
1. Scope: Personal finance, 50/30/20 budgeting, emergency funds, debt management, credit cards, banking, simple vs compound interest, mutual funds, SIPs, equity investing basics, risk management, insurance (term/health), tax basics (80C, capital gains), and financial scam detection.
2. Tone: Encouraging, non-judgmental, structured, empathetic (similar to a thoughtful mentor).
3. Formatting: Use clear Markdown with bold headers, bulleted lists, and practical examples (referencing Indian Rupees ₹ when applicable). Avoid dense walls of unformatted text.
4. Out-of-Scope Topics: If the user asks about unrelated topics (coding, general politics, entertainment, medical advice, cooking, etc.), politely acknowledge and redirect them back to personal finance, investing fundamentals, or the FinQuest course.
5. No Financial Advice Disclaimer: When discussing specific stocks, clarify that you provide educational guidance and literacy principles, not personalized SEBI-registered stock-buying tips.
"""

FALLBACK_KNOWLEDGE_BASE = {
    "budget": """### The 50/30/20 Rule

Budgeting is cashflow architecture:
- **50% Needs**: Rent, groceries, utility bills, mandatory insurance.
- **30% Wants**: Dining out, travel, subscriptions, hobbies.
- **20% Savings & Debt**: Emergency fund building, index fund SIPs, debt prepayment.

*Key Habit*: Automate your savings on salary day before you spend on wants!""",

    "sip": """### The Power of Systematic Investment Plans (SIP)

A SIP invests a fixed amount into a diversified fund every month:
- **Rupee-Cost Averaging**: You buy more units when markets drop, and fewer when markets peak.
- **Compounding**: Reinvested earnings multiply exponentially over 10+ years.
- **Discipline**: Removes emotional market-timing stress.""",

    "credit card": """### Credit Card Golden Rules

- **Always Pay the Full Statement Balance**: Never pay just the 'Minimum Amount Due'—the remaining balance compounds at **42% - 48% APR**!
- **Keep Utilization Below 30%**: If your limit is ₹1,00,000, keep monthly spends under ₹30,000 to maintain a high CIBIL score (750+).
- **Use Grace Period**: Enjoy up to 45-50 days of interest-free credit while leaving your cash in a sweep-in account.""",

    "emergency": """### Building an Emergency Fortress

- **Target**: 3 to 6 months of mandatory living expenses (rent + food + EMIs + insurance).
- **Where to Store**: High-yield savings account or a sweep-in Liquid FD. Never lock it in volatile stocks or lock-in instruments.
- **Purpose**: Shields you from selling long-term equity investments at a discount when unexpected shocks hit.""",

    "scam": """### Spotting Financial Scams

- **Guaranteed Returns Trap**: No legitimate SEBI advisor guarantees 20-30% monthly returns. High returns always carry high risk.
- **Reverse UPI QR Scam**: You NEVER need to scan a QR code or enter your UPI PIN to *receive* money.
- **Part-Time Rating Tasks**: Anyone paying small deposits for Telegram/YouTube tasks is running an advance-fee fraud."""
}

async def generate_aurelius_reply(user_message: str, chat_history: list = None) -> dict:
    api_key = os.getenv("GEMINI_API_KEY", "").strip()
    
    # Check if API key is valid or placeholder
    if not api_key or api_key == "your_gemini_api_key_here":
        q_lower = user_message.lower()
        matched_content = ""
        for key, text in FALLBACK_KNOWLEDGE_BASE.items():
            if key in q_lower:
                matched_content = text
                break
        
        if not matched_content:
            matched_content = (
                "### Welcome to Aurelius Intelligence\n\n"
                "I am your dedicated financial literacy mentor. Here are 3 essential principles to master:\n\n"
                "1. **Pay Yourself First**: Allocate 20% of your income into emergency reserves and index SIPs before paying for discretionary wants.\n"
                "2. **Eliminate High-Interest Debt**: Clear any credit card balance (compounding at 42% APR) immediately.\n"
                "3. **Time in the Market > Timing the Market**: Broad index funds outpace inflation when held over 7+ years.\n\n"
                "*Notice*: Configure your `GEMINI_API_KEY` in `backend/.env` to unlock live, customized AI conversations."
            )
            
        return {
            "reply": matched_content,
            "is_live_gemini": False,
            "note": "Running in offline mentor mode. Set GEMINI_API_KEY in backend/.env for live Gemini intelligence."
        }

    # Call official Gemini REST API (gemini-3.5-flash)
    primary_model = "gemini-3.5-flash"
    fallback_model = "gemini-3.6-flash"
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{primary_model}:generateContent?key={api_key}"
    
    contents = []
    if chat_history:
        for msg in chat_history[-6:]:
            role = "user" if msg.get("sender") == "user" else "model"
            contents.append({
                "role": role,
                "parts": [{"text": msg.get("text", "")}]
            })
    
    contents.append({
        "role": "user",
        "parts": [{"text": user_message}]
    })

    payload = {
        "system_instruction": {
            "parts": [{"text": AURELIUS_SYSTEM_PROMPT}]
        },
        "contents": contents,
        "generationConfig": {
            "temperature": 0.4,
            "maxOutputTokens": 800,
            "topP": 0.95
        }
    }

    try:
        async with httpx.AsyncClient(timeout=25.0) as client:
            resp = await client.post(url, json=payload)
            if resp.status_code != 200:
                # Try fallback model
                fallback_url = f"https://generativelanguage.googleapis.com/v1beta/models/{fallback_model}:generateContent?key={api_key}"
                resp = await client.post(fallback_url, json=payload)

            if resp.status_code != 200:
                error_detail = resp.text
                return {
                    "reply": f"### Aurelius Intelligence Notice\n\nUnable to complete AI request (Status {resp.status_code}).\n\n*Please verify that your `GEMINI_API_KEY` in `backend/.env` is active and has permissions for Gemini API.*\n\n*Tip*: In the meantime, explore our 8-module financial curriculum in the **Course** section!",
                    "is_live_gemini": False,
                    "error": error_detail
                }
            
            data = resp.json()
            candidates = data.get("candidates", [])
            if candidates and "content" in candidates[0]:
                parts = candidates[0]["content"].get("parts", [])
                if parts and "text" in parts[0]:
                    return {
                        "reply": parts[0]["text"],
                        "is_live_gemini": True
                    }
            return {
                "reply": "I understood your query, but could not format a response. Could you rephrase your financial question?",
                "is_live_gemini": True
            }
    except httpx.TimeoutException:
        return {
            "reply": "### Request Timeout\n\nThe request took longer than expected. Please check your internet connection and try asking again.",
            "is_live_gemini": False,
            "error": "Timeout"
        }
    except Exception as e:
        return {
            "reply": f"### System Notice\n\nCould not communicate with Gemini API: {str(e)}",
            "is_live_gemini": False,
            "error": str(e)
        }
