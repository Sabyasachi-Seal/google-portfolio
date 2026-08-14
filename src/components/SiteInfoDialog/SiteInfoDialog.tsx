import { useEffect, useRef } from 'react'
import styles from './SiteInfoDialog.module.scss'

interface SiteInfoDialogProps {
  isOpen: boolean
  onClose: VoidFunction
}

const focusableSelector =
  'button, a[href], input, textarea, select, [tabindex]:not([tabindex="-1"])'

export const SiteInfoDialog: React.FC<SiteInfoDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const previousActiveElement = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab' || !dialogRef.current) {
        return
      }

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector)
      )

      if (!focusableElements.length) {
        event.preventDefault()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      previousActiveElement?.focus()
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return (
    <div
      className={styles.overlay}
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="site-info-title"
        aria-describedby="site-info-description"
      >
        <div className={styles.dialogHeader}>
          <div>
            <span className={styles.kicker}>A quick note</span>
            <h2 id="site-info-title">
              This is a portfolio, not Google Search.
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className={styles.close}
            aria-label="Close site information"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <p id="site-info-description" className={styles.description}>
          You are exploring Sabyasachi Seal&apos;s personal portfolio. The
          interface is inspired by Google Search, but this site is independent
          and is not affiliated with or operated by Google.
        </p>

        <div className={styles.section}>
          <span className={styles.sectionLabel}>Built with</span>
          <div className={styles.stack}>
            <span>Next.js</span>
            <span>React</span>
            <span>TypeScript</span>
            <span>SCSS Modules</span>
            <span>Gemini API</span>
            <span>Vercel Analytics</span>
          </div>
        </div>

        <div className={styles.dialogFooter}>
          <span>Search the portfolio. Discover the work.</span>
          <a
            href="https://github.com/Sabyasachi-Seal"
            target="_blank"
            rel="noopener noreferrer"
          >
            View source ↗
          </a>
        </div>
      </div>
    </div>
  )
}
