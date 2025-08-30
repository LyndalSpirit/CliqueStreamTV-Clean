import { ThemeProvider } from 'next-themes';
import Link from 'next/link';
import { config as externalConfig } from 'somewhere'; // Example of renaming conflicting variable
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const config = { /* Your configuration logic here */ };

  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <ThemeProvider attribute="class">
          <div className="flex">
            <nav className="w-64 bg-gray-800 text-white">
              <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/profile">Profile</Link></li>
                <li><Link href="/settings">Settings</Link></li>
              </ul>
            </nav>
            <main className="flex-grow p-6">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}


