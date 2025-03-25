import { ComponentProps } from 'react'
import { BlogResult } from 'src/components'

type Blog = ComponentProps<typeof BlogResult>

export type BlogResponse = {
  mediumInfo: {
    recentPosts: Blog[]
  }
}

export async function getBlogs(): Promise<BlogResponse> {
  try {
    const response = await fetch('/api/getMediumData', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch Medium data')
    }

    const data = await response.json()
    // console.log('data:', data)

    return data
  } catch (error) {
    console.error('Error fetching Medium data:', error)
    return { mediumInfo: { recentPosts: [] } }
  }
}
