import Image from 'next/image'
import { SearchLink } from 'src/components'
import styles from './BlogResult.module.scss'

interface Props {
  title: string
  link: string
  pubDate: string
  description: string
  thumbnail: string
}

export const BlogResult: React.FC<Props> = ({
  title,
  link,
  pubDate,
  description,
  thumbnail,
}: Props) => {
  return (
    <div className={styles.container}>
      <a href={link} target="_blank" rel="noreferrer">
        <div className={styles.link}>
          <SearchLink link={link} />
          <h3 className={styles.title}>{title}</h3>
        </div>
      </a>
      <div className={styles.content}>
        <div className={styles.thumbnail}>
          <Image src={thumbnail} alt={title} fill />
        </div>
        <div className={styles.description}>
          <h4 className={styles.mobile}>{title}</h4>
          <p className={styles.stats}>
            <span>Posted on Medium</span> by Sabyasachi Seal · <br />
            <span>Published on </span>
            {pubDate}
          </p>
        </div>
      </div>
    </div>
  )
}
