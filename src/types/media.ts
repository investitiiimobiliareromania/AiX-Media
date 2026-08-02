export type VideoProvider = 'youtube' | 'vimeo' | 'self_hosted';

export interface VideoItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  provider: VideoProvider;
  videoUrl: string;
  thumbnailUrl: string;
  category: string;
  duration: string;
  speakerName: string;
  transcript?: string;
  status: 'Published' | 'Draft' | 'Archived';
  createdAt: string;
}

export interface PodcastChapter {
  startTime: string; // e.g. "02:15"
  title: string;
}

export interface PodcastItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  audioUrl: string;
  artworkUrl: string;
  category: string;
  duration: string;
  chapters: PodcastChapter[];
  transcript?: string;
  speakers: string[];
  tags: string[];
  status: 'Published' | 'Draft' | 'Archived';
  createdAt: string;
}
