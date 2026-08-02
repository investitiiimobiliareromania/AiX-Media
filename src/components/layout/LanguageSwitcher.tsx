// src/components/layout/LanguageSwitcher.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * LanguageSwitcher toggles between Romanian (ro) and English (en).
 * It sets a cookie "NEXT_LOCALE" and reloads the current page to apply the new locale.
 * The cookie is read on the server via the getLocale helper.
 */
export default function LanguageSwitcher() {
  const router = useRouter();

  // Determine current locale from cookie (client side fallback to "ro")
  const getCurrentLocale = () => {
    if (typeof document === "undefined") return "ro";
    const match = document.cookie.match(/(?:^|; )NEXT_LOCALE=([^;]*)/);
    return match ? decodeURIComponent(match[1]) : "ro";
  };

  const toggleLocale = () => {
    const newLocale = getCurrentLocale() === "en" ? "ro" : "en";
    // Set cookie for 30 days
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${30 * 24 * 60 * 60}`;
    // Force a hard reload to let server re-render with new locale
    router.refresh();
  };

  // Ensure the cookie is set on first render if missing
  useEffect(() => {
    if (!document.cookie.includes("NEXT_LOCALE")) {
      document.cookie = "NEXT_LOCALE=ro; path=/; max-age=2592000"; // 30 days
    }
  }, []);

  const current = getCurrentLocale();
  return (
    <button
      onClick={toggleLocale}
      className="px-3 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300 transition"
    >
      {current === "en" ? "RO" : "EN"}
    </button>
  );
}
