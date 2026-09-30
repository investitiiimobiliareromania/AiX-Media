import { ServerIntelligenceService } from './server-intelligence-service';

export interface DailyMetricsReport {
  dateFormatted: string;
  totalVisitors: number;
  newVisitors: number;
  returningVisitors: number;
  totalSessions: number;
  topLocations: { name: string; count: number }[];
  topSources: { name: string; count: number }[];
  topContent: { route: string; count: number }[];
  topInterests: { category: string; count: number }[];
  keyActions: {
    contactSubmissions: number;
    phoneClicks: number;
    whatsappClicks: number;
    telegramClicks: number;
    newsletterSignups: number;
  };
  deviceBreakdown: {
    mobile: number;
    desktop: number;
    tablet: number;
  };
}

export class DailyIntelligenceAggregator {
  static generateDailyReport(): DailyMetricsReport {
    const sessions = ServerIntelligenceService.getAllActiveSessions();
    const now = new Date();
    const dateFormatted = now.toLocaleDateString('ro-RO', {
      timeZone: 'Europe/Bucharest',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    let newVisitors = 0;
    let returningVisitors = 0;
    const locationMap = new Map<string, number>();
    const sourceMap = new Map<string, number>();
    const contentMap = new Map<string, number>();
    const interestMap = new Map<string, number>();
    let mobile = 0;
    let desktop = 0;
    let tablet = 0;

    for (const s of sessions) {
      if (s.isNewVisitor) newVisitors++;
      else returningVisitors++;

      const locKey = s.location.city ? `${s.location.city}, ${s.location.country}` : s.location.country;
      locationMap.set(locKey, (locationMap.get(locKey) || 0) + 1);

      const srcKey = s.attribution.source || 'Direct';
      sourceMap.set(srcKey, (sourceMap.get(srcKey) || 0) + 1);

      for (const p of s.pagesViewed) {
        contentMap.set(p, (contentMap.get(p) || 0) + 1);
      }

      for (const [cat, score] of s.interestsMap.entries()) {
        interestMap.set(cat, (interestMap.get(cat) || 0) + score);
      }

      if (s.device.deviceType === 'Mobile') mobile++;
      else if (s.device.deviceType === 'Tablet') tablet++;
      else desktop++;
    }

    const sortMap = (map: Map<string, number>) =>
      Array.from(map.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

    const sortContent = (map: Map<string, number>) =>
      Array.from(map.entries())
        .map(([route, count]) => ({ route, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

    const sortInterests = (map: Map<string, number>) =>
      Array.from(map.entries())
        .map(([category, count]) => ({ category, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

    return {
      dateFormatted,
      totalVisitors: sessions.length,
      newVisitors,
      returningVisitors,
      totalSessions: sessions.length,
      topLocations: sortMap(locationMap),
      topSources: sortMap(sourceMap),
      topContent: sortContent(contentMap),
      topInterests: sortInterests(interestMap),
      keyActions: {
        contactSubmissions: 0,
        phoneClicks: 0,
        whatsappClicks: 0,
        telegramClicks: 0,
        newsletterSignups: 0,
      },
      deviceBreakdown: {
        mobile,
        desktop,
        tablet,
      },
    };
  }

  static formatTelegramDailySummary(report: DailyMetricsReport): string {
    const locLines =
      report.topLocations.length > 0
        ? report.topLocations.map((l, i) => `${i + 1}. ${l.name} (${l.count})`).join('\n')
        : 'Nu sunt suficiente date';

    const srcLines =
      report.topSources.length > 0
        ? report.topSources.map((s, i) => `${i + 1}. ${s.name} (${s.count})`).join('\n')
        : 'Direct (100%)';

    const contentLines =
      report.topContent.length > 0
        ? report.topContent.map((c, i) => `${i + 1}. ${c.route} (${c.count} views)`).join('\n')
        : 'Prima pagină';

    const interestLines =
      report.topInterests.length > 0
        ? report.topInterests.map((t, i) => `${i + 1}. ${t.category} (${t.count} pts)`).join('\n')
        : 'Interese generale';

    return [
      `📊 <b>AIX MEDIA — DAILY MARKETING INTELLIGENCE</b>`,
      `─────────────────────`,
      `📅 <b>Data:</b> ${report.dateFormatted}`,
      ``,
      `👥 <b>TRAFFIC & VISITORS</b>`,
      `Total Vizitatori: ${report.totalVisitors}`,
      `Noi: ${report.newVisitors} • Recurenți: ${report.returningVisitors}`,
      `Sesiuni Active: ${report.totalSessions}`,
      ``,
      `🌍 <b>TOP LOCAȚII (REȚEA)</b>`,
      locLines,
      ``,
      `🌐 <b>TOP SURSE ACHIZIȚIE</b>`,
      srcLines,
      ``,
      `📄 <b>TOP CONȚINUT VIZUALIZAT</b>`,
      contentLines,
      ``,
      `🎯 <b>TOP INTERESE DERIVATE</b>`,
      interestLines,
      ``,
      `💻 <b>DISPOZITIVE</b>`,
      `Mobile: ${report.deviceBreakdown.mobile} • Desktop: ${report.deviceBreakdown.desktop} • Tablet: ${report.deviceBreakdown.tablet}`,
    ].join('\n');
  }
}
