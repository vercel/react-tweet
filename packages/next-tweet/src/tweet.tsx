import { Suspense, type ReactNode } from 'react'
import { getTweet } from './api/index.js'
import { TweetComponents } from './components.js'
import { EmbeddedTweet } from './embedded-tweet.js'
import { TweetSkeleton } from './tweet-skeleton.js'

type TweetProps = {
  id: string
  components?: TweetComponents
  priority?: boolean
  notFoundOnError?: boolean
}

type Props = TweetProps & {
  fallback?: ReactNode
}

const Tweet = async ({
  id,
  components,
  priority = false,
  notFoundOnError,
}: TweetProps) => {
  const tweet = await getTweet(id).catch((error) => {
    if (notFoundOnError) {
      console.error(error)
      return undefined
    }
    throw error
  })
  return (
    <EmbeddedTweet tweet={tweet} components={components} priority={priority} />
  )
}

export const NextTweet = ({
  fallback = <TweetSkeleton />,
  ...props
}: Props) => (
  <Suspense fallback={fallback}>
    {/* @ts-ignore: Async components are valid in the app directory */}
    <Tweet {...props} />
  </Suspense>
)
