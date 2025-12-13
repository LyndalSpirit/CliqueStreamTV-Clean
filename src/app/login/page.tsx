// src/app/login/page.tsx
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type AuthMode = "login" | "signup";

function normalizeBaseUrl(url: string) {
  // Removes trailing slash to prevent //auth/login
  return url.replace(/\/+$/, "");
}

export default function LoginPage() {
  const router = useRouter();

  // ✅ Default to SIGNUP so first-time users don’t “accidentally login”
  const [mode, setMode] = useState<AuthMode>("signup");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const API = useMemo(() => {
    const raw =
      process.env.NEXT_PUBLIC_API_URL ||
      "https://cliquestreamtv-clean.onrender.com";
    return normalizeBaseUrl(raw);
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = mode === "login" ? "/auth/login" : "/auth/register";

      const payload =
        mode === "login"
          ? { email, password }
          : {
              email,
              password,
              displayName: displayName || email.split("@")[0] || "CLIQUE User",
            };

      const res = await fetch(`${API}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // If the server returns non-JSON, this prevents “crash on json()”
      const text = await res.text();
      let data: any = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        data = null;
      }

      if (!res.ok) {
        const msg =
          data?.error ||
          data?.message ||
          `${res.status} ${res.statusText}` ||
          "Request failed";
        throw new Error(msg);
      }

      // Expect token from backend
      const token = data?.token;
      if (!token) {
        throw new Error("Login succeeded but no token was returned by the server.");
      }

      localStorage.setItem("clique_token", token);

      // Optional: store user snapshot if returned
      if (data?.user) {
        localStorage.setItem("clique_user", JSON.stringify(data.user));
      }

      router.push("/");
      router.refresh();
    } catch (err: any) {
      // This catches CORS / network / backend-down conditions too
      setError(err?.message || "Request failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-900/60 p-6">
        <h1 className="text-2xl font-semibold text-center mb-1">Login</h1>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-5 text-sm">
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setError("");
            }}
            className={`pb-1 border-b-2 ${
              mode === "login"
                ? "border-slate-100 text-slate-100"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            Login
          </button>

          <button
            type="button"
            onClick={() => {
              setMode("signup");
              setError("");
            }}
            className={`pb-1 border-b-2 ${
              mode === "signup"
                ? "border-slate-100 text-slate-100"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            Signup
          </button>
        </div>

        <form onSubmit={submit} className="space-y-3">
          {mode === "signup" && (
            <input
              type="text"
              placeholder="Display name (optional)"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full h-10 rounded-md border border-slate-700 bg-slate-950 px-3 text-sm outline-none focus:border-slate-400"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-10 rounded-md border border-slate-700 bg-slate-950 px-3 text-sm outline-none focus:border-slate-400"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-10 rounded-md border border-slate-700 bg-slate-950 px-3 text-sm outline-none focus:border-slate-400"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full h-10 rounded-md bg-slate-100 text-slate-950 text-sm font-medium hover:bg-white disabled:opacity-60"
          >
            {loading ? "Please wait..." : mode === "login" ? "Login" : "Create Account"}
          </button>

          {error && (
            <div className="text-center text-sm text-red-400 pt-2">
              {error}
            </div>
          )}

          <div className="text-center text-xs text-slate-500 pt-2">
            Backend: <span className="text-slate-400">{API}</span>
          </div>
        </form>
      </div>
    </div>
  );
}
