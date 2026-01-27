import { cacheLife } from 'next/cache'
import { getTweet } from 'react-tweet/api'
import { EmbeddedTweet, TweetNotFound } from 'react-tweet'

type Props = {
  params: Promise<{ tweet: string }>
}

const TweetPage = async ({ params }: Props) => {
  'use cache'
  cacheLife('days')

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
