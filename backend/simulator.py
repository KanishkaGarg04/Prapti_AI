from .risk_engine import calculate_risk_score

def simulate_future(income, expenses, debt, interest_rate, savings):
    timeline = []

    for month in range(1, 13):
        if month == 4:
            savings -= 20000  # emergency

        score = calculate_risk_score(
            income, expenses, debt, interest_rate, savings
        )

        timeline.append({
            "month": month,
            "risk_score": score
        })

    return timeline