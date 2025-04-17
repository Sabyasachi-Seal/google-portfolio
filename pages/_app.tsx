import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRef, useCallback, useEffect, useState } from 'react'

import { Compose, Footer, Header } from 'src/components'
import { ThemeContextProvider } from 'src/contexts'
import { useSearchText } from 'src/hooks/useSearchText'

import 'src/styles/globals.scss'

import { sleep } from 'src/utils'
import { Landing } from 'src/screens'

import { useRouter } from 'next/router'
import { SpeedInsights } from '@vercel/speed-insights/react'

function GoogleSearch({ Component, pageProps }: AppProps) {
  const [landing, setLanding] = useState(true)
  const searchText = useSearchText(1000)
  const searchRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    const focus = async () => {
      await sleep(500)
      searchRef.current?.focus()
    }

    focus()
  }, [])

  const onSearchClick = useCallback(() => {
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
            />
          ) : (
            <>
              <Header />
              <Component {...pageProps} />
              <Footer />
            </>
          )}
        </div>
      </Compose>
    </>
  )
}

export default GoogleSearch
