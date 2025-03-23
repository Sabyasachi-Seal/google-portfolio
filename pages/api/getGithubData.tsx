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

    const reposResponse = await fetch(
      `https://api.github.com/users/${username}/repos`,
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

    const reposData = await reposResponse.json()

    githubInfo = {
      username: githubData.login ?? '',
      name: githubData.name ?? 'Not provided',
      bio: githubData.bio ?? 'Not provided',
      publicRepos: githubData.public_repos ?? 0,
      followers: githubData.followers ?? 0,
      following: githubData.following ?? 0,
      repositories: reposData.slice(0, 5).map((repo: any) => ({
        name: repo.name ?? '',
        description: repo.description ?? 'No description',
        stars: repo.stargazers_count ?? 0,
        forks: repo.forks_count ?? 0,
      })),
    }
  } catch (error) {
    console.error('Error fetching GitHub data:', error)
  }

  res.status(200).json({ githubInfo })
}
