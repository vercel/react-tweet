import { useParams } from 'react-router-dom'
import { EmbeddedTweet, TweetNotFound, TweetSkeleton } from 'next-tweet'
import { type Tweet } from 'next-tweet/api'
import useSWR from 'swr'

async function fetcher(url: string) {
  const res = await fetch(url)
  const json = await res.json()
  return json.data
}

export const TweetPage = () => {
  const params = useParams()
  const { data, error, isLoading } = useSWR<Tweet>(
    `/api/tweet/${params.id}`,
    fetcher
  )

  if (isLoading) return <TweetSkeleton />
  if (error || !data) return <TweetNotFound error={error} />

  return <EmbeddedTweet tweet={data} />
}
