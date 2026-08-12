import { SearchInsights } from 'src/types/searchInsights'

export type RankedItem<T> = T & {
  score: number
  highlights: string[]
}

const DEFAULT_TOKENS = ['sabyasachi', 'seal']

export const tokenizeQuery = (query: string) => {
  const tokens = query
    .toLowerCase()
    .replace(/[^a-z0-9+.-]+/g, ' ')
    .split(' ')
    .map((token) => token.trim())
    .filter(Boolean)

  return Array.from(new Set([...tokens, ...DEFAULT_TOKENS]))
}

export const getQueryMode = (query: string): SearchInsights['mode'] => {
  const normalized = query.toLowerCase()
  if (normalized.includes(' vs ') || normalized.includes('compare')) {
    return 'compare'
  }
  if (
    normalized.includes('?') ||
    normalized.includes('how') ||
    normalized.includes('what')
  ) {
    return 'overview'
  }
  return 'overview'
}

export const scoreText = (haystack: string, tokens: string[]) => {
  const normalized = haystack.toLowerCase()
  return tokens.reduce(
    (score, token) => score + (normalized.includes(token) ? 1 : 0),
    0
  )
}

const toText = (value: unknown) => (typeof value === 'string' ? value : '')

export const rankItems = <
  T extends {
    title?: string
    name?: string
    description?: unknown
    extras?: unknown
  }
>(
  items: T[],
  query: string
): RankedItem<T>[] => {
  const tokens = tokenizeQuery(query)

  return items
    .map((item) => {
      const text = [item.title, item.name, item.description, item.extras]
        .map(toText)
        .filter(Boolean)
        .join(' ')
      const highlights = tokens.filter((token) =>
        text.toLowerCase().includes(token)
      )

      return {
        ...item,
        score: scoreText(text, tokens),
        highlights,
      }
    })
    .sort((a, b) => b.score - a.score)
}

export const extractMatchPhrases = (query: string) => {
  const tokens = tokenizeQuery(query)
  return tokens.filter((token) => token.length > 2).slice(0, 5)
}
