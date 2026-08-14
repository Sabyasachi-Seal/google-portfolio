import { useState } from 'react'
import { useRouter } from 'next/router'
import {
  book,
  bookActive,
  finance,
  financeActive,
  image,
  imageActive,
  search,
  searchActive,
  video,
  videoActive,
} from './icons'
import {
  AuthenticateButton,
  Logo,
  SiteInfoDialog,
  menu,
  dots,
  ThemeButton,
  SearchBar,
} from 'src/components'

import styles from './Header.module.scss'
import classNames from 'classnames'

const routes = [
  {
    label: 'All',
    route: '/',
    icon: search,
    activeIcon: searchActive,
  },
  {
    label: 'Videos',
    route: '/videos',
    icon: video,
    activeIcon: videoActive,
  },
  {
    label: 'Projects',
    route: '/projects',
    icon: image,
    activeIcon: imageActive,
  },
  {
    label: 'Recent Blogs',
    route: '/blogs',
    icon: book,
    activeIcon: bookActive,
  },
  {
    label: 'Skills',
    route: '/skills',
    icon: finance,
    activeIcon: financeActive,
  },
]

interface HeaderProps {
  searchText?: string
}

export const Header: React.FC<HeaderProps> = ({
  searchText = 'Sabyasachi Seal',
}) => {
  const { pathname } = useRouter()
  const [isSiteInfoOpen, setIsSiteInfoOpen] = useState(false)

  return (
    <>
      <div className={styles.container}>
        <div className={styles.search}>
          <a
            href="/"
            className={styles.logo}
            aria-label="Return to portfolio landing page"
          >
            <Logo height={30} width={92} />
          </a>
          <SearchBar searchText={searchText} />
          <div className={styles.control}>
            <ThemeButton />
            {dots}
            <div className={styles.authenticate}>
              <AuthenticateButton
                onClick={() => setIsSiteInfoOpen(true)}
                aria-label="About this portfolio"
                aria-haspopup="dialog"
                aria-expanded={isSiteInfoOpen}
              >
                Sign in
              </AuthenticateButton>
            </div>
          </div>
        </div>
        {/* Mobile Only */}
        <div className={styles.mobile}>
          {menu}
          <a
            href="/"
            className={styles.mobileLogo}
            aria-label="Return to portfolio landing page"
          >
            <Logo height={30} width={92} />
          </a>
          <ThemeButton />
        </div>
        <div className={styles.navigation}>
          {routes.map(({ label, route, icon, activeIcon }) => {
            const isActive = pathname === route
            return (
              <a
                key={route}
                href={route}
                className={styles.link}
                aria-current={isActive ? 'page' : undefined}
              >
                <span
                  className={classNames(styles.tab, {
                    [styles.active]: isActive,
                  })}
                >
                  <span>{isActive ? activeIcon : icon}</span> {label}
                </span>
              </a>
            )
          })}
          <div className={styles.overlay} />
        </div>
      </div>
      <SiteInfoDialog
        isOpen={isSiteInfoOpen}
        onClose={() => setIsSiteInfoOpen(false)}
      />
    </>
  )
}
