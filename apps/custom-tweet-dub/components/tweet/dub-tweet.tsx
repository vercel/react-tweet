import { type EnrichedTweet } from 'react-tweet'
import { nFormatter } from './utils'
import { Heart, Message } from './icons'
import { Tilt } from './tilt'
import { TweetHeader } from './tweet-header'
import { TweetText } from './tweet-text'
import { TweetMedia } from './tweet-media'

export const DubTweet = ({
  tweet,
  noTilt,
}: {
  tweet: EnrichedTweet
  noTilt?: boolean
}) => {
  const TweetBody = (
    <div className="break-inside-avoid rounded-lg border border-gray-300 bg-white/20 bg-clip-padding p-6 pb-4 backdrop-blur-lg backdrop-filter">
      {/* User info, verified badge, twitter logo, text, etc. */}
      <div>
        <TweetHeader tweet={tweet} />
        {tweet.in_reply_to_status_id_str && tweet.in_reply_to_screen_name && (
          <div className="mt-5 text-base text-gray-500">
            Replying to{' '}
            <a
              className="text-[#1da1f2] no-underline"
              href={tweet.in_reply_to_url}
              target="_blank"
            >
              @{tweet.in_reply_to_screen_name}
            </a>
          </div>
        )}
        <TweetText tweet={tweet} />
      </div>
      {/* Images, Preview images, videos, polls, etc. */}
      <div className="-mb-2 mt-3">
        {tweet.mediaDetails?.length ? (
          <div
            className={
              tweet.mediaDetails.length === 1
                ? ''
                : 'inline-grid grid-cols-2 gap-x-2 gap-y-2'
            }
          >
            {tweet.mediaDetails?.map((media) => (
              <a key={media.media_url_https} href={tweet.url} target="_blank">
                <TweetMedia tweet={tweet} media={media} />
              </a>
            ))}
          </div>
        ) : null}
      </div>
      <div className="flex justify-center space-x-8 text-sm text-gray-500 mt-5">
        <a
          className="group flex items-center space-x-3 hover:text-red-600"
          href={tweet.like_url}
          target="_blank"
          rel="noreferrer"
        >
          <Heart className="h-4 w-4 group-hover:fill-red-600" />
          <p>{nFormatter(tweet.favorite_count)}</p>
        </a>
        <a
          className="group flex items-center space-x-3 hover:text-blue-600"
          href={tweet.reply_url}
          target="_blank"
          rel="noreferrer"
        >
          <Message className="h-4 w-4 group-hover:fill-blue-600" />
          <p>{nFormatter(tweet.conversation_count)}</p>
        </a>
      </div>
    </div>
  )

  return noTilt ? (
    TweetBody
  ) : (
    <Tilt
      glareEnable={true}
      glareMaxOpacity={0.3}
      glareColor="#ffffff"
      glarePosition="all"
      glareBorderRadius="8px"
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
    >
      {TweetBody}
    </Tilt>
  )
}
