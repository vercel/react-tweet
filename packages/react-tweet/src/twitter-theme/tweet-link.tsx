import type { ReactNode } from 'react'
import s from './tweet-link.module.css'

type Props = {
  children: ReactNode
  href: string
}

export const TweetLink = ({ href, children }: Props) => (
  <a href={href} className={s.root} target="_blank" rel="noopener noreferrer nofollow">
    {children}
  </a>
)
