import type { Tweet } from './api/index.js'
import { getTweetUrl, getRepliesLinkText } from './utils.js'
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
        {getRepliesLinkText(tweet.conversation_count)}
      </span>
    </a>
  </div>
)
