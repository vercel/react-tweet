import { Suspense, type ReactNode } from 'react'
import { getTweet } from './api'
import { EmbeddedTweet } from './embedded-tweet'
import { TweetSkeleton } from './tweet-skeleton'

type TweetProps = {
  id: string
  priority?: boolean
}

type Props = TweetProps & {
  fallback?: ReactNode
}

const Tweet = async ({ id, priority = false }: TweetProps) => {
  const tweet = await getTweet(id)

  // TODO: a non existing tweet is currently an unhandled case, also when there's an error
  if (!tweet) return null

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
