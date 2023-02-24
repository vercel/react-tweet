'use client';

import { FC, useState } from 'react';
import Image from 'next/image';
import { getMediaUrl } from './utils';
import s from './tweet-media.module.css';
import { VideoProps } from './tweet-media';

export const VideoPlayer: FC<VideoProps> = ({
  media, priority,
}) => {
  const [displayVideo, setDisplayVideo] = useState(false);
  const sortedVideos = media.video_info.variants.sort((a, b) => {
    return (a.bitrate ?? 0) < (b.bitrate ?? 0) ? 1 : 0;
  });
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
              type={variant.content_type} />
          ))}
        </video>
      </div>
    );
  } else {
    return (
      <div
        onClick={() => {
          setDisplayVideo(true);
        }}
      >
        <Image
          src={getMediaUrl(media, 'small')}
          className={s.image}
          alt={'Embedded Video'}
          fill
          draggable
          unoptimized
          priority={priority} />
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
    );
  }
};
