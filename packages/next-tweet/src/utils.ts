import type { Tweet, MediaDetails, HashtagEntity } from './lib/twitter/api'

export const getUserUrl = (usernameOrTweet: string | Tweet) =>
  `https://twitter.com/${
    typeof usernameOrTweet === 'string'
      ? usernameOrTweet
      : usernameOrTweet.user.screen_name
  }`

export const getTweetUrl = (tweet: Tweet) =>
  `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`

export const getLikeUrl = (tweet: Tweet) =>
  `https://twitter.com/intent/like?tweet_id=${tweet.id_str}`

export const getReplyUrl = (tweet: Tweet) =>
  `https://twitter.com/intent/tweet?in_reply_to=${tweet.id_str}`

export const getFollowUrl = (tweet: Tweet) =>
  `https://twitter.com/intent/follow?screen_name=${tweet.user.screen_name}`

export const getHashtagUrl = (hashtag: HashtagEntity) =>
  `https://twitter.com/hashtag/${hashtag.text}`

export const getInReplyToUrl = (tweet: Tweet) =>
  `https://twitter.com/${tweet.in_reply_to_screen_name}/status/${tweet.in_reply_to_status_id_str}`

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
