import clsx from 'clsx'
import type { Tweet } from '../api/index.js'
import { getMediaUrl, getTweetUrl } from '../utils.js'
import {
  type TwitterComponents,
  defaultComponents,
} from './default-components.js'
import { TweetMediaVideo } from './tweet-media-video.js'
import s from './tweet-media.module.css'

type Props = {
  tweet: Tweet
  components?: TwitterComponents
}

export const TweetMedia = ({ tweet, components }: Props) => {
  const length = tweet.mediaDetails?.length ?? 0
  const MediaImg = components?.MediaImg ?? defaultComponents.MediaImg

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
              href={getTweetUrl(tweet)}
              className={clsx(s.mediaContainer, s.mediaLink)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MediaImg
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
