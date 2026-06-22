// file: src/components/Sidebar.jsx
import React, { useState } from "react";
import {
  LayoutDashboard,
  CandlestickChart,
  BarChart3,
  Calendar,
  Image as ImageIcon,
  Settings,
  Plus,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

const navItems = [
  { id: "Dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "Trades", icon: CandlestickChart, label: "Trades" },
  { id: "Analytics", icon: BarChart3, label: "Analytics" },
  { id: "Calendar", icon: Calendar, label: "Calendar" },
  { id: "Gallery", icon: ImageIcon, label: "Gallery" },
  { id: "Settings", icon: Settings, label: "Settings" },
];

export default function Sidebar({ activePage, onNavigate, onAddTradeClick }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`relative min-h-screen bg-[#020408] border-r border-white/[0.02] backdrop-blur-2xl flex flex-col transition-all duration-300 ease-in-out z-20 animate-fade-in-up overflow-hidden ${
        collapsed ? "w-20" : "w-60"
      }`}
    >
      {/* --- PREMIUM AMBIENT BACKGROUND & DEPTH --- */}
      
      {/* Soft Neon Ambient Glows (Bottom and Top) */}
      <div className="absolute bottom-[-10%] left-[-20%] h-72 w-72 bg-emerald-500/[0.07] rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[-10%] right-[-20%] h-72 w-72 bg-emerald-600/[0.05] rounded-full blur-[120px] pointer-events-none"></div>
      
      {/* Continuous Vertical Gradient Divider (Right Edge) */}
      <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent pointer-events-none"></div>
      
      {/* Subtle Vertical Tracking Line (Left Edge Alignment) */}
      <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/[0.02] to-transparent pointer-events-none"></div>

      {/* --- SIDEBAR CONTENT --- */}

      {/* Toggle */}
      <div className={`relative z-10 flex ${collapsed ? "justify-center" : "justify-end"} p-4`}>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-xl hover:bg-white/[0.05] text-slate-400 hover:text-white transition-colors"
        >
          {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>
      </div>

      {/* Logo */}
      <div className="relative z-10 px-4 pb-4 border-b border-white/[0.04]">
        <div className={`flex flex-col items-center justify-center ${collapsed ? "gap-0" : "gap-2"}`}>
          <img
            src="/logo2.png"
            alt="Vyro"
            className={`object-contain transition-all duration-300 drop-shadow-[0_0_15px_rgba(0,223,115,0.4)] ${
              collapsed ? "h-10 w-10" : "h-12 w-12"
            }`}
          />
          {!collapsed && (
            <h2 className="text-xl font-black tracking-[0.25em] bg-gradient-to-r from-white via-emerald-300 to-emerald-500 bg-clip-text text-transparent whitespace-nowrap">
              VYRO
            </h2>
          )}
        </div>
      </div>

      {/* Add Trade */}
      <div className="relative z-10 p-4">
        <button
          onClick={onAddTradeClick}
          className={`relative overflow-hidden w-full bg-[#00df73] hover:bg-[#00ff85] text-black font-black py-3 rounded-2xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,223,115,0.5)] flex items-center justify-center gap-2 group shadow-[0_8px_20px_rgba(0,223,115,0.2)] ${
            collapsed ? "px-0" : "px-4"
          }`}
        >
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/40"></div>
          <Plus size={18} className="transition-transform group-hover:rotate-90 duration-300" />
          {!collapsed && <span className="whitespace-nowrap">Add Trade</span>}
        </button>
      </div>

      {/* Navigation - flex-1 fills the space, allowing the ambient glows to bathe the empty space */}
      <nav className="relative z-10 flex-1 px-4 space-y-2 overflow-y-auto premium-scroll pb-8">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{ animationDelay: `${index * 50}ms` }}
              className={`relative w-full flex items-center animate-fade-in-up ${
                collapsed ? "justify-center" : "gap-3 px-4"
              } py-3 rounded-2xl transition-all duration-300 group border ${
                isActive
                  ? "bg-emerald-500/10 border-emerald-500/20 shadow-[0_0_20px_rgba(0,223,115,0.15)]"
                  : "border-transparent hover:bg-white/[0.03] hover:border-white/[0.06]"
              }`}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-[#00df73] rounded-r-full shadow-[0_0_10px_#00df73]"></span>
              )}
              
              <Icon 
                size={18} 
                className={`transition-colors duration-200 ${
                  isActive 
                    ? "text-emerald-400 drop-shadow-[0_0_8px_rgba(0,223,115,0.5)]" 
                    : "text-slate-500 group-hover:text-white"
                }`} 
              />
              {!collapsed && (
                <span className={`text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                  isActive ? "text-emerald-400" : "text-slate-400"
                }`}>
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}