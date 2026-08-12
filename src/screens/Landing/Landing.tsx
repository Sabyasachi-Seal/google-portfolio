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

  useEffect(() => {
    if (!hasUserEdited) {
      setQuery(searchText)
    }
  }, [hasUserEdited, searchText])

  const submitSearch = useCallback(() => {
    onUserInteraction()
    onSearchClick(query)
  }, [onSearchClick, onUserInteraction, query])

  return (
    <div className={styles.container}>
      <LandingHeader />
      <div className={styles.landing}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <SearchBar
          clickFunc={submitSearch}
          searchRef={searchRef}
          searchText={query}
          placeholder="Type anything"
          onClick={onUserInteraction}
          onChangeText={(value) => {
            onUserInteraction()
            setHasUserEdited(true)
            setQuery(value)
          }}
          landing
        />
        <div className={styles.buttons}>
          <LandingButton onClick={submitSearch} buttonRef={buttonRef}>
            How can I help you ?
          </LandingButton>
          <LandingButton onClick={onLuckyClick}>
            I&apos;m Feeling Lucky
          </LandingButton>
        </div>
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
      </div>
      <LandingFooter />
    </div>
  )
}
