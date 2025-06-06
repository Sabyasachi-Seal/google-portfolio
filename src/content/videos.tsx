import { ComponentProps } from 'react'
import { VideoResult } from 'src/components'
import { encrypt, decrypt } from '../../lib/cryptoUtils'

type Video = ComponentProps<typeof VideoResult>

export async function fetchVideosFromXML(): Promise<Video[]> {
  try {
    const response = await fetch(`/api/fetchVideos`)

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const { data: encryptedResponse } = await response.json()

    // Decrypt the response
    const decryptedData = decrypt(encryptedResponse)

    return decryptedData
  } catch (error) {
    console.error('Failed to fetch videos:', error)
    return []
  }
}
