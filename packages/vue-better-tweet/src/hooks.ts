import { type MaybeRef, computed, onMounted, shallowRef } from 'vue'
import useSWR from 'swrv';
import { type Tweet, TwitterApiError } from 'react-tweet/api'

const host = 'https://react-tweet.vercel.app'

async function fetcher([url, fetchOptions]: [
  string,
  RequestInit
]): Promise<Tweet | null> {
  const res = await fetch(url, fetchOptions)
  const json = await res.json()

  // We return null in case `json.data` is undefined, that way we can check for "loading" by
  // checking if data is `undefined`. `null` means it was fetched.
  if (res.ok) return json.data || null

  throw new TwitterApiError({
    message: `Failed to fetch tweet at "${url}" with "${res.status}".`,
    data: json,
    status: res.status,
  })
}

/**
 * SWR hook for fetching a tweet in the browser.
 */
export const useTweet = (
  id?: MaybeRef<string | undefined>,
  apiUrl?: MaybeRef<string | undefined>,
  fetchOptions?: MaybeRef<RequestInit | undefined>
) => {
  const { isValidating, data, error } = useSWR(
    () =>
      apiUrl || id
        ? [apiUrl || (id && `${host}/api/tweet/${id}`), fetchOptions]
        : null,
    fetcher,
    {
      // Closest equivalent to `revalidateIfStale: false`:
      // consider cache “fresh” for a long time so remounts won’t refetch.
      // Pick a duration that matches your needs.
      ttl: 24 * 1000 * 60 * 60, // 24 hour
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  )

  const isLoadingWithFallback = computed(() => Boolean(isValidating.value || (data.value === undefined && !error.value)))

  return {
    isLoading: isLoadingWithFallback,
    data,
    error,
  }
}

export const useMounted = () => {
  const mounted = shallowRef(false)
  onMounted(() => {
    mounted.value = true
  })
  return mounted
}
