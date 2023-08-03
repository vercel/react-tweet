import { Fragment } from 'react'
import clsx from 'clsx'
import { type EnrichedQuotedTweet, getMediaUrl } from '../utils.js'
import { MediaDetails } from '../api/index.js'
import { TweetMediaVideo } from './tweet-media-video.js'
import { MediaImg } from './media-img.js'
import s from './tweet-quoted-tweet-media.module.css'

const getSkeletonStyle = (media: MediaDetails, itemCount: number) => {
  let paddingBottom = 100 // default of 1x1

  // if we have 2 items, use 8x9
  if (itemCount === 2) paddingBottom = 112.5

  return {
    width: media.type === 'photo' ? undefined : 'unset',
    paddingBottom: `${paddingBottom}%`,
  }
}

type Props = {
  tweet: EnrichedQuotedTweet
}

export const TweetQuotedTweetMedia = ({ tweet }: Props) => {
  const length = tweet.mediaDetails?.length ?? 0

  return (
    <div className={s.root}>
      <div
        className={clsx(
          s.mediaWrapper,
          length > 1 && s.grid2Columns,
          length === 3 && s.grid3,
          length > 4 && s.grid2x2
        )}
      >
        {tweet.mediaDetails?.map((media) => (
          <Fragment key={media.media_url_https}>
            {media.type === 'photo' ? (
              <div key={media.media_url_https} className={s.mediaContainer}>
                <div
                  className={s.skeleton}
                  style={getSkeletonStyle(media, length)}
                />
                <MediaImg
                  src={getMediaUrl(media, 'small')}
                  alt={media.ext_alt_text || 'Image'}
                  className={s.image}
                  draggable
                />
              </div>
            ) : (
              <div key={media.media_url_https} className={s.mediaContainer}>
                <div
                  className={s.skeleton}
                  style={getSkeletonStyle(media, length)}
                />
                <TweetMediaVideo tweet={tweet} media={media} />
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  )
}
