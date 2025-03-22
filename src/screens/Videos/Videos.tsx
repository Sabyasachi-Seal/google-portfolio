import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { LoadTime, VideoResult } from 'src/components'
import { fetchVideosFromXML } from 'src/content'

import styles from './Videos.module.scss'

export const Videos: NextPage = () => {
  const [videos, setVideos] = useState<{ id: string; [key: string]: any }[]>([])

  useEffect(() => {
    const fetchVideos = async () => {
      const data = await fetchVideosFromXML()
      setVideos(Array.isArray(data) ? data : [])
    }
    fetchVideos()
  }, [])

  return (
    <div className={styles.container}>
      <LoadTime count={videos.length} />
      <div className={styles.results}>
        {videos.map((video) => (
          <VideoResult
            {...video}
            key={video.id}
            title={video.title || 'Untitled'}
            description={video.description || 'No description available'}
            uploadDate={video.uploadDate || 'Unknown date'}
          />
        ))}
      </div>
    </div>
  )
}
