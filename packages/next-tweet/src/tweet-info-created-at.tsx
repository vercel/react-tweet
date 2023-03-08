'use client'

import format from 'date-fns/format/index.js'
import type { Tweet } from './api/index.js'
import { getTweetUrl } from './utils.js'
import useMounted from './lib/use-mounted.js'
import s from './tweet-info-created-at.module.css'

export const TweetInfoCreatedAt = ({ tweet }: { tweet: Tweet }) => {
  const mounted = useMounted()
  const createdAt =
    typeof window !== 'undefined' && mounted ? new Date(tweet.created_at) : null

  return !createdAt ? null : (
    <a
      className={s.root}
      href={getTweetUrl(tweet)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={format(createdAt, 'h:mm a · MMM d, y')}
    >
      <time dateTime={createdAt.toISOString()}>
        {format(createdAt, 'h:mm a · MMM d, y')}
      </time>
    </a>
  )
}
