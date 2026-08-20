'use client';

import { useState } from 'react';
import { resetPasswordAction } from '@/lib/authActions';
import { Lock } from 'lucide-react';

export default function ResetPasswordPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await resetPasswordAction(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#0a0a0a] text-white p-8 md:p-12 border border-white/10 shadow-2xl">
        <h1 className="text-2xl font-heading font-black tracking-tight mb-2">Setare Parolă Nouă</h1>
        <p className="text-white/60 text-sm mb-8">Setează o nouă parolă securizată pentru contul tău.</p>

        {error && (
          <div className="mb-6 p-4 bg-red-950/50 border border-red-500/50 text-red-200 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2">
              Parolă Nouă
            </label>
            <div className="relative">
              <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••••••"
                className="w-full bg-transparent border-b border-white/20 pl-8 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2">
              Confirmă Parola Nouă
            </label>
            <div className="relative">
              <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="password"
                name="confirmPassword"
                required
                placeholder="••••••••••••"
                className="w-full bg-transparent border-b border-white/20 pl-8 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--surface-elevated)] text-[var(--foreground)] py-4 font-bold text-xs uppercase tracking-widest hover:bg-[var(--surface-elevated)]/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Se salvează...' : 'Actualizează Parola'}
          </button>
        </form>
      </div>
    </div>
  );
}
