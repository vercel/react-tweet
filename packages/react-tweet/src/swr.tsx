'use client'

import useSWR from 'swr'
import { Tweet as ITweet, TwitterApiError } from './api/index.js'
import type { TweetProps } from './tweet.js'
import { defaultComponents } from './components.js'
import { EmbeddedTweet } from './embedded-tweet.js'
import { TweetSkeleton } from './tweet-skeleton.js'

const host = 'https://react-tweet-next-app-git-v1-vercel-labs.vercel.app'

async function fetcher(url: string) {
  const res = await fetch(url)
  const json = await res.json()

  if (res.ok) return json.data

  throw new TwitterApiError({
    message: `Failed to fetch tweet at "${url}" with "${res.status}".`,
    data: json,
    status: res.status,
  })
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
    apiUrl || (id && `${host}/api/tweet/${id}`),
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  )

  if (isLoading) return fallback
  if (error || !data) {
    const TweetNotFound =
      components?.TweetNotFound || defaultComponents.TweetNotFound
    return <TweetNotFound error={onError ? onError(error) : error} />
  }

  return <EmbeddedTweet tweet={data} components={components} />
}
