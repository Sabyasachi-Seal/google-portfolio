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

const exploreLinks = [
  { href: '/projects', label: 'Projects', detail: 'Built and shipped' },
  { href: '/skills', label: 'Skills', detail: 'Tools and expertise' },
  { href: '/blogs', label: 'Blogs', detail: 'Ideas and lessons' },
  { href: '/videos', label: 'Videos', detail: 'Talks and demos' },
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
      <div className={styles.ambient} aria-hidden="true">
        <span className={classNames(styles.orb, styles.orbBlue)} />
        <span className={classNames(styles.orb, styles.orbRed)} />
        <span className={classNames(styles.orb, styles.orbYellow)} />
        <span className={classNames(styles.orb, styles.orbGreen)} />
        <span className={styles.grid} />
      </div>
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
        <section className={styles.explore} aria-label="Explore portfolio">
          <div className={styles.exploreHeader}>
            <span>Explore without searching</span>
            <span className={styles.exploreRule} />
          </div>
          <div className={styles.exploreGrid}>
            {exploreLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={styles.exploreCard}
              >
                <span className={styles.exploreLabel}>{item.label}</span>
                <span className={styles.exploreDetail}>{item.detail}</span>
                <span className={styles.arrow} aria-hidden="true">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </section>
        <div className={classNames(styles.row)}>
          <div className={styles.content}>
            Google offered in:
            <a
              href="https://www.google.com/setprefs?sig=0_6gxbm4Wplq--sxFnHhzdnpizTg0%3D&hl=bn&source=homepage&sa=X&ved=0ahUKEwiO7ZL7_viDAxViQUEAHcxyAZoQ2ZgBCBc"
              rel="noopener noreferrer"
            >
              Bengali
            </a>
            <a
              href="https://www.google.com/setprefs?sig=0_6gxbm4Wplq--sxFnHhzdnpizTg0%3D&hl=hi&source=homepage&sa=X&ved=0ahUKEwiO7ZL7_viDAxViQUEAHcxyAZoQ2ZgBCBg"
              rel="noopener noreferrer"
            >
              Hindi
            </a>
            <a
              href="https://www.google.com/setprefs?sig=0_6gxbm4Wplq--sxFnHhzdnpizTg0%3D&hl=ta&source=homepage&sa=X&ved=0ahUKEwiO7ZL7_viDAxViQUEAHcxyAZoQ2ZgBCBk"
              rel="noopener noreferrer"
            >
              Tamil
            </a>
            <a
              href="https://www.google.com/setprefs?sig=0_6gxbm4Wplq--sxFnHhzdnpizTg0%3D&hl=kn&source=homepage&sa=X&ved=0ahUKEwiO7ZL7_viDAxViQUEAHcxyAZoQ2ZgBCBo"
              rel="noopener noreferrer"
            >
              Kannada
            </a>
            <a
              href="https://www.google.com/setprefs?sig=0_6gxbm4Wplq--sxFnHhzdnpizTg0%3D&hl=ja&source=homepage&sa=X&ved=0ahUKEwiO7ZL7_viDAxViQUEAHcxyAZoQ2ZgBCBs"
              rel="noopener noreferrer"
            >
              Japanese
            </a>
            <a
              href="https://www.google.com/setprefs?sig=0_6gxbm4Wplq--sxFnHhzdnpizTg0%3D&hl=ko&source=homepage&sa=X&ved=0ahUKEwiO7ZL7_viDAxViQUEAHcxyAZoQ2ZgBCBw"
              rel="noopener noreferrer"
            >
              Korean
            </a>
          </div>
        </div>
      </main>
      <LandingFooter />
    </div>
  )
}
