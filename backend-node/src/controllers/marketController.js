import { getMarketSnapshot } from "../services/marketService.js";

export async function getMarket(req, res) {
  try {
    const data = await getMarketSnapshot();

    res.status(200).json(data);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
}