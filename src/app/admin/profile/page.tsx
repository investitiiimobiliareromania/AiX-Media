'use client';

import { useState } from 'react';
import { updateProfileAction, changePasswordAction } from '@/lib/authActions';
import { User, Lock, Shield, CheckCircle2 } from 'lucide-react';

export default function AdminProfilePage() {
  const [profileMsg, setProfileMsg] = useState<string | null>(null);
  const [profileErr, setProfileErr] = useState<string | null>(null);
  const [passMsg, setPassMsg] = useState<string | null>(null);
  const [passErr, setPassErr] = useState<string | null>(null);

  const handleProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProfileMsg(null);
    setProfileErr(null);
    const formData = new FormData(e.currentTarget);
    const res = await updateProfileAction(formData);
    if (res?.error) setProfileErr(res.error);
    if (res?.success) setProfileMsg(res.success);
  };

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPassMsg(null);
    setPassErr(null);
    const formData = new FormData(e.currentTarget);
    const res = await changePasswordAction(formData);
    if (res?.error) setPassErr(res.error);
    if (res?.success) setPassMsg(res.success);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-12 border-b border-border pb-6">
        <h1 className="text-4xl font-heading font-black tracking-tight mb-2">Profil și Securitate</h1>
        <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">Gestionează setările de cont și acces</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Profile Info */}
        <div className="space-y-8">
          <div className="border border-border p-8">
            <h2 className="text-xl font-heading font-bold mb-6 border-b border-border pb-4 flex items-center gap-2">
              <User className="w-5 h-5" /> Informații Profil
            </h2>

            {profileErr && <p className="mb-4 text-xs font-bold text-red-600 uppercase tracking-widest">{profileErr}</p>}
            {profileMsg && <p className="mb-4 text-xs font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> {profileMsg}</p>}

            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Nume Complet</label>
                <input 
                  type="text" 
                  name="full_name" 
                  defaultValue="Cristian Văduva"
                  required
                  className="w-full bg-transparent border-b border-border py-3 text-lg focus:outline-none focus:border-foreground transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">URL Avatar</label>
                <input 
                  type="url" 
                  name="avatar_url" 
                  placeholder="https://..."
                  className="w-full bg-transparent border-b border-border py-3 text-lg focus:outline-none focus:border-foreground transition-colors"
                />
              </div>

              <button type="submit" className="bg-foreground text-background px-6 py-3 font-bold text-xs uppercase tracking-widest hover:bg-foreground/90 transition-colors">
                Salvează Profilul
              </button>
            </form>
          </div>

          <div className="border border-border p-8 bg-muted/20">
            <h3 className="font-bold text-sm uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-600" /> Rol & Permisiuni Sistem
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold">Rol Activ:</span>
              <span className="bg-foreground text-background text-xs font-bold uppercase tracking-widest px-3 py-1">Super Admin</span>
            </div>
          </div>
        </div>

        {/* Change Password */}
        <div className="border border-border p-8">
          <h2 className="text-xl font-heading font-bold mb-6 border-b border-border pb-4 flex items-center gap-2">
            <Lock className="w-5 h-5" /> Schimbare Parolă
          </h2>

          {passErr && <p className="mb-4 text-xs font-bold text-red-600 uppercase tracking-widest">{passErr}</p>}
          {passMsg && <p className="mb-4 text-xs font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> {passMsg}</p>}

          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Parolă Curentă</label>
              <input 
                type="password" 
                name="currentPassword" 
                required
                className="w-full bg-transparent border-b border-border py-3 text-lg focus:outline-none focus:border-foreground transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Parolă Nouă</label>
              <input 
                type="password" 
                name="newPassword" 
                required
                className="w-full bg-transparent border-b border-border py-3 text-lg focus:outline-none focus:border-foreground transition-colors"
              />
            </div>

            <button type="submit" className="bg-foreground text-background px-6 py-3 font-bold text-xs uppercase tracking-widest hover:bg-foreground/90 transition-colors">
              Actualizează Parola
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
