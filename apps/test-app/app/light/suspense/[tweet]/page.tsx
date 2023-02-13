import { Suspense } from 'react'
import { TweetSkeleton } from 'next-tweet'
import TweetPage from './tweet-page'

export const revalidate = 60

export default async function Page({ params }: { params: { tweet: string } }) {
  // TODO: Figure out why Next.js sends this value at build time
  if (params.tweet === '%5Btweet%5D') return null
  return (
    <Suspense fallback={<TweetSkeleton />}>
      {/* @ts-ignore: Async components are valid in the app directory */}
      <TweetPage id={params.tweet} priority />
    </Suspense>
  )
}
