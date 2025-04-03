import { useState, useEffect, useRef } from 'react'
import { friends, profiles, getBlogs, getProjects } from 'src/content'
import { SocialProfile, Friend } from 'src/components'
import styles from './About.module.scss'
import { userInfo } from 'constants/userInfo'
import { encrypt, decrypt } from 'lib/cryptoUtils'
const globe = (
  <svg
    focusable="false"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={styles.globe}
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"></path>
  </svg>
)

export const About: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [hasStartedChatting, setHasStartedChatting] = useState(false)
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([
    {
      user: '',
      bot: 'Hello there! How can I help you today?',
    },
  ])
  const [input, setInput] = useState('')
  const [githubData, setGithubData] = useState<any>(null)
  const [mediumData, setMediumData] = useState<any>(null)

  const chatWindowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTo({
        top: chatWindowRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages])

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        const data = await getProjects()
        setGithubData(data)
        userInfo.github = githubData
      } catch (error) {
        console.error('Error fetching GitHub data:', error)
      }
    }

    fetchGithubData()
  }, [])

  useEffect(() => {
    const fetchMediumData = async () => {
      try {
        const data = await getBlogs()
        setMediumData(data)
        userInfo.medium = mediumData
      } catch (error) {
        console.error('Error fetching Medium data:', error)
      }
    }

    fetchMediumData()
  }, [])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    if (!hasStartedChatting) {
      setHasStartedChatting(true)
      setIsChatOpen(true)
    }

    const updatedMessages = [...messages, { user: input, bot: 'Thinking...' }]
    setMessages(updatedMessages)
    setInput('')

    userInfo.github = githubData
    userInfo.medium = mediumData

    try {
      const encryptedUserInfo = encrypt(userInfo)

      const response = await fetch('/api/callGeminiApi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input, userInfo: encryptedUserInfo }),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch response from Gemini API')
      }

      const data = await response.json()

      const botResponse = data.response || 'Sorry, something went wrong.'

      let currentText = ''
      for (const char of botResponse) {
        await new Promise((resolve) => setTimeout(resolve, 30)) // 30ms per character
        currentText += char
        updatedMessages[updatedMessages.length - 1].bot = currentText
        setMessages([...updatedMessages])
      }
    } catch (error) {
      updatedMessages[updatedMessages.length - 1].bot =
        'Sorry, something went wrong.'
      setMessages([...updatedMessages])
    }
  }

  return (
    <div className={styles.container}>
      {!hasStartedChatting ? (
        <div className={`${styles.about} ${isChatOpen ? styles.slideOut : ''}`}>
          <h4>About</h4>
          <div className={styles.website}>
            {globe}
            <a
              target="_blank"
              href="http://google.sabyasachiseal.com"
              rel="noreferrer"
            >
              sabyasachiseal.com
            </a>
          </div>
          <div className={styles.descriptionWrapper}>
            <p className={styles.description}>
              Sabyasachi Seal is a software engineer, web author, and
              businessman. He is currently located in{' '}
              <b>Kolkata, West Bengal,</b> , He is a avid coder and loves to
              build new things. He is a part of multiple commnuties like MLSA,
              GDSC and AWS Community Builders. He is known on Github for his
              projects and occasionally posts new blogs on Mediun. Sabyasachi
              has about 1 year of experience in the software engineering
              industry and still continues to expore more and make projects.{' '}
            </p>
          </div>
          <div className={styles.stat}>
            <span>Born: </span>June, 2002 (age{' '}
            {new Date(Date.now() - new Date(2002, 5).getTime()).getFullYear() -
              1970}{' '}
            years),{' '}
            <a
              href="https://www.google.com/search?q=kolkata"
              target="_blank"
              rel="noreferrer"
            >
              Kolkata
            </a>
          </div>
          <div className={styles.stat}>
            <span>Education: </span>
            <a
              href="https://www.ticollege.ac.in/"
              target="_blank"
              rel="noreferrer"
            >
              Bachelor of Technology
            </a>{' '}
            (TMSL, 2024)
          </div>
          <div className={styles.stat}>
            <span>Skilled In: </span>Python, DevOps, Cloud{' '}
            <a
              href="https://www.linkedin.com/in/sabyasachi-seal-4461711bb/"
              target="_blank"
              rel="noreferrer"
            >
              Linkedin
            </a>
          </div>
          <div className={styles.inputArea}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything about Sabyasachi..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
          <div className={styles.border} />
        </div>
      ) : (
        <div className={`${styles.chat} ${styles.slideIn}`}>
          <div className={styles.chatWindow} ref={chatWindowRef}>
            {messages.map((msg) => (
              <div key={`${msg.user}-${msg.bot}`}>
                {msg.user && (
                  <div className={styles.userMessage}>
                    <strong>You:</strong> {msg.user}
                  </div>
                )}
                <div className={styles.botMessage}>
                  <strong>Sabyasachi:</strong> {msg.bot}
                </div>
              </div>
            ))}
          </div>
          <div className={styles.inputArea}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything about Sabyasachi..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
          <div className={styles.border} />
        </div>
      )}
      <div className={styles.profiles}>
        <h4>Profiles</h4>
        <div className={styles.socials}>
          {profiles.map((profile) => (
            <SocialProfile {...profile} key={profile.label} />
          ))}
        </div>
        <div className={styles.border} />
      </div>
      <div className={styles.people}>
        <h4>People also search for</h4>
        <div className={styles.socials}>
          {friends.map((friend) => (
            <Friend {...friend} key={friend.name} />
          ))}
        </div>
      </div>
    </div>
  )
}
