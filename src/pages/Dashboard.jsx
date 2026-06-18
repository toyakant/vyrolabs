import React from "react";
import Sidebar from "../components/Sidebar";

const stats = [
  { title: "Net P&L", value: "$12,586.45", change: "+18.73%" },
  { title: "Total Trades", value: "128", change: "+15" },
  { title: "Win Rate", value: "66.41%", change: "+4.32%" },
  { title: "Avg RR", value: "2.18R", change: "+0.35" },
];

const recentTrades = [
  { pair: "EURUSD", side: "Long", result: "+2.31R" },
  { pair: "NQ", side: "Short", result: "-1.02R" },
  { pair: "XAUUSD", side: "Long", result: "+3.21R" },
  { pair: "GBPUSD", side: "Long", result: "+1.15R" },
  { pair: "USDCAD", side: "Short", result: "-0.45R" },
];

const weeklyData = [
  { week: "Week 1", pnl: "-$15.8K", red: true },
  { week: "Week 2", pnl: "+$9.14K" },
  { week: "Week 3", pnl: "+$21.4K" },
  { week: "Week 4", pnl: "-$9.94K", red: true },
  { week: "Week 5", pnl: "+$2.68K" },
];

export default function Dashboard({ user, onLogout }) {
  return (
    <div className="min-h-screen bg-[#020408] text-white flex relative overflow-hidden">
      <div className="absolute top-[-15%] right-[-5%] w-[700px] h-[700px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-15%] left-[5%] w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />
      <Sidebar user={user} onLogout={onLogout} />

      <div className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-black tracking-tight">
              Dashboard
            </h1>
            <p className="text-slate-400 mt-2">
              Overview of your trading performance
            </p>
          </div>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-5 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="bg-white/[0.04] border border-white/[0.08] rounded-3xl p-5 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] hover:border-emerald-500/20 hover:shadow-[0_0_30px_rgba(0,223,115,0.15)] transition-all duration-300"
            >
              <p className="text-slate-400 text-sm">{stat.title}</p>

              <h3 className="text-3xl font-bold mt-3">{stat.value}</h3>

              <p className="text-emerald-400 text-sm mt-2">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Recent Trades */}
          <div className="col-span-3 bg-white/[0.04] border border-white/[0.08] rounded-3xl p-5 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
            <div className="flex justify-between items-center mb-5">
              <h2 className="font-semibold">Recent Trades</h2>
              <button className="text-emerald-400 text-sm">View All</button>
            </div>

            <div className="space-y-4">
              {recentTrades.map((trade) => (
                <div
                  key={trade.pair + trade.result}
                  className="flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{trade.pair}</p>

                    <span
                      className={`text-xs px-2 py-1 rounded-md ${trade.side === "Long"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-red-500/10 text-red-400"
                        }`}
                    >
                      {trade.side}
                    </span>
                  </div>

                  <span
                    className={
                      trade.result.startsWith("+")
                        ? "text-emerald-400"
                        : "text-red-400"
                    }
                  >
                    {trade.result}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Calendar */}
          <div className="col-span-7 bg-white/[0.04] border border-white/[0.08] rounded-3xl p-5 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-semibold text-xl">May 2026</h2>

              <button className="text-slate-400 text-sm">
                Monthly ▼
              </button>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 35 }).map((_, i) => {
                const profit = i % 3 !== 0;

                return (
                  <div
                    key={i}
                    className={`h-28 rounded-xl border p-2 ${profit
                      ? "bg-emerald-500/10 border-emerald-500/20"
                      : "bg-red-500/10 border-red-500/20"
                      }`}
                  >
                    <p className="text-xs text-slate-400">{i + 1}</p>

                    <p
                      className={`mt-3 font-semibold ${profit ? "text-emerald-400" : "text-red-400"
                        }`}
                    >
                      {profit ? "+$250" : "-$120"}
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      2 trades
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Weekly Summary */}
          <div className="col-span-2 space-y-4">
            {weeklyData.map((week) => (
              <div
                key={week.week}
                className="bg-white/[0.04] border border-white/[0.08] rounded-3xl p-4 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
              >
                <p className="font-medium">{week.week}</p>

                <p
                  className={`mt-3 text-xl font-bold ${week.red ? "text-red-400" : "text-emerald-400"
                    }`}
                >
                  {week.pnl}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
