"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL || "https://cliquestreamtv-clean.onrender.com";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);

    try {
      const url = mode === "login" ? `${API}/auth/login` : `${API}/auth/register`;
      const body =
        mode === "login"
          ? { email, password }
          : { email, password, displayName: displayName || email.split("@")[0] };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Request failed");

      if (!data?.token) throw new Error("No token returned from backend");

      localStorage.setItem("clique_token", data.token);

      // Optional: immediately confirm identity
      // await fetch(`${API}/auth/me`, { headers: { Authorization: `Bearer ${data.token}` } });

      router.push("/"); // back home
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", padding: 16 }}>
      <h1 style={{ fontSize: 22, marginBottom: 8 }}>
        {mode === "login" ? "Login" : "Create Account"}
      </h1>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button onClick={() => setMode("login")} disabled={busy}>
          Login
        </button>
        <button onClick={() => setMode("signup")} disabled={busy}>
          Signup
        </button>
      </div>

      <form onSubmit={submit} style={{ display: "grid", gap: 10 }}>
        {mode === "signup" && (
          <input
            placeholder="Display name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        )}

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete={mode === "login" ? "current-password" : "new-password"}
        />

        <button type="submit" disabled={busy}>
          {busy ? "Working..." : mode === "login" ? "Login" : "Create account"}
        </button>

        {error && <div style={{ color: "tomato" }}>{error}</div>}
        <div style={{ fontSize: 12, opacity: 0.7 }}>
          Backend: {API}
        </div>
      </form>
    </div>
  );
}
