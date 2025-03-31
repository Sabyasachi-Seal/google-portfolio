import styles from './LoadTime.module.scss'

interface Props {
  count?: number
  overrideLoadTime?: number
}

export const LoadTime: React.FC<Props> = ({
  count = 0,
  overrideLoadTime,
}: Props) => {
  const performanceDuration =
    typeof window !== 'undefined'
      ? (
          Number(
            (window.performance.getEntries()[0] as PerformanceNavigationTiming)
              .duration
          ) / 1000
        ).toFixed(2)
      : '0.00'

  const loadTime = overrideLoadTime ?? performanceDuration

  return (
    <p className={styles.p}>{`About ${count} results (${loadTime} seconds)`}</p>
  )
}
