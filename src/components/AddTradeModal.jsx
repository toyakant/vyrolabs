// file: src/components/AddTradeModal.jsx
import React, { useState } from "react";
import { X, Upload, Flame } from "lucide-react";

export default function AddTradeModal({ isOpen, onClose, onSave }) {
  const [pair, setPair] = useState("");
  const [side, setSide] = useState("Long");
  const [pnl, setPnl] = useState("");
  const [risk, setRisk] = useState("");
  const [rrr, setRrr] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [strategy, setStrategy] = useState("Breakout");
  const [emotion, setEmotion] = useState("Calm");
  const [notes, setNotes] = useState("");
  const [screenshot, setScreenshot] = useState(null);

  if (!isOpen) return null;

  const handleScreenshot = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshot(reader.result); // Saves as base64 string to display in UI
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const numPnl = parseFloat(pnl);
    const numRisk = parseFloat(risk) || 0;
    // Auto-calculate RRR if risk is provided, otherwise use manual input
    const numRrr = numRisk > 0 ? (numPnl / numRisk).toFixed(2) : parseFloat(rrr) || 0;

    const newTrade = {
      date: new Date(date),
      pair: pair.toUpperCase(),
      side,
      pnl: numPnl,
      rrr: parseFloat(numRrr),
      win: numPnl >= 0,
      strategy,
      emotion,
      notes,
      screenshot, // This will be a base64 image string or null
    };

    onSave(newTrade);
    
    // Reset form
    setPair(""); setSide("Long"); setPnl(""); setRisk(""); setRrr("");
    setDate(new Date().toISOString().split('T')[0]); setStrategy("Breakout");
    setEmotion("Calm"); setNotes(""); setScreenshot(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in-up">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal Card (Expanded for Tradezilla style) */}
      <div className="relative w-full max-w-2xl bg-[#040812]/90 border border-white/[0.08] rounded-3xl backdrop-blur-2xl shadow-[0_0_60px_rgba(0,0,0,0.8)] max-h-[90vh] flex flex-col">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-t-3xl"></div>
        <div className="absolute -top-20 -right-20 h-48 w-48 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        {/* Header (Sticky) */}
        <div className="flex justify-between items-start p-8 pb-4 border-b border-white/[0.06] relative z-10 flex-shrink-0">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-white">Log New Trade</h2>
            <p className="text-slate-500 text-sm font-bold mt-1">Record your execution, psychology, and results.</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Form Body (Scrollable) */}
        <form onSubmit={handleSubmit} className="overflow-y-auto premium-scroll p-8 space-y-6 relative z-10">
          
          {/* Row 1: Pair & Side */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-bold text-slate-300 tracking-wider uppercase">Pair / Ticker</label>
              <input type="text" required placeholder="EURUSD" value={pair} onChange={(e) => setPair(e.target.value)} className="w-full mt-2 bg-[#0a0e17]/80 border-2 border-slate-700/50 rounded-xl px-4 py-3 text-sm font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-[#00df73] transition-all" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300 tracking-wider uppercase">Direction</label>
              <select value={side} onChange={(e) => setSide(e.target.value)} className="w-full mt-2 bg-[#0a0e17]/80 border-2 border-slate-700/50 rounded-xl px-4 py-3 text-sm font-semibold text-white focus:outline-none focus:border-[#00df73] transition-all appearance-none cursor-pointer">
                <option value="Long" className="bg-[#0a0e17]">Long (Buy)</option>
                <option value="Short" className="bg-[#0a0e17]">Short (Sell)</option>
              </select>
            </div>
          </div>

          {/* Row 2: Date & Strategy */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-bold text-slate-300 tracking-wider uppercase">Date Executed</label>
              <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} className="w-full mt-2 bg-[#0a0e17]/80 border-2 border-slate-700/50 rounded-xl px-4 py-3 text-sm font-semibold text-white focus:outline-none focus:border-[#00df73] transition-all [color-scheme:dark]" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300 tracking-wider uppercase">Strategy (Playbook)</label>
              <select value={strategy} onChange={(e) => setStrategy(e.target.value)} className="w-full mt-2 bg-[#0a0e17]/80 border-2 border-slate-700/50 rounded-xl px-4 py-3 text-sm font-semibold text-white focus:outline-none focus:border-[#00df73] transition-all appearance-none cursor-pointer">
                <option value="Breakout" className="bg-[#0a0e17]">Breakout</option>
                <option value="Reversal" className="bg-[#0a0e17]">Reversal</option>
                <option value="Trend Continuation" className="bg-[#0a0e17]">Trend Continuation</option>
                <option value="Scalp" className="bg-[#0a0e17]">Scalp</option>
                <option value="Order Block" className="bg-[#0a0e17]">Order Block</option>
              </select>
            </div>
          </div>

          {/* Row 3: P&L, Risk, RRR */}
          <div className="grid grid-cols-3 gap-5">
            <div>
              <label className="text-xs font-bold text-slate-300 tracking-wider uppercase">P&L ($)</label>
              <input type="number" required placeholder="1500" step="any" value={pnl} onChange={(e) => setPnl(e.target.value)} className="w-full mt-2 bg-[#0a0e17]/80 border-2 border-slate-700/50 rounded-xl px-4 py-3 text-sm font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-[#00df73] transition-all" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300 tracking-wider uppercase">Risk ($)</label>
              <input type="number" placeholder="500" step="any" value={risk} onChange={(e) => setRisk(e.target.value)} className="w-full mt-2 bg-[#0a0e17]/80 border-2 border-slate-700/50 rounded-xl px-4 py-3 text-sm font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-[#00df73] transition-all" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300 tracking-wider uppercase">R Multiple</label>
              <input type="number" placeholder="Auto-calc" step="any" value={rrr} onChange={(e) => setRrr(e.target.value)} className="w-full mt-2 bg-[#0a0e17]/80 border-2 border-slate-700/50 rounded-xl px-4 py-3 text-sm font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-[#00df73] transition-all disabled:opacity-50" disabled={risk !== ""} />
            </div>
          </div>

          {/* Row 4: Emotions */}
          <div>
            <label className="text-xs font-bold text-slate-300 tracking-wider uppercase">Emotion / Psychology</label>
            <div className="grid grid-cols-5 gap-3 mt-2">
              {["Calm", "Confident", "FOMO", "Anxious", "Revenge"].map((emo) => (
                <button
                  key={emo}
                  type="button"
                  onClick={() => setEmotion(emo)}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                    emotion === emo 
                      ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300" 
                      : "bg-[#0a0e17]/80 border-slate-700/50 text-slate-400 hover:border-slate-600"
                  }`}
                >
                  {emo}
                </button>
              ))}
            </div>
          </div>

          {/* Row 5: Notes */}
          <div>
            <label className="text-xs font-bold text-slate-300 tracking-wider uppercase">Notes & Execution Review</label>
            <textarea 
              rows="3" 
              placeholder="What was your thought process? Did you follow your rules?" 
              value={notes} onChange={(e) => setNotes(e.target.value)}
              className="w-full mt-2 bg-[#0a0e17]/80 border-2 border-slate-700/50 rounded-xl px-4 py-3 text-sm font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-[#00df73] transition-all resize-none"
            ></textarea>
          </div>

          {/* Row 6: Screenshot */}
          <div>
            <label className="text-xs font-bold text-slate-300 tracking-wider uppercase">Chart Screenshot</label>
            <label className="mt-2 flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-700/50 rounded-xl cursor-pointer bg-[#0a0e17]/80 hover:border-[#00df73] transition-all overflow-hidden relative">
              {screenshot ? (
                <img src={screenshot} alt="Trade Screenshot" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center justify-center pt-5">
                  <Upload size={20} className="text-slate-500 mb-2" />
                  <p className="text-sm text-slate-500 font-bold">Click to upload chart image</p>
                </div>
              )}
              <input type="file" accept="image/*" onChange={handleScreenshot} className="hidden" />
            </label>
          </div>
        </form>

        {/* Footer (Sticky) */}
        <div className="p-8 pt-4 border-t border-white/[0.06] relative z-10 flex-shrink-0">
          <button 
            type="submit" 
            onClick={handleSubmit}
            className="w-full bg-[#00df73] text-[#020408] font-black uppercase tracking-wider py-4 rounded-xl transition-all duration-300 hover:bg-[#00ff85] hover:shadow-[0_0_30px_rgba(0,223,115,0.5)] active:scale-[0.98] text-base flex items-center justify-center gap-2"
          >
            <Flame size={18} />
            Save Trade
          </button>
        </div>
      </div>
    </div>
  );
}