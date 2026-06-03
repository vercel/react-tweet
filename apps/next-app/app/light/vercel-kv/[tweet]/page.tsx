import { Suspense } from 'react'
import { TweetSkeleton } from 'react-tweet'
import TweetPage from './tweet-page'

export const revalidate = 86400

const Page = async ({ params }: { params: Promise<{ tweet: string }> }) => {
  const { tweet } = await params
  return (
    <Suspense fallback={<TweetSkeleton />}>
      <TweetPage id={tweet} />
    </Suspense>
  )
}

export default Page
