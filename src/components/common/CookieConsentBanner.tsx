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
    <div className="fixed inset-x-0 bottom-0 z-50 bg-neutral-900 text-neutral-300 p-4 md:p-6 shadow-lg border-t border-neutral-800/80">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm md:text-base">
          Utilizăm cookie-uri pentru a îmbunătăți experiența utilizatorului, pentru analytics și pentru funcționalități esențiale.{' '}
          <a href="/privacy" className="underline text-amber-400 hover:text-amber-300">
            Citește politica de confidențialitate
          </a>
          .
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleReject}
            className="px-4 py-2 text-sm bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded"
          >
            Refuză non-esențial
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm bg-amber-500 hover:bg-amber-400 text-black rounded"
          >
            Acceptă toate
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
