def get_resilience_level(risk_score: int):
    if risk_score < 35:
        return "High"
    elif risk_score < 70:
        return "Medium"
    else:
        return "Low"


def get_recommendations(resilience: str):
    options = [
        {
            "name": "Conservative Option",
            "rate": "9.2%",
            "emi": 14800,
            "stress_reduction": "32%",
            "best_for": "Low resilience users"
        },
        {
            "name": "Balanced Choice",
            "rate": "10.1%",
            "emi": 18200,
            "stress_reduction": "28%",
            "best_for": "Medium resilience users"
        },
        {
            "name": "Aggressive Plan",
            "rate": "11.5%",
            "emi": 24600,
            "stress_reduction": "12%",
            "best_for": "High resilience users"
        }
    ]

    best_match = {
        "Low": "Conservative Option",
        "Medium": "Balanced Choice",
        "High": "Aggressive Plan"
    }[resilience]

    return best_match, options