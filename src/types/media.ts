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
