import { useEffect, useMemo, useState } from 'react'
import swr from 'swr'
import {
  TwitterApiError,
  type MediaAnimatedGif,
  type MediaVideo,
  type Tweet,
} from './api'

// Avois an error when used in the pages directory where useSWR might be in `default`.
const useSWR = ((swr as any).default as typeof swr) || swr
const host = 'https://react-tweet.vercel.app'

async function fetcher(url: string) {
  const res = await fetch(url)
  const json = await res.json()

  if (res.ok) return json.data

  throw new TwitterApiError({
    message: `Failed to fetch tweet at "${url}" with "${res.status}".`,
    data: json,
    status: res.status,
  })
}

export const useTweet = (id?: string, apiUrl?: string) =>
  useSWR<Tweet>(apiUrl || (id && `${host}/api/tweet/${id}`), fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  })

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

export const useMounted = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return mounted
}
