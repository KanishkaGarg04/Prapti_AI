from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Any
import math

app = FastAPI(title="Prapti AI - Backend")

# Enable CORS for React Frontend
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
    monthly_rate = 0.12 / 12  # Assuming 12% annual return
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
        rent *= 1.05  # 5% annual rent increase
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
    
    # Shock 1: Income Drop (30%)
    shock_income = data.monthly_income * 0.7
    shock_burden = (total_existing_burden / shock_income) * 100
    income_safe = shock_burden < 50
    
    # Shock 2: Interest Rate Hike (+2.5%)
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
    query = request.message.lower()
    res = request.context
    
    if not res or not res.get('risk'):
        return {"reply": "Please run the financial assessment first so I can analyze your specific numbers!"}

    risk_data = res.get('risk', {})
    opt_data = res.get('optimize', {})
    
    if any(k in query for k in ["risk", "safe", "score"]):
        score = risk_data['risk']['risk_score']
        cat = risk_data['risk']['category']
        reply = f"Your Risk Score is {score}. You are currently in the {cat} zone. "
        reply += "Consider shorter tenure if you want to reduce total interest." if score < 40 else "I'd watch that DTI ratio closely."
            
    elif any(k in query for k in ["save", "interest", "better"]):
        if opt_data:
            saved = opt_data.get('interest_saved', 0)
            years = opt_data.get('recommended_tenure_years', 0)
            reply = f"By switching to a {years}-year tenure, you'd save ₹{saved:,} in total interest."
        else:
            reply = "Let's check the Optimization Engine to see your potential savings!"

    elif any(k in query for k in ["invest", "sip", "mutual fund"]):
        opp = res.get('opportunity', {})
        val = opp.get('investment_value', 0)
        reply = f"The opportunity cost is significant: ₹{val:,.0f} is what you'd have if those EMIs went into a 12% SIP instead."

    else:
        reply = "I can analyze your Risk Score, help you optimize your EMI, or compare Renting vs Buying. What would you like to dive into?"

    return {"reply": reply}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)