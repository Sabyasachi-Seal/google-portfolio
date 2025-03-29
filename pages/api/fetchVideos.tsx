import type { NextApiRequest, NextApiResponse } from 'next'
import xml2js from 'xml2js'
import NodeCache from 'node-cache'

// Initialize cache with 1 hour TTL
const cache = new NodeCache({
  stdTTL: 60 * 60, // 1 hour in seconds
  checkperiod: 120, // Check for expired items every 2 minutes
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { playlistId } = req.query
    if (!playlistId || typeof playlistId !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid playlist ID' })
    }

    // Cache key for this specific playlist
    const cacheKey = `playlist_${playlistId}`

    // Check if data is in cache
    const cachedData = cache.get(cacheKey)
    if (cachedData) {
      return res.status(200).json(cachedData)
    }

    // Fetch data from YouTube
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

    // Store data in cache
    cache.set(cacheKey, videos)

    res.status(200).json(videos)
  } catch (error) {
    console.error('Failed to fetch videos:', error)
    res.status(500).json({ error: 'Failed to fetch videos' })
  }
}
