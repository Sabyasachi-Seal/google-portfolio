const cache = new Map<string, { data: any; expiry: number }>()

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const CACHE_KEY = 'githubInfo'
  const CACHE_TTL = 60 * 60 * 1000

  if (cache.has(CACHE_KEY)) {
    const cachedData = cache.get(CACHE_KEY)
    if (cachedData && cachedData.expiry > Date.now()) {
      return res.status(200).json({ githubInfo: cachedData.data })
    }
  }

  let githubInfo = {
    username: '',
    name: '',
    bio: '',
    publicRepos: 0,
    followers: 0,
    following: 0,
    location: '',
    email: '',
    blog: '',
    repositories: [
      {
        name: '',
        description: '',
        stars: 0,
        forks: 0,
      },
    ],
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

    // sort uniqueTopRepos by stars+forks, then by upload date
    uniqueTopRepos.sort(
      (a, b) =>
        (b.stars + b.forks) * 1000 -
        (a.stars + a.forks) * 1000 +
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )

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

    cache.set(CACHE_KEY, { data: githubInfo, expiry: Date.now() + CACHE_TTL })
  } catch (error) {
    console.error('Error fetching GitHub data:', error)
    return res.status(500).json({ error: 'Failed to fetch GitHub data' })
  }

  res.status(200).json({ githubInfo })
}
