import { ComponentProps } from 'react';
import { VideoResult } from 'src/components';
import xml2js from 'xml2js';

type Video = ComponentProps<typeof VideoResult>;
const ufeedUrl = 'https://www.youtube.com/feeds/videos.xml?playlist_id=PLQC9gmr8t9R9tUE68IHZwpMeR8-DgqJkT';

export async function fetchVideosFromXML(feedUrl: string = ufeedUrl): Promise<Video[]> {
  try {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const feedUrl = ufeedUrl;
  const response = await fetch(proxyUrl + feedUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const xmlText = await response.text();
    const parser = new xml2js.Parser({ explicitArray: false });
    const data = await parser.parseStringPromise(xmlText);

    if (!data || !data.feed || !data.feed.entry) return [];

    return data.feed.entry.map((entry: any) => ({
      title: entry.title,
      id: entry["yt:videoId"],
      description: entry["media:group"]["media:description"] || '',
      uploadDate: entry.published,
    })) as Video[];
  } catch (error) {
    console.error('Failed to fetch videos:', error);
    return [];
  }
}
