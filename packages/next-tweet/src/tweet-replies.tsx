import type { FC } from 'react'
import type { Tweet } from './api'
import { getTweetUrl } from './utils'
import formatNumber from './lib/format-number'
import s from './tweet-replies.module.css'

export const TweetReplies: FC<{ tweet: Tweet }> = ({ tweet }) => (
  <div className={s.replies}>
    <a
      className={s.link}
      href={getTweetUrl(tweet)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className={s.text}>
        {tweet.conversation_count > 0
          ? `Read ${formatNumber(tweet.conversation_count)} replies`
          : 'Read more on Twitter'}
      </span>
    </a>
  </div>
)
