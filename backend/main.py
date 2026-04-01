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
    tenure_options = [5, 10, 15, 20, 25, 30]

    valid_options = []
    all_options = []

    for t in tenure_options:
        emi = calculate_emi(data.loan_amount, data.interest_rate, t)
        total_payment = emi * 12 * t
        interest = total_payment - data.loan_amount

        option = {
            "tenure_years": t,
            "emi": round(emi, 2),
            "total_interest": round(interest, 2)
        }

        all_options.append(option)

        # affordability check (EMI ≤ 40% of income)
        if emi <= data.monthly_income * 0.4:
            valid_options.append(option)

    # If no valid option
    if not valid_options:
        return {
            "error": "Loan is not affordable based on your current income."
        }

    #  Choose best option (lowest interest)
    best_option = min(valid_options, key=lambda x: x["total_interest"])

    #  Calculate interest saved vs worst case
    worst_option = max(valid_options, key=lambda x: x["total_interest"])
    interest_saved = worst_option["total_interest"] - best_option["total_interest"]

    #  explanation
    if best_option["tenure_years"] <= 10:
        explanation = "You can afford higher EMI, so a shorter tenure minimizes interest."
    elif best_option["tenure_years"] <= 20:
        explanation = "Balanced option between EMI affordability and interest savings."
    else:
        explanation = "Longer tenure keeps EMI manageable but increases total interest."

    return {
        "recommended_tenure_years": best_option["tenure_years"],
        "recommended_emi": best_option["emi"],
        "total_interest": best_option["total_interest"],
        "interest_saved": round(interest_saved, 2),
        "affordability_ratio": round(best_option["emi"] / data.monthly_income, 2),
        "explanation": explanation,
        "all_options": all_options
    }

@app.post("/api/opportunity-cost")
async def opportunity_cost(data: LoanRequest):
    emi = calculate_emi(data.loan_amount, data.interest_rate, data.tenure_years)

    monthly_rate = 0.12 / 12  # 12% annual return
    months = data.tenure_years * 12

    investment_value = 0
    chart_data = []

    for m in range(1, months + 1):
        # SIP investment logic
        investment_value = (investment_value + emi) * (1 + monthly_rate)

        year = m // 12

        if m % 12 == 0:
            chart_data.append({
                "year": year,
                "cumulative_emi_paid": round(emi * m, 2),
                "investment_value": round(investment_value, 2)
            })

    total_invested = emi * months

    return {
        "total_emi_paid": round(total_invested, 2),
        "investment_value": round(investment_value, 2),
        "difference": round(investment_value - total_invested, 2),
        "chart_data": chart_data,
        "explanation": f"If you invested your EMI at 12% return, it could grow significantly over time."
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

@app.post("/api/simulate-shocks")
async def simulate_shocks(data: LoanRequest):
    emi = calculate_emi(data.loan_amount, data.interest_rate, data.tenure_years)

    scenarios = []

    #  Income Drop (20%)
    new_income = data.monthly_income * 0.8
    ratio = (emi + data.existing_emis) / new_income

    scenarios.append({
        "type": "Income Drop (20%)",
        "new_income": round(new_income, 2),
        "emi": round(emi, 2),
        "risk_level": "Safe" if ratio < 0.4 else "Risky" if ratio < 0.6 else "Danger",
        "safe": ratio < 0.5,
        "message": "Your EMI becomes too high compared to reduced income." if ratio >= 0.5 else "Still manageable."
    })

    # Interest Rate Increase (+2%)
    new_rate = data.interest_rate + 2
    new_emi = calculate_emi(data.loan_amount, new_rate, data.tenure_years)
    ratio = (new_emi + data.existing_emis) / data.monthly_income

    scenarios.append({
        "type": "Interest Rate Increase (+2%)",
        "new_rate": new_rate,
        "new_emi": round(new_emi, 2),
        "risk_level": "Safe" if ratio < 0.4 else "Risky" if ratio < 0.6 else "Danger",
        "safe": ratio < 0.5,
        "message": "Higher interest increases EMI burden." if ratio >= 0.5 else "Still manageable."
    })

    # Expense Spike (₹10k increase)
    new_expenses = data.existing_emis + 10000
    ratio = (emi + new_expenses) / data.monthly_income

    scenarios.append({
        "type": "Expense Spike (+₹10k)",
        "new_expenses": new_expenses,
        "emi": round(emi, 2),
        "risk_level": "Safe" if ratio < 0.4 else "Risky" if ratio < 0.6 else "Danger",
        "safe": ratio < 0.5,
        "message": "Unexpected expenses increase financial stress." if ratio >= 0.5 else "Still manageable."
    })

    return {
        "base_emi": round(emi, 2),
        "scenarios": scenarios
    }

@app.get("/")
async def root():
    return {"message": "🚀 Prapti AI Backend is running!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)