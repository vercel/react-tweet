'use client'

import { useState } from 'react'
import type { MediaAnimatedGif, MediaVideo } from './api/index.js'
import { getMediaUrl } from './utils.js'
import mediaStyles from './tweet-media.module.css'
import s from './tweet-media-video.module.css'
import { useMp4Video } from './hooks.js'

type Props = {
  media: MediaAnimatedGif | MediaVideo
}

export const TweetMediaVideo = ({ media }: Props) => {
  const [playButton, setPlayButton] = useState(true)
  const mp4Video = useMp4Video(media)

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
          aria-label="View video on Twitter"
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
