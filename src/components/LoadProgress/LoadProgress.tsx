import styles from './LoadProgress.module.scss'

interface Props {
  count?: number
}

export const LoadProgress: React.FC<Props> = ({ count = 0 }: Props) => {
  return (
    <p className={styles.p} role="status" aria-live="polite">
      <span>Loading</span>
      <span className={styles.dots} aria-hidden="true">
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </span>
    </p>
  )
}
