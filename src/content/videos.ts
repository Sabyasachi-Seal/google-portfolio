import { ComponentProps } from 'react';
import { VideoResult } from 'src/components';

type Video = ComponentProps<typeof VideoResult>;
const ufeedUrl = 'https://www.youtube.com/feeds/videos.xml?playlist_id=PLQC9gmr8t9R9tUE68IHZwpMeR8-DgqJkT';

export async function fetchVideosFromXML(playlistId: string = 'PLQC9gmr8t9R9tUE68IHZwpMeR8-DgqJkT'): Promise<Video[]> {
  try {
    const response = await fetch(`/api/fetchVideos?playlistId=${playlistId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch videos:', error);
    return [];
  }
}
