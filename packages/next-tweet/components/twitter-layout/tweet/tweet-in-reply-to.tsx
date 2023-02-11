import type { FC } from 'react'
import type { Tweet } from 'lib/twitter/api'
import s from './tweet-in-reply-to.module.css'

const TweetInReplyTo: FC<{ tweet: Tweet }> = ({ tweet }) => (
  <a
    href={`https://twitter.com/${tweet.in_reply_to_screen_name}/status/${tweet.in_reply_to_status_id_str}`}
    className={s.root}
    target="_blank"
    rel="noopener noreferrer"
  >
    Replying to @{tweet.in_reply_to_screen_name}
  </a>
)

export default TweetInReplyTo
