import { Suspense } from 'react'
import { TweetSkeleton } from 'react-tweet'
import TweetPage from './tweet-page'

export const revalidate = 3600

const Page = ({ params }: { params: { tweet: string } }) => (
  <Suspense fallback={<TweetSkeleton />}>
    <TweetPage id={params.tweet} />
  </Suspense>
)

export default Page
