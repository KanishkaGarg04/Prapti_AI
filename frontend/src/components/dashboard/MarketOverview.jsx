import { useEffect, useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Landmark,
  DollarSign,
  Coins,
  Building2,
} from "lucide-react";
import api from "../../services/api";
import { motion } from "framer-motion";


export default function MarketOverview() {
  const [market, setMarket] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadMarket() {
    try {
      const res =  api.get("/market");

      setMarket(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMarket();

    const interval = setInterval(loadMarket, 60000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="mb-8 rounded-2xl border bg-white p-8 shadow-sm">
        Loading Market...
      </div>
    );
  }

  if (!market)
    return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mb-8 rounded-2xl border bg-white p-6 shadow-sm"
    >
      <div className="mb-6 flex items-center justify-between">

        <div>

          <p className="text-sm uppercase tracking-widest text-blue-600">
            Live Market
          </p>

          <h2 className="text-2xl font-bold">
            Market Overview
          </h2>

        </div>

        <p className="text-sm text-gray-500">
          Updated Live
        </p>

      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">

        <MarketCard
        title="NIFTY 50"
        price={market.nifty.price}
        change={market.nifty.changePercent}
        />

        <MarketCard
        title="USD / INR"
        price={market.usdInr.price}
        prefix="₹"
        />

        <MarketCard
        title="Gold"
        price={market.gold.price}
        prefix="$"
        />

        <MarketCard
        title="Bitcoin"
        price={market.bitcoin.price}
        prefix="$"
        change={market.bitcoin.changePercent}
        />

        <MarketCard
        title="FD Rate"
        price={market.fdRate}
        suffix="%"
        />

      </div>
    </motion.div>
  );
}

function MarketCard({
  title,
  price,
  change,
  prefix = "",
  suffix = "",
  icon,
}) {
  const positive = change >= 0;

  return (
    <div className="rounded-xl border bg-slate-50 p-5 transition hover:shadow-md">

      <div className="mb-4 flex items-center justify-between">

        <span className="font-medium text-gray-600">
          {title}
        </span>

        {icon}

      </div>

      <h2 className="text-2xl font-bold">

        {prefix}

        {Number(price).toLocaleString()}

        {suffix}

      </h2>

      {change !== undefined && (

        <div
          className={`mt-3 flex items-center gap-1 font-medium ${
            positive ? "text-green-600" : "text-red-600"
          }`}
        >
          {positive ? (
            <TrendingUp size={18} />
          ) : (
            <TrendingDown size={18} />
          )}

          {Math.abs(change)}%

        </div>

      )}

    </div>
  );
}