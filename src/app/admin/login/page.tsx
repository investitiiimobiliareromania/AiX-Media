'use client';

import { useState } from 'react';
import { loginAction } from '@/lib/authActions';
import Link from 'next/link';
import { Lock, Mail, ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await loginAction(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#0a0a0a] text-white p-8 md:p-12 border border-white/10 shadow-2xl">
        <div className="mb-10 text-center">
          <span className="font-heading font-black text-3xl tracking-tighter uppercase block">
            AiX Media.
          </span>
          <span className="text-xs font-bold uppercase tracking-widest text-red-600 block mt-2">
            Publishing Control Center
          </span>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-950/50 border border-red-500/50 text-red-200 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2">
              Email Autentificare
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

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-white/60">
                Parolă
              </label>
              <Link href="/admin/forgot-password" className="text-xs text-white/40 hover:text-white transition-colors">
                Ai uitat parola?
              </Link>
            </div>
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black py-4 font-bold text-xs uppercase tracking-widest hover:bg-white/90 transition-colors flex items-center justify-center gap-2 mt-8 disabled:opacity-50"
          >
            {loading ? 'Se autentifică...' : 'Autentificare'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-12 text-center border-t border-white/10 pt-6">
          <p className="text-[10px] uppercase tracking-widest text-white/30 font-medium">
            Acces securizat. Orice tentativă neautorizată este înregistrată.
          </p>
        </div>
      </div>
    </div>
  );
}
