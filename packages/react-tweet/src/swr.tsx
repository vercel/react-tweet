'use client'

import type { TweetProps } from './tweet.js'
import {
  EmbeddedTweet,
  TweetNotFound,
  TweetSkeleton,
} from './twitter-theme/components.js'
import { useTweet } from './hooks.js'

export type { TweetProps }

export const Tweet = ({
  id,
  apiUrl,
  fallback = <TweetSkeleton />,
  components,
  onError,
}: TweetProps) => {
  const { data, error, isLoading } = useTweet(id, apiUrl)

  if (isLoading) return fallback
  if (error || !data) {
    const NotFound = components?.TweetNotFound || TweetNotFound
    return <NotFound error={onError ? onError(error) : error} />
  }

  return <EmbeddedTweet tweet={data} components={components} />
}
