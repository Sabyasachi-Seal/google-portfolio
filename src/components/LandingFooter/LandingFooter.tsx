import classNames from 'classnames'
import styles from './LandingFooter.module.scss'

export const LandingFooter: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={classNames(styles.row, styles.bottom)}>
        <div className={styles.content}>
          <a
            href="https://www.youtube.com/channel/UC5VBAKQWkYdrALsQ_W8woCg"
            rel="noopener noreferrer"
          >
            Youtube
          </a>
          <a href="https://resume.sabyasachiseal.com" rel="noopener noreferrer">
            Resume
          </a>
          <a
            href="https://www.google.com/search?q=sabyasachi+seal"
            rel="noopener noreferrer"
          >
            Search Me on Google
          </a>
          <a
            href="mailto:iam.sabyasachi.seal@gmail.com"
            rel="noopener noreferrer"
          >
            Chat with me ?
          </a>
        </div>
        <div className={styles.content}>
          <a
            className={styles.carbon}
            href="https://www.linkedin.com/in/sabyasachi-seal-4461711bb/"
            rel="noopener noreferrer"
          >
            Coding since 2007
          </a>
        </div>
        <div className={styles.content}>
          <a
            href="https://github.com/Sabyasachi-Seal/"
            rel="noopener noreferrer"
          >
            Github
          </a>
          <a href="https://medium.com/@yoboy907/" rel="noopener noreferrer">
            Blogs
          </a>
          <a href="https://sabyasachiseal.com" rel="noopener noreferrer">
            Other Wesbite
          </a>
        </div>
      </div>
    </div>
  )
}
