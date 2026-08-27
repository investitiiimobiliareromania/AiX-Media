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
  // 1. Determine Badge Text
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
      text = words[0]!.slice(0, Math.min(3, words[0]!.length)).toUpperCase();
    } else {
      text = name.slice(0, 2).toUpperCase();
    }
  }

  // 2. Determine Institutional Palette
  const sector = (sectorOrIndustry || '').toLowerCase();
  const s = (symbol || '').toUpperCase();

  if (
    s === 'TLV' ||
    s === 'BRD' ||
    s === 'BCR' ||
    s === 'UCB' ||
    s === 'BVB' ||
    sector.includes('banc') ||
    sector.includes('financiar')
  ) {
    return {
      text,
      gradient: 'from-slate-900 via-blue-950/80 to-neutral-950',
      border: 'border-blue-500/30',
      textAccent: 'text-amber-400',
      glow: 'shadow-blue-950/40',
    };
  }

  if (
    s === 'H2O' ||
    s === 'SNP' ||
    s === 'SNG' ||
    s === 'SNN' ||
    s === 'EL' ||
    sector.includes('energ') ||
    sector.includes('utilit') ||
    sector.includes('nuclear') ||
    sector.includes('gaz')
  ) {
    return {
      text,
      gradient: 'from-neutral-950 via-emerald-950/80 to-neutral-900',
      border: 'border-emerald-500/30',
      textAccent: 'text-emerald-400',
      glow: 'shadow-emerald-950/40',
    };
  }

  if (
    s === 'ONE' ||
    s === 'STR' ||
    sector.includes('imobil') ||
    sector.includes('real estate') ||
    sector.includes('construct')
  ) {
    return {
      text,
      gradient: 'from-neutral-950 via-amber-950/70 to-neutral-900',
      border: 'border-amber-500/30',
      textAccent: 'text-amber-400',
      glow: 'shadow-amber-950/40',
    };
  }

  if (
    s === 'UI' ||
    s === 'BIT' ||
    sector.includes('tech') ||
    sector.includes('software') ||
    sector.includes('digital') ||
    sector.includes('ai')
  ) {
    return {
      text,
      gradient: 'from-neutral-950 via-purple-950/70 to-neutral-900',
      border: 'border-purple-500/30',
      textAccent: 'text-purple-300',
      glow: 'shadow-purple-950/40',
    };
  }

  if (
    s === 'DACIA' ||
    s === 'FORD' ||
    sector.includes('auto') ||
    sector.includes('transport')
  ) {
    return {
      text,
      gradient: 'from-neutral-950 via-zinc-800/80 to-neutral-900',
      border: 'border-zinc-500/30',
      textAccent: 'text-zinc-200',
      glow: 'shadow-zinc-950/40',
    };
  }

  if (
    s === 'DEDEMAN' ||
    s === 'KAUFLAND' ||
    s === 'LIDL' ||
    sector.includes('retail') ||
    sector.includes('fmcg')
  ) {
    return {
      text,
      gradient: 'from-neutral-950 via-rose-950/60 to-neutral-900',
      border: 'border-rose-500/30',
      textAccent: 'text-rose-300',
      glow: 'shadow-rose-950/40',
    };
  }

  // Default Luxury Institutional Dark
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
  sm: 'w-8 h-8 text-[11px]',
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
    src.includes('unsplash.com');

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
            ? '32px'
            : size === 'md'
            ? '64px'
            : size === 'lg'
            ? '96px'
            : size === 'xl'
            ? '128px'
            : '(max-width: 640px) 64px, 128px'
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
