from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Any
import math

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
    if r == 0: return round(p / (n*12), 2)
    rm = r / (12 * 100)
    return round(p * rm * (1+rm)**(n*12) / ((1+rm)**(n*12)-1), 2)

# --- EXISTING CALCULATION ROUTES ---

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
        data_list.append({"year": year, "debt_cumulative": round(cum_debt, 2), "rent_cumulative": round(cum_rent, 2)})
    return {"debt_vs_rent_data": data_list}

# --- NEW CHATBOT ROUTE ---

@app.post("/api/chat")
async def chat_with_ai(request: ChatRequest):
    query = request.message.lower()
    res = request.context
    
    # 1. Handle cases where no analysis has been run yet
    if not res or not res.get('risk'):
        return {"reply": "Please run the financial assessment first so I can analyze your specific numbers!"}

    # 2. Contextual Logic
    risk_data = res.get('risk', {})
    opt_data = res.get('optimize', {})
    
    # Risk-based answers
    if "risk" in query or "safe" in query or "score" in query:
        score = risk_data['risk']['risk_score']
        cat = risk_data['risk']['category']
        reply = f"Your Risk Score is {score}. You are currently in the {cat} zone. "
        if score > 60:
            reply += "This is high because your EMIs take up a large portion of your income. I suggest increasing tenure or reducing the loan amount."
        else:
            reply += "Your debt-to-income ratio looks healthy!"
            
    # Optimization-based answers
    elif "save" in query or "interest" in query or "better" in query:
        if opt_data:
            saved = opt_data.get('interest_saved', 0)
            years = opt_data.get('recommended_tenure_years', 0)
            reply = f"Based on my optimization logic, you could save ₹{saved:,} in total interest by switching to a {years}-year tenure. This keeps your EMI affordable while minimizing bank profit."
        else:
            reply = "I recommend clicking 'Optimize Loan' to see how much interest we can save you!"

    # Opportunity cost answers
    elif "invest" in query or "mutual fund" in query or "sip" in query:
        opp = res.get('opportunity', {})
        if opp:
            val = opp.get('investment_value', 0)
            reply = f"If you invested your EMI in an SIP @ 12% instead of paying a loan, you'd have ₹{val:,.0f} at the end of the term. That's the 'Opportunity Cost' of debt."
        else:
            reply = "Investing your EMI in a 12% SIP would likely yield much higher returns than the value of the house over time. Run the 'Opportunity Cost' check to see the chart!"

    # Default fallback
    else:
        reply = "I'm your Prapti AI assistant. I can explain your Risk Score, help you optimize your EMI, or calculate if Renting is cheaper for you. What's on your mind?"

    return {"reply": reply}

# --- SERVER START ---

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)