import styles from './LoadProgress.module.scss'

interface Props {
  count?: number
}

export const LoadProgress: React.FC<Props> = ({ count = 0 }: Props) => {
  return <p className={styles.p}>{`Loading in (${count} seconds)`}</p>
}
