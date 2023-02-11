import type { Tweet, MediaDetails } from './api'

export const getTweetUrl = (tweet: Tweet) =>
  `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`

export const getMediaUrl = (
  media: MediaDetails,
  size: 'small' | 'medium' | 'larget'
): string => {
  const url = new URL(media.media_url_https)
  const extension = url.pathname.split('.').pop()

  if (!extension) return media.media_url_https

  url.pathname = url.pathname.replace(`.${extension}`, '')
  url.searchParams.set('format', extension)
  url.searchParams.set('name', size)

  return url.toString()
}
