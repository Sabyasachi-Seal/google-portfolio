import { LegacyRef, useRef, useCallback, useState, useEffect } from 'react'
import {
  LandingHeader,
  Logo,
  SearchBar,
  LandingButton,
  LandingFooter,
} from 'src/components'
import classNames from 'classnames'

import styles from './Landing.module.scss'

const quickPrompts = [
  'Who is Sabyasachi Seal?',
  'Show me his best projects',
  'What is his tech stack?',
]

interface LandingProps {
  searchText: string
  searchRef: LegacyRef<HTMLInputElement>
  onSearchClick: (query: string) => void
  onLuckyClick: VoidFunction
  onUserInteraction: VoidFunction
}

export const Landing: React.FC<LandingProps> = ({
  searchText,
  searchRef,
  onSearchClick,
  onLuckyClick,
  onUserInteraction,
}: LandingProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [query, setQuery] = useState(searchText)
  const [hasUserEdited, setHasUserEdited] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  useEffect(() => {
    if (!hasUserEdited) {
      setQuery(searchText)
    }
  }, [hasUserEdited, searchText])

  const submitSearch = useCallback(() => {
    onUserInteraction()
    onSearchClick(query)
  }, [onSearchClick, onUserInteraction, query])

  const submitPrompt = useCallback(
    (prompt: string) => {
      onUserInteraction()
      setHasUserEdited(true)
      setQuery(prompt)
      onSearchClick(prompt)
    },
    [onSearchClick, onUserInteraction]
  )

  return (
    <div className={styles.container}>
      <LandingHeader />
      <main className={styles.landing}>
        <div className={styles.eyebrow}>
          <span className={styles.liveDot} />
          AI-powered portfolio search
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <p className={styles.tagline}>
          Search my work, experience, skills, and the things I&apos;m building.
        </p>
        <div
          className={classNames(styles.searchArea, {
            [styles.focused]: isSearchFocused,
          })}
        >
          <SearchBar
            clickFunc={submitSearch}
            searchRef={searchRef}
            searchText={query}
            placeholder="Ask anything about my work"
            onClick={() => {
              onUserInteraction()
              setIsSearchFocused(true)
            }}
            onFocus={() => setIsSearchFocused(true)}
            onChangeText={(value) => {
              onUserInteraction()
              setHasUserEdited(true)
              setQuery(value)
            }}
            landing
          />
          <div className={styles.searchHint}>
            <span>Press Enter to search</span>
            <span className={styles.shortcut}>⌘ K</span>
          </div>
        </div>
        <div className={styles.quickPrompts}>
          <span className={styles.quickLabel}>Try asking</span>
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              className={styles.prompt}
              onClick={() => submitPrompt(prompt)}
            >
              {prompt}
            </button>
          ))}
        </div>
        <div className={styles.buttons}>
          <LandingButton onClick={submitSearch} buttonRef={buttonRef}>
            How can I help you ?
          </LandingButton>
          <LandingButton onClick={onLuckyClick}>
            I&apos;m Feeling Lucky
          </LandingButton>
        </div>
        <div className={styles.trustRow}>
          <span>Live projects</span>
          <span>AI answers</span>
          <span>Human-written work</span>
        </div>
      </main>
      <LandingFooter />
    </div>
  )
}
