import type { FC } from 'react'
import type { Tweet } from './lib/twitter/api'
import { getInReplyToUrl } from './utils'
import s from './tweet-in-reply-to.module.css'

export const TweetInReplyTo: FC<{ tweet: Tweet }> = ({ tweet }) => (
  <a
    href={getInReplyToUrl(tweet)}
    className={s.root}
    target="_blank"
    rel="noopener noreferrer"
  >
    Replying to @{tweet.in_reply_to_screen_name}
  </a>
)
