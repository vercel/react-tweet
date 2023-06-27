'use client'

import { useEffect, useState } from 'react'
import swr from 'swr'
import { TwitterApiError } from './api/index.js'
import { getTweetData } from './utils.js'

// Avois an error when used in the pages directory where useSWR might be in `default`.
const useSWR = ((swr as any).default as typeof swr) || swr
const host = 'https://react-tweet.vercel.app'

async function fetcher(url: string) {
  const res = await fetch(url)
  const json = await res.json()

  // We return null in case `json.data` is undefined, that way we can check for "loading" by
  // checking if data is `undefined`. `null` means it was fetched.
  if (res.ok) return json.data ? getTweetData(json.data) : null

  throw new TwitterApiError({
    message: `Failed to fetch tweet at "${url}" with "${res.status}".`,
    data: json,
    status: res.status,
  })
}

export const useTweet = (id?: string, apiUrl?: string) => {
  const { isLoading, data, error } = useSWR(
    apiUrl || (id && `${host}/api/tweet/${id}`),
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  )

  return {
    // If data is `undefined` then it might be the first render where SWR hasn't started doing
    // any work, so we set `isLoading` to `true`.
    isLoading: Boolean(isLoading || (data === undefined && !error)),
    data,
    error,
  }
}

export const useMounted = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return mounted
}
