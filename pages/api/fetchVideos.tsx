import xml2js from 'xml2js'
import { withEncryption } from '../../lib/apiMiddleware'
import { playlistId } from 'constants/playlistInfo'

async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const emptyVideos: any[] = []

  try {
    if (!playlistId || typeof playlistId !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid playlist ID' })
    }

    // Fetch data from YouTube
    const feedUrl = `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`
    const response = await fetch(feedUrl)

    if (!response.ok) {
      console.warn(
        `YouTube feed returned ${response.status}; serving an empty videos list`
      )
      return res.status(200).json(emptyVideos)
    }

    const xmlText = await response.text()
    const parser = new xml2js.Parser({ explicitArray: false })
    const data = await parser.parseStringPromise(xmlText)

    if (!data?.feed?.entry) {
      return res.status(404).json({ error: 'No videos found' })
    }

    const videos = data.feed.entry.map((entry: any) => ({
      title: entry.title,
      id: entry['yt:videoId'],
      description: entry['media:group']['media:description'] || '',
      uploadDate: entry.published,
    }))

    res.setHeader(
      'Cache-Control',
      'public, s-maxage=3600, stale-while-revalidate'
    )
    res.status(200).json(videos)
  } catch (error) {
    console.warn('Failed to fetch videos; serving an empty list:', error)
    res.status(200).json(emptyVideos)
  }
}

export default withEncryption(handler)
