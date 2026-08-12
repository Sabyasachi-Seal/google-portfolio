import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRef, useCallback, useEffect, useState } from 'react'

import { Compose, Footer, Header } from 'src/components'
import { ThemeContextProvider } from 'src/contexts'
import { useLocalStorage } from 'src/hooks'
import { useSearchText } from 'src/hooks/useSearchText'
import { encrypt } from 'lib/cryptoUtils'
import { userInfo } from 'constants/userInfo'
import { SearchApiResponse, SearchInsights } from 'src/types/searchInsights'

import 'src/styles/globals.scss'

import { sleep } from 'src/utils'
import { Landing } from 'src/screens'

import { useRouter } from 'next/router'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Analytics } from '@vercel/analytics/react'

function GoogleSearch({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [landing, setLanding] = useState(router.pathname === '/')
  const [isLandingTyping, setIsLandingTyping] = useState(
    router.pathname === '/'
  )
  const [searchQuery, setSearchQuery] = useState('Sabyasachi Seal')
  const [aiSummary, setAiSummary] = useState('')
  const [searchInsights, setSearchInsights] = useState<SearchInsights | null>(
    null
  )
  const [isSummaryLoading, setIsSummaryLoading] = useState(false)
  const [recentSearches, setRecentSearches] = useLocalStorage<string[]>(
    'RECENT_SEARCHES',
    []
  )
  const searchText = useSearchText(1000, landing && isLandingTyping)
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const focus = async () => {
      await sleep(500)
      searchRef.current?.focus()
    }

    focus()
  }, [])

  useEffect(() => {
    if (router.pathname !== '/') {
      setLanding(false)
      setIsLandingTyping(false)
    }
  }, [router.pathname])

  const stopLandingTyping = useCallback(() => {
    setIsLandingTyping(false)
  }, [])

  const fetchAiSummary = useCallback(async (prompt: string) => {
    const encryptedUserInfo = encrypt(userInfo)
    const mode =
      prompt.toLowerCase().includes(' vs ') ||
      prompt.toLowerCase().includes('compare')
        ? 'compare'
        : 'overview'

    const response = await fetch('/api/callGeminiApi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mode,
        query: prompt,
        prompt: `Provide a search-focused answer for the portfolio query "${prompt}".`,
        userInfo: encryptedUserInfo,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to fetch AI summary')
    }

    const data = (await response.json()) as SearchApiResponse
    return {
      response: data.response || '',
      insights: data.insights ?? null,
      model: data.model,
    }
  }, [])

  const onSearchClick = useCallback(
    async (query: string) => {
      const trimmedQuery = query.trim() || 'Sabyasachi Seal'

      setSearchQuery(trimmedQuery)
      setRecentSearches((previous) =>
        [
          trimmedQuery,
          ...previous.filter((item) => item !== trimmedQuery),
        ].slice(0, 6)
      )
      setAiSummary('')
      setSearchInsights(null)
      setIsSummaryLoading(true)

      try {
        const result = await fetchAiSummary(trimmedQuery)
        setAiSummary(result.response)
        setSearchInsights(result.insights)
      } catch (error) {
        console.error('Error fetching AI summary:', error)
        setAiSummary(
          'AI summary is temporarily unavailable, but the main portfolio results are still shown below.'
        )
        setSearchInsights(null)
      } finally {
        setIsSummaryLoading(false)
        setLanding(false)
      }
    },
    [fetchAiSummary, setRecentSearches]
  )

  const onLuckyClick = useCallback(() => {
    setAiSummary('')
    setSearchInsights(null)
    setSearchQuery('Sabyasachi Seal')
    setLanding(false)
  }, [])

  return (
    <>
      <SpeedInsights route={router.pathname} />
      <Compose components={[ThemeContextProvider]}>
        <Head>
          <title>Sabyasachi Seal - Google Search</title>
          <meta
            name="description"
            content="Personal website of Sabyasachi Seal themed after google search"
          />
          <meta
            name="google-site-verification"
            content="jTRTtqSEQc13By4SUDwI-AMNG7LzDbbevmZjJSxFATM"
          />
          <link rel="icon" href="/favicon.ico" />
          <meta name="referrer" content="no-referrer" />
        </Head>
        <div className="root">
          {landing ? (
            <Landing
              searchText={searchText}
              searchRef={searchRef}
              onSearchClick={onSearchClick}
              onLuckyClick={onLuckyClick}
              onUserInteraction={stopLandingTyping}
            />
          ) : (
            <>
              <Header searchText={searchQuery} />
              <Component
                {...pageProps}
                aiSummary={aiSummary}
                searchQuery={searchQuery}
                searchInsights={searchInsights}
                isSummaryLoading={isSummaryLoading}
                recentSearches={recentSearches}
              />
              <Footer />
            </>
          )}
        </div>
      </Compose>
      <Analytics route={router.pathname} />
    </>
  )
}

export default GoogleSearch
