import type { FC } from 'react'
import type { Tweet } from './lib/twitter/api'
import formatNumber from './lib/format-number'
import s from './tweet-replies.module.css'

const TweetReplies: FC<{ tweet: Tweet }> = ({ tweet }) => {
  const userUrl = `https://twitter.com/${tweet.user.screen_name}`
  const tweetUrl = `${userUrl}/status/${tweet.id_str}`

  return (
    <div className={s.replies}>
      <a
        className={s.link}
        href={tweetUrl}
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
}

export default TweetReplies
