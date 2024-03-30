import { ComponentProps } from 'react'
import { VideoResult } from 'src/components'

type Video = ComponentProps<typeof VideoResult>

export const videos: Video[] = [
  {
    title: 'Baad Movies',
    id: 'Y5A8ZEznnoM',
    description: `Attention all movie lovers, I've been working on a passion project that is sure to make all your bad movie-loving dreams come true. My friends and I have a special love for terrible movies – you know, the ones that are so bad they're actually good? (Or at least, that's what we tell ourselves.) 
    But we noticed a major problem: when we go to google and search for bad movies, all we get are lists. Where's the fun in that? We want to see the worst of the worst, the top of the trash heap. That's why I've decided to create Baad Movies.
    Baad Movies is a movie recommendation site that specializes in the delightfully awful. I've scoured the depths of cinematic garbage to bring you the most cringeworthy, unintentionally hilarious movies out there. Trust me, this has been the funniest thing I've worked on in a long time.`,
    uploadDate: 'January 3, 2023',
  },
  {
    title: 'If Miles Morales was a software engineer',
    id: 'BuAdQS7xFa8',
    description: `If Miles Morales was a software engineer`,
    uploadDate: 'July 6, 2023',
  },
  {
    title: "You're Wrong demo",
    id: '1MkP61gHBuM',
    description: `You're Wrong is a social platform for respectful disagreements and debates. It is a place where users can state their opinions and engage in honest and open discussion, even if they disagree with each other. The goal of You're Wrong is to help users learn from each other and to develop a better understanding of different perspectives`,
    uploadDate: 'September 26, 2023',
  },
  {
    title: 'Hire Me',
    id: 'V7f-EpcRic0',
    description: `How to get hired the right way ;)
    
    Website: hireme-xi.vercel.app
    Github: AMACAFELLA/hire_me`,
    uploadDate: 'January 12, 2024',
  },
  {
    title: 'HTTP Requests: function and different types',
    id: '7poSh0pW9Js',
    description: `HTTP Requests: function and different types`,
    uploadDate: 'May 16, 2022',
  },
]
