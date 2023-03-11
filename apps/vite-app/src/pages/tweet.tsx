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
    // This endpoint does not run locally with vite. It will work on Vercel.
    // If you want to see the tweet locally uncomment the next line:
    // `https://react-tweet-next-app-git-v1-vercel-labs.vercel.app/api/tweet/${params.id}`,
    `/api/tweet/${params.id}`,
    fetcher
  )

  if (isLoading) return <TweetSkeleton />
  if (error || !data) return <TweetNotFound error={error} />

  return <EmbeddedTweet tweet={data} />
}
