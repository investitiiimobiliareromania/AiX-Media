import { bvbCompanies } from './bvb-data';
import { institutionalDossiers } from './institutional-company-dossiers';
import { InlineSegment } from './article-normalizer';

export interface VerifiedCompanyEntity {
  slug: string;
  primaryName: string;
  symbol?: string;
  matchPatterns: RegExp[];
}

/**
 * Build deterministic entity lookup table from production data sources
 * (bvbCompanies and institutionalDossiers)
 */
export function getVerifiedCompanyEntities(): VerifiedCompanyEntity[] {
  const entityMap = new Map<string, VerifiedCompanyEntity>();

  // 1. Gather all verified companies from BVB and Institutional Dossiers
  const allCompanies = [
    ...bvbCompanies.map((c) => ({ slug: c.slug, name: c.name, symbol: c.symbol })),
    ...institutionalDossiers.map((d) => ({ slug: d.slug, name: d.name, symbol: d.symbol })),
  ];

  for (const c of allCompanies) {
    if (entityMap.has(c.slug)) continue;

    const names: string[] = [];

    if (c.slug === 'banca-transilvania') {
      names.push('Banca Transilvania S.A.', 'Banca Transilvania');
    } else if (c.slug === 'hidroelectrica') {
      names.push('S.P.E.E.H. Hidroelectrica S.A.', 'Hidroelectrica');
    } else if (c.slug === 'omv-petrom') {
      names.push('OMV Petrom S.A.', 'OMV Petrom', 'Petrom');
    } else if (c.slug === 'one-united-properties') {
      names.push('One United Properties S.A.', 'One United Properties');
    } else if (c.slug === 'romgaz') {
      names.push('S.N.G.N. Romgaz S.A.', 'Romgaz');
    } else if (c.slug === 'bursa-de-valori-bucuresti') {
      names.push('Bursa de Valori Bucuresti S.A.', 'Bursa de Valori București S.A.', 'Bursa de Valori București', 'Bursa de Valori Bucuresti');
    } else if (c.slug === 'nuclearelectrica') {
      names.push('S.N. Nuclearelectrica S.A.', 'Nuclearelectrica');
    } else if (c.slug === 'automobile-dacia') {
      names.push('Automobile Dacia S.A.', 'Automobile Dacia', 'Dacia Mioveni');
    } else if (c.slug === 'dedeman') {
      names.push('Dedeman S.R.L.', 'Dedeman');
    } else if (c.slug === 'uipath') {
      names.push('UiPath Inc.', 'UiPath');
    } else {
      names.push(c.name);
    }

    // Escape regex special characters
    const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Build regex patterns
    const matchPatterns: RegExp[] = [];

    // Name patterns with word boundaries
    for (const name of names) {
      matchPatterns.push(new RegExp(`\\b${escapeRegex(name)}\\b`, 'i'));
    }

    // Ticker patterns only when preceded by '$' or enclosed in parentheses (e.g. '$TLV', '(H2O)', '(SNP)')
    if (c.symbol && c.symbol.length >= 3) {
      matchPatterns.push(new RegExp(`(?:\\$|\\()(${escapeRegex(c.symbol)})(?:\\)|\\b)`, 'i'));
    }

    entityMap.set(c.slug, {
      slug: c.slug,
      primaryName: c.name,
      symbol: c.symbol,
      matchPatterns,
    });
  }

  // Sort entities by longest primary name first to avoid partial name clashes
  return Array.from(entityMap.values()).sort(
    (a, b) => b.primaryName.length - a.primaryName.length
  );
}

const VERIFIED_ENTITIES = getVerifiedCompanyEntities();

interface EntityMatch {
  entity: VerifiedCompanyEntity;
  index: number;
  length: number;
  matchText: string;
}

function processTextSegment(
  text: string,
  type: 'text' | 'bold' | 'italic',
  linkedEntitiesSet: Set<string>
): InlineSegment[] {
  if (!text) return [];

  // Find all candidate matches across unlinked entities
  let earliestMatch: EntityMatch | null = null;

  for (const entity of VERIFIED_ENTITIES) {
    if (linkedEntitiesSet.has(entity.slug)) continue;

    for (const pattern of entity.matchPatterns) {
      const match = pattern.exec(text);
      if (match && match.index !== undefined) {
        const candidate: EntityMatch = {
          entity,
          index: match.index,
          length: match[0].length,
          matchText: match[0],
        };

        if (
          !earliestMatch ||
          candidate.index < earliestMatch.index ||
          (candidate.index === earliestMatch.index && candidate.length > earliestMatch.length)
        ) {
          earliestMatch = candidate;
        }
      }
    }
  }

  if (!earliestMatch) {
    return [{ type, text }];
  }

  const { entity, index, length, matchText } = earliestMatch;
  linkedEntitiesSet.add(entity.slug);

  const beforeText = text.slice(0, index);
  const afterText = text.slice(index + length);

  const resultSegments: InlineSegment[] = [];

  if (beforeText) {
    resultSegments.push(...processTextSegment(beforeText, type, linkedEntitiesSet));
  }

  resultSegments.push({
    type: 'link',
    text: matchText,
    href: `/companies/${entity.slug}`,
  });

  if (afterText) {
    resultSegments.push(...processTextSegment(afterText, type, linkedEntitiesSet));
  }

  return resultSegments;
}

/**
 * Contextually inject company dossier internal links into parsed inline segments.
 *
 * Enforces strict rules:
 * - Max 1 link per company per article
 * - Preserves existing editorial anchors (no nested <a>)
 * - Preserves 100% of visible text, diacritics, and formatting
 */
export function injectContextualEntityLinks(
  segments: InlineSegment[],
  linkedEntitiesSet: Set<string>
): InlineSegment[] {
  // First pass: Detect any pre-existing editorial company links
  for (const seg of segments) {
    if (seg.type === 'link' && seg.href) {
      for (const entity of VERIFIED_ENTITIES) {
        if (seg.href.includes(`/companies/${entity.slug}`)) {
          linkedEntitiesSet.add(entity.slug);
        }
      }
    }
  }

  const resultSegments: InlineSegment[] = [];

  for (const seg of segments) {
    // Skip existing links or empty segments
    if (seg.type === 'link' || !seg.text) {
      resultSegments.push(seg);
      continue;
    }

    // Skip segments that look like raw URLs or email addresses
    if (/^(https?:\/\/|mailto:|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i.test(seg.text.trim())) {
      resultSegments.push(seg);
      continue;
    }

    const processed = processTextSegment(seg.text, seg.type as 'text' | 'bold' | 'italic', linkedEntitiesSet);
    resultSegments.push(...processed);
  }

  return resultSegments;
}

