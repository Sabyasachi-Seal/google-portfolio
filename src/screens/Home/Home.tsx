import { useEffect, useMemo, useState } from 'react'
import type { NextPage } from 'next'
import Image from 'next/image'

import {
  About,
  LoadProgress,
  LoadTime,
  ProjectResult,
  SearchAssistantPanel,
  SearchResult,
} from 'src/components'
import { getProjects, searchResults } from 'src/content'
import { SearchInsights } from 'src/types/searchInsights'
import { extractMatchPhrases, rankItems } from 'src/utils/searchInsights'

import styles from './Home.module.scss'

const about = (
  <svg
    focusable="false"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={styles.about}
  >
    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
  </svg>
)

interface HomeProps {
  aiSummary?: string
  searchQuery?: string
  searchInsights?: SearchInsights | null
  isSummaryLoading?: boolean
  recentSearches?: string[]
}

type ProjectResultType = {
  name: string
  description: string
  stars: number
  forks: number
  language: string
  link: string
}

export const Home: NextPage<HomeProps> = ({
  aiSummary,
  searchQuery,
  searchInsights,
  isSummaryLoading = false,
  recentSearches = [],
}) => {
  const displayQuery = searchQuery?.trim() || 'Sabyasachi Seal'
  const [projectResults, setProjectResults] = useState<ProjectResultType[]>([])
  const [projectsLoading, setProjectsLoading] = useState(true)
  const summaryContent = aiSummary || searchInsights?.summary || ''
  const [typedSummary, setTypedSummary] = useState('')
  const [isTypingSummary, setIsTypingSummary] = useState(false)
  const [animatedConfidence, setAnimatedConfidence] = useState(0)
  const rawConfidence = searchInsights?.confidence
  const confidenceTarget =
    typeof rawConfidence === 'number' && Number.isFinite(rawConfidence)
      ? Math.round(Math.max(0, Math.min(1, rawConfidence)) * 100)
      : null

  useEffect(() => {
    if (isSummaryLoading || !summaryContent) {
      setTypedSummary('')
      setIsTypingSummary(false)
      return
    }

    let index = 0
    setTypedSummary('')
    setIsTypingSummary(true)

    const timer = window.setInterval(() => {
      index += 1
      setTypedSummary(summaryContent.slice(0, index))

      if (index >= summaryContent.length) {
        window.clearInterval(timer)
        setIsTypingSummary(false)
      }
    }, 18)

    return () => window.clearInterval(timer)
  }, [isSummaryLoading, summaryContent])

  useEffect(() => {
    if (isSummaryLoading || confidenceTarget === null) {
      setAnimatedConfidence(0)
      return
    }

    const duration = 900
    let startTime: number | null = null
    let frameId = 0

    const animateConfidence = (timestamp: number) => {
      startTime ??= timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const easedProgress = 1 - Math.pow(1 - progress, 3)

      setAnimatedConfidence(Math.round(confidenceTarget * easedProgress))

      if (progress < 1) {
        frameId = window.requestAnimationFrame(animateConfidence)
      }
    }

    frameId = window.requestAnimationFrame(animateConfidence)

    return () => window.cancelAnimationFrame(frameId)
  }, [confidenceTarget, isSummaryLoading])

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getProjects()
        setProjectResults(
          data.githubInfo?.repositories?.map((project) => ({
            name: project.name,
            description: project.description,
            stars: project.stars,
            forks: project.forks,
            language: project.language,
            link: `https://github.com/Sabyasachi-Seal/${project.name}`,
          })) ?? []
        )
      } catch (error) {
        console.error('Error loading projects:', error)
        setProjectResults([])
      } finally {
        setProjectsLoading(false)
      }
    }

    loadProjects()
  }, [])

  const rankedResults = useMemo(
    () => rankItems(searchResults, displayQuery),
    [displayQuery]
  )
  const featuredProjects = useMemo(
    () => rankItems(projectResults, displayQuery).slice(0, 3),
    [displayQuery, projectResults]
  )
  const matchedPhrases = useMemo(
    () =>
      searchInsights?.highlightPhrases?.length
        ? searchInsights.highlightPhrases
        : extractMatchPhrases(displayQuery),
    [displayQuery, searchInsights?.highlightPhrases]
  )
  const hasCompare = Boolean(searchInsights?.compare)

  return (
    <div className={styles.container}>
      <LoadTime count={searchResults.length} />
      <div className={styles.header}>
        <div className={styles.title}>
          <div className={styles.headshot}>
            <Image
              src="/images/headshot.png"
              alt="profile picture"
              height={56}
              width={56.1}
              sizes="56px"
            />
          </div>
          <div className={styles.name}>
            <h2>Sabyasachi Seal{about}</h2>
            <p>Software Engineer {about}</p>
          </div>
        </div>
        <div className={styles.divider} />
      </div>
      <div className={styles.content}>
        <div className={styles.results}>
          <section className={styles.summaryCard}>
            <div className={styles.summaryHeaderRow}>
              <div>
                <div className={styles.summaryHeader}>AI Overview</div>
                <div className={styles.summaryQuery}>{displayQuery}</div>
              </div>
              <div className={styles.confidence} aria-live="polite">
                {confidenceTarget === null
                  ? isSummaryLoading
                    ? 'Confidence 0%'
                    : 'Confidence unavailable'
                  : `Confidence ${animatedConfidence}%`}
              </div>
            </div>
            {isSummaryLoading ? (
              <LoadProgress />
            ) : (
              <p className={styles.summaryText} aria-live="polite">
                {summaryContent
                  ? typedSummary
                  : 'Search the portfolio to generate an AI summary that adapts to your exact query.'}
                {isTypingSummary ? (
                  <span className={styles.typingCursor} aria-hidden="true">
                    |
                  </span>
                ) : null}
              </p>
            )}
          </section>

          {featuredProjects.length ? (
            <section className={styles.featuredSection}>
              <div className={styles.sectionTitle}>Featured projects</div>
              <div className={styles.featuredGrid}>
                {featuredProjects.map((project) => (
                  <ProjectResult
                    key={project.name}
                    {...project}
                    highlights={
                      searchInsights?.featuredProjectNames?.includes(
                        project.name
                      )
                        ? matchedPhrases
                        : matchedPhrases.slice(0, 2)
                    }
                  />
                ))}
              </div>
            </section>
          ) : projectsLoading ? (
            <LoadProgress count={1} />
          ) : null}

          {hasCompare ? (
            <section className={styles.compareCard}>
              <div className={styles.sectionTitle}>Compare mode</div>
              <div className={styles.compareColumns}>
                <div>
                  <h4>{searchInsights?.compare?.left ?? 'Left side'}</h4>
                  <ul>
                    {(searchInsights?.compare?.leftStrengths ?? []).map(
                      (item) => (
                        <li key={item}>{item}</li>
                      )
                    )}
                  </ul>
                </div>
                <div>
                  <h4>{searchInsights?.compare?.right ?? 'Right side'}</h4>
                  <ul>
                    {(searchInsights?.compare?.rightStrengths ?? []).map(
                      (item) => (
                        <li key={item}>{item}</li>
                      )
                    )}
                  </ul>
                </div>
              </div>
              <p>{searchInsights?.compare?.verdict ?? ''}</p>
            </section>
          ) : null}

          <section className={styles.resultsSection}>
            <div className={styles.sectionTitle}>Search results</div>
            {rankedResults.map((result) => (
              <SearchResult
                {...result}
                key={result.title}
                highlights={matchedPhrases}
              />
            ))}
          </section>
        </div>
        <div className={styles.info}>
          <SearchAssistantPanel
            query={displayQuery}
            summary={
              aiSummary || 'Ask a follow-up question about the search results.'
            }
            insights={searchInsights ?? null}
            recentSearches={recentSearches}
          />
          <About />
        </div>
      </div>
    </div>
  )
}
