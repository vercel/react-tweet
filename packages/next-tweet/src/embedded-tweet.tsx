import type { Tweet } from './api/index.js'
import { TweetContainer } from './tweet-container.js'
import { TweetHeader } from './tweet-header.js'
import { TweetInReplyTo } from './tweet-in-reply-to.js'
import { TweetBody } from './tweet-body.js'
import { TweetMedia } from './tweet-media.js'
import { TweetInfo } from './tweet-info.js'
import { TweetActions } from './tweet-actions.js'
import { TweetReplies } from './tweet-replies.js'
import s from './embedded-tweet.module.css'

type Props = {
  tweet?: Tweet
  priority?: boolean
}

export const EmbeddedTweet = ({ tweet, priority }: Props) => (
  <TweetContainer>
    {tweet ? (
      <>
        i
        <TweetHeader tweet={tweet} priority={priority} />
        {tweet.in_reply_to_status_id_str && <TweetInReplyTo tweet={tweet} />}
        <TweetBody tweet={tweet} />
        {tweet.mediaDetails?.length ? (
          <TweetMedia tweet={tweet} priority={priority} />
        ) : null}
        <TweetInfo tweet={tweet} />
        <TweetActions tweet={tweet} />
        <TweetReplies tweet={tweet} />
      </>
    ) : (
      <div className={s.notFound}>
        <h3>Tweet not found</h3>
        <p>The embedded tweet could not be found…</p>
      </div>
    )}
  </TweetContainer>
)
