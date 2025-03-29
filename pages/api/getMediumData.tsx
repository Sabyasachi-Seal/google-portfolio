import { parseStringPromise } from 'xml2js'
import NodeCache from 'node-cache'

// Initialize cache with 1 hour TTL
const cache = new NodeCache({
  stdTTL: 60 * 60, // 1 hour in seconds
  checkperiod: 120, // Check for expired items every 2 minutes
})

const CACHE_KEY = 'mediumInfo'

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Check cache first
  const cachedData = cache.get(CACHE_KEY)
  if (cachedData) {
    return res.status(200).json({ mediumInfo: cachedData })
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

    // Store in cache
    cache.set(CACHE_KEY, mediumInfo)
  } catch (error) {
    console.error('Error fetching Medium data:', error)
    return res.status(500).json({ error: 'Failed to fetch Medium data' })
  }

  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')
  res.status(200).json({ mediumInfo })
}
