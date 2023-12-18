import { fetchTweet } from './fetch-tweet.js'
import type { Tweet } from './types/index.js'

/**
 * Returns a tweet from the Twitter syndication API.
 */
export async function getTweet(
  id: string,
  fetchOptions?: RequestInit
): Promise<Tweet | undefined> {
  const { data, tombstone, notFound } = await fetchTweet(id, fetchOptions)

  if (notFound) {
    console.error(
      `The tweet ${id} does not exist or has been deleted by the account owner. Update your code to remove this tweet when possible.`
    )
  } else if (tombstone) {
    console.error(
      `The tweet ${id} has been made private by the account owner. Update your code to remove this tweet when possible.`
    )
  }

  return data
}
