import { useState, useEffect, useRef } from 'react'
import { friends, profiles } from 'src/content'
import { SocialProfile, Friend } from 'src/components'
import styles from './About.module.scss'

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

const userInfo = {
  name: 'Sabyasachi Seal',
  profession: 'Indian software engineer, web author, and businessman',
  location: 'Kolkata, West Bengal',
  interests: 'avid coder, loves to build new things',
  communities: ['MLSA', 'GDSC', 'AWS Community Builders'],
  github: 'known for projects',
  medium: 'occasionally posts blogs',
  experience: '1 year in software engineering',
  born: 'June 2002',
  age: new Date(Date.now() - new Date(2002, 5).getTime()).getFullYear() - 1970,
  education: 'Techno Main Salt Lake (2024)',
  skills: ['Python', 'DevOps', 'Cloud'],
  linkedin: 'https://www.linkedin.com/in/sabyasachi-seal-4461711bb/',
  website: 'http://sabyasachiseal.com',
}

export const About: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [hasStartedChatting, setHasStartedChatting] = useState(false)
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([
    {
      user: '',
      bot: "Hello there! How can I help you today? I'm Sabyasachi Seal, a software engineer from Kolkata. I'm passionate about coding and building new things.",
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const chatWindowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTo({
        top: chatWindowRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    // Mark that the user has started chatting
    if (!hasStartedChatting) {
      setHasStartedChatting(true)
      setIsChatOpen(true)
    }

    const updatedMessages = [...messages, { user: input, bot: 'Thinking...' }]
    setMessages(updatedMessages)
    setInput('')
    setIsTyping(true)

    try {
      const response = await fetch('/api/callGeminiApi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input, userInfo }),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch response from Gemini API')
      }

      const data = await response.json()
      const botResponse = data.response || 'Sorry, something went wrong.'

      // Simulate typing effect
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
    } finally {
      setIsTyping(false)
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
              href="http://sabyasachiseal.com"
              rel="noreferrer"
            >
              sabyasachiseal.com
            </a>
          </div>
          <div className={styles.descriptionWrapper}>
            <p className={styles.description}>
              Sabyasachi Seal is a Indian software engineer, web author, and
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
              href="https://www.google.com/search?q=cape+town&sca_esv=599792272&biw=1280&bih=634&sxsrf=ACQVn08lCKYhcJKz0p7EdS1upai176uH9w%3A1705670213800&ei=RXaqZZnCMLiThbIPo96VyAE&gs_ssp=eJzj4tDP1TcwrMwyMmD04kxOLEhVKMkvzwMAP7oGWQ&oq=cape+town&gs_lp=Egxnd3Mtd2l6LXNlcnAiCWNhcGUgdG93bioCCAAyEBAuGIAEGIoFGEMYsQMYgwEyCxAAGIAEGLEDGIMBMgoQABiABBiKBRhDMgsQABiABBixAxiDATIKEAAYgAQYigUYQzIKEAAYgAQYigUYQzIKEC4YQxiABBiKBTILEC4YrwEYxwEYgAQyBRAAGIAEMgsQABiABBixAxiDATIfEC4YgAQYigUYQxixAxiDARiXBRjcBBjeBBjgBNgBA0iFKFDtCVj2HXACeAGQAQGYAewGoAHpIqoBCTMtMi4yLjIuMrgBAcgBAPgBAcICChAAGEcY1gQYsAPCAg0QABiABBiKBRhDGLADwgIOEAAY5AIY1gQYsAPYAQHCAhMQLhiABBiKBRhDGMgDGLAD2AECwgIEECMYJ8ICChAjGIAEGIoFGCfCAgoQLhiABBiKBRhDwgIOEAAYgAQYigUYsQMYgwHCAhQQLhiABBiKBRixAxiDARjHARjRA8ICEBAAGIAEGIoFGEMYsQMYgwHiAwQYACBBiAYBkAYSugYGCAEQARgJugYGCAIQARgIugYGCAMQARgU&sclient=gws-wiz-serp"
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
              Techno Main Salt Lake
            </a>{' '}
            (2024)
          </div>
          <div className={styles.stat}>
            <span>Skilled In: </span>Python, DevOps, Cloud (2024)
            <a
              href="https://www.linkedin.com/in/sabyasachi-seal-4461711bb/"
              target="_blank"
              rel="noreferrer"
            >
              {' '}
              Linkedin
            </a>
          </div>
          <div className={styles.inputArea}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything about Sabyasachi..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
          <div className={styles.border} />
        </div>
      ) : (
        <div className={`${styles.chat} ${styles.slideIn}`}>
          <div className={styles.chatWindow} ref={chatWindowRef}>
            {messages.map((msg, index) => (
              <div key={index}>
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
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
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
