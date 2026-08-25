/* eslint-disable */
import { verifiedVideos, verifiedShorts } from '../src/config/youtube';
import { podcastEpisodes } from '../src/lib/media/mock-db';
import { verifiedRadioStations } from '../src/lib/radio-intelligence-service';

interface MediaIssue {
  type: string;
  item: string;
  reason: string;
}

const issues: MediaIssue[] = [];

console.log('=== AIX MEDIA — MEDIA ASSETS & STREAMING CONNECTIVITY AUDIT ===\n');

// 1. YouTube Videos & Shorts
console.log('1. Auditing YouTube Videos & Shorts IDs...');
const allVideos = [...verifiedVideos, ...verifiedShorts];
allVideos.forEach((v) => {
  if (!v.id || v.id.length !== 11) {
    issues.push({ type: 'YouTube', item: v.title, reason: `Invalid YouTube ID: "${v.id}" (must be 11 characters)` });
  }
  if (!v.url.startsWith('https://www.youtube.com')) {
    issues.push({ type: 'YouTube', item: v.title, reason: `Invalid YouTube URL: "${v.url}"` });
  }
});

// 2. Podcast Episodes & Audio Assets
console.log('2. Auditing Podcasts Audio URLs & Cover Assets...');
podcastEpisodes.forEach((pod) => {
  if (!pod.audioUrl || !pod.audioUrl.startsWith('http')) {
    issues.push({ type: 'Podcast', item: pod.title, reason: `Invalid or missing audioUrl: "${pod.audioUrl}"` });
  }
  if (!pod.coverImage) {
    issues.push({ type: 'Podcast', item: pod.title, reason: 'Missing cover image' });
  }
});

// 3. Live Radio Stations & Streaming Feeds
console.log('3. Auditing Verified Radio Station Streams...');
verifiedRadioStations.forEach((st) => {
  if (!st.streamUrl || (!st.streamUrl.startsWith('http') && !st.streamUrl.startsWith('/api/radio/stream-proxy'))) {
    issues.push({ type: 'Radio', item: st.name, reason: `Invalid live stream URL: "${st.streamUrl}"` });
  }
  if (!st.logo) {
    issues.push({ type: 'Radio', item: st.name, reason: 'Missing station logo' });
  }
});

// Report
console.log('\n=== MEDIA AUDIT RESULTS ===');
if (issues.length === 0) {
  console.log('✓ PASS: All YouTube videos/shorts, podcast audio files, and verified radio streams validated with 0 errors.');
  process.exit(0);
} else {
  console.error(`✗ FAILED: Found ${issues.length} media issues:`);
  issues.forEach((err, idx) => {
    console.error(`  ${idx + 1}. [${err.type}] ${err.item}: ${err.reason}`);
  });
  process.exit(1);
}
