import { ComponentProps } from 'react'
import { ProjectResult } from 'src/components'
import { decrypt } from '../../lib/cryptoUtils'

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

    const { data: encryptedResponse } = await response.json()

    // Decrypt the response
    const decryptedData = decrypt(encryptedResponse)

    return decryptedData
  } catch (error) {
    console.error('Error fetching Github data:', error)
    return { githubInfo: { repositories: [] } }
  }
}
