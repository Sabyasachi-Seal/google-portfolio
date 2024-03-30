import { NextPage } from 'next'
import { useState } from 'react'
import { CategoryChart, SkillChart, SkillResult } from 'src/components'
import {
  backendData,
  frameworks,
  frontendData,
  languages,
  services,
  tools,
} from 'src/content'
import { SkillsContext } from 'src/contexts'

import styles from './Skills.module.scss'
export const Skills: NextPage = () => {
  const [skill, setSkill] = useState('React')

  return (
    <SkillsContext.Provider value={{ skill, setSkill }}>
      <div className={styles.container}>
        <div className={styles.categories}>
          <CategoryChart name="Frontend" data={frontendData} />
          <CategoryChart name="Backend" data={backendData} />
        </div>
        <SkillChart />
        <div className={styles.lists}>
          <div className={styles.list}>
            <h3>Languages</h3>
            {languages.map((skill) => (
              <SkillResult {...skill} key={skill.name} />
            ))}
          </div>
          <div className={styles.list}>
            <h3>Frameworks</h3>
            {frameworks.map((skill) => (
              <SkillResult {...skill} key={skill.name} />
            ))}
          </div>
        </div>
        <div className={styles.lists}>
          <div className={styles.list}>
            <h3>Tools</h3>
            {tools.map((skill) => (
              <SkillResult {...skill} key={skill.name} />
            ))}
          </div>
        </div>
      </div>
    </SkillsContext.Provider>
  )
}
