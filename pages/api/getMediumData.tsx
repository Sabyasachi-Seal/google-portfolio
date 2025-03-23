import { parseStringPromise } from 'xml2js'

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  let mediumInfo: {
    username: string
    recentPosts: {
      title: string
      link: string
      pubDate: string
      description: string
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

      const cleanDescription =
        description.replace(/<[^>]+>/g, '').slice(0, 200) + '...'

      return {
        title,
        link,
        pubDate,
        description: cleanDescription,
      }
    })

    mediumInfo = {
      username: mediumUsername,
      recentPosts: recentPosts,
    }
  } catch (E) {
    console.error('Error fetching Medium data:', E)
  }
  res.status(200).json({ mediumInfo })
}
