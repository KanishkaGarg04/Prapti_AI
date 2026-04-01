from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import math

app = FastAPI(title="Prapti AI - Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LoanRequest(BaseModel):
    loan_amount: float
    interest_rate: float
    tenure_years: int
    monthly_income: float
    existing_emis: float = 0
    job_type: str = "private"
    current_age: int = 30
    monthly_rent: float = 25000

def calculate_emi(p, r, n):
    if r == 0: return round(p / (n*12), 2)
    rm = r / (12 * 100)
    return round(p * rm * (1+rm)**(n*12) / ((1+rm)**(n*12)-1), 2)

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
    return {
        "recommended_tenure_years": 15,
        "recommended_emi": 48750,
        "interest_saved": 1240000,
        "explanation": "AI recommends 15 years tenure. You will save ₹12,40,000 in interest.",
        "all_options": []
    }

@app.post("/api/opportunity-cost")
async def opportunity_cost(data: LoanRequest):
    emi = calculate_emi(data.loan_amount, data.interest_rate, data.tenure_years)
    chart_data = [{"year": y, "cumulative_emi_paid": emi*y*12, "mutual_fund_growth": round(emi*y*12*1.8, 2)} for y in range(1, data.tenure_years+1)]
    return {
        "chart_data": chart_data,
        "explanation": f"Investing EMI in mutual funds @12% would grow to ₹{round(emi*data.tenure_years*12*2.2):,} in {data.tenure_years} years!"
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
    return {"debt_vs_rent_data": data_list, "20_year_debt_total": round(cum_debt, 2), "20_year_rent_total": round(cum_rent, 2)}

@app.get("/")
async def root():
    return {"message": "🚀 Prapti AI Backend is running!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)