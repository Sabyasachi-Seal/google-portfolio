import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { LoadTime, LoadProgress, BlogResult } from 'src/components'
import { getBlogs, BlogResponse } from 'src/content'

import styles from './Blogs.module.scss'

export const Blogs: NextPage = () => {
  const [blogs, setBlogs] = useState<
    {
      title: string
      link: string
      pubDate: string
      description: string
      thumbnail: string
    }[]
  >([])

  const [loading, setLoading] = useState<boolean>(true)
  const [progress, setProgress] = useState<number>(0)

  useEffect(() => {
    const updateProgress = () => {
      setProgress((prev) => prev + 0.1)
    }
    const fetchBlogs = async () => {
      setLoading(true)
      const interval = setInterval(updateProgress, 200)
      try {
        const data: BlogResponse = await getBlogs()
        const recentPosts = data.mediumInfo?.recentPosts || []
        setBlogs(recentPosts)
        clearInterval(interval)
      } catch (error) {
        console.error('Error fetching blogs:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [])

  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loading}>
          <LoadProgress count={progress} />
        </div>
      ) : (
        <>
          <LoadTime count={blogs.length} overrideLoadTime={progress} />
          <div className={styles.results}>
            {blogs.map((blog, index) => (
              <BlogResult
                {...blog}
                key={blog.link}
                title={blog.title || 'Untitled'}
                description={blog.description || 'No description available'}
                pubDate={blog.pubDate || 'Unknown date'}
                link={blog.link || '#'}
                thumbnail={blog.thumbnail || ''}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
