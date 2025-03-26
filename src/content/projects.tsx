import { ComponentProps } from 'react'
import { ProjectResult } from 'src/components'

type Project = ComponentProps<typeof ProjectResult>

export type ProjectResponse = {
  githubInfo: {
    repositories: Project[]
  }
}

export async function getProjects(): Promise<ProjectResponse> {
  try {
    const response = await fetch('/api/getGithubData', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch Github data')
    }

    const data = await response.json()
    // console.log('data:', data)

    return data
  } catch (error) {
    console.error('Error fetching Github data:', error)
    return { githubInfo: { repositories: [] } }
  }
}
