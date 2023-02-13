import { Suspense, type ReactNode } from 'react'
import { getTweet } from './api'
import { EmbeddedTweet } from './embedded-tweet'
import { TweetSkeleton } from './tweet-skeleton'

type TweetProps = {
  id: string
}

type Props = TweetProps & {
  fallback?: ReactNode
}

const Tweet = async ({ id }: TweetProps) => {
  const tweet = await getTweet(id)

  // TODO: a non existing tweet is currently an unhandled case, also when there's an error
  if (!tweet) return null

  return <EmbeddedTweet tweet={tweet} />
}

export const NextTweet = async ({
  id,
  fallback = <TweetSkeleton />,
}: Props) => (
  <Suspense fallback={fallback}>
    {/* @ts-ignore: Async components are valid in the app directory */}
    <Tweet id={id} />
  </Suspense>
)
