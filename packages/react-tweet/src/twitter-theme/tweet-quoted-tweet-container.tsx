import type { ReactNode } from 'react'
import s from './tweet-quoted-tweet-container.module.css'

type Props = { children: ReactNode }

export const TweetQuotedTweetContainer = ({ children }: Props) => (
  <div className={s.root}>
    <article className={s.article}>{children}</article>
  </div>
)
