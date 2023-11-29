'use client'

import format from 'date-fns/format/index.js'
import type { EnrichedTweet } from '../utils.js'
import { useMounted } from '../hooks.js'
import s from './tweet-info-created-at.module.css'

export const TweetInfoCreatedAt = ({ tweet }: { tweet: EnrichedTweet }) => {
  const mounted = useMounted()
  // If the date is displayed immediately, it will produce a server/client mismatch because the date
  // format will change depending on the user's browser. If the format were to be simplified to
  // something like "MMM d, y", then you could use the server date.
  const createdAt =
    typeof window !== 'undefined' && mounted ? new Date(tweet.created_at) : null

  return !createdAt ? null : (
    <a
      className={s.root}
      href={tweet.url}
      target="_blank"
      rel="noopener noreferrer nofollow"
      aria-label={format(createdAt, 'h:mm a · MMM d, y')}
    >
      <time dateTime={createdAt.toISOString()}>
        {format(createdAt, 'h:mm a · MMM d, y')}
      </time>
    </a>
  )
}
