import { Suspense, type ReactNode } from 'react'
import { getTweet } from './api/index.js'
import { defaultComponents, TweetComponents } from './components.js'
import { EmbeddedTweet } from './embedded-tweet.js'
import { TweetSkeleton } from './tweet-skeleton.js'
import type { TweetCoreProps } from './utils.js'

export type TweetProps = TweetCoreProps & {
  fallback?: ReactNode
  components?: TweetComponents
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
    const TweetNotFound =
      components?.TweetNotFound || defaultComponents.TweetNotFound
    return <TweetNotFound error={error} />
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
