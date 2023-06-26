import type { Tweet } from './api/index.js'
import type { Locales } from './locales.js'
import { getTweetUrl } from './utils.js'
import s from './tweet-replies.module.css'

type Props = {
  tweet: Tweet
  locales: Locales['readMore']
}

export const TweetReplies = ({ tweet, locales }: Props) => {
  return (
    <div className={s.replies}>
      <a
        className={s.link}
        href={getTweetUrl(tweet)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className={s.text}>{locales.text(tweet.conversation_count)}</span>
      </a>
    </div>
  )
}
