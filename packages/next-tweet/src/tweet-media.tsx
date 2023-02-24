import { FC } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import type { MediaAnimatedGif, Tweet } from './api'
import { getMediaUrl, getTweetUrl } from './utils'
import s from './tweet-media.module.css'
import { VideoPlayer } from './tweet-video'

type Props = {
  tweet: Tweet
  priority?: boolean
}

export type VideoProps = { 
  media: MediaAnimatedGif; 
  priority?: boolean 
}

export const TweetMedia: FC<Props> = ({ tweet, priority = false }) => {
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
        {tweet.mediaDetails?.map((media) => (
          <div key={media.media_url_https} className={s.mediaLink}>
            {media.type == 'photo' && (
              <a
                href={getTweetUrl(tweet)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={media.type === 'photo' ? 'Image' : 'Embedded Video'}
              >
                <Image
                  src={getMediaUrl(media, 'small')}
                  className={s.image}
                  alt={media.type === 'photo' ? 'Image' : 'Embedded Video'}
                  fill
                  draggable
                  unoptimized
                  priority={priority}
                />
              </a>
            )}
            {media.type !== 'photo' && <VideoPlayer media={media} priority />}
          </div>
        ))}
      </div>
    </div>
  )
}
