'use client'

import type { Tweet } from './api/index.js'
import type { Locales } from './locales.js'
import { getTweetUrl } from './utils.js'
import useMounted from './lib/use-mounted.js'
import s from './tweet-info-created-at.module.css'

type Props = {
  tweet: Tweet
  locales: Locales['tweet']['info']['createdAt']
}

export const TweetInfoCreatedAt = ({ tweet, locales }: Props) => {
  const mounted = useMounted()
  const createdAt =
    typeof window !== 'undefined' && mounted ? new Date(tweet.created_at) : null

  return !createdAt ? null : (
    <a
      className={s.root}
      href={getTweetUrl(tweet)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={locales.ariaLabel(createdAt)}
    >
      <time dateTime={createdAt.toISOString()}>
        {locales.text(createdAt)}
      </time>
    </a>
  )
}
