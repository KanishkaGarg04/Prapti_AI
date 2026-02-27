# backend/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from .risk_engine import calculate_risk_score, classify_risk
from .recommendations import get_resilience_level, get_recommendations

# 🔹 CREATE APP FIRST (THIS WAS YOUR ERROR)
app = FastAPI()

# 🔹 CORS (frontend ↔ backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔹 INPUT SCHEMA
class RiskInput(BaseModel):
    income: float
    expenses: float
    debt: float
    interest_rate: float
    savings: float

# 🔹 HEALTH CHECK
@app.get("/")
def root():
    return {"message": "Backend running OK"}

# 🔹 MAIN ENDPOINT
@app.post("/risk-score")
def risk_score(data: RiskInput):
    score = calculate_risk_score(
        data.income,
        data.expenses,
        data.debt,
        data.interest_rate,
        data.savings,
    )

    resilience = get_resilience_level(score)
    best_match, options = get_recommendations(resilience)

    return {
        "risk_score": score,
        "resilience": resilience,
        "best_match": best_match,
        "options": options,
    }