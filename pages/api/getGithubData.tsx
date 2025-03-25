export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
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
    repositories: [],
  }

  try {
    const githubUrl = 'https://github.com/Sabyasachi-Seal'
    const usernameRegex = /github\.com\/([a-zA-Z0-9-]+)/
    const usernameMatch = usernameRegex.exec(githubUrl)
    if (!usernameMatch) {
      throw new Error('Invalid GitHub URL')
    }
    const username = usernameMatch[1]

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
      repositories: detailedRepos,
    }
  } catch (error) {
    console.error('Error fetching GitHub data:', error)
    return res.status(500).json({ error: 'Failed to fetch GitHub data' })
  }

  res.status(200).json({ githubInfo })
}
