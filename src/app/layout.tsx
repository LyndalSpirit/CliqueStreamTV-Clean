01 // src/app/layout.tsx
02 import type { Metadata } from "next";
03 import Link from "next/link";
04 import { ThemeProvider } from "next-themes";
05 import "./globals.css";
06
07 export const metadata: Metadata = {
08   title: "CLIQUE Stream TV",
09   description: "AI-powered streaming, creator tools, and premium content.",
10 };
11
12 export default function RootLayout({
13   children,
14 }: {
15   children: React.ReactNode;
16 }) {
17   return (
18     <html lang="en" suppressHydrationWarning>
19       <body className="bg-slate-950 text-slate-100">
20         <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
21           <div className="min-h-screen flex flex-col">
22             {/* Top header — YouTube-style */}
23             <header className="flex items-center justify-between h-14 px-3 md:px-5 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
24               {/* LEFT: hamburger + logo */}
25               <div className="flex items-center gap-3">
26                 {/* hamburger */}
27                 <button
28                   type="button"
29                   aria-label="Open navigation"
30                   className="h-9 w-9 rounded-full flex items-center justify-center text-slate-300 hover:bg-slate-900 transition-colors"
31                 >
32                   ☰
33                 </button>
34
35                 {/* logo */}
36                 <div className="flex items-center gap-2">
37                   <div className="h-7 w-7 rounded bg-slate-100 text-slate-950 flex items-center justify-center text-xs font-bold tracking-tight">
38                     CS
39                   </div>
40                   <span className="text-lg font-semibold tracking-wide">
41                     CLIQUE Stream TV
42                   </span>
43                 </div>
44               </div>
45
46               {/* CENTER: search bar */}
47               <div className="hidden sm:flex flex-1 justify-center px-3">
48                 <div className="flex w-full max-w-xl">
49                   <input
50                     type="text"
51                     placeholder="Search CliqueStream"
52                     className="flex-1 h-9 rounded-l-full border border-slate-700 bg-slate-900 px-3 text-sm
53                                placeholder:text-slate-500 focus:outline-none focus:border-slate-400"
54                   />
55                   <button
56                     type="button"
57                     className="h-9 px-4 rounded-r-full border border-l-0 border-slate-700 bg-slate-800
58                                text-sm text-slate-200 hover:bg-slate-700 transition-colors"
59                   >
60                     🔍
61                   </button>
62                 </div>
63               </div>
64
65               {/* RIGHT: settings + login/signup (locked to the far right) */}
66               <div className="flex items-center gap-3">
67                 {/* Settings */}
68                 <button
69                   type="button"
70                   aria-label="Settings"
71                   className="h-9 w-9 rounded-full border border-slate-700 flex items-center justify-center
72                              hover:bg-slate-900 hover:border-slate-400 transition-colors text-slate-300 text-sm"
73                 >
74                   ⚙
75                 </button>
76
77                 {/* Login / Signup (now wired) */}
78                 <Link
79                   href="/login"
80                   className="px-4 py-1.5 rounded-full border border-slate-500 text-sm font-medium
81                              bg-slate-900/60 hover:bg-slate-100 hover:text-slate-950 hover:border-slate-100
82                              transition-colors"
83                 >
84                   Login / Signup
85                 </Link>
86               </div>
87             </header>
88
89             {/* Page content */}
90             <main className="flex-1">{children}</main>
91           </div>
92         </ThemeProvider>
93       </body>
94     </html>
95   );
96 }
