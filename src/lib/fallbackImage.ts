import crypto from 'crypto';

/**
 * Story-aware explicit mapping for articles without valid or relevant publisher images.
 * Maps article slugs to story-specific realistic photography assets.
 */
const STORY_FALLBACK_MAP: Record<string, string> = {
  // Originally unmapped or null publisher articles
  'o-tuica-de-kiwi-in-bulgaria-recomandari-de-citit-in-vacanta-in-editia-de-duminica-23-augus': '/fallbacks/story-travel-bulgaria.jpg',
  'lepas-pe-soselele-din-romania-primele-automobile-ale-brandului-au-ajuns-la-sibiu-brandul-p': '/fallbacks/story-automotive-lepas.jpg',
  'izbucnire-in-psd-dupa-ce-un-fost-apropiat-al-partidului-organizeaza-iesirile-in-multime-al': '/fallbacks/story-politics-psd.jpg',
  'gigantul-austriac-strabag-cumpara-doua-firme-romanesti-cu-afaceri-de-peste-25-milioane-eur': '/fallbacks/story-construction-strabag.jpg',
  'bratul-lung-al-beijingului-cum-prinde-china-multinationalele-in-capcana-pentru-a-incalca-s': '/fallbacks/story-china-beijing.jpg',
  'surpriza-rival-al-lidl-si-kaufland-ia-in-calcul-romania-gigantul-globus-cu-zeci-de-hiperma': '/fallbacks/story-retail-globus.jpg',
  'prinsi-in-furtuna-o-romanca-atat-de-curajoasa-incat-a-ramas-in-afganistan-cand-s-au-intors': '/fallbacks/story-international-afghan.jpg',
  'datoria-ascunsa-a-apple-fata-de-cia': '/fallbacks/story-apple-tech-cia.jpg',
  'mesajul-marelui-placido-domingo-dupa-moartea-sopranei-ileana-cotrubas-am-creat-impreuna-re': '/fallbacks/story-opera-culture.jpg',
  'dupa-zombii-de-telefon-si-dependentii-de-selfi-uri-bundeswehr-ul-are-si-el-un-instrument-d': '/fallbacks/story-defense-bundeswehr.jpg',
  'articolul-5-al-nato-va-fi-activat-daca-tara-vecina-romaniei-vizata-de-planul-iranului-va-f': '/fallbacks/story-nato-security.jpg',
  'un-albanez-a-atras-finantari-de-peste-1-miliard-dolari-pentru-startup-ul-sau-ai': '/fallbacks/story-ai-startup.jpg',
  'piratii-somalezi-au-preluat-controlul-unui-petrolier-in-largul-coastelor-yemenului': '/fallbacks/story-maritime-port.jpg',
  'zilele-prostirii-nationale-cand-ordinul-de-partid-bate-cuvantul-lui-plesu-liiceanu-sau-mic': '/fallbacks/story-romanian-culture.jpg',
  'parc-fotovoltaic-de-248-mw-in-dolj-finantat-cu-335-milioane-de-lei-de-libra-internet-bank': '/fallbacks/story-energy-solar.jpg',

  // Newly identified irrelevant publisher image replacements
  'marea-vanzare-de-obligatiuni-ce-anume-reinvie-amintirile-crizei-din-2008': '/fallbacks/story-bond-crisis.jpg',
  'un-cutremur-puternic-loveste-o-noua-tara-din-america-de-sud': '/fallbacks/story-earthquake-southamerica.jpg',
  'cel-mai-batran-sef-de-stat-din-lume-s-a-intors-in-tara-dupa-o-absenta-de-2-luni-si-jumatat': '/fallbacks/story-state-head.jpg',
  'politiciana-europeana-care-a-avut-ghinionul-unei-muscaturi-extrem-de-rare-de-vipera-nu-mai': '/fallbacks/story-politics-europe.jpg',
  'bulgaria-reduce-productia-centralei-nucleare-de-la-kozlodui-din-cauza-nivelului-scazut-al': '/fallbacks/story-nuclear-power.jpg',
  'o-noua-tabara-militara-pentru-trupele-nato-va-fi-construita-intr-o-tara-baltica-cand-va-fi': '/fallbacks/story-nato-baltic.jpg',
  'surpriza-de-proportii-actorii-din-serialul-sons-of-anarchy-se-reunesc-pentru-o-continuare': '/fallbacks/story-cinema-hollywood.jpg',
  'sua-au-trimis-un-nou-portavion-in-orientul-mijlociu-care-sa-inlocuiasca-uss-abraham-lincol': '/fallbacks/story-navy-carrier.jpg',
  'castel-gotic-din-secolul-xix-estimat-la-aproximativ-30000000-de-euro-cumparat-de-mark-zuck': '/fallbacks/story-gothic-castle.jpg',
  'daca-pleaca-toti-cine-mai-poate-construi-un-mare-pianist-care-a-cantat-in-adaposturi-antia': '/fallbacks/story-piano-concert.jpg',
  'este-o-lovitura-dubla-sua-ameninta-iranul-cu-cele-mai-dure-sanctiuni-din-istorie': '/fallbacks/story-iran-sanctions.jpg',
  'un-atac-cu-drone-rusesti-a-avariat-un-punct-de-frontiera-dintre-moldova-si-ucraina': '/fallbacks/story-border-drone.jpg',
  'cat-mai-dureaza-valul-de-canicula-vestea-buna-de-la-meteorologi': '/fallbacks/story-heatwave-weather.jpg',
  'update-incendiu-in-portul-midia-la-o-nava-care-transporta-minereu': '/fallbacks/story-maritime-fire.jpg',
};

/**
 * Returns a story-aware or category-aware deterministic fallback image URL based on the article slug.
 */
export function getFallbackImage(slug: string): string {
  // 1. Check explicit story-specific mapping first
  if (STORY_FALLBACK_MAP[slug]) {
    return STORY_FALLBACK_MAP[slug]!;
  }

  // 2. Check topic/category keywords in slug
  const s = slug.toLowerCase();
  if (s.includes('psd') || s.includes('guvern') || s.includes('politica') || s.includes('lege')) {
    return '/fallbacks/story-politics-psd.jpg';
  }
  if (s.includes('auto') || s.includes('masina') || s.includes('sosea') || s.includes('traffic')) {
    return '/fallbacks/story-automotive-lepas.jpg';
  }
  if (s.includes('banca') || s.includes('bani') || s.includes('finante') || s.includes('bvb') || s.includes('obligatiuni')) {
    return '/fallbacks/story-bond-crisis.jpg';
  }
  if (s.includes('construct') || s.includes('imobilia') || s.includes('cladire') || s.includes('strabag')) {
    return '/fallbacks/story-construction-strabag.jpg';
  }
  if (s.includes('apple') || s.includes('tech') || s.includes('software') || s.includes('digital')) {
    return '/fallbacks/story-apple-tech-cia.jpg';
  }
  if (s.includes('nato') || s.includes('armi') || s.includes('militar') || s.includes('razboi')) {
    return '/fallbacks/story-nato-security.jpg';
  }

  // 3. Fallback to deterministic hash index over 10 distinct architectural building assets
  const hash = crypto.createHash('md5').update(slug).digest('hex');
  const intHash = parseInt(hash.slice(0, 8), 16);
  const index = intHash % 10;
  return `/fallbacks/fallback-${index}.jpg`;
}
