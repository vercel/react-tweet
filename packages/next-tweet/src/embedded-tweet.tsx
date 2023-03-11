import type { Tweet } from './api/index.js'
import type { TweetComponents } from './components.js'
import { TweetContainer } from './tweet-container.js'
import { TweetHeader } from './tweet-header.js'
import { TweetInReplyTo } from './tweet-in-reply-to.js'
import { TweetBody } from './tweet-body.js'
import { TweetMedia } from './tweet-media.js'
import { TweetInfo } from './tweet-info.js'
import { TweetActions } from './tweet-actions.js'
import { TweetReplies } from './tweet-replies.js'

type Props = {
  tweet: Tweet
  components?: TweetComponents
}

export const EmbeddedTweet = ({ tweet, components }: Props) => (
  <TweetContainer>
    <TweetHeader tweet={tweet} components={components} />
    {tweet.in_reply_to_status_id_str && <TweetInReplyTo tweet={tweet} />}
    <TweetBody tweet={tweet} />
    {tweet.mediaDetails?.length ? <TweetMedia tweet={tweet} /> : null}
    <TweetInfo tweet={tweet} />
    <TweetActions tweet={tweet} />
    <TweetReplies tweet={tweet} />
  </TweetContainer>
)
