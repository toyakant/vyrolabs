import React, { useState } from "react";
import {
  LayoutDashboard,
  CandlestickChart,
  BarChart3,
  Calendar,
  Image as ImageIcon,
  Settings,
  Plus,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

export default function Sidebar({ user, onLogout }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`h-screen sticky top-0 bg-[#040812]/80 border-r border-white/[0.08] backdrop-blur-2xl shadow-[0_0_60px_rgba(0,0,0,0.4)] flex flex-col transition-all duration-300 ${collapsed ? "w-20" : "w-60"
        }`}
    >
      {/* Toggle */}
      <div className="flex justify-end p-4">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-0 rounded-xl hover:bg-white/[0.05] text-slate-400"
        >
          {collapsed ? (
            <PanelLeftOpen size={18} />
          ) : (
            <PanelLeftClose size={18} />
          )}
        </button>
      </div>

      {/* Logo */}
      <div className="px-4 pb-3 border-b border-white/[0.08]">
        <h1 className="text-3xl font-black tracking-tight text-white">
         <img
  src="/logo2.png"
  alt="Vyro"
  className={`mx-auto object-contain ${
    collapsed ? "h-12 w-12" : "h-20 w-20"
  }`}
/>
        </h1>

        {!collapsed && (
  <h2 className="mt-3 text-center text-xl font-black tracking-[0.25em] bg-gradient-to-r from-white via-emerald-300 to-emerald-500 bg-clip-text text-transparent">
    VYRO
  </h2>
)}
      </div>

      {/* Add Trade */}
      <div className="p-4">
        <button className="w-full bg-[#00df73] hover:bg-[#00ff85] text-black font-black py-3 rounded-2xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,223,115,0.5)] flex items-center justify-center gap-2">
          <Plus size={18} />
          {!collapsed && "Add Trade"}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        <button
          className={`w-full flex items-center ${collapsed ? "justify-center" : "gap-3"
            } px-4 py-3 rounded-2xl bg-emerald-500/10
border border-emerald-500/20
shadow-[0_0_25px_rgba(0,223,115,0.15)] text-emerald-400 font-medium`}
        >
          <LayoutDashboard size={18} />
          {!collapsed && <span>Dashboard</span>}
        </button>

        <button
          className={`w-full flex items-center ${collapsed ? "justify-center" : "gap-3"
            } px-4 py-3 rounded-2xl text-slate-300 hover:bg-white/[0.05] transition-all`}
        >
          <CandlestickChart size={18} />
          {!collapsed && <span>Trades</span>}
        </button>

        <button
          className={`w-full flex items-center ${collapsed ? "justify-center" : "gap-3"
            } px-4 py-3 rounded-2xl text-slate-300 hover:bg-white/[0.05] transition-all`}
        >
          <BarChart3 size={18} />
          {!collapsed && <span>Analytics</span>}
        </button>


        <button
          className={`w-full flex items-center ${collapsed ? "justify-center" : "gap-3"
            } px-4 py-3 rounded-2xl text-slate-300 hover:bg-white/[0.05] transition-all`}
        >
          <Calendar size={18} />
          {!collapsed && <span>Calendar</span>}
        </button>

        <button
          className={`w-full flex items-center ${collapsed ? "justify-center" : "gap-3"
            } px-4 py-3 rounded-2xl text-slate-300 hover:bg-white/[0.05] transition-all`}
        >
          <ImageIcon size={18} />
          {!collapsed && <span>Gallery</span>}
        </button>

        <button
          className={`w-full flex items-center ${collapsed ? "justify-center" : "gap-3"
            } px-4 py-3 rounded-2xl text-slate-300 hover:bg-white/[0.05] transition-all`}
        >
          <Settings size={18} />
          {!collapsed && <span>Settings</span>}
        </button>
      </nav>

      {/* User */}
      <div className="p-2 border-t border-white/[0.08]">
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-4 backdrop-blur-xl mb-3">
          <div
            className={`flex items-center ${collapsed ? "justify-center" : "gap-3"
              }`}
          >
            <div className="h-9 w-9 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center overflow-hidden">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-emerald-400 font-bold">
                  {user?.displayName?.charAt(0) || "V"}
                </span>
              )}
            </div>

            {!collapsed && (
              <div className="min-w-0">
                <p className="font-semibold text-white truncate">
                  {user?.displayName || "Trader"}
                </p>

                <p className="text-xs text-slate-500 truncate">
                  {user?.email}
                </p>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => onLogout?.()}
          className="w-full bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 py-3 rounded-2xl font-medium transition-all flex items-center justify-center gap-2"
        >
          <LogOut size={18} />
          {!collapsed && "Logout"}
        </button>
      </div>
    </aside>
  );
}