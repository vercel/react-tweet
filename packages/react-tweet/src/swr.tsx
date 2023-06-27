'use client'

import { type ReactNode } from 'react'
import {
  EmbeddedTweet,
  TweetNotFound,
  TweetSkeleton,
  type TwitterComponents,
} from './twitter-theme/components.js'
import { type TweetCoreProps } from './utils.js'
import { useTweet } from './hooks.js'

export type TweetProps = Omit<TweetCoreProps, 'id'> & {
  fallback?: ReactNode
  components?: TwitterComponents
} & (
    | {
        id: string
        apiUrl?: string
      }
    | {
        id?: string
        apiUrl: string | undefined
      }
  )

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
