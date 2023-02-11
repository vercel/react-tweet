import format from 'date-fns/format'
import type { Tweet } from './lib/twitter/api'
import useMounted from './lib/use-mounted'
import s from './tweet-info.module.css'

export default function TweetInfo({ tweet }: { tweet: Tweet }) {
  const mounted = useMounted()
  const likeUrl = `https://twitter.com/intent/like?tweet_id=${tweet.id_str}`
  const tweetUrl = `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`
  const createdAt =
    typeof window !== 'undefined' && mounted ? new Date(tweet.created_at) : null

  return (
    <div className={s.info}>
      {createdAt && (
        <a
          className={s.time}
          href={tweetUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={format(createdAt, 'h:mm a · MMM d, y')}
        >
          <time dateTime={createdAt.toISOString()}>
            {format(createdAt, 'h:mm a · MMM d, y')}
          </time>
        </a>
      )}
      <a
        className={s.infoLink}
        href="https://help.twitter.com/en/twitter-for-websites-ads-info-and-privacy"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className={s.infoIcon}>
          <g>
            <path d="M13.5 8.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5S11.17 7 12 7s1.5.67 1.5 1.5zM13 17v-5h-2v5h2zm-1 5.25c5.66 0 10.25-4.59 10.25-10.25S17.66 1.75 12 1.75 1.75 6.34 1.75 12 6.34 22.25 12 22.25zM20.25 12c0 4.56-3.69 8.25-8.25 8.25S3.75 16.56 3.75 12 7.44 3.75 12 3.75s8.25 3.69 8.25 8.25z"></path>
          </g>
        </svg>
      </a>
    </div>
  )
}
