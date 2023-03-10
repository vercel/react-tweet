'use client'

import useSWR from 'swr'
import { Tweet as ITweet } from './api/index.js'
import type { TweetProps } from './tweet.js'
import { defaultComponents } from './components.js'
import { EmbeddedTweet } from './embedded-tweet.js'
import { TweetSkeleton } from './tweet-skeleton.js'

const host = 'http://react-tweet-next-app-git-v1-vercel-labs.vercel.app'

async function fetcher(url: string) {
  const res = await fetch(url)
  const json = await res.json()
  return json.data
}

export type { TweetProps }

export const Tweet = ({
  id,
  apiUrl,
  fallback = <TweetSkeleton />,
  components,
  onError,
}: TweetProps) => {
  const { data, error, isLoading } = useSWR<ITweet>(
    apiUrl || `${host}/api/tweet/${id}`,
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
