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
      const res = await api.get("/market");

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
      <div className="mb-6 sm:mb-8 rounded-2xl sm:rounded-3xl border bg-white p-6 sm:p-8 shadow-sm text-sm text-slate-500 w-full">
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
      className="mb-6 sm:mb-8 rounded-2xl sm:rounded-3xl border bg-white p-4 sm:p-6 lg:p-8 shadow-sm w-full max-w-full overflow-hidden"
    >
      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
        <div>
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-blue-600 font-medium">
            Live Market
          </p>

          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 truncate">
            Market Overview
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-400">
          Updated Live
        </p>
      </div>

      <div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-5 w-full">
        <MarketCard
          title="NIFTY 50"
          price={market.nifty?.price}
          change={market.nifty?.changePercent}
          icon={<TrendingUp size={18} className="text-blue-600 shrink-0" />}
        />

        <MarketCard
          title="USD / INR"
          price={market.usdInr?.price}
          prefix="₹"
          icon={<DollarSign size={18} className="text-emerald-600 shrink-0" />}
        />

        <MarketCard
          title="Gold"
          price={market.gold?.price}
          prefix="$"
          icon={<Coins size={18} className="text-amber-500 shrink-0" />}
        />

        <MarketCard
          title="Bitcoin"
          price={market.bitcoin?.price}
          prefix="$"
          change={market.bitcoin?.changePercent}
          icon={<Building2 size={18} className="text-violet-600 shrink-0" />}
        />

        <MarketCard
          title="FD Rate"
          price={market.fdRate}
          suffix="%"
          icon={<Landmark size={18} className="text-slate-600 shrink-0" />}
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
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5 transition-all duration-300 hover:border-slate-300 hover:shadow-sm w-full">
      <div className="mb-3 sm:mb-4 flex items-center justify-between gap-2 min-w-0">
        <span className="text-xs sm:text-sm font-medium text-slate-600 truncate">
          {title}
        </span>

        {icon}
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 truncate">
        {prefix}
        {Number(price || 0).toLocaleString()}
        {suffix}
      </h3>

      {change !== undefined && (
        <div
          className={`mt-2 sm:mt-3 flex items-center gap-1 text-xs sm:text-sm font-medium ${
            positive ? "text-green-600" : "text-red-600"
          }`}
        >
          {positive ? (
            <TrendingUp size={16} className="shrink-0" />
          ) : (
            <TrendingDown size={16} className="shrink-0" />
          )}

          <span>{Math.abs(change)}%</span>
        </div>
      )}
    </div>
  );
}