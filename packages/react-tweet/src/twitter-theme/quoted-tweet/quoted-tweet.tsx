import type { EnrichedQuotedTweet } from '../../utils.js'
import { QuotedTweetContainer } from './quoted-tweet-container.js'
import { QuotedTweetHeader } from './quoted-tweet-header.js'
import { QuotedTweetBody } from './quoted-tweet-body.js'
import { TweetMedia } from '../tweet-media.js'

type Props = { tweet: EnrichedQuotedTweet }

export const QuotedTweet = ({ tweet }: Props) => (
  <QuotedTweetContainer tweet={tweet}>
    <QuotedTweetHeader tweet={tweet} />
    <QuotedTweetBody tweet={tweet} />
    {tweet.mediaDetails?.length ? <TweetMedia quoted tweet={tweet} /> : null}
  </QuotedTweetContainer>
)
