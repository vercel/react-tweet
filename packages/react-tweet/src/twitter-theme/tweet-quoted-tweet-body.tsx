import type { EnrichedQuotedTweet } from '../utils.js'
import s from './tweet-quoted-tweet-body.module.css'

export const TweetQuotedTweetBody = ({
  tweet,
}: {
  tweet: EnrichedQuotedTweet
}) => (
  <p className={s.root}>
    {tweet.entities.map((item, i) => (
      <span key={i} dangerouslySetInnerHTML={{ __html: item.text }} />
    ))}
  </p>
)
