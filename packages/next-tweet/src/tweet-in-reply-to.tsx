import type { Tweet } from './api'
import { getInReplyToUrl } from './utils'
import s from './tweet-in-reply-to.module.css'

export const TweetInReplyTo = ({ tweet }: { tweet: Tweet }) => (
  <a
    href={getInReplyToUrl(tweet)}
    className={s.root}
    target="_blank"
    rel="noopener noreferrer"
  >
    Replying to @{tweet.in_reply_to_screen_name}
  </a>
)
