import { useEffect, useState } from 'react'
import { l1, l2, l3 } from 'constants/searchText'

const prompts = [...l1, ...l2, ...l3]
const defaultText = 'Sabyasachi Seal'

export const useSearchText = (delay = 0, enabled = true) => {
  const [text, setText] = useState(enabled ? defaultText : '')

  useEffect(() => {
    if (!enabled) {
      setText('')
      return
    }

    let promptIndex = 0
    let characterIndex = defaultText.length
    let phase: 'deleteDefault' | 'typePrompt' | 'holdPrompt' | 'deletePrompt' =
      'deleteDefault'
    let timeoutId: ReturnType<typeof setTimeout>

    const typeNextCharacter = () => {
      const prompt = prompts[promptIndex] ?? defaultText
      let nextDelay = 45

      if (phase === 'deleteDefault') {
        characterIndex -= 1
        setText(defaultText.slice(0, Math.max(characterIndex, 0)))
        if (characterIndex <= 0) {
          phase = 'typePrompt'
          characterIndex = 0
        }
      } else if (phase === 'typePrompt') {
        characterIndex += 1
        setText(prompt.slice(0, characterIndex))
        if (characterIndex >= prompt.length) {
          phase = 'holdPrompt'
          nextDelay = 1800
        }
      } else if (phase === 'holdPrompt') {
        phase = 'deletePrompt'
        characterIndex = prompt.length
      } else {
        characterIndex -= 1
        setText(prompt.slice(0, Math.max(characterIndex, 0)))
        if (characterIndex <= 0) {
          promptIndex = (promptIndex + 1) % prompts.length
          phase = 'typePrompt'
        }
      }

      timeoutId = setTimeout(typeNextCharacter, nextDelay)
    }

    timeoutId = setTimeout(typeNextCharacter, delay)
    return () => clearTimeout(timeoutId)
  }, [delay, enabled])

  return text
}
