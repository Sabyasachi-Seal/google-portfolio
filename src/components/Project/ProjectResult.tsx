import styles from './ProjectResult.module.scss'

interface Props {
  name: string
  description: string
  stars: number
  forks: number
  language: string
  link: string
}

export const ProjectResult: React.FC<Props> = ({
  name,
  description,
  stars,
  forks,
  language,
  link,
}: Props) => {
  return (
    <div className={styles.container}>
      <a href={link} target="_blank" rel="noreferrer">
        <div className={styles.link}>
          <h3 className={styles.title}>{name}</h3>
        </div>
      </a>
      <div className={styles.content}>
        <div className={styles.description}>
          <p className={styles.text}>
            {description || 'No description available'}
          </p>
          <p className={styles.stats}>
            <span>⭐ {stars}</span> · <span>🍴 {forks}</span> ·{' '}
            <span>💻 {language}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
