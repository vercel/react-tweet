'use client'

import { type ReactNode } from 'react'
import useSWR from 'swr'
import { Tweet as ITweet } from './api/index.js'
import type { TweetConfig } from './tweet.js'
import { defaultComponents } from './components.js'
import { EmbeddedTweet } from './embedded-tweet.js'
import { TweetSkeleton } from './tweet-skeleton.js'

type TweetProps = TweetConfig &
  (
    | {
        id: string
        apiUrl?: never
      }
    | {
        id?: never
        apiUrl: string
      }
  )

type Props = TweetProps & {
  fallback?: ReactNode
}

async function fetcher(url: string) {
  const res = await fetch(url)
  const json = await res.json()
  return json.data
}

export const SWRTweet = ({
  id,
  apiUrl,
  fallback = <TweetSkeleton />,
  components,
  onError,
}: Props) => {
  const { data, error, isLoading } = useSWR<ITweet>(
    apiUrl || `/api/tweet/${id}`,
    fetcher
  )

  if (isLoading) return fallback
  if (error || !data) {
    const TweetNotFound =
      components?.TweetNotFound || defaultComponents.TweetNotFound
    return <TweetNotFound error={onError ? onError(error) : error} />
  }

  return <EmbeddedTweet tweet={data} components={components} />
}
