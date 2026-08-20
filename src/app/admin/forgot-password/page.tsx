'use client';

import { useState } from 'react';
import { forgotPasswordAction } from '@/lib/authActions';
import Link from 'next/link';
import { Mail, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await forgotPasswordAction(formData);
    setLoading(false);
    if (result?.error) {
      setError(result.error);
    } else if (result?.success) {
      setMessage(result.success);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#0a0a0a] text-white p-8 md:p-12 border border-white/10 shadow-2xl">
        <Link href="/admin/login" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Înapoi la Autentificare
        </Link>

        <h1 className="text-2xl font-heading font-black tracking-tight mb-2">Resetare Parolă</h1>
        <p className="text-white/60 text-sm mb-8">Introdu adresa de email pentru a primi instrucțiunile de resetare.</p>

        {error && (
          <div className="mb-6 p-4 bg-red-950/50 border border-red-500/50 text-red-200 text-sm font-medium">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-6 p-4 bg-emerald-950/50 border border-emerald-500/50 text-emerald-200 text-sm font-medium">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="email"
                name="email"
                required
                placeholder="editor@aixmedia.ro"
                className="w-full bg-transparent border-b border-white/20 pl-8 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--surface-elevated)] text-[var(--foreground)] py-4 font-bold text-xs uppercase tracking-widest hover:bg-[var(--surface-elevated)]/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Se trimite...' : 'Trimite Link-ul de Resetare'}
          </button>
        </form>
      </div>
    </div>
  );
}
