import { EmbeddedTweet, TweetNotFound, TweetSkeleton } from 'next-tweet'
import { type Tweet } from 'next-tweet/api'
import useSWR from 'swr'

async function fetcher(url: string) {
  const res = await fetch(url)
  const json = await res.json()
  return json.data
}

export const IndexPage = () => {
  const tweetId = '1628832338187636740'
  const { data, error, isLoading } = useSWR<Tweet>(
    `/api/tweet/${tweetId}`,
    fetcher
  )

  if (isLoading) return <TweetSkeleton />
  if (error || !data) return <TweetNotFound error={error} />

  return <EmbeddedTweet tweet={data} />
}
