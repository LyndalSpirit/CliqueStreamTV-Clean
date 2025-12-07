// src/app/layout.tsx
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'CLIQUE Stream TV',
  description: 'Next-generation streaming platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <div className="min-h-screen flex flex-col bg-background text-foreground">
            <nav className="border-b border-border px-4 py-3 flex items-center gap-4">
              <Link href="/" className="font-semibold text-lg">
                CLIQUE Stream TV
              </Link>

              <div className="flex gap-3 text-sm text-muted-foreground">
                <Link href="/ai-content-creator">AI Content Creator</Link>
                {/* Add more navigation links here later */}
              </div>
            </nav>

            <main className="flex-1 p-4">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
