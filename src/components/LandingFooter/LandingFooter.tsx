import classNames from 'classnames'
import styles from './LandingFooter.module.scss'
import { codesymbol } from '../../content/b64'
import Image from 'next/image'

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
            href="http://social.sabyasachiseal.com/linkedin"
            rel="noopener noreferrer"
          >
            Coding since 2007
          </a>
        </div>
        <div className={styles.content}>
          <a
            href="http://social.sabyasachiseal.com/github"
            rel="noopener noreferrer"
          >
            Github
          </a>
          <a
            href="https://social.sabyasachiseal.com/medium"
            rel="noopener noreferrer"
          >
            Blogs
          </a>
          <a
            href="https://portfolio.sabyasachiseal.com"
            rel="noopener noreferrer"
          >
            Other Wesbite
          </a>
        </div>
      </div>
    </div>
  )
}
