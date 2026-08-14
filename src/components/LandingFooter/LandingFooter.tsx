import styles from './LandingFooter.module.scss'

export const LandingFooter: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.identity}>
          <span className={styles.name}>Sabyasachi Seal</span>
          <span>Personal portfolio &amp; AI-powered search</span>
        </div>

        <nav className={styles.navigation} aria-label="Footer navigation">
          <a href="/">Overview</a>
          <a href="/projects">Projects</a>
          <a href="/skills">Skills</a>
          <a href="/blogs">Blogs</a>
          <a href="/videos">Videos</a>
        </nav>

        <div className={styles.links}>
          <a
            href="https://github.com/Sabyasachi-Seal"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source
          </a>
          <a
            href="https://resume.sabyasachiseal.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>
          <a href="mailto:iam.sabyasachi.seal@gmail.com">Contact</a>
        </div>
      </div>
    </div>
  )
}
