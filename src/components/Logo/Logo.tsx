import { useContext } from 'react'
import { ThemeContext } from 'src/contexts'

import Image from 'next/image'

interface Props {
  height?: number
  width?: number
}

export const Logo: React.FC<Props> = ({ height = 92, width = 272 }) => {
  const { theme } = useContext(ThemeContext)

  return (
    <Image
      priority
      height={height}
      width={width}
      alt="themed-logo"
      src={
        theme === 'light' ? `/images/google.png` : `/images/google_light.png`
      }
    />
  )
}
