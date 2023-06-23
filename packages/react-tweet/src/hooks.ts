import { useMemo } from 'react'
import type { MediaAnimatedGif, MediaVideo, Tweet } from './api'

export const useMp4Video = (media: MediaAnimatedGif | MediaVideo) => {
  const { variants } = media.video_info
  const mp4Video = useMemo(() => {
    const sortedMp4Videos = variants
      .filter((vid) => vid.content_type === 'video/mp4')
      .sort((a, b) => (b.bitrate ?? 0) - (a.bitrate ?? 0))

    // Skip the highest quality video and use the next quality
    return sortedMp4Videos.length > 1 ? sortedMp4Videos[1] : sortedMp4Videos[0]
  }, [variants])

  return mp4Video
}
