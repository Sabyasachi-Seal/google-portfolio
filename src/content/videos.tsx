import { ComponentProps } from 'react'
import { VideoResult } from 'src/components'
import { playlistId } from 'constants/playlistInfo'
import { encrypt, decrypt } from '../../lib/cryptoUtils'

type Video = ComponentProps<typeof VideoResult>

export async function fetchVideosFromXML(): Promise<Video[]> {
  try {
    // Encrypt the query data
    const queryData = { playlistId }
    const encryptedData = encrypt(queryData)

    const response = await fetch(
      `/api/fetchVideos?encryptedData=${encodeURIComponent(encryptedData)}`
    )

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
