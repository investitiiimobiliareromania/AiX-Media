"use client";
import React, { useState, useEffect } from 'react';

const CookieConsentBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('aix_cookie_consent');
    if (!consent) {
      // Show banner after short delay to avoid flash on SSR
      setTimeout(() => setVisible(true), 500);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('aix_cookie_consent', 'all');
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('aix_cookie_consent', 'none');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 bg-[var(--surface-elevated)]/95 backdrop-blur-md text-neutral-300 p-4 md:p-6 shadow-2xl border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs sm:text-sm font-serif text-neutral-300 leading-relaxed">
          Utilizăm cookie-uri pentru a îmbunătăți experiența utilizatorului, pentru analytics și pentru funcționalități esențiale.{' '}
          <a href="/privacy" className="underline text-amber-400 hover:text-amber-300 transition-colors">
            Citește politica de confidențialitate
          </a>
          .
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleReject}
            className="px-4 py-2.5 text-xs font-mono font-semibold uppercase tracking-wider bg-[var(--surface-elevated)] hover:bg-[var(--surface-elevated)] text-neutral-300 rounded-xl border border-[var(--border)] transition-colors cursor-pointer min-h-[44px]"
          >
            Refuză non-esențial
          </button>
          <button
            onClick={handleAccept}
            className="px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider bg-amber-500 hover:bg-amber-400 text-neutral-950 rounded-xl transition-colors cursor-pointer min-h-[44px] shadow-sm"
          >
            Acceptă toate
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;

