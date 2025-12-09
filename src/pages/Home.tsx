// src/pages/Home.tsx
"use client";

import { useState } from "react";
import { Search, Bell, User } from "lucide-react";
import AppSidebar from "@/components/ui/sidebar";
import VideoGrid from "@/components/VideoGrid";

const TABS = ["Home", "Trending", "Subscriptions"] as const;
type TabKey = (typeof TABS)[number];

const mockVideos = Array.from({ length: 28 }).map((_, idx) => ({
  id: `video-${idx + 1}`,
  title: `Sample Video ${idx + 1}`,
  channel: "CLIQUE Creator",
  views: `${(idx + 3) * 3}K views`,
  timeAgo: `${(idx % 11) + 1} hours ago`,
  duration: "12:34",
}));

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabKey>("Home");

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100">
      {/* Sidebar */}
      <AppSidebar />

      {/* Right side: header + content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex h-14 items-center justify-between px-4 lg:px-6 bg-slate-950 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-sm bg-gradient-to-br from-purple-500 to-pink-500" />
            <span className="text-sm font-semibold tracking-wide uppercase">
              CLIQUE Stream TV
            </span>
          </div>

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

        {/* Main content */}
        <main className="flex-1 overflow-y-auto px-3 pb-6 pt-3 sm:px-5">
          {/* Home / Trending / Subscriptions row – now in content area */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex rounded-full bg-slate-950/70 p-1">
              {TABS.map((tab) => {
                const isActive = tab === activeTab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={[
                      "rounded-full px-4 py-1.5 text-xs sm:text-sm transition-all",
                      isActive
                        ? "bg-slate-100 text-slate-900"
                        : "text-slate-300 hover:bg-slate-800/80",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* Tag filters placeholder */}
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-slate-800/80 px-3 py-1">
                All
              </span>
              <span className="rounded-full bg-slate-800/40 px-3 py-1">
                Live
              </span>
              <span className="rounded-full bg-slate-800/40 px-3 py-1">
                Music
              </span>
              <span className="rounded-full bg-slate-800/40 px-3 py-1">
                Podcasts
              </span>
            </div>
          </div>

          {/* Video grid container */}
          <div className="rounded-xl bg-slate-900/60 p-2 sm:p-3">
            <VideoGrid videos={mockVideos} />
          </div>
        </main>
      </div>
    </div>
  );
}
