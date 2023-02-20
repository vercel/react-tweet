import { FC, useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import type { MediaAnimatedGif, Tweet } from './api'
import { getMediaUrl, getTweetUrl } from './utils'
import s from './tweet-media.module.css'

type Props = {
  tweet: Tweet
  priority?: boolean
}

type VideoProps = { 
  media: MediaAnimatedGif; 
  priority?: boolean 
}

const VideoPlayer: FC<VideoProps> = ({
  media,
  priority,
}) => {
  const [displayVideo, setDisplayVideo] = useState(false)
  const sortedVideos = media.video_info.variants.sort((a, b) => {
    return (a.bitrate ?? 0) < (b.bitrate ?? 0) ? 1 : 0
  })
  if (displayVideo) {
    return (
      <div>
        <video
          className={s.image}
          controls
          autoPlay
          muted
          preload={priority ? 'auto' : 'metadata'}
        >
          {sortedVideos.map((variant) => (
            <source
              key={variant.url}
              src={variant.url}
              type={variant.content_type}
            />
          ))}
        </video>
      </div>
    )
  } else {
    return (
      <div
      onClick={() => {
        setDisplayVideo(true)
      }}
      >
        <Image
          src={getMediaUrl(media, 'small')}
          className={s.image}
          alt={'Embedded Video'}
          fill
          draggable
          unoptimized
          priority={priority}
        />
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
      </div>
    )
  }
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
