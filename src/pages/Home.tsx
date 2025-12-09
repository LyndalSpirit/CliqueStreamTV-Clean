// src/components/layout/Header.tsx
// 01
import React from "react";
import { Search, Bell, User } from "lucide-react";

// 05
export const Header: React.FC = () => {
  return (
    <header className="flex h-14 items-center justify-between px-4 lg:px-6 bg-slate-950 shadow-sm">
      {/* Left: Logo / Brand */}
      <div className="flex items-center gap-2">
        <div className="h-7 w-7 rounded-sm bg-gradient-to-br from-purple-500 to-pink-500" />
        <span className="text-sm font-semibold tracking-wide uppercase">
          CLIQUE Stream TV
        </span>
      </div>

      {/* Center: Search */}
      <div className="hidden min-w-[260px] max-w-xl flex-1 items-center px-4 sm:flex">
        <div className="flex w-full items-center gap-2 rounded-full bg-slate-900 px-4 py-1 text-sm">
          <Search className="h-4 w-4 opacity-70" />
          <input
            type="text"
            placeholder="Search videos, creators, or channels"
            className="h-8 w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Right: Icons / User */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/70"
        >
          <Bell className="h-4 w-4" />
        </button>
        <button
          type="button"
          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/90"
        >
          <User className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
};
