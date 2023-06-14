import { Suspense, type ReactNode } from 'react'
import { getTweet } from './api/index.js'
import { type Locales, defaultLocales } from './locales.js'
import { defaultComponents, TweetComponents } from './components.js'
import { EmbeddedTweet } from './embedded-tweet.js'
import { TweetSkeleton } from './tweet-skeleton.js'

export type TweetProps = {
  fallback?: ReactNode
  components?: TweetComponents
  locales?: Locales
  onError?(error: any): any
} & (
  | { id?: string; apiUrl: string | undefined }
  | { id: string; apiUrl?: string }
)

type Props = Omit<TweetProps, 'fallback'>

const TweetContent = async ({ id, components, onError, locales = defaultLocales}: Props) => {
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
    return <TweetNotFound error={error} locales={locales.notFound} />
  }

  return <EmbeddedTweet tweet={tweet} components={components} locales={locales} />
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
