import { QuotedTweet } from '../api'
import { TweetQuotedTweetHeader } from './tweet-quoted-tweet-header.js'
import { TweetQuotedTweetBody } from './tweet-quoted-tweet-body.js'
import { TweetQuotedTweetContainer } from './tweet-quoted-tweet-container.js'
import { TweetQuotedTweetMedia } from './tweet-quoted-tweet-media.js'
import { useMemo } from 'react'
import { enrichQuotedTweet } from '../utils'

type Props = {
  tweet: QuotedTweet
}

export const TweetQuotedTweet = ({ tweet: t }: Props) => {
  const tweet = useMemo(() => enrichQuotedTweet(t), [t])

  return (
    <TweetQuotedTweetContainer>
      <TweetQuotedTweetHeader tweet={tweet} />
      <TweetQuotedTweetBody tweet={tweet} />
      {tweet.mediaDetails?.length ? (
        <TweetQuotedTweetMedia tweet={tweet} />
      ) : null}
    </TweetQuotedTweetContainer>
  )
}
