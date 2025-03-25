import { ComponentProps } from 'react'
import { VideoResult } from 'src/components'
import { playlistId } from 'constants/playlistInfo'

type Video = ComponentProps<typeof VideoResult>

export async function fetchVideosFromXML(): Promise<Video[]> {
  try {
    const response = await fetch(`/api/fetchVideos?playlistId=${playlistId}`)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch videos:', error)
    return []
  }
}
