import { Suspense } from 'react'
import { type TweetCoreProps, enrichTweet } from 'react-tweet'
import { getTweet } from 'react-tweet/api'
import { DubTweet } from './dub-tweet'

type Props = TweetCoreProps & {
  noTilt?: boolean
}

export const TweetContent = async ({ id, noTilt, onError }: Props) => {
  const tweet = id
    ? await getTweet(id).catch((err) => {
        if (onError) {
          onError(err)
        } else {
          console.error(err)
        }
      })
    : undefined

  if (!tweet) {
    return (
      <div className="prose flex h-[20rem] break-inside-avoid items-center rounded-lg border border-gray-300 bg-white/20 bg-clip-padding p-6 pb-4 text-center text-sm backdrop-blur-lg backdrop-filter">
        <p>There was an error loading this tweet.</p>
      </div>
    )
  }

  return <DubTweet tweet={enrichTweet(tweet)} noTilt={noTilt} />
}

export const Tweet = (props: Props) => (
  <Suspense>
    <TweetContent {...props} />
  </Suspense>
)
