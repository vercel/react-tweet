'use client'

import { useState, useMemo } from 'react'
import type { MediaAnimatedGif, MediaVideo } from './api/index.js'
import type { Locales } from './locales.js'
import { getMediaUrl } from './utils.js'
import mediaStyles from './tweet-media.module.css'
import s from './tweet-media-video.module.css'

type Props = {
  media: MediaAnimatedGif | MediaVideo
  locales: Locales['tweet']['media']['video']
}

export const TweetMediaVideo = ({ media, locales }: Props) => {
  const [playButton, setPlayButton] = useState(true)
  const { variants } = media.video_info
  const mp4Video = useMemo(() => {
    const sortedMp4Videos = variants
      .filter((vid) => vid.content_type === 'video/mp4')
      .sort((a, b) => (b.bitrate ?? 0) - (a.bitrate ?? 0))

    // Skip the highest quality video and use the next quality
    return sortedMp4Videos.length > 1 ? sortedMp4Videos[1] : sortedMp4Videos[0]
  }, [variants])

  return (
    <>
      <video
        className={mediaStyles.image}
        poster={getMediaUrl(media, 'small')}
        controls={!playButton}
        draggable
        muted
        preload="metadata"
        tabIndex={playButton ? -1 : 0}
      >
        <source src={mp4Video.url} type={mp4Video.content_type} />
      </video>

      {playButton && (
        <button
          type="button"
          className={s.videoButton}
          aria-label={locales.play.ariaLabel}
          onClick={(e) => {
            const video = e.currentTarget.previousSibling as HTMLMediaElement

            e.preventDefault()
            setPlayButton(false)
            video.play()
            video.focus()
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
        </button>
      )}
    </>
  )
}
