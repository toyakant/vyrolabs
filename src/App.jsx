import React, { useEffect, useState } from "react";
import AuthPage from "./components/Auth";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  if (user === undefined) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="h-10 w-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center font-sans p-6">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-2xl text-center space-y-6 backdrop-blur-sm">
        <div className="h-16 w-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20 overflow-hidden">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-2xl font-bold">
              {user.displayName?.charAt(0) || "V"}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">
            Authentication Successful!
          </h1>

          <p className="text-slate-400 text-sm">
            Welcome back to the trading terminal,{" "}
            <span className="text-emerald-400 font-semibold">
              {user.displayName || user.email}
            </span>
          </p>
        </div>

        <div className="p-4 bg-slate-950/50 border border-slate-800/60 rounded-xl text-left text-xs space-y-1 font-mono text-slate-500">
          <div>[status] Google account verified</div>
          <div>[session] Firebase session active</div>
          <div>[email] {user.email}</div>
          <div>[uid] {user.uid.slice(0, 12)}...</div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-slate-800 hover:bg-slate-700 font-medium py-3 rounded-xl transition-all duration-200 text-sm border border-slate-700/60"
        >
          Secure Log Out
        </button>
      </div>
    </div>
  );
}