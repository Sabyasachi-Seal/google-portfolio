import { ComponentProps } from 'react';
import { VideoResult } from 'src/components';

type Video = ComponentProps<typeof VideoResult>;
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const ufeedUrl = 'https://www.youtube.com/feeds/videos.xml?playlist_id=PLQC9gmr8t9R9tUE68IHZwpMeR8-DgqJkT';
export async function fetchVideosFromXML(feedUrl: string = ufeedUrl): Promise<Video[]> {
  try {
    const response = await fetch(feedUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const xmlText = await response.text();

    // Parse the XML
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'application/xml');

    // Extract video data
    const items = Array.from(xmlDoc.getElementsByTagName('item'));
    const videos = items.map((item) => {
      const title = item.getElementsByTagName('title')[0]?.textContent || '';
      const id = item.getElementsByTagName('guid')[0]?.textContent || '';
      const description =
        item.getElementsByTagName('description')[0]?.textContent || '';
      const uploadDate =
        item.getElementsByTagName('pubDate')[0]?.textContent || '';

      return {
        title,
        id,
        description,
        uploadDate,
      } as Video;
    });

    return videos;
  } catch (error) {
    console.error('Failed to fetch videos:', error);
    return [];
  }
}