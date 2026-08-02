import { RadioProgram, RadioPresenter, RadioScheduleItem, StreamConfig, AudioTrack } from '@/types/radio';

export class RadioRepository {
  async getStreamConfig(): Promise<StreamConfig> {
    return {
      provider: 'azuracast',
      streamUrl: 'https://stream.aixmedia.ro/radio/8000/live.mp3',
      stationName: 'AiX Financial Radio',
      bitrate: 320,
      isLive: true,
    };
  }

  async getPrograms(): Promise<RadioProgram[]> {
    return [
      {
        id: 'p1',
        title: 'Bloomberg Market Pulse',
        slug: 'bloomberg-market-pulse',
        description: 'Transmisiune zilnică cu analize financiare, fluctuații bursiere și oportunități de investiții.',
        coverImage: '/radio/market-pulse.jpg',
        presenterId: 'pres1',
        presenterName: 'Cristian Văduva',
        category: 'Finanțe',
        duration: '120 min',
        status: 'Published',
      },
      {
        id: 'p2',
        title: 'Real Estate Executive Briefing',
        slug: 'real-estate-executive-briefing',
        description: 'Interviuri exclusive cu cei mai mari dezvoltatori imobiliari din Europa de Est.',
        coverImage: '/radio/real-estate.jpg',
        presenterId: 'pres1',
        presenterName: 'Cristian Văduva',
        category: 'Imobiliare',
        duration: '60 min',
        status: 'Published',
      },
      {
        id: 'p3',
        title: 'Generali Risk Management Hour',
        slug: 'generali-risk-management',
        description: 'Strategii de asigurare corporate, protecția patrimoniului și transfer de risc.',
        coverImage: '/radio/risk.jpg',
        presenterId: 'pres2',
        presenterName: 'Echipa Generali',
        category: 'Asigurări',
        duration: '45 min',
        status: 'Published',
      },
    ];
  }

  async getPresenters(): Promise<RadioPresenter[]> {
    return [
      {
        id: 'pres1',
        name: 'Cristian Văduva',
        slug: 'cristian-vaduva',
        bio: 'Senior Financial Analyst și fondator AiX OS. Expert în asset management și asigurări premium.',
        avatarUrl: '/authors/cristian-vaduva.jpg',
        socialLinks: { linkedin: 'https://linkedin.com' },
      },
      {
        id: 'pres2',
        name: 'Echipa Generali',
        slug: 'echipa-generali',
        bio: 'Specialiști seniori în asigurări financiare și garantare corporate.',
        avatarUrl: '/authors/generali.jpg',
      },
    ];
  }

  async getSchedule(): Promise<RadioScheduleItem[]> {
    return [
      { id: 's1', programId: 'p1', programTitle: 'Bloomberg Market Pulse', presenterName: 'Cristian Văduva', startTime: '08:00', endTime: '10:00', dayOfWeek: 1, isLive: true },
      { id: 's2', programId: 'p2', programTitle: 'Real Estate Executive Briefing', presenterName: 'Cristian Văduva', startTime: '10:30', endTime: '11:30', dayOfWeek: 1, isLive: false },
      { id: 's3', programId: 'p3', programTitle: 'Generali Risk Management Hour', presenterName: 'Echipa Generali', startTime: '14:00', endTime: '15:00', dayOfWeek: 1, isLive: true },
      { id: 's4', programId: 'p1', programTitle: 'Bloomberg Market Pulse', presenterName: 'Cristian Văduva', startTime: '08:00', endTime: '10:00', dayOfWeek: 2, isLive: true },
      { id: 's5', programId: 'p2', programTitle: 'Real Estate Executive Briefing', presenterName: 'Cristian Văduva', startTime: '10:30', endTime: '11:30', dayOfWeek: 2, isLive: false },
    ];
  }

  async getAudioTracks(): Promise<AudioTrack[]> {
    return [
      { id: 't1', fileName: 'market_pulse_ep_142.mp3', audioUrl: '/audio/market_pulse_ep_142.mp3', fileSize: 45000000, duration: '48:20', bitrate: 320, createdAt: '2026-07-20T10:00:00Z' },
      { id: 't2', fileName: 'real_estate_talk_089.mp3', audioUrl: '/audio/real_estate_talk_089.mp3', fileSize: 32000000, duration: '34:10', bitrate: 320, createdAt: '2026-07-18T14:00:00Z' },
    ];
  }
}
