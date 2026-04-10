from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Any
import math
import os
from google import genai
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Prapti AI - Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- MODELS ---

class LoanRequest(BaseModel):
    loan_amount: float
    interest_rate: float
    tenure_years: int
    monthly_income: float
    existing_emis: float = 0
    job_type: str = "private"
    current_age: int = 30
    monthly_rent: float = 25000

class ChatRequest(BaseModel):
    message: str
    context: Optional[Any] = None

# --- UTILS ---

def calculate_emi(p, r, n):
    if r == 0: return round(p / (n * 12), 2)
    rm = r / (12 * 100)
    return round(p * rm * (1 + rm)**(n * 12) / ((1 + rm)**(n * 12) - 1), 2)

# --- API ROUTES ---

@app.post("/api/calculate-risk")
async def calculate_risk(data: LoanRequest):
    emi = calculate_emi(data.loan_amount, data.interest_rate, data.tenure_years)
    burden = (emi + data.existing_emis) / data.monthly_income * 100
    risk_score = min(100, max(0, burden * 1.2 + 25))
    
    if risk_score < 35: category, color = "Stable", "green"
    elif risk_score < 65: category, color = "Risky", "yellow"
    else: category, color = "Debt Trap Zone", "red"

    return {
        "emi_monthly": emi,
        "total_burden_monthly": round(emi + data.existing_emis, 2),
        "risk": {
            "risk_score": round(risk_score, 1),
            "category": f"🟢 {category}" if color=="green" else f"🟡 {category}" if color=="yellow" else f"🔴 {category}",
            "color": color,
            "explanation": "Your debt burden is manageable." if color=="green" else "Moderate risk. Consider shorter tenure." if color=="yellow" else "High risk of debt trap!",
            "burden_ratio_percent": round(burden, 1)
        }
    }

@app.post("/api/optimize-loan")
async def optimize_loan(data: LoanRequest):
    tenure_options = [5, 10, 15, 20, 25, 30]
    valid_options = []
    all_options = []

    for t in tenure_options:
        emi = calculate_emi(data.loan_amount, data.interest_rate, t)
        total_payment = emi * 12 * t
        interest = total_payment - data.loan_amount
        option = {"tenure_years": t, "emi": round(emi, 2), "total_interest": round(interest, 2)}
        all_options.append(option)
        if emi <= data.monthly_income * 0.4:
            valid_options.append(option)

    if not valid_options:
        return {"error": "Loan is not affordable based on your current income."}

    best_option = min(valid_options, key=lambda x: x["total_interest"])
    worst_option = max(all_options, key=lambda x: x["total_interest"])
    interest_saved = worst_option["total_interest"] - best_option["total_interest"]

    return {
        "recommended_tenure_years": best_option["tenure_years"],
        "recommended_emi": best_option["emi"],
        "total_interest": best_option["total_interest"],
        "interest_saved": round(interest_saved, 2),
        "explanation": "Optimized for lowest total interest while keeping EMI under 40% of income.",
        "all_options": all_options
    }

@app.post("/api/opportunity-cost")
async def opportunity_cost(data: LoanRequest):
    emi = calculate_emi(data.loan_amount, data.interest_rate, data.tenure_years)
    monthly_rate = 0.12 / 12
    months = data.tenure_years * 12
    investment_value = 0
    chart_data = []

    for m in range(1, months + 1):
        investment_value = (investment_value + emi) * (1 + monthly_rate)
        if m % 12 == 0:
            chart_data.append({
                "year": m // 12,
                "cumulative_emi_paid": round(emi * m, 2),
                "investment_value": round(investment_value, 2)
            })

    return {
        "total_emi_paid": round(emi * months, 2),
        "investment_value": round(investment_value, 2),
        "chart_data": chart_data
    }

@app.post("/api/debt-vs-rent")
async def debt_vs_rent(data: LoanRequest):
    emi = calculate_emi(data.loan_amount, data.interest_rate, data.tenure_years)
    data_list = []
    cum_debt = cum_rent = 0
    rent = data.monthly_rent
    for year in range(1, 21):
        cum_debt += emi * 12 if year <= data.tenure_years else 0
        cum_rent += rent * 12
        rent *= 1.05
        data_list.append({
            "year": year,
            "debt_cumulative": round(cum_debt, 2),
            "rent_cumulative": round(cum_rent, 2)
        })
    return {"debt_vs_rent_data": data_list}

@app.post("/api/simulate-shocks")
async def simulate_shocks(data: LoanRequest):
    current_emi = calculate_emi(data.loan_amount, data.interest_rate, data.tenure_years)
    total_existing_burden = current_emi + data.existing_emis

    shock_income = data.monthly_income * 0.7
    shock_burden = (total_existing_burden / shock_income) * 100
    income_safe = shock_burden < 50

    shock_rate = data.interest_rate + 2.5
    new_emi = calculate_emi(data.loan_amount, shock_rate, data.tenure_years)
    rate_increase = new_emi - current_emi
    rate_safe = (new_emi + data.existing_emis) / data.monthly_income < 0.45

    return {
        "scenarios": [
            {
                "type": "Income Shock",
                "new_income": round(shock_income, 2),
                "risk_level": "Safe" if income_safe else "Risky",
                "safe": income_safe,
                "message": f"If income drops to ₹{shock_income:,.0f}, debt will consume {shock_burden:.1f}% of your budget."
            },
            {
                "type": "ROI Volatility",
                "new_rate": shock_rate,
                "risk_level": "Warning" if not rate_safe else "Safe",
                "safe": rate_safe,
                "message": f"A 2.5% rate hike adds ₹{rate_increase:,.0f} to your monthly EMI burden."
            },
            {
                "type": "Liquidity Crisis",
                "risk_level": "Safe",
                "safe": True,
                "message": f"Current surplus of ₹{(data.monthly_income - total_existing_burden):,.0f} provides a stable emergency buffer."
            }
        ]
    }

@app.post("/api/chat")
async def chat_with_ai(request: ChatRequest):
    res = request.context

    if not res:
        return {"reply": "Run the financial analysis first so I can give accurate advice."}

    try:
        # --- Extract structured data safely ---
        risk_outer = res.get('risk', {}) or {}
        risk_info = risk_outer.get('risk', {}) or {}
        opt_data = res.get('optimize', {}) or {}
        opp_data = res.get('opportunity', {}) or {}

        # --- Build strong context ---
        context_summary = f"""
User Financial Profile:
- Risk Score: {risk_info.get('risk_score', 'N/A')} / 100
- Risk Zone: {risk_info.get('category', 'N/A')}
- Monthly EMI: ₹{risk_outer.get('emi_monthly', 'N/A')}
- Total Monthly Burden: ₹{risk_outer.get('total_burden_monthly', 'N/A')}
- Recommended Tenure: {opt_data.get('recommended_tenure_years', 'N/A')} years
- Interest Saved if Optimized: ₹{opt_data.get('interest_saved', 'N/A')}
- Investment Opportunity Value (12%): ₹{opp_data.get('investment_value', 'N/A')}
"""

        # --- Improved intelligent prompt ---
        prompt = f"""
You are Prapti AI — an advanced financial intelligence system focused on debt risk analysis.

User Data:
{context_summary}

User Question:
{request.message}

Instructions:
- Be sharp, analytical, and practical
- Use the user's numbers in your reasoning
- Identify risk OR opportunity clearly
- Give 1 strong recommendation
- Max 3–4 sentences
- No generic advice

Answer:
"""

        # --- Gemini client (correct SDK) ---
        client = genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))

        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt
        )

        # --- Safe extraction ---
        reply = getattr(response, "text", None)

        if not reply:
            return {
                "reply": "Based on your numbers, your EMI load is high. Consider optimizing tenure to reduce total interest and risk."
            }

        return {"reply": reply}

    except Exception as e:
        print("GEMINI ERROR:", e)

        # --- Smart fallback (important for demo stability) ---
        return {
            "reply": f"Your EMI of ₹{risk_outer.get('emi_monthly', 'N/A')} is putting pressure on your finances. Reducing tenure or restructuring the loan can improve stability."
        }