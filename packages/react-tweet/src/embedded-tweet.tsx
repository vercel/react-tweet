import type { Tweet } from './api/index.js'
import { type Locales, defaultLocales } from './locales.js'
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
  components?: Omit<TweetComponents, 'TweetNotFound'>
  locales?: Locales
}

export const EmbeddedTweet = ({ tweet, components, locales = defaultLocales }: Props) => (
  <TweetContainer>
    <TweetHeader tweet={tweet} components={components} locales={locales.header} />
    {tweet.in_reply_to_status_id_str && <TweetInReplyTo tweet={tweet} locales={locales.tweet.inReply} />}
    <TweetBody tweet={tweet} />
    {tweet.mediaDetails?.length ? (
      <TweetMedia tweet={tweet} components={components} locales={locales.tweet.media} />
    ) : null}
    <TweetInfo tweet={tweet} locales={locales.tweet.info} />
    <TweetActions tweet={tweet} locales={locales.actions} />
    <TweetReplies tweet={tweet} locales={locales.readMore} />
  </TweetContainer>
)
