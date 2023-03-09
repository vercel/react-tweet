import type { Tweet } from './api/index.js'
import { getTweetUrl, formatNumber } from './utils.js'
import s from './tweet-replies.module.css'

export const TweetReplies = ({ tweet }: { tweet: Tweet }) => (
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
