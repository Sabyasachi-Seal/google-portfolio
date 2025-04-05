import { NextPage } from 'next'
import Image from 'next/image'
import { images } from 'src/content'

import styles from './Images.module.scss'

export const Images: NextPage = () => {
  return (
    <div className={styles.container}>
      {images.map((id) => (
        <div className={styles.block} key={id}>
          <a href={`{id}`} target="_blank" rel="noreferrer">
            <div className={styles.image}>
              <Image
                src={`${id}`}
                alt="photography image"
                priority
                sizes="fill"
              />
            </div>
          </a>
        </div>
      ))}
    </div>
  )
}
