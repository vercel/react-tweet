import { notFound } from 'next/navigation'
import { getTweet } from 'next-tweet/api'
import { EmbeddedTweet } from 'next-tweet'

const TweetPage = async ({ id }: { id: string }) => {
  const tweet = await getTweet(id)
  if (!tweet) notFound()

  return <EmbeddedTweet tweet={tweet} />
}

export default TweetPage
