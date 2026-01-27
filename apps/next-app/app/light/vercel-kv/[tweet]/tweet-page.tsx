import { fetchTweet, Tweet } from 'react-tweet/api'
import { EmbeddedTweet, TweetNotFound } from 'react-tweet'
import { kv } from '@vercel/kv'

type Props = {
  params: Promise<{ tweet: string }>
}

async function getTweet(
  id: string,
  fetchOptions?: RequestInit
): Promise<Tweet | undefined> {
  try {
    const { data, tombstone, notFound } = await fetchTweet(id, fetchOptions)

    if (data) {
      await kv.set(`tweet:${id}`, data)
      return data
    } else if (tombstone || notFound) {
      // remove the tweet from the cache if it has been made private by the author (tombstone)
      // or if it no longer exists.
      await kv.del(`tweet:${id}`)
    }
  } catch (error) {
    console.error('fetching the tweet failed with:', error)
  }

  const cachedTweet = await kv.get<Tweet>(`tweet:${id}`)
  return cachedTweet ?? undefined
}

const TweetPage = async ({ params }: Props) => {
  const { tweet: id } = await params

  try {
    const tweet = await getTweet(id)
    return tweet ? <EmbeddedTweet tweet={tweet} /> : <TweetNotFound />
  } catch (error) {
    console.error(error)
    return <TweetNotFound error={error} />
  }
}

export default TweetPage
