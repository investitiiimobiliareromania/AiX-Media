'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { VisitorStore } from '@/lib/visitor-intelligence/visitor-store';
import { EventType } from '@/types/visitor-intelligence';

export function VisitorTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedPath = useRef<string>('');
  const scrollMilestones = useRef<Set<number>>(new Set());

  useEffect(() => {
    // 1. Initialize Visitor Profile and Session
    const context = VisitorStore.initialize();

    // 2. Track initial or route change event
    const fullPath = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    
    if (lastTrackedPath.current !== fullPath) {
      lastTrackedPath.current = fullPath;
      scrollMilestones.current.clear();

      let eventType: EventType = 'page_view';
      if (
        pathname.startsWith('/news/') ||
        pathname.startsWith('/business/') ||
        pathname.startsWith('/real-estate/') ||
        pathname.startsWith('/markets/') ||
        pathname.startsWith('/finance/') ||
        pathname.startsWith('/insurance/') ||
        pathname.startsWith('/credits/') ||
        pathname.startsWith('/investments/')
      ) {
        eventType = 'article_view';
      } else if (
        pathname === '/business' ||
        pathname === '/real-estate' ||
        pathname === '/markets' ||
        pathname === '/finance' ||
        pathname === '/insurance' ||
        pathname === '/credits' ||
        pathname === '/investments'
      ) {
        eventType = 'category_view';
      }

      const isFirst = context.isNewVisitor && context.visitCount === 1;
      if (isFirst && !sessionStorage.getItem('aix_initial_start_sent')) {
        sessionStorage.setItem('aix_initial_start_sent', 'true');
        VisitorStore.pushEvent('session_start', fullPath);
      } else if (!isFirst && context.visitCount > 1 && !sessionStorage.getItem('aix_return_sent')) {
        sessionStorage.setItem('aix_return_sent', 'true');
        VisitorStore.pushEvent('return_visit', fullPath);
      }

      VisitorStore.pushEvent(eventType, fullPath, {
        title: typeof document !== 'undefined' ? document.title : '',
      });
    }

    // 3. Passive Scroll Depth Milestone Listener
    let scrollTimeout: NodeJS.Timeout | null = null;
    const handleScroll = () => {
      if (scrollTimeout) return;
      scrollTimeout = setTimeout(() => {
        scrollTimeout = null;
        if (typeof window === 'undefined') return;

        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight <= 0) return;

        const scrollPercent = Math.min(100, Math.round((window.scrollY / docHeight) * 100));
        VisitorStore.updateScrollDepth(scrollPercent);

        const milestones = [25, 50, 75, 90];
        for (const m of milestones) {
          if (scrollPercent >= m && !scrollMilestones.current.has(m)) {
            scrollMilestones.current.add(m);
            VisitorStore.pushEvent('scroll_depth', fullPath, { depth: m });
          }
        }
      }, 400);
    };

    // 4. Global Passive Event Delegation for Key Actions (Phone, WhatsApp, Telegram, CTAs)
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a, button');
      if (!target) return;

      const href = target.getAttribute('href') || '';
      const text = (target.textContent || '').trim().slice(0, 60);

      if (href.startsWith('tel:')) {
        VisitorStore.pushEvent('phone_click', fullPath, { phone: href.replace('tel:', ''), cta: text });
      } else if (href.includes('wa.me') || href.includes('whatsapp.com')) {
        VisitorStore.pushEvent('whatsapp_click', fullPath, { target: href, cta: text });
      } else if (href.includes('t.me/') || href.includes('telegram.me/')) {
        VisitorStore.pushEvent('telegram_click', fullPath, { target: href, cta: text });
      } else if (target.hasAttribute('data-cta') || (text && /solicită|contact|cere oferta|informații|abonează/i.test(text))) {
        VisitorStore.pushEvent('cta_click', fullPath, { cta: text, target: href || 'action' });
      }
    };

    // 5. Visibility / Unload flush
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        VisitorStore.flushQueue();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('click', handleClick, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [pathname, searchParams]);

  return null;
}
