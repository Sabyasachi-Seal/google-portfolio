export type SearchMode = 'overview' | 'compare' | 'chat'

export type SearchInsightLink = {
  label: string
  url: string
}

export type CompareInsight = {
  left: string
  right: string
  leftStrengths: string[]
  rightStrengths: string[]
  verdict: string
}

export type SearchInsights = {
  mode: SearchMode
  query: string
  summary: string
  confidence: number
  sourceChips: string[]
  relatedQueries: string[]
  relatedLinks: SearchInsightLink[]
  featuredProjectNames: string[]
  highlightPhrases: string[]
  compare?: CompareInsight | null
}

export type SearchApiResponse = {
  response?: string
  insights?: SearchInsights | null
  error?: string
  model?: string
}
