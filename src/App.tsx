// src/App.tsx
// 01
import React from "react";
import { Header } from "./components/layout/Header";
import { Sidebar } from "./components/layout/Sidebar";
import { HomeFeed } from "./components/home/HomeFeed";

// 08
const App: React.FC = () => {
  return (
    <div className="flex h-screen bg-slate-900 text-slate-100">
      {/* Sidebar - darker background to create visual split */}
      <Sidebar />

      {/* Main area */}
      <div className="flex flex-1 flex-col">
        {/* Header - darker background, no nav lines */}
        <Header />

        {/* Content area - same tone as video background */}
        <main className="flex-1 overflow-y-auto">
          <HomeFeed />
        </main>
      </div>
    </div>
  );
};

export default App;
