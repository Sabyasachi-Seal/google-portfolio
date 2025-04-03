import { ComponentProps } from 'react'
import { BlogResult } from 'src/components'
import { decrypt } from '../../lib/cryptoUtils'

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

    const { data: encryptedResponse } = await response.json()

    // Decrypt the response
    const decryptedData = decrypt(encryptedResponse)

    return decryptedData
  } catch (error) {
    console.error('Error fetching Medium data:', error)
    return { mediumInfo: { recentPosts: [] } }
  }
}
