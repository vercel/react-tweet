import type {
  Tweet,
  MediaDetails,
  HashtagEntity,
  SymbolEntity,
  Indices,
  UserMentionEntity,
  UrlEntity,
  MediaEntity,
  MediaAnimatedGif,
  MediaVideo,
} from './api/index.js'

export type TweetCoreProps = {
  onError?(error: any): any
} & (
  | { id?: string; apiUrl: string | undefined }
  | { id: string; apiUrl?: string }
)

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

export const getSymbolUrl = (symbol: SymbolEntity) =>
  `https://twitter.com/search?q=%24${symbol.text}`

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

export const getMp4Videos = (media: MediaAnimatedGif | MediaVideo) => {
  const { variants } = media.video_info
  const sortedMp4Videos = variants
    .filter((vid) => vid.content_type === 'video/mp4')
    .sort((a, b) => (b.bitrate ?? 0) - (a.bitrate ?? 0))

  return sortedMp4Videos
}

export const getMp4Video = (media: MediaAnimatedGif | MediaVideo) => {
  const mp4Videos = getMp4Videos(media)
  // Skip the highest quality video and use the next quality
  return mp4Videos.length > 1 ? mp4Videos[1] : mp4Videos[0]
}

export const formatNumber = (n: number): string => {
  if (n > 999999) return `${(n / 1000000).toFixed(1)}M`
  if (n > 999) return `${(n / 1000).toFixed(1)}K`
  return n.toString()
}

type TextEntity = {
  indices: Indices
  type: 'text'
}

type Entity =
  | TextEntity
  | (HashtagEntity & { type: 'hashtag' })
  | (UserMentionEntity & { type: 'mention' })
  | (UrlEntity & { type: 'url' })
  | (MediaEntity & { type: 'media' })
  | (SymbolEntity & { type: 'symbol' })

export function getEntities(tweet: Tweet): Entity[] {
  const result: Entity[] = [{ indices: tweet.display_text_range, type: 'text' }]

  addEntities(result, tweet.entities.hashtags, 'hashtag')
  addEntities(result, tweet.entities.user_mentions, 'mention')
  addEntities(result, tweet.entities.urls, 'url')
  addEntities(result, tweet.entities.symbols, 'symbol')
  if (tweet.entities.media) {
    addEntities(result, tweet.entities.media, 'media')
  }
  fixRange(tweet, result)

  return result
}

function addEntities(
  result: Entity[],
  entities: (HashtagEntity | UserMentionEntity | MediaEntity | SymbolEntity)[],
  type: Entity['type']
) {
  for (const entity of entities) {
    for (const [i, item] of result.entries()) {
      if (
        entity.indices[0] < item.indices[0] ||
        entity.indices[1] > item.indices[1]
      ) {
        continue
      }

      const items = [{ ...entity, type }] as Entity[]

      if (item.indices[0] < entity.indices[0]) {
        items.unshift({
          indices: [item.indices[0], entity.indices[0]],
          type: 'text',
        })
      }
      if (item.indices[1] > entity.indices[1]) {
        items.push({
          indices: [entity.indices[1], item.indices[1]],
          type: 'text',
        })
      }

      result.splice(i, 1, ...items)
      break // Break out of the loop to avoid iterating over the new items
    }
  }
}

/**
 * Update display_text_range to work w/ Array.from
 * Array.from is unicode aware, unlike string.slice()
 */
function fixRange(tweet: Tweet, entities: Entity[]) {
  if (
    tweet.entities.media &&
    tweet.entities.media[0].indices[0] < tweet.display_text_range[1]
  ) {
    tweet.display_text_range[1] = tweet.entities.media[0].indices[0]
  }
  const lastEntity = entities.at(-1)
  if (lastEntity && lastEntity.indices[1] > tweet.display_text_range[1]) {
    lastEntity.indices[1] = tweet.display_text_range[1]
  }
}

export const getEntityText = (tweet: Tweet, entity: Entity) =>
  Array.from(tweet.text)
    .splice(entity.indices[0], entity.indices[1] - entity.indices[0])
    .join('')
