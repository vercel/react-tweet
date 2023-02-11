import type { FC } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import type { Tweet } from './lib/twitter/api'
import { getMediaUrl, getTweetUrl } from './utils'
import s from './tweet-media.module.css'

export const TweetMedia: FC<{ tweet: Tweet }> = ({ tweet }) => {
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
          <a
            key={media.media_url_https}
            href={getTweetUrl(tweet)}
            className={s.mediaLink}
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
            />
            {media.type !== 'photo' && (
              <div
                className={s.videoButton}
                role="button"
                aria-label="View video on Twitter"
              >
                <svg
                  viewBox="0 0 24 24"
                  className={s.videoButtonIcon}
                  aria-hidden="true"
                >
                  <g>
                    <path d="M21 12L4 2v20l17-10z"></path>
                  </g>
                </svg>
              </div>
            )}
          </a>
        ))}
      </div>
    </div>
  )
}
