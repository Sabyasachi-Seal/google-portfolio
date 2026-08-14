import { ButtonHTMLAttributes, PropsWithChildren } from 'react'

import styles from './AuthenticateButton.module.scss'

type Props = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>

export const AuthenticateButton: React.FC<Props> = ({
  children,
  type = 'button',
  ...buttonProps
}) => {
  return (
    <button {...buttonProps} className={styles.button} type={type}>
      {children}
    </button>
  )
}
