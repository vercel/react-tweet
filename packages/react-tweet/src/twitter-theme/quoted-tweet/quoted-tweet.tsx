import type { EnrichedQuotedTweet } from '../../utils.js'
import type { TwitterComponents } from '../types.js'
import { QuotedTweetContainer } from './quoted-tweet-container.js'
import { QuotedTweetHeader } from './quoted-tweet-header.js'
import { QuotedTweetBody } from './quoted-tweet-body.js'
import { TweetMedia } from '../tweet-media.js'

type Props = { tweet: EnrichedQuotedTweet, components?: TwitterComponents }

export const QuotedTweet = ({ tweet, components }: Props) => (
  <QuotedTweetContainer tweet={tweet}>
    <QuotedTweetHeader tweet={tweet} components={components} />
    <QuotedTweetBody tweet={tweet} />
    {tweet.mediaDetails?.length ? <TweetMedia quoted tweet={tweet} /> : null}
  </QuotedTweetContainer>
)
