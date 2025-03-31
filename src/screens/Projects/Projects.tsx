import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { LoadTime, ProjectResult } from 'src/components'
import { ProjectResponse, getProjects } from 'src/content'

import styles from './Projects.module.scss'

export const Projects: NextPage = () => {
  const [projects, setProjects] = useState<
    {
      name: string
      description: string
      stars: number
      forks: number
      language: string
      link: string
    }[]
  >([])
  const [loading, setLoading] = useState<boolean>(true)
  const [progress, setProgress] = useState<number>(0)

  useEffect(() => {
    const updateProgress = () => {
      setProgress((prev) => (prev < 90 ? prev + 0.1 : prev))
    }

    const fetchProjects = async () => {
      setLoading(true)
      setInterval(updateProgress, 200)
      try {
        const data: ProjectResponse = await getProjects()
        const projects = data.githubInfo?.repositories || []
        setProjects(projects)
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loading}>
          <LoadTime count={progress} />
        </div>
      ) : (
        <>
          <LoadTime count={projects.length} />
          <div className={styles.results}>
            {projects.map((project, index) => (
              <ProjectResult
                {...project}
                key={project.link}
                name={project.name || 'Untitled'}
                description={project.description || 'No description available'}
                link={`https://github.com/Sabyasachi-Seal/${project.name}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
