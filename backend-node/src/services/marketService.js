export async function getMarketSnapshot() {
  return {
    nifty: {
      price: 25234.8,
      changePercent: 0.81,
    },

    usdInr: {
      price: 86.17,
    },

    gold: {
      price: 3365.4,
    },

    bitcoin: {
      price: 118450,
      changePercent: 1.42,
    },

    fdRate: 6.5,

    updatedAt: new Date(),
  };
}