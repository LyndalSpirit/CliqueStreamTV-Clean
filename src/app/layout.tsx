// src/app/layout.tsx
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import './globals.css';

export const metadata: Metadata = {
  title: 'CLIQUE Stream TV',
  description: 'AI-powered streaming, creator tools, and premium content.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-slate-950 text-slate-100">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <div className="min-h-screen flex flex-col">
            {/* Top header — YouTube-style */}
            <header className="flex items-center justify-between h-14 px-3 md:px-5 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
              {/* LEFT: hamburger + logo */}
              <div className="flex items-center gap-3">
                {/* hamburger */}
                <button
                  type="button"
                  aria-label="Open navigation"
                  className="h-9 w-9 rounded-full flex items-center justify-center text-slate-300 hover:bg-slate-900 transition-colors"
                >
                  ☰
                </button>

                {/* logo */}
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded bg-slate-100 text-slate-950 flex items-center justify-center text-xs font-bold tracking-tight">
                    CS
                  </div>
                  <span className="text-lg font-semibold tracking-wide">
                    CLIQUE Stream TV
                  </span>
                </div>
              </div>

              {/* CENTER: search bar */}
              <div className="hidden sm:flex flex-1 justify-center px-3">
                <div className="flex w-full max-w-xl">
                  <input
                    type="text"
                    placeholder="Search CliqueStream"
                    className="flex-1 h-9 rounded-l-full border border-slate-700 bg-slate-900 px-3 text-sm
                               placeholder:text-slate-500 focus:outline-none focus:border-slate-400"
                  />
                  <button
                    type="button"
                    className="h-9 px-4 rounded-r-full border border-l-0 border-slate-700 bg-slate-800
                               text-sm text-slate-200 hover:bg-slate-700 transition-colors"
                  >
                    🔍
                  </button>
                </div>
              </div>

              {/* RIGHT: settings + login/signup (locked to the far right) */}
              <div className="flex items-center gap-3">
                {/* Settings */}
                <button
                  type="button"
                  aria-label="Settings"
                  className="h-9 w-9 rounded-full border border-slate-700 flex items-center justify-center
                             hover:bg-slate-900 hover:border-slate-400 transition-colors text-slate-300 text-sm"
                >
                  ⚙
                </button>

                {/* Login / Signup */}
                <button
                  type="button"
                  className="px-4 py-1.5 rounded-full border border-slate-500 text-sm font-medium
                             bg-slate-900/60 hover:bg-slate-100 hover:text-slate-950 hover:border-slate-100
                             transition-colors"
                >
                  Login / Signup
                </button>
              </div>
            </header>

            {/* Page content */}
            <main className="flex-1">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
