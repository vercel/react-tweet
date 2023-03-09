'use client'

import { type ReactNode } from 'react'
import useSWR from 'swr'
import { Tweet as ITweet } from './api/index.js'
import { TweetComponents } from './components.js'
import { EmbeddedTweet } from './embedded-tweet.js'
import { TweetSkeleton } from './tweet-skeleton.js'
import { TweetNotFound } from './tweet-not-found.js'

type TweetProps = {
  components?: TweetComponents
  notFoundOnError?: boolean
} & (
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
  notFoundOnError,
  components,
}: Props) => {
  const { data, error, isLoading } = useSWR<ITweet>(
    apiUrl || `/api/tweet/${id}`,
    fetcher
  )

  if (isLoading) return fallback
  if (error && !notFoundOnError) {
    throw error
  }
  if (!data) return <TweetNotFound />

  return <EmbeddedTweet tweet={data} components={components} />
}
