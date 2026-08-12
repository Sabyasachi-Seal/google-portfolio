import styles from './ProjectResult.module.scss'

interface Props {
  name: string
  description: string
  stars: number
  forks: number
  language: string
  link: string
  highlights?: string[]
}

export const ProjectResult: React.FC<Props> = ({
  name,
  description,
  stars,
  forks,
  language,
  link,
  highlights = [],
}: Props) => {
  return (
    <a href={link} target="_blank" rel="noreferrer">
      <div className={styles.container}>
        <div className={styles.link}>
          <h3 className={styles.title}>{name}</h3>
        </div>

        <div className={styles.content}>
          <div className={styles.description}>
            <p className={styles.text}>
              {description || 'No description available'}
            </p>
            <p className={styles.stats}>
              <span>⭐ {stars}</span> · <span>🍴 {forks}</span> ·{' '}
              <span>💻 {language}</span>
            </p>
            {highlights.length ? (
              <div className={styles.highlights}>
                {highlights.map((highlight) => (
                  <span key={highlight} className={styles.highlight}>
                    {highlight}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </a>
  )
}
