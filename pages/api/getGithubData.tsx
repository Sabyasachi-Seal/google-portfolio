import { withEncryption } from '../../lib/apiMiddleware'

async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  interface Repository {
    name: string
    description: string
    stars: number
    forks: number
    language: string
    createdAt: string
    updatedAt: string
  }

  let githubInfo: {
    username: string
    name: string
    bio: string
    publicRepos: number
    followers: number
    following: number
    location: string
    email: string
    blog: string
    repositories: Repository[]
  }

  try {
    const username = 'Sabyasachi-Seal'

    // Fetch user data
    const githubResponse = await fetch(
      `https://api.github.com/users/${username}`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
      }
    )

    if (!githubResponse.ok) {
      throw new Error('Failed to fetch GitHub user data')
    }

    const githubData = await githubResponse.json()

    // Fetch all repositories with pagination
    let reposData: any[] = []
    let page = 1
    const perPage = 100

    while (true) {
      const reposResponse = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}`,
        {
          headers: {
            Accept: 'application/vnd.github.v3+json',
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
          },
        }
      )

      if (!reposResponse.ok) {
        throw new Error('Failed to fetch GitHub repositories')
      }

      const pageData = await reposResponse.json()
      reposData = reposData.concat(pageData)

      if (pageData.length < perPage) {
        break // No more pages
      }

      page++
    }

    // Map repositories to include more details
    const detailedRepos = reposData.map((repo: any) => ({
      name: repo.name ?? '',
      description: repo.description ?? 'No description',
      stars: repo.stargazers_count ?? 0,
      forks: repo.forks_count ?? 0,
      language: repo.language ?? 'Not specified',
      createdAt: repo.created_at ?? '',
      updatedAt: repo.updated_at ?? '',
    }))

    const max_repos = parseInt(process.env.MAX_REPOS ?? '20', 10) / 2

    const topByTime = [...detailedRepos]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, max_repos)

    const topByForks = [...detailedRepos]
      .sort((a, b) => b.forks - a.forks)
      .slice(0, max_repos)

    const uniqueTopRepos = Array.from(
      new Map([...topByTime, ...topByForks].map((repo) => [repo.name, repo]))
    ).map(([, repo]) => repo)

    // Sort uniqueTopRepos by stars+forks
    uniqueTopRepos.sort((a, b) => b.stars + b.forks - (a.stars + a.forks))

    githubInfo = {
      username: githubData.login ?? '',
      name: githubData.name ?? 'Not provided',
      bio: githubData.bio ?? 'Not provided',
      publicRepos: githubData.public_repos ?? 0,
      followers: githubData.followers ?? 0,
      following: githubData.following ?? 0,
      location: githubData.location ?? 'Not provided',
      email: githubData.email ?? 'Not provided',
      blog: githubData.blog ?? 'Not provided',
      repositories: uniqueTopRepos ?? [],
    }
  } catch (error) {
    console.error('Error fetching GitHub data:', error)
    return res.status(500).json({ error: 'Failed to fetch GitHub data' })
  }

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=3600, stale-while-revalidate'
  )
  res.status(200).json({ githubInfo })
}

export default withEncryption(handler)
