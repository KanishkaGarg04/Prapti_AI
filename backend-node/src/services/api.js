const BASE_URL = "http://localhost:8000";

async function request(endpoint, body) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Request Failed");
  }

  return response.json();
}

export const api = {
  calculateRisk: (data) =>
    request("/api/calculate-risk", data),

  optimizeLoan: (data) =>
    request("/api/optimize-loan", data),

  opportunityCost: (data) =>
    request("/api/opportunity-cost", data),

  debtVsRent: (data) =>
    request("/api/debt-vs-rent", data),

  simulateShocks: (data) =>
    request("/api/simulate-shocks", data),

  chat: (data) =>
    request("/api/chat", data),
};