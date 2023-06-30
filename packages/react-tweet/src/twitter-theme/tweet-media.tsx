import clsx from 'clsx'
import { type EnrichedTweet, getMediaUrl } from '../utils.js'
import type { TwitterComponents } from './types.js'
import { TweetMediaVideo } from './tweet-media-video.js'
import { MediaImg } from './media-img.js'
import s from './tweet-media.module.css'

type Props = {
  tweet: EnrichedTweet
  components?: TwitterComponents
}

export const TweetMedia = ({ tweet, components }: Props) => {
  const length = tweet.mediaDetails?.length ?? 0
  const Img = components?.MediaImg ?? MediaImg

  return (
    <div className={s.root}>
      <div className={s.skeleton} />
      <div
        className={clsx(
          s.mediaWrapper,
          length > 1 && s.grid2Columns,
          length === 3 && s.grid3,
          length > 4 && s.grid2x2
        )}
      >
        {tweet.mediaDetails?.map((media) =>
          media.type === 'photo' ? (
            <a
              key={media.media_url_https}
              href={tweet.url}
              className={clsx(s.mediaContainer, s.mediaLink)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Img
                src={getMediaUrl(media, 'small')}
                alt={media.ext_alt_text || 'Image'}
                className={s.image}
                draggable
              />
            </a>
          ) : (
            <div key={media.media_url_https} className={s.mediaContainer}>
              <TweetMediaVideo media={media} />
            </div>
          )
        )}
      </div>
    </div>
  )
}
