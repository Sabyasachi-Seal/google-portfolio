import styles from './Footer.module.scss'

export const Footer: React.FC = () => {
  return (
    <div className={styles.container}>
      <div>
        Check out my Github, a whole different style of portfolio{' '}
        <a
          href="https://github.com/Sabyasachi-Seal"
          target="_blank"
          rel="noreferrer"
        >
          Source Code
        </a>
        <br /> I&apos;m not affiliated with Google. Please don&apos;t sue me,
        hire me.
      </div>
    </div>
  )
}
