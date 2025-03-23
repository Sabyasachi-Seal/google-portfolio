import { useState, useCallback, useEffect } from 'react'
import { searchTextGeneratorBuilder, sleep } from 'src/utils'
import { l1, l2, l3 } from 'constants/searchText'

const allLst = [l1, l2, l3]

const randomIndex = Math.floor(Math.random() * allLst.length)

const textList = allLst[randomIndex]

export const useSearchText = (delay = 0) => {
  const [currentText, setCurrentText] = useState('')

  const animate = useCallback(async () => {
    const searchTextGenerator = searchTextGeneratorBuilder(
      textList,
      'Sabyasachi Seal'
    )()

    let value, done
    for (;;) {
      ;({ value, done } = searchTextGenerator.next())
      if (done || !value) return
      const [text, wait] = value
      await sleep(wait)
      if (text !== null) {
        setCurrentText(text)
      }
    }
  }, [])

  useEffect(() => {
    const delayedAnimate = async () => {
      await sleep(delay)
      animate()
    }
    delayedAnimate()
  }, [animate, delay])

  return currentText
}
