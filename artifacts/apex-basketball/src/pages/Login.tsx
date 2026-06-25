import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "../context/AuthContext";
import PageTransition from "../components/layout/PageTransition";
import ApexButton from "../components/ui/ApexButton";

export default function Login() {
  const { login } = useAuth();
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const ok = login(email, password);
      setLoading(false);
      if (ok) {
        setLocation("/admin");
      } else {
        setError("Invalid email or password.");
      }
    }, 600);
  };

  return (
    <PageTransition>
      <section className="min-h-screen flex items-center justify-center px-4 py-24 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 w-full max-w-md">
          <div className="text-center mb-10">
            <span className="font-display text-5xl text-primary tracking-wider">APEX</span>
            <h1 className="font-display text-3xl text-white tracking-wider mt-1">ADMIN LOGIN</h1>
            <p className="text-muted-foreground text-sm mt-3">Coach access only</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-card border border-white/10 rounded-2xl p-8 backdrop-blur-xl"
            data-testid="login-form"
          >
            <div className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-muted-foreground uppercase tracking-widest mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  data-testid="input-email"
                  className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors text-sm"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-xs font-medium text-muted-foreground uppercase tracking-widest mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  data-testid="input-password"
                  className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors text-sm"
                />
              </div>

              {error && (
                <p className="text-red-400 text-sm font-medium" role="alert" data-testid="login-error">
                  {error}
                </p>
              )}

              <ApexButton
                type="submit"
                className="w-full"
                size="lg"
                disabled={loading}
                data-testid="button-login"
              >
                {loading ? "Signing in..." : "Sign In"}
              </ApexButton>
            </div>
          </form>
        </div>
      </section>
    </PageTransition>
  );
}
