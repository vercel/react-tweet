import { Suspense, type ReactNode } from 'react'
import { getTweet } from './api/index.js'
import {
  EmbeddedTweet,
  TweetNotFound,
  TweetSkeleton,
  type TwitterComponents,
} from './twitter-theme/components.js'
import type { TweetCoreProps } from './utils.js'

export type TweetProps = TweetCoreProps & {
  fallback?: ReactNode
  components?: TwitterComponents
}

export type TweetContentProps = Omit<TweetProps, 'fallback'>

export const TweetContent = async ({
  id,
  components,
  onError,
}: TweetContentProps) => {
  let error
  const tweet = id
    ? await getTweet(id).catch((err) => {
        if (onError) {
          error = onError(err)
        } else {
          console.error(err)
          error = err
        }
      })
    : undefined

  if (!tweet) {
    const NotFound = components?.TweetNotFound || TweetNotFound
    return <NotFound error={error} />
  }

  return <EmbeddedTweet tweet={tweet} components={components} />
}

export const Tweet = ({
  fallback = <TweetSkeleton />,
  ...props
}: TweetProps) => (
  <Suspense fallback={fallback}>
    {/* @ts-ignore: Async components are valid in the app directory */}
    <TweetContent {...props} />
  </Suspense>
)
