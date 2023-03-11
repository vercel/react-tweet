import { Suspense } from 'react'
import { TweetSkeleton } from 'next-tweet'
import TweetPage from './tweet-page'

export const revalidate = 3600

const Page = ({ params }: { params: { tweet: string } }) => (
  <Suspense fallback={<TweetSkeleton />}>
    {/* @ts-ignore: Async components are valid in the app directory */}
    <TweetPage id={params.tweet} priority />
  </Suspense>
)

export default Page
