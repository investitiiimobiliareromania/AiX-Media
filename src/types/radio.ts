export type StreamProviderType = 'icecast' | 'azuracast' | 'hls' | 'mp3';

export interface StreamConfig {
  provider: StreamProviderType;
  streamUrl: string;
  stationName: string;
  bitrate: number;
  isLive: boolean;
}

export interface RadioPresenter {
  id: string;
  name: string;
  slug: string;
  bio?: string;
  avatarUrl?: string;
  socialLinks?: Record<string, string>;
}

export interface RadioProgram {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage?: string;
  presenterId: string;
  presenterName: string;
  category: string;
  duration: string;
  status: 'Published' | 'Draft' | 'Archived';
}

export interface RadioScheduleItem {
  id: string;
  programId: string;
  programTitle: string;
  presenterName: string;
  startTime: string; // e.g. "08:00"
  endTime: string;   // e.g. "10:00"
  dayOfWeek: number; // 0-6 (Sun-Sat)
  isLive: boolean;
}

export interface RadioEpisode {
  id: string;
  programId: string;
  title: string;
  audioUrl: string;
  duration: string;
  publishDate: string;
}

export interface AudioTrack {
  id: string;
  fileName: string;
  audioUrl: string;
  fileSize: number;
  duration: string;
  bitrate: number;
  createdAt: string;
}
