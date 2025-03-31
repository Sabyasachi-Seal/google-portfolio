import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { LoadTime, LoadProgress, VideoResult } from 'src/components'
import { fetchVideosFromXML } from 'src/content'

import styles from './Videos.module.scss'

export const Videos: NextPage = () => {
  const [videos, setVideos] = useState<{ id: string; [key: string]: any }[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [progress, setProgress] = useState<number>(0)
  useEffect(() => {
    const updateProgress = () => {
      setProgress((prev) => (prev < 90 ? prev + 0.1 : prev))
    }
    const fetchVideos = async () => {
      setLoading(true)
      setInterval(updateProgress, 200)
      const data = await fetchVideosFromXML()
      setVideos(Array.isArray(data) ? data : [])
      setLoading(false)
    }
    fetchVideos()
  }, [])

  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loading}>
          <LoadProgress count={progress} />
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  )
}
