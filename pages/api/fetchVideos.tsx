import type { NextApiRequest, NextApiResponse } from 'next'
import xml2js from 'xml2js'
import fs from 'fs'
import path from 'path'

// Cache directory
const CACHE_DIR = path.resolve('./cache')
const CACHE_TTL = 60 * 60 * 1000 // Cache TTL in milliseconds (5 minutes)

// Ensure the cache directory exists
if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR)
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { playlistId } = req.query
    if (!playlistId || typeof playlistId !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid playlist ID' })
    }

    // Cache file path
    const cacheFilePath = path.join(CACHE_DIR, `playlist_${playlistId}.json`)

    // Check if cache exists and is valid
    if (fs.existsSync(cacheFilePath)) {
      const stats = fs.statSync(cacheFilePath)
      const now = Date.now()
      if (now - stats.mtimeMs < CACHE_TTL) {
        const cachedData = JSON.parse(fs.readFileSync(cacheFilePath, 'utf-8'))
        return res.status(200).json(cachedData)
      }
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

    // Store data in cache file
    fs.writeFileSync(cacheFilePath, JSON.stringify(videos), 'utf-8')

    res.status(200).json(videos)
  } catch (error) {
    console.error('Failed to fetch videos:', error)
    res.status(500).json({ error: 'Failed to fetch videos' })
  }
}
