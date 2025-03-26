import type { NextApiRequest, NextApiResponse } from 'next'
import xml2js from 'xml2js'

// In-memory cache
const cache: { [key: string]: { data: any; expiry: number } } = {}
const CACHE_TTL = 60 * 5 * 1000 // Cache TTL in milliseconds (5 minutes)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { playlistId } = req.query
    if (!playlistId || typeof playlistId !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid playlist ID' })
    }

    // Check cache
    const cacheKey = `playlist_${playlistId}`
    const cached = cache[cacheKey]
    if (cached && cached.expiry > Date.now()) {
      return res.status(200).json(cached.data)
    }

    const feedUrl = `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`
    const response = await fetch(feedUrl)

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
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

    // Store in cache
    cache[cacheKey] = {
      data: videos,
      expiry: Date.now() + CACHE_TTL,
    }

    res.status(200).json(videos)
  } catch (error) {
    console.error('Failed to fetch videos:', error)
    res.status(500).json({ error: 'Failed to fetch videos' })
  }
}
