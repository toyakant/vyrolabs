// file: src/pages/Settings.jsx
import React from "react";
import Sidebar from "../components/Sidebar";
import { LogOut } from "lucide-react";

export default function Settings({ user, onLogout, activePage, onNavigate }) {
  return (
    <div className="min-h-screen bg-[#020408] text-white flex relative overflow-hidden">
      <div className="absolute top-[-15%] right-[-5%] w-[700px] h-[700px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-15%] left-[5%] w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />

      <Sidebar activePage={activePage} onNavigate={onNavigate} />

      <main className="flex-1 p-8 overflow-y-auto relative z-10 premium-scroll">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent drop-shadow-lg">
            Settings
          </h1>
          <p className="text-slate-400 mt-3 text-lg font-medium">Manage your account and preferences.</p>
        </div>

        <div className="mt-12 max-w-2xl animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <div className="relative overflow-hidden bg-white/[0.03] border border-white/[0.06] rounded-3xl p-8 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.45)]">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <div className="absolute -top-10 -right-10 h-32 w-32 bg-emerald-500/10 rounded-full blur-3xl" />
            
            <h2 className="text-2xl font-bold text-white mb-8 relative z-10">Account Information</h2>

            <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10 pb-8 border-b border-white/[0.06]">
              <div className="relative h-20 w-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center overflow-hidden flex-shrink-0">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-emerald-400 font-bold text-3xl">
                    {user?.displayName?.charAt(0) || "V"}
                  </span>
                )}
                <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-emerald-400 border-2 border-[#040812] shadow-[0_0_8px_rgba(0,223,115,0.8)]"></span>
              </div>

              <div className="text-center sm:text-left">
                <p className="text-2xl font-bold text-white">{user?.displayName || "Trader"}</p>
                <p className="text-slate-400 mt-1">{user?.email}</p>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
              <div className="flex items-center gap-4">
                <img src="/logo2.png" alt="Vyro Logo" className="w-12 h-12 object-contain drop-shadow-[0_0_15px_rgba(0,223,115,0.3)]" />
                <div>
                  <p className="text-xl font-black tracking-[0.25em] bg-gradient-to-r from-white via-emerald-300 to-emerald-500 bg-clip-text text-transparent">
                    VYRO JOURNAL
                  </p>
                  <p className="text-slate-500 text-xs mt-1">Track. Analyze. Dominate.</p>
                </div>
              </div>

              <button
                onClick={() => onLogout?.()}
                className="w-full sm:w-auto bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:shadow-[0_0_20px_rgba(212,0,66,0.2)] py-3 px-6 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 group"
              >
                <LogOut size={18} className="group-hover:scale-110 transition-transform" />
                Logout
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}