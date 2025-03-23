import { parseStringPromise } from 'xml2js'

let githubInfo = {
  username: '',
  name: '',
  bio: '',
  publicRepos: 0,
  followers: 0,
  following: 0,
  repositories: [],
}

let mediumInfo: {
  username: string
  recentPosts: {
    title: string
    link: string
    pubDate: string
    description: string
  }[]
} = {
  username: '',
  recentPosts: [],
}

const fetchGithubData = async () => {
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
}

const fetchMediumData = async () => {
  try {
    const mediumUrl = 'https://medium.com/feed/@yoboy907'
    const mediumResponse = await fetch(mediumUrl)

    if (!mediumResponse.ok) {
      throw new Error(
        `Failed to fetch Medium feed: ${mediumResponse.status} ${mediumResponse.statusText}`
      )
    }

    const mediumXmlText = await mediumResponse.text()

    const xmlData = await parseStringPromise(mediumXmlText)

    const mediumUsername =
      /medium\.com\/feed\/@([a-zA-Z0-9-]+)/.exec(mediumUrl)?.[1] ?? ''

    const items = xmlData.rss?.channel?.[0]?.item || []
    const recentPosts = items.slice(0, 5).map((item: any) => {
      const title = item.title?.[0] || 'No title'
      const link = item.link?.[0] || ''
      const pubDate = item.pubDate?.[0] || ''
      const description = item.description?.[0] || 'No description'

      const cleanDescription =
        description.replace(/<[^>]+>/g, '').slice(0, 200) + '...'

      return {
        title,
        link,
        pubDate,
        description: cleanDescription,
      }
    })

    mediumInfo = {
      username: mediumUsername,
      recentPosts: recentPosts,
    }
  } catch (E) {
    console.error('Error fetching Medium data:', E)
  }
}

const initializeUserInfo = async () => {
  // Fetch GitHub data first
  await fetchGithubData()

  // Then fetch Medium data
  await fetchMediumData()

  // Return the combined user info
  return {
    name: 'Sabyasachi Seal',
    profession: 'Indian software engineer, web author, and businessman',
    location: 'Kolkata, West Bengal',
    communities: ['MLSA', 'GDSC', 'AWS Community Builders'],
    github: githubInfo,
    medium: mediumInfo,
    experience: '1 year in software engineering',
    born: 'June 2002',
    age:
      new Date(Date.now() - new Date(2002, 5).getTime()).getFullYear() - 1970,
    education: 'Techno Main Salt Lake (2024)',
    skills: ['Python', 'DevOps', 'Cloud'],
    linkedin: 'https://www.linkedin.com/in/sabyasachi-seal-4461711bb/',
    website: 'http://sabyasachiseal.com',
  }
}

export const getUserInfo = async () => {
  let userInfo = await initializeUserInfo()
  return userInfo
}

export const userInfo = (async () => await getUserInfo())()

export const chatprompt =
  'You are an AI assistant representing Sabyasachi Seal. Only answer in unformatted text. Answer the following question using this info:'
