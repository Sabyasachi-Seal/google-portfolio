import classNames from 'classnames'
import styles from './AmbientBubbles.module.scss'

interface AmbientBubblesProps {
  muted?: boolean
}

export const AmbientBubbles: React.FC<AmbientBubblesProps> = ({
  muted = false,
}) => {
  return (
    <div
      className={classNames(styles.ambient, { [styles.muted]: muted })}
      data-ambient-background="true"
      aria-hidden="true"
    >
      <span className={classNames(styles.bubble, styles.blue)} />
      <span className={classNames(styles.bubble, styles.red)} />
      <span className={classNames(styles.bubble, styles.yellow)} />
      <span className={classNames(styles.bubble, styles.green)} />
      <span className={styles.grid} />
    </div>
  )
}
