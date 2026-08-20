import { useState, useEffect } from 'react';
// eslint-disable-next-line react-hooks/set-state-in-effect
interface NowPlayingData {
  isLive: boolean;
  artist: string | null;
  title: string | null;
  album: string | null;
  art: string | null;
  stationName: string;
  listeners: number;
}

export function useNowPlaying() {
  const [data, setData] = useState<NowPlayingData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNowPlaying = async () => {
    try {
      const res = await fetch('/api/radio/nowplaying');
      if (!res.ok) throw new Error('Network response was not ok');
      const json = await res.json();
      setData(json);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 15000);
    return () => clearInterval(interval);
  }, []);

  return { ...(data as NowPlayingData), loading, error };
}
