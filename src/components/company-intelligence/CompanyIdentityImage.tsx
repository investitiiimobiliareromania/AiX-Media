'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export interface CompanyIdentityImageProps {
  src?: string | null;
  name: string;
  symbol?: string | null;
  sector?: string | null;
  industry?: string | null;
  slug?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'custom';
  className?: string;
  fill?: boolean;
  priority?: boolean;
  alt?: string;
}

/**
 * Returns deterministic initials/ticker and color styling based on company identity
 */
function getCompanyMonogramInfo(
  name: string,
  symbol?: string | null,
  sectorOrIndustry?: string | null
) {
  const normName = name.toLowerCase();
  const s = (symbol || '').toUpperCase().trim();
  const sec = (sectorOrIndustry || '').toLowerCase();

  // 1. Specific Known Corporate Overrides
  if (normName.includes('petrom') || s === 'SNP') {
    return {
      text: 'SNP',
      gradient: 'from-neutral-950 via-emerald-950/90 to-neutral-900',
      border: 'border-emerald-500/40',
      textAccent: 'text-emerald-400',
      glow: 'shadow-emerald-950/50',
    };
  }

  if (normName.includes('hidroelectrica') || s === 'H2O') {
    return {
      text: 'H2O',
      gradient: 'from-neutral-950 via-sky-950/90 to-neutral-900',
      border: 'border-sky-500/40',
      textAccent: 'text-sky-400',
      glow: 'shadow-sky-950/50',
    };
  }

  if (normName.includes('transilvania') || s === 'TLV') {
    return {
      text: 'TLV',
      gradient: 'from-slate-950 via-blue-950/90 to-neutral-950',
      border: 'border-blue-500/40',
      textAccent: 'text-amber-400',
      glow: 'shadow-blue-950/50',
    };
  }

  if (normName.includes('dacia') || s === 'DACIA') {
    return {
      text: 'DACIA',
      gradient: 'from-neutral-950 via-zinc-800 to-neutral-900',
      border: 'border-zinc-400/40',
      textAccent: 'text-zinc-100',
      glow: 'shadow-zinc-950/50',
    };
  }

  if (normName.includes('dedeman') || s === 'DEDEMAN' || s === 'DED') {
    return {
      text: 'DED',
      gradient: 'from-neutral-950 via-blue-950 to-neutral-900',
      border: 'border-blue-400/40',
      textAccent: 'text-orange-400',
      glow: 'shadow-blue-950/50',
    };
  }

  if (normName.includes('romgaz') || s === 'SNG') {
    return {
      text: 'SNG',
      gradient: 'from-neutral-950 via-emerald-950/90 to-neutral-900',
      border: 'border-emerald-500/40',
      textAccent: 'text-emerald-300',
      glow: 'shadow-emerald-950/50',
    };
  }

  if (normName.includes('one united') || s === 'ONE') {
    return {
      text: 'ONE',
      gradient: 'from-neutral-950 via-amber-950/80 to-neutral-900',
      border: 'border-amber-500/40',
      textAccent: 'text-amber-400',
      glow: 'shadow-amber-950/50',
    };
  }

  if (normName.includes('nuclearelectrica') || s === 'SNN') {
    return {
      text: 'SNN',
      gradient: 'from-neutral-950 via-teal-950/90 to-neutral-900',
      border: 'border-teal-500/40',
      textAccent: 'text-teal-300',
      glow: 'shadow-teal-950/50',
    };
  }

  if (normName.includes('bursa de valori') || s === 'BVB') {
    return {
      text: 'BVB',
      gradient: 'from-slate-950 via-blue-950/90 to-neutral-950',
      border: 'border-amber-500/40',
      textAccent: 'text-amber-400',
      glow: 'shadow-blue-950/50',
    };
  }

  if (normName.includes('uipath') || s === 'PATH') {
    return {
      text: 'PATH',
      gradient: 'from-neutral-950 via-orange-950/80 to-neutral-900',
      border: 'border-orange-500/40',
      textAccent: 'text-orange-400',
      glow: 'shadow-orange-950/50',
    };
  }

  if (normName.includes('unicredit') || s === 'UCB') {
    return {
      text: 'UCB',
      gradient: 'from-slate-950 via-rose-950/80 to-neutral-950',
      border: 'border-rose-500/40',
      textAccent: 'text-rose-300',
      glow: 'shadow-rose-950/50',
    };
  }

  if (normName.includes('strabag') || s === 'STR') {
    return {
      text: 'STR',
      gradient: 'from-neutral-950 via-amber-950/80 to-neutral-900',
      border: 'border-amber-500/40',
      textAccent: 'text-amber-400',
      glow: 'shadow-amber-950/50',
    };
  }

  if (normName.includes('bitdefender') || s === 'BIT') {
    return {
      text: 'BIT',
      gradient: 'from-neutral-950 via-red-950/80 to-neutral-900',
      border: 'border-red-500/40',
      textAccent: 'text-red-400',
      glow: 'shadow-red-950/50',
    };
  }

  // 2. Default Initial Extraction
  let text = '';
  if (symbol && symbol.trim().length > 0) {
    text = symbol.trim().toUpperCase();
    if (text.length > 5) text = text.slice(0, 4);
  } else {
    const cleaned = name
      .replace(/S\.A\.|S\.R\.L\.|SRL|SA|S\.C\.|SC|Grupul|România|Romania|Bank|Banca/gi, '')
      .trim();
    const words = cleaned.split(/\s+/).filter(Boolean);
    if (words.length >= 2) {
      text = (words[0]![0]! + words[1]![0]!).toUpperCase();
    } else if (words.length === 1) {
      text = words[0]!.slice(0, Math.min(4, words[0]!.length)).toUpperCase();
    } else {
      text = name.slice(0, 3).toUpperCase();
    }
  }

  // 3. Sector Color Mapping
  if (sec.includes('banc') || sec.includes('financiar')) {
    return {
      text,
      gradient: 'from-slate-900 via-blue-950/80 to-neutral-950',
      border: 'border-blue-500/30',
      textAccent: 'text-blue-300',
      glow: 'shadow-blue-950/40',
    };
  }

  if (sec.includes('energ') || sec.includes('utilit') || sec.includes('nuclear') || sec.includes('gaz')) {
    return {
      text,
      gradient: 'from-neutral-950 via-emerald-950/80 to-neutral-900',
      border: 'border-emerald-500/30',
      textAccent: 'text-emerald-400',
      glow: 'shadow-emerald-950/40',
    };
  }

  if (sec.includes('imobil') || sec.includes('real estate') || sec.includes('construct')) {
    return {
      text,
      gradient: 'from-neutral-950 via-amber-950/70 to-neutral-900',
      border: 'border-amber-500/30',
      textAccent: 'text-amber-400',
      glow: 'shadow-amber-950/40',
    };
  }

  if (sec.includes('tech') || sec.includes('software') || sec.includes('digital') || sec.includes('ai')) {
    return {
      text,
      gradient: 'from-neutral-950 via-purple-950/70 to-neutral-900',
      border: 'border-purple-500/30',
      textAccent: 'text-purple-300',
      glow: 'shadow-purple-950/40',
    };
  }

  if (sec.includes('auto') || sec.includes('transport')) {
    return {
      text,
      gradient: 'from-neutral-950 via-zinc-800/80 to-neutral-900',
      border: 'border-zinc-500/30',
      textAccent: 'text-zinc-200',
      glow: 'shadow-zinc-950/40',
    };
  }

  if (sec.includes('retail') || sec.includes('fmcg')) {
    return {
      text,
      gradient: 'from-neutral-950 via-rose-950/60 to-neutral-900',
      border: 'border-rose-500/30',
      textAccent: 'text-rose-300',
      glow: 'shadow-rose-950/40',
    };
  }

  return {
    text,
    gradient: 'from-neutral-950 via-neutral-900 to-neutral-950',
    border: 'border-amber-500/20',
    textAccent: 'text-amber-400',
    glow: 'shadow-neutral-950/40',
  };
}

const SIZE_CLASSES = {
  xs: 'w-6 h-6 text-[9px]',
  sm: 'w-9 h-9 text-[11px]',
  md: 'w-12 h-12 text-sm',
  lg: 'w-16 h-16 text-base',
  xl: 'w-20 h-20 text-lg',
  custom: '',
};

export function CompanyIdentityImage({
  src,
  name,
  symbol,
  sector,
  industry,
  size = 'md',
  className = '',
  fill = false,
  priority = false,
  alt,
}: CompanyIdentityImageProps) {
  // If src is missing or is a generic/fallback stock photo, render the institutional monogram badge
  const isGenericOrPhotoSrc =
    !src ||
    src.trim().length === 0 ||
    src.startsWith('/fallbacks/') ||
    src.includes('story-') ||
    src.includes('fallback-') ||
    src.includes('unsplash.com') ||
    src.includes('economedia.ro') ||
    src.includes('ytimg.com');

  const [hasError, setHasError] = useState<boolean>(false);
  const info = getCompanyMonogramInfo(name, symbol, sector || industry);
  const effectiveAlt = alt || `Identitate corporativă ${name} (${symbol || 'BVB'})`;

  // Monogram Badge Element
  const MonogramBadge = (
    <div
      className={`relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-br ${info.gradient} ${info.border} border rounded-[inherit] overflow-hidden select-none shadow-inner`}
      aria-label={effectiveAlt}
      data-company-badge="true"
      role="img"
    >
      <div className="absolute inset-0 bg-radial from-white/[0.04] to-transparent pointer-events-none" />
      <span
        className={`font-mono font-black tracking-wider leading-none text-center ${info.textAccent} drop-shadow-sm`}
      >
        {info.text}
      </span>
      {size === 'xl' && symbol && (
        <span className="text-[9px] font-mono text-neutral-400 mt-1 uppercase tracking-widest">
          BVB
        </span>
      )}
    </div>
  );

  // If no official logo asset or if image load failed, render deterministic institutional monogram badge
  if (isGenericOrPhotoSrc || hasError) {
    if (fill) {
      return (
        <div className={`relative w-full h-full rounded-[inherit] ${className}`}>
          {MonogramBadge}
        </div>
      );
    }
    const sizeCls = SIZE_CLASSES[size];
    return (
      <div
        className={`relative ${sizeCls} rounded-xl overflow-hidden shrink-0 ${className}`}
      >
        {MonogramBadge}
      </div>
    );
  }

  // Attempt Next.js Image with onError fallback
  return (
    <div
      className={`relative overflow-hidden rounded-[inherit] ${
        fill ? 'w-full h-full' : `${SIZE_CLASSES[size]} shrink-0`
      } ${className}`}
    >
      <Image
        src={src!}
        alt={effectiveAlt}
        fill
        priority={priority}
        sizes={
          size === 'xs' || size === 'sm'
            ? '36px'
            : size === 'md'
            ? '48px'
            : size === 'lg'
            ? '64px'
            : size === 'xl'
            ? '80px'
            : '(max-width: 640px) 48px, 64px'
        }
        className="object-cover rounded-[inherit]"
        onError={() => setHasError(true)}
      />
    </div>
  );
}

// Alias for convenience
export const CompanyLogo = CompanyIdentityImage;
export const CompanyThumbnail = CompanyIdentityImage;
