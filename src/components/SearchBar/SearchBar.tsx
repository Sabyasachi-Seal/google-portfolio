import classNames from 'classnames'
import { LegacyRef } from 'react'
import styles from './SearchBar.module.scss'

const lens = (
  <svg
    xmlnsXlink="http://www.w3.org/1999/xlink"
    focusable="false"
    viewBox="0 0 192 192"
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    className={styles.lens} // Add your styles class
  >
    <rect fill="none" height={192} width={192}></rect>
    <circle fill="#34A853" cx="144.07" cy="144" r="16"></circle>
    <circle fill="#4285F4" cx="96.07" cy="104" r="24"></circle>
    <path
      fill="#EA4335"
      d="M24,135.2c0,18.11,14.69,32.8,32.8,32.8H96v-16l-40.1-0.1c-8.8,0-15.9-8.19-15.9-17.9v-18H24V135.2z"
    ></path>
    <path
      fill="#FBBC05"
      d="M168,72.8c0-18.11-14.69-32.8-32.8-32.8H116l20,16c8.8,0,16,8.29,16,18v30h16V72.8z"
    ></path>
    <path
      fill="#4285F4"
      d="M112,24l-32,0L68,40H56.8C38.69,40,24,54.69,24,72.8V92h16V74c0-9.71,7.2-18,16-18h80L112,24z"
    ></path>
  </svg>
)

const voice = (
  <svg
    focusable="false"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    className={styles.voice}
  >
    <path
      fill="#4285f4"
      d="m12 15c1.66 0 3-1.31 3-2.97v-7.02c0-1.66-1.34-3.01-3-3.01s-3 1.34-3 3.01v7.02c0 1.66 1.34 2.97 3 2.97z"
    ></path>
    <path fill="#34a853" d="m11 18.08h2v3.92h-2z"></path>
    <path
      fill="#fbbc04"
      d="m7.05 16.87c-1.27-1.33-2.05-2.83-2.05-4.87h2c0 1.45 0.56 2.42 1.47 3.38v0.32l-1.15 1.18z"
    ></path>
    <path
      fill="#ea4335"
      d="m12 16.93a4.97 5.25 0 0 1 -3.54 -1.55l-1.41 1.49c1.26 1.34 3.02 2.13 4.95 2.13 3.87 0 6.99-2.92 6.99-7h-1.99c0 2.92-2.24 4.93-5 4.93z"
    ></path>
  </svg>
)

const clear = (
  <svg
    focusable="false"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    className={styles.clear}
  >
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
  </svg>
)

const search = (
  <svg
    focusable="false"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={20}
    className={styles.search}
  >
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
  </svg>
)

interface Props {
  searchText?: string
  searchRef?: LegacyRef<HTMLInputElement>
  landing?: boolean
  clickFunc?: VoidFunction
}

export const SearchBar: React.FC<Props> = ({
  searchText = '',
  searchRef,
  landing = false,
  clickFunc = () => void 0,
}) => {
  return (
    <>
      <div
        className={classNames(styles.container, {
          [styles.nonempty]: searchText,
          [styles.mobile]: !landing,
        })}
      >
        {search}
        <input
          ref={searchRef}
          className={styles.input}
          value={searchText}
          onChange={() => void 0}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              clickFunc()
            }
          }}
        />
        {voice}
        <div className={styles.iconSpace} />
        {lens}
      </div>
      {!landing && (
        <div
          className={classNames(
            styles.container,
            styles.complex,
            styles.desktop,
            {
              [styles.nonempty]: searchText,
            }
          )}
        >
          <input
            ref={searchRef}
            className={styles.input}
            value={searchText}
            onChange={() => void 0}
          />
          {clear}
          <span />
          {voice}
          <div className={styles.iconSpace} />
          {lens}
          <div className={styles.iconSpace} />
          {search}
        </div>
      )}
    </>
  )
}
