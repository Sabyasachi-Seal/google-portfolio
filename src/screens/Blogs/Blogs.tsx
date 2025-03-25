import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { LoadTime, BlogResult } from 'src/components'
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

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data: BlogResponse = await getBlogs()
        const recentPosts = data.mediumInfo?.recentPosts || []
        setBlogs(recentPosts)
      } catch (error) {
        console.error('Error fetching blogs:', error)
      }
    }
    fetchBlogs()
  }, [])

  return (
    <div className={styles.container}>
      <LoadTime count={blogs.length} />
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
    </div>
  )
}
