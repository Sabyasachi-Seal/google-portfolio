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

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data: ProjectResponse = await getProjects()
        const projects = data.githubInfo?.repositories || []
        setProjects(projects)
      } catch (error) {
        console.error('Error fetching projects:', error)
      }
    }
    fetchProjects()
  }, [])

  return (
    <div className={styles.container}>
      <LoadTime count={projects.length} />
      <div className={styles.results}>
        {projects.map((project, index) => (
          <ProjectResult
            {...project}
            key={project.link}
            name={project.name || 'Untitled'}
            description={project.description || 'No description available'}
            link={project.link || '#'}
          />
        ))}
      </div>
    </div>
  )
}
