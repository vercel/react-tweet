import { getTweet as _getTweet } from 'react-tweet/api'
import { EmbeddedTweet, TweetNotFound } from 'react-tweet'
import { unstable_cache } from 'next/cache'

const getTweet = unstable_cache(
  async (id: string) => _getTweet(id),
  ['tweet'],
  { revalidate: 3600 * 24 }
)

const TweetPage = async ({ id }: { id: string }) => {
  try {
    const tweet = await getTweet(id)
    return tweet ? <EmbeddedTweet tweet={tweet} /> : <TweetNotFound />
  } catch (error) {
    console.error(error)
    return <TweetNotFound error={error} />
  }
}

export default TweetPage
