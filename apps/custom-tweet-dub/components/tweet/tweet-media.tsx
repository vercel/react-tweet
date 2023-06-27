import type { MediaDetails } from 'react-tweet/api'
import { type TweetData, getMediaUrl, getMp4Video } from 'react-tweet'
import BlurImage from './blur-image'

export const TweetMedia = ({
  tweet,
  media,
}: {
  tweet: TweetData
  media: MediaDetails
}) => {
  if (media.type == 'video') {
    return (
      <video
        className="rounded-lg border border-gray-200 drop-shadow-sm"
        loop
        width="2048px"
        height="2048px"
        autoPlay
        muted
        playsInline
      >
        <source src={getMp4Video(media).url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    )
  }

  if (media.type == 'animated_gif') {
    return (
      <BlurImage
        alt={tweet.text}
        width={2048}
        height={media.original_info.height * (2048 / media.original_info.width)}
        src={getMp4Video(media).url}
        className="rounded-lg border border-gray-200 drop-shadow-sm"
      />
    )
  }

  return (
    <BlurImage
      alt={tweet.text}
      width={2048}
      height={media.original_info.height * (2048 / media.original_info.width)}
      src={getMediaUrl(media, 'small')}
      className="rounded-lg border border-gray-200 drop-shadow-sm"
    />
  )
}
