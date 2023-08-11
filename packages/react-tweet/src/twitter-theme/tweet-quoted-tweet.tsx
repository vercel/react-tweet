import { QuotedTweet } from '../api'
import { TweetQuotedTweetHeader } from './tweet-quoted-tweet-header.js'
import { TweetQuotedTweetBody } from './tweet-quoted-tweet-body.js'
import { TweetQuotedTweetContainer } from './tweet-quoted-tweet-container.js'
import { TweetMedia } from './tweet-media.js'
import { useMemo } from 'react'
import { enrichQuotedTweet } from '../utils.js'

type Props = {
  tweet: QuotedTweet
}

export const TweetQuotedTweet = ({ tweet: t }: Props) => {
  const tweet = useMemo(() => enrichQuotedTweet(t), [t])

  return (
    <TweetQuotedTweetContainer>
      <TweetQuotedTweetHeader tweet={tweet} />
      <TweetQuotedTweetBody tweet={tweet} />
      {tweet.mediaDetails?.length ? <TweetMedia quoted tweet={tweet} /> : null}
    </TweetQuotedTweetContainer>
  )
}
