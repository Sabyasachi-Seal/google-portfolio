import { useCallback, useEffect, useMemo, useState } from 'react'

import { SearchInsights } from 'src/types/searchInsights'

import styles from './SearchAssistantPanel.module.scss'

interface Props {
  query: string
  insights: SearchInsights | null
  recentSearches: string[]
}

export const SearchAssistantPanel: React.FC<Props> = ({
  query,
  insights,
  recentSearches,
}) => {
  const [input, setInput] = useState('')
  const [responseText, setResponseText] = useState('')
  const [displayedResponse, setDisplayedResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const followUpSuggestions = useMemo(
    () =>
      insights?.relatedQueries?.length
        ? insights.relatedQueries
        : [
            `What should I know about ${query}?`,
            'What projects fit this best?',
            'Compare frontend and backend strengths',
          ],
    [insights?.relatedQueries, query]
  )

  useEffect(() => {
    if (!responseText) {
      setDisplayedResponse('')
      return
    }

    let index = 0
    setDisplayedResponse('')

    const timer = window.setInterval(() => {
      index += 1
      setDisplayedResponse(responseText.slice(0, index))

      if (index >= responseText.length) {
        window.clearInterval(timer)
      }
    }, 14)

    return () => window.clearInterval(timer)
  }, [responseText])

  const sendMessage = useCallback(
    async (message = input) => {
      const trimmedInput = message.trim()
      if (!trimmedInput) return

      setInput('')
      setResponseText('')
      setLoading(true)

      try {
        const response = await fetch('/api/callGeminiApi', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mode: 'chat',
            query,
            question: trimmedInput,
          }),
        })

        const data = await response.json()
        setResponseText(
          data.response || 'Sorry, I could not answer that right now.'
        )
      } catch (error) {
        setResponseText('Sorry, I could not answer that right now.')
      } finally {
        setLoading(false)
      }
    },
    [input, query]
  )

  return (
    <aside className={styles.panel}>
      <div className={styles.section}>
        <div className={styles.kicker}>AI Assistant</div>
        <h3>Ask a follow-up</h3>
        <p className={styles.copy}>
          Ask anything more about me, my projects, my experience, or a
          comparison. The reply will type itself out below.
        </p>
        <div className={styles.query}>{query}</div>
      </div>

      <div className={styles.section}>
        <div className={styles.label}>Suggestions</div>
        <div className={styles.chips}>
          {followUpSuggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              className={styles.chip}
              onClick={() => void sendMessage(suggestion)}
              disabled={loading}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.label}>Recent searches</div>
        <div className={styles.chips}>
          {recentSearches.length ? (
            recentSearches.map((item) => (
              <span key={item} className={styles.recent}>
                {item}
              </span>
            ))
          ) : (
            <span className={styles.muted}>No recent searches yet</span>
          )}
        </div>
      </div>

      {insights?.sourceChips?.length ? (
        <div className={styles.section}>
          <div className={styles.label}>Sources</div>
          <div className={styles.chips}>
            {insights.sourceChips.map((chip) => (
              <span key={chip} className={styles.sourceChip}>
                {chip}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      <div className={styles.section}>
        <label className={styles.label} htmlFor="assistant-input">
          Ask a follow-up
        </label>
        <div className={styles.inputRow}>
          <input
            id="assistant-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                sendMessage()
              }
            }}
            placeholder="Ask about projects, skills, or comparisons"
          />
          <button
            type="button"
            onClick={() => void sendMessage()}
            disabled={loading}
          >
            {loading ? '...' : 'Send'}
          </button>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.label}>Assistant response</div>
        <div className={styles.responseBox} aria-live="polite">
          {displayedResponse ? (
            <>
              <p className={styles.responseText}>{displayedResponse}</p>
              {loading ? <span className={styles.cursor}>|</span> : null}
            </>
          ) : loading ? (
            <p className={styles.placeholder}>Typing a response...</p>
          ) : (
            <p className={styles.placeholder}>
              Your answer will appear here in a typed response.
            </p>
          )}
        </div>
      </div>
    </aside>
  )
}
