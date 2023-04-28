import { useMemo } from 'react'
import type { Tweet } from './api/index.js'
import { getTweetUrl, formatNumber } from './utils.js'
import s from './tweet-replies.module.css'

export const TweetReplies = ({ tweet }: { tweet: Tweet }) => {
  const repliesLinkText = useMemo(() => {
    if (tweet.conversation_count === 0) return 'Read more on Twitter'

    return tweet.conversation_count === 1
      ? `Read ${formatNumber(tweet.conversation_count)} reply`
      : `Read ${formatNumber(tweet.conversation_count)} replies`
  }, [tweet.conversation_count])

  return (
    <div className={s.replies}>
      <a
        className={s.link}
        href={getTweetUrl(tweet)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className={s.text}>{repliesLinkText}</span>
      </a>
    </div>
  )
}
