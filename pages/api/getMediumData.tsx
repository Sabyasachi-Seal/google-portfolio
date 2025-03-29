import { parseStringPromise } from 'xml2js'
import fs from 'fs'
import path from 'path'

const CACHE_DIR = path.resolve('./cache')
const CACHE_FILE = path.join(CACHE_DIR, 'mediumInfo.json')
const CACHE_TTL = 60 * 60 * 1000 // Cache for 1 hour

// Ensure the cache directory exists
if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR)
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Check if cache exists and is valid
  if (fs.existsSync(CACHE_FILE)) {
    const stats = fs.statSync(CACHE_FILE)
    const now = Date.now()
    if (now - stats.mtimeMs < CACHE_TTL) {
      const cachedData = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'))
      return res.status(200).json({ mediumInfo: cachedData })
    }
  }

  let mediumInfo: {
    username: string
    recentPosts: {
      title: string
      link: string
      pubDate: string
      description: string
      thumbnail: string
    }[]
  } = {
    username: '',
    recentPosts: [],
  }

  try {
    const mediumUrl = 'https://medium.com/feed/@yoboy907'
    const mediumResponse = await fetch(mediumUrl)

    if (!mediumResponse.ok) {
      throw new Error(
        `Failed to fetch Medium feed: ${mediumResponse.status} ${mediumResponse.statusText}`
      )
    }

    const mediumXmlText = await mediumResponse.text()

    const xmlData = await parseStringPromise(mediumXmlText)

    const mediumUsername =
      /medium\.com\/feed\/@([a-zA-Z0-9-]+)/.exec(mediumUrl)?.[1] ?? ''

    const items = xmlData.rss?.channel?.[0]?.item || []
    const recentPosts = items.slice(0, 5).map((item: any) => {
      const title = item.title?.[0] || 'No title'
      const link = item.link?.[0] || ''
      const pubDate = item.pubDate?.[0] || ''
      const description = item.description?.[0] || 'No description'
      const content = item['content:encoded']?.[0] || ''

      return {
        title,
        link,
        pubDate,
        description: description,
        thumbnail: content.match(/src="([^"]+)"/)?.[1] || '',
      }
    })

    mediumInfo = {
      username: mediumUsername,
      recentPosts: recentPosts,
    }

    // Store the result in the cache file
    fs.writeFileSync(CACHE_FILE, JSON.stringify(mediumInfo), 'utf-8')
  } catch (error) {
    console.error('Error fetching Medium data:', error)
    return res.status(500).json({ error: 'Failed to fetch Medium data' })
  }

  res.status(200).json({ mediumInfo })
}
