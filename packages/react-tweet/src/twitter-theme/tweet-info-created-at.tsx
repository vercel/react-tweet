'use client'

import dayjs from 'dayjs'
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
  if (!createdAt) return null

  const formattedCreatedAtDate = dayjs(createdAt).format('h:mm A · MMM d, YYYY')
  return (
    <a
      className={s.root}
      href={tweet.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={formattedCreatedAtDate}
    >
      <time dateTime={createdAt.toISOString()}>{formattedCreatedAtDate}</time>
    </a>
  )
}
