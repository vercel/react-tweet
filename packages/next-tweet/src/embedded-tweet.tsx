import type { Tweet } from './api'
import { TweetHeader } from './tweet-header'
import { TweetInReplyTo } from './tweet-in-reply-to'
import { TweetBody } from './tweet-body'
import { TweetMedia } from './tweet-media'
import { TweetInfo } from './tweet-info'
import { TweetActions } from './tweet-actions'
import { TweetReplies } from './tweet-replies'
import s from './embedded-tweet.module.css'
import './theme.css'

type Props = {
  tweet?: Tweet
  priority?: boolean
}

export const EmbeddedTweet = ({ tweet, priority }: Props) => (
  <div className={s.root}>
    <article className={s.article}>
      {tweet ? (
        <>
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
          <h3>Not Found</h3>
          <p>
            Sorry, we can&apos;t create an embed for that. It may have been
            deleted or made private. Please try again.
          </p>
        </div>
      )}
    </article>
  </div>
)
