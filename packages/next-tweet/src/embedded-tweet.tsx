import type { Tweet } from './api'
import { TweetHeader } from './tweet-header'
import { TweetInReplyTo } from './tweet-in-reply-to'
import { TweetBody } from './tweet-body'
import { TweetMedia } from './tweet-media'
import { TweetInfo } from './tweet-info'
import { TweetActions } from './tweet-actions'
import { TweetReplies } from './tweet-replies'
import s from './embedded-tweet.module.css'

type Props = {
  tweet: Tweet
  priority?: boolean
}

export const EmbeddedTweet = ({ tweet, priority }: Props) => (
  <div className={s.root}>
    <article className={s.article}>
      <TweetHeader tweet={tweet} priority={priority} />
      {tweet.in_reply_to_status_id_str && <TweetInReplyTo tweet={tweet} />}
      <TweetBody tweet={tweet} />
      {tweet.mediaDetails?.length ? (
        <TweetMedia tweet={tweet} priority={priority} />
      ) : null}
      <TweetInfo tweet={tweet} />
      <TweetActions tweet={tweet} />
      <TweetReplies tweet={tweet} />
    </article>
  </div>
)
