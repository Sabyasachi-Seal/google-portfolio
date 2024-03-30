import Image from 'next/image'
import { ComponentProps } from 'react'
import { SearchResult } from 'src/components'

type Content = ComponentProps<typeof SearchResult>

export const searchResults: Content[] = [
  {
    title: 'San Antonio Regional Hospital | Web Design/Developer Intern',
    description: (
      <>
        On this week&apos;s episode of Grey&apos;s Antomy,I integrated
        ADA-compliant features and implemented a web and mobile application for
        patient education videos.
      </>
    ),
    extras: <b>Frontend, Backend, CMS</b>,
    link: 'https://www.sarh.org/',
    image: (
      <Image
        src="https://sarhfiles.blob.core.windows.net/live/images/default-source/about-us/mission-bug417e9a01-44ef-4ef0-be45-36921e6e1338.jpg?sfvrsn=facaa391_3"
        alt="San Antonio Regional Hospital logo"
        priority
        fill
      />
    ),
  },
  {
    title: 'Power Changes Lives | IT Web Design/Developer Intern',
    description: (
      <>
        I was promoted to Tech Lead and led two other interns in redesigning the
        company site with React and Node.js. Additionally, I worked with
        Shopify, Liquid, Python, Make automation, Microsoft SharePoint,
        Microsoft Admin, and Ticketing Systems.
      </>
    ),
    extras: <b>Frontend, Backend, Admin</b>,
    link: 'https://www.powerchangeslives.com/',
    image: (
      <Image
        src="https://www.powerchangeslives.com/images/POWERLOGO10292021.png"
        alt="Power Changes Lives logo"
        layout="fill"
        objectFit="contain"
        priority
      />
    ),
  },
  {
    title: "You're Wrong | Software Engineer",
    description: (
      <>
        I founded and published You&apos;re Wrong on Product Hunt, gaining 78
        followers and ranking #34 for the day. The project utilized React,
        TypeScript, MongoDB, Mongoose, Clerk auth, Next.js, and Vercel to create
        a responsive, secure, and efficient social network that provided an
        excellent user experience.
      </>
    ),
    extras: (
      <>
        <b>Deployment, Frontend, Backend</b>
      </>
    ),
    link: 'https://www.producthunt.com/products/you-re-wrong#you-re-wrong',
    image: (
      <Image
        src="https://ph-files.imgix.net/f22947fd-54dd-470c-9a38-b0afc9c875b3.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=72&h=72&fit=crop&bg=0fff&dpr=1"
        alt="Product Hunt logo"
        layout="fill"
        objectFit="contain"
        priority
      />
    ),
  },
  {
    title: 'Macabeats | Software Engineer',
    description: (
      <>
        Fictional e-commerce store implemented using Next.js, Sanity, and Stripe
        for processing payments.
      </>
    ),
    extras: (
      <>
        <b> CMS, Frontend, Backend</b>
      </>
    ),
    link: 'https://macabeats.netlify.app/',
  },
  {
    title: 'Portfolio-Verse | Software Enigeer',
    description: (
      <>
        I really enjoyed &quot;Across the Spider-Verse&quot; and was inspired to
        become my own version of Spider-Man. I implemented vanilla HTML, CSS,
        JavaScript, and Photoshop.
      </>
    ),
    extras: (
      <>
        <b>Frontend, Photoshop</b>
      </>
    ),
    link: 'https://github.com/AMACAFELLA/Portfolio-Verse',
  },
  {
    title: 'Hire Me | Software Engineer',
    description: (
      <>
        I created this simple but cute website to help those who do not have a
        portfolio website, using HTML, CSS, and JavaScript. This was inspired by
        an Instagram reel.
      </>
    ),
    extras: <b>Frontend</b>,
    link: 'https://github.com/AMACAFELLA/hire_me',
  },
  {
    title: 'Desktop Cleaner | Software Engineer',
    description: (
      <>
        Created a Python script using the Watchdog library that helps
        automatically clean up your desktop by moving files into folders named
        after their extensions in your Documents directory.
      </>
    ),
    extras: (
      <>
        <b>Backend</b>
      </>
    ),
    link: 'https://github.com/AMACAFELLA/desktop_cleaner',
  },
  {
    title: 'Macdashboard | Software Engineer',
    description: (
      <>
        Admin dashboard app using React.js and Syncfusion. This admin panel
        includes one dashboard, three pages, four apps, and seven fully
        functional charts!
      </>
    ),
    extras: (
      <>
        <b>Frontend</b>
      </>
    ),
    link: 'https://macadashboard.netlify.app/',
  },
]
