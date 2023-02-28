'use client'

import { FC, useState } from 'react'
import { MediaAnimatedGif } from './api'
import { getMediaUrl } from './utils'
import mediaStyles from './tweet-media.module.css'
import s from './tweet-media-video.module.css'

type Props = {
  media: MediaAnimatedGif
}

export const TweetMediaVideo: FC<Props> = ({ media }) => {
  const [playButton, setPlayButton] = useState(true)
  const sortedMp4Videos = media.video_info.variants
    .filter((vid) => vid.content_type === 'video/mp4')
    .sort((a, b) => (b.bitrate ?? 0) - (a.bitrate ?? 0))
  // Skip the highest quality video and use the next quality
  const mp4Video =
    sortedMp4Videos.length > 1 ? sortedMp4Videos[1] : sortedMp4Videos[0]

  return (
    <>
      <video
        className={mediaStyles.image}
        poster={getMediaUrl(media, 'small')}
        controls={!playButton}
        draggable
        muted
        preload="metadata"
      >
        <source src={mp4Video.url} type={mp4Video.content_type} />
      </video>

      {playButton && (
        <div
          className={s.videoButton}
          role="button"
          aria-label="View video on Twitter"
          onClick={(e) => {
            const video = e.currentTarget.previousSibling as HTMLMediaElement

            e.preventDefault()
            setPlayButton(false)
            video.play()
          }}
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
    </>
  )
}
