// src/components/layout/Sidebar.tsx
// 01
import React from "react";
import {
  Home,
  Flame,
  Radio,
  PlaySquare,
  Settings,
  Sparkles,
  Video,
} from "lucide-react";

// 09
const primaryNav = [
  { label: "Home", icon: Home },
  { label: "Trending", icon: Flame },
  { label: "Subscriptions", icon: Radio },
];

const libraryNav = [
  { label: "Your Library", icon: PlaySquare },
  { label: "Watch Later", icon: Video },
];

const studioNav = [
  { label: "Creator Studio", icon: Sparkles, isSection: true },
  { label: "AI Content Creator", icon: Sparkles, isChild: true },
];

// 22
export const Sidebar: React.FC = () => {
  return (
    <aside className="hidden h-screen w-60 flex-shrink-0 flex-col bg-slate-950/95 px-3 pt-3 pb-4 md:flex">
      {/* Primary nav */}
      <nav className="space-y-1">
        {primaryNav.map((item) => (
          <button
            key={item.label}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-slate-800/80"
          >
            <item.icon className="h-4 w-4" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Library */}
      <div className="mt-4 border-t border-slate-800/70 pt-3">
        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Library
        </p>
        <nav className="space-y-1">
          {libraryNav.map((item) => (
            <button
              key={item.label}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-slate-800/80"
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Creator Studio + AI nested under it */}
      <div className="mt-4 border-t border-slate-800/70 pt-3">
        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Creator
        </p>
        <nav className="space-y-1">
          {studioNav.map((item) => (
            <button
              key={item.label}
              className={[
                "flex w-full items-center rounded-lg px-3 py-2 text-sm hover:bg-slate-800/80",
                item.isChild ? "pl-8 text-xs text-slate-300" : "gap-3",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {!item.isChild && item.icon && (
                <item.icon className="h-4 w-4" />
              )}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Settings at bottom */}
      <div className="mt-auto border-t border-slate-800/70 pt-3">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-slate-800/80">
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
};
