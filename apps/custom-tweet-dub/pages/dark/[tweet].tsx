import { useRouter } from 'next/router'
import { getTweet, type Tweet } from 'react-tweet/api'
import { EmbeddedTweet, TweetSkeleton } from 'react-tweet'
import { TweetPage } from '../../components/tweet-page'

export async function getStaticProps({
  params,
}: {
  params: { tweet: string }
}) {
  try {
    const tweet = await getTweet(params.tweet)
    return tweet ? { props: { tweet } } : { notFound: true }
  } catch (error) {
    console.error(error)
    return { notFound: true }
  }
}

export async function getStaticPaths() {
  return { paths: [], fallback: true }
}

export default function Page({ tweet }: { tweet: Tweet }) {
  const { isFallback } = useRouter()

  return (
    <TweetPage footer>
      {isFallback ? <TweetSkeleton /> : <EmbeddedTweet tweet={tweet} />}
    </TweetPage>
  )
}
