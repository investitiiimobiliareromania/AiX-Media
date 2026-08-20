'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, Settings, Image as ImageIcon, FolderTree, LogOut, User, Users, Radio, Tv, Mic } from 'lucide-react';
import { logoutAction } from '@/lib/authActions';

export function AdminSidebar() {
  const pathname = usePathname();

  // Hide sidebar on public auth pages
  const isAuthPage = pathname === '/admin/login' || pathname === '/admin/forgot-password' || pathname === '/admin/reset-password';
  if (isAuthPage) return null;

  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Articole', href: '/admin/articles', icon: FileText },
    { name: 'Categorii', href: '/admin/categories', icon: FolderTree },
    { name: 'Autori', href: '/admin/authors', icon: Users },
    { name: 'Radio CMS', href: '/admin/radio', icon: Radio },
    { name: 'AiX TV CMS', href: '/admin/tv', icon: Tv },
    { name: 'Podcasts CMS', href: '/admin/podcasts', icon: Mic },
    { name: 'Media Library', href: '/admin/media', icon: ImageIcon },
    { name: 'Profil & Securitate', href: '/admin/profile', icon: User },
    { name: 'Setări', href: '/admin/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#0a0a0a] text-white border-r border-white/10 flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-white/10">
        <Link href="/admin/dashboard" className="block">
          <span className="font-heading font-black text-2xl tracking-tighter uppercase">
            AiX Media.
          </span>
          <span className="block text-xs font-bold uppercase tracking-widest text-red-600 mt-1">
            Publishing
          </span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-none transition-colors text-sm font-bold uppercase tracking-wider ${
                isActive 
                  ? 'bg-[var(--surface-elevated)] text-[var(--foreground)]' 
                  : 'text-white/60 hover:text-white hover:bg-[var(--surface-elevated)]/5'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <form action={logoutAction}>
          <button 
            type="submit" 
            className="flex items-center gap-3 px-4 py-3 w-full text-left text-sm font-bold uppercase tracking-wider text-white/60 hover:text-white hover:bg-[var(--surface-elevated)]/5 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Deconectare
          </button>
        </form>
      </div>
    </aside>
  );
}
