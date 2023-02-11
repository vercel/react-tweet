'use client'

import type { FC } from 'react'
import format from 'date-fns/format'
import type { Tweet } from './api'
import { getTweetUrl } from './utils'
import useMounted from './lib/use-mounted'
import s from './tweet-info-created-at.module.css'

export const TweetInfoCreatedAt: FC<{ tweet: Tweet }> = ({ tweet }) => {
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
