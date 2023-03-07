import Image from 'next/image'
import clsx from 'clsx'
import type { Tweet } from './api'
import { getMediaUrl, getTweetUrl } from './utils'
import s from './tweet-media.module.css'
import { TweetMediaVideo } from './tweet-media-video'

type Props = {
  tweet: Tweet
  priority?: boolean
}

export const TweetMedia = ({ tweet, priority = false }: Props) => {
  const length = tweet.mediaDetails?.length ?? 0

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
              {/* <Image
                src={getMediaUrl(media, 'small')}
                className={s.image}
                alt={media.ext_alt_text || 'Image'}
                fill
                draggable
                unoptimized
                priority={priority}
              /> */}
              <img
                src={getMediaUrl(media, 'small')}
                className={s.image}
                alt={media.ext_alt_text || 'Image'}
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
