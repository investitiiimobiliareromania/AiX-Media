export interface YouTubeVideo {
  id: string;
  title: string;
  url: string;
  embedUrl: string;
  type: "video" | "short";
  publishedAt: string;
  category: string;
  description: string;
  duration: string;
  slug: string;
}

export const youtubeChannelUrl = "https://www.youtube.com/@CristianVaduvaCV";

export const verifiedVideos: YouTubeVideo[] = [
  {
    id: "PzPo7wbtUB4",
    title: "Cristian Văduva - Real Estate & Wealth Intelligence",
    url: "https://www.youtube.com/watch?v=PzPo7wbtUB4",
    embedUrl: "https://www.youtube-nocookie.com/embed/PzPo7wbtUB4",
    type: "video",
    publishedAt: "2026-08-08",
    category: "Real Estate & Wealth",
    description: "Official presentation of premium real estate opportunities, wealth portfolio management, and strategic client advisory resources by Cristian Văduva.",
    duration: "12:45",
    slug: "cristian-vaduva-real-estate-wealth-intelligence",
  }
];
