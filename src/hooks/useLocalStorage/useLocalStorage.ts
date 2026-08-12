import { SetStateAction, useEffect, useRef, useState } from 'react'

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: SetStateAction<T>) => void] => {
  const isClient = typeof window !== 'undefined'
  const initialValueRef = useRef(initialValue)
  const [storedValue, setStoredValue] = useState<T>(initialValue)

  useEffect(() => {
    try {
      const item = isClient ? window?.localStorage?.getItem(key) : null
      setStoredValue(item ? (JSON.parse(item) as T) : initialValueRef.current)
    } catch (error) {
      console.log(error)
      setStoredValue(initialValueRef.current)
    }
  }, [isClient, key])

  const setValue = (value: SetStateAction<T>) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (isClient)
        window?.localStorage?.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.log(error)
    }
  }
  return [storedValue, setValue]
}
