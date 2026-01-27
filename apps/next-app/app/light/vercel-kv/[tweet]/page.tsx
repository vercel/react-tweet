import { Suspense } from 'react'
import { TweetSkeleton } from 'react-tweet'
import TweetPage from './tweet-page'

type Props = {
  params: Promise<{ tweet: string }>
}

const Page = ({ params }: Props) => (
  <Suspense fallback={<TweetSkeleton />}>
    <TweetPage params={params} />
  </Suspense>
)

export default Page
