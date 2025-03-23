import { ComponentProps } from 'react'
import { Friend, SocialProfile } from 'src/components'
import {
  github,
  instagram,
  linkedin,
  twitter,
  youtube,
  medium,
  leetcode,
  aws,
} from './b64'

type Profile = ComponentProps<typeof SocialProfile>

export const profiles: Profile[] = [
  {
    label: 'GitHub',
    url: 'https://github.com/Sabyasachi-Seal/',
    src: github,
  },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/sabyasachi-seal-4461711bb/',
    src: linkedin,
  },
  {
    label: 'Twitter',
    url: 'https://twitter.com/sabyasachi_seal',
    src: twitter,
  },
  {
    label: 'Instagram',
    url: 'https://www.instagram.com/sealmydeal_/',
    src: instagram,
  },
]

type Friends = ComponentProps<typeof Friend>[]

export const friends: Friends = [
  {
    src: medium,
    name: 'Blogs',
    label: 'A collection of my thoughts',
    url: 'https://medium.com/@yoboy907/',
  },
  {
    src: youtube,
    name: 'Channel',
    label: 'Devops and Gaming',
    url: 'https://www.youtube.com/channel/UC5VBAKQWkYdrALsQ_W8woCg',
  },
  {
    src: leetcode,
    name: 'LeetCode',
    label: 'Java and Python',
    url: 'https://leetcode.com/sabyasachiseal/',
  },
  {
    src: aws,
    name: 'AWS Community',
    label: 'Just AWS',
    url: 'https://community.aws/@seal',
  },
]
