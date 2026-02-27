# backend/risk_engine.py

def calculate_risk_score(income, expenses, debt, interest_rate, savings):
    score = 0

    # Debt-to-income (annual)
    dti = debt / max(income * 12, 1)
    expense_ratio = expenses / max(income, 1)

    # Debt pressure
    if dti > 1:
        score += 40
    elif dti > 0.5:
        score += 25
    else:
        score += 10

    # Expense pressure
    if expense_ratio > 0.8:
        score += 30
    elif expense_ratio > 0.6:
        score += 20
    else:
        score += 10

    # Savings buffer
    if savings < expenses * 3:
        score += 20

    # Interest shock
    if interest_rate > 12:
        score += 10

    return min(score, 100)


def classify_risk(score):
    if score < 35:
        return "🟢 Stable"
    elif score < 70:
        return "🟡 Risky"
    else:
        return "🔴 Debt Trap Zone"