import { Suspense, type ReactNode } from 'react'
import { getTweet } from './api'
import { EmbeddedTweet } from './embedded-tweet'
import { TweetSkeleton } from './tweet-skeleton'

type TweetProps = {
  id: string
  priority?: boolean
  notFoundOnError?: boolean
}

type Props = TweetProps & {
  fallback?: ReactNode
}

const Tweet = async ({ id, priority = false, notFoundOnError }: TweetProps) => {
  const tweet = await getTweet(id).catch((error) => {
    if (notFoundOnError) {
      console.error(error)
      return undefined
    }
    throw error
  })
  return <EmbeddedTweet tweet={tweet} priority={priority} />
}

export const NextTweet = async ({
  fallback = <TweetSkeleton />,
  ...props
}: Props) => (
  <Suspense fallback={fallback}>
    {/* @ts-ignore: Async components are valid in the app directory */}
    <Tweet {...props} />
  </Suspense>
)
