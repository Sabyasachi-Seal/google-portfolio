import Image from 'next/image'
import { ComponentProps } from 'react'
import { SearchResult } from 'src/components'
import { image_dict } from 'src/content/images'

type Content = ComponentProps<typeof SearchResult>

export const searchResults: Content[] = [
  {
    title: 'Personal Github',
    description: (
      <>
        I contribute to open-source projects and create my own projects. I have
        experience with Python, Machine Learning, Web Development, DevOps and
        more.
      </>
    ),
    extras: <b>Projects, Tech Stack</b>,
    link: 'https://github.com/Sabyasachi-Seal',
    image: (
      <Image
        src={image_dict.github}
        alt="Sabyasachi Seal"
        priority
        fill
        sizes="fill"
      />
    ),
  },
  {
    title: 'Linkedin',
    description: (
      <>
        I always tend to update whatever I do on Linkedin. From projects to
        certiciations, you can find everything here.
      </>
    ),
    extras: <b>Certifications, Experience</b>,
    link: 'https://www.linkedin.com/in/sabyasachi-seal-4461711bb/',
    image: (
      <Image
        src={image_dict.linkedin}
        alt="Sabyasachi Seal Linkedin"
        fill
        priority
        sizes="fill"
      />
    ),
  },
  {
    title: 'Resume - Auto Updated',
    description: (
      <>
        This is my resume. Incase you need to quickly know about me, my
        achivements and my experience, this is where you can find. if you want
        to know more about me, you can always visit my linkedin profile.
      </>
    ),
    extras: (
      <>
        <b>Resume, Portfolio</b>
      </>
    ),
    link: 'https://resume.sabyasachiseal.com/',
    image: (
      <Image
        src={image_dict.resume}
        alt="Sabyasachi Seal Resume"
        fill
        priority
        sizes="fill"
      />
    ),
  },
  {
    title: 'Experience | Software Engineer',
    description: (
      <>
        I have experience in building web applications, RESTful APIs, and
        automation scripts. I have worked with Python, JavaScript, React.js, and
        DevOps. I have also worked with databases like MongoDB, PostgreSQL, and
        MySQL.
      </>
    ),
    extras: (
      <>
        <b> AI/ML, Frontend, Backend</b>
      </>
    ),
    link: 'https://www.google.com/search?q=sabyasachi+seal',
  },
  {
    title: 'Blogs | Medium',
    description: (
      <>
        I write blogs on Medium about my projects, experiences, and new
        technologies. I have written blogs on Python, JavaScript, and DevOps. If
        you want to collaborate or have any queries, feel free to reach out to
        me.
      </>
    ),
    extras: (
      <>
        <b>Technical Blogs</b>
      </>
    ),
    link: 'https://medium.com/@yoboy907/',
  },
  {
    title: 'Hire Me',
    description: (
      <>
        I am open to new opportunities. If you have any projects or ideas, feel
        free to reach out to me. I am available for freelance projects, open
        source contributions, and full-time roles.
      </>
    ),
    extras: <b>Contact</b>,
    link: 'https://sabyasachiseal.com/#section-contacts',
  },
]
