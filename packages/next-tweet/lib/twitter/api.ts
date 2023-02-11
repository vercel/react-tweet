const SYNDICATION_URL = 'https://cdn.syndication.twimg.com'

export type Indices = [number, number]

export interface HashtagEntity {
  indices: Indices
  text: string
}

export interface UserMentionEntity {
  id_str: string
  indices: Indices
  name: string
  screen_name: string
}

export interface MediaEntity {
  display_url: string
  expanded_url: string
  indices: Indices
  url: string
}

export interface UrlEntity {
  display_url: string
  expanded_url: string
  indices: Indices
  url: string
}

export interface TweetEntities {
  hashtags: HashtagEntity[]
  urls: UrlEntity[]
  user_mentions: UserMentionEntity[]
  symbols: { text: string }[]
  media?: MediaEntity[]
}

export interface TweetUser {
  id_str: string
  name: string
  profile_image_url_https: string
  screen_name: string
  verified: boolean
  verified_type: string
  is_blue_verified: boolean
}

export interface TweetEditControl {
  edit_tweet_ids: string[]
  editable_until_msecs: string
  is_edit_eligible: boolean
  edits_remaining: string
}

interface TweetBase {
  lang: string
  created_at: string
  display_text_range: Indices
  entities: TweetEntities
  id_str: string
  text: string
  user: TweetUser
  edit_control: TweetEditControl
  isEdited: boolean
  isStaleEdit: boolean
}

interface QuotedTweet extends TweetBase {
  reply_count: number
  retweet_count: number
  favorite_count: number
  self_thread: {
    id_str: string
  }
}

interface TweetParent extends TweetBase {
  reply_count: number
  retweet_count: number
  favorite_count: number
}

type RGB = {
  red: number
  green: number
  blue: number
}

type Rect = {
  x: number
  y: number
  w: number
  h: number
}

type Size = {
  h: number
  w: number
  resize: string
}

export interface TweetPhoto {
  backgroundColor: RGB
  cropCandidates: Rect[]
  expandedUrl: string
  url: string
  width: number
  height: number
}

export interface TweetVideo {
  aspectRatio: [number, number]
  contentType: string
  durationMs: number
  mediaAvailability: {
    status: string
  }
  poster: string
  variants: {
    type: string
    src: string
  }[]
  videoId: {
    type: string
    id: string
  }
  viewCount: number
}

interface MediaBase {
  display_url: string
  expanded_url: string
  ext_media_availability: {
    status: string
  }
  ext_media_color: {
    palette: {
      percentage: number
      rgb: RGB
    }[]
  }
  indices: Indices
  media_url_https: string
  original_info: {
    height: number
    width: number
    focus_rects: Rect[]
  }
  sizes: {
    large: Size
    medium: Size
    small: Size
    thumb: Size
  }
  url: string
}

interface MediaPhoto extends MediaBase {
  type: 'photo'
}

interface MediaAnimatedGif extends MediaBase {
  type: 'animated_gif'
  video_info: {
    aspect_ratio: [number, number]
    variants: {
      bitrate?: number
      content_type: string
      url: string
    }[]
  }
}

export type MediaDetails = MediaPhoto | MediaAnimatedGif

export interface Tweet extends TweetBase {
  __typename: 'Tweet'
  favorite_count: number
  mediaDetails?: MediaDetails[]
  photos?: TweetPhoto[]
  video?: TweetVideo
  conversation_count: number
  news_action_type: 'conversation'
  quoted_tweet?: QuotedTweet
  in_reply_to_screen_name?: string
  in_reply_to_status_id_str?: string
  in_reply_to_user_id_str?: string
  parent?: TweetParent
  possibly_sensitive?: boolean
}

export async function fetchTweet(id: string): Promise<Tweet | undefined> {
  const url = new URL(`${SYNDICATION_URL}/tweet-result`)

  url.searchParams.set('id', id)
  url.searchParams.set('lang', 'en')
  url.searchParams.set(
    'features',
    [
      'tfw_timeline_list:',
      'tfw_follower_count_sunset:true',
      'tfw_tweet_edit_backend:on',
      'tfw_refsrc_session:on',
      'tfw_show_business_verified_badge:on',
      'tfw_duplicate_scribes_to_settings:on',
      'tfw_show_blue_verified_badge:on',
      'tfw_legacy_timeline_sunset:true',
      'tfw_show_gov_verified_badge:on',
      'tfw_show_business_affiliate_badge:on',
      'tfw_tweet_edit_frontend:on',
    ].join(';')
  )

  const res = await fetch(url)

  console.log(
    'LOG',
    url.toString(),
    res.status,
    Object.fromEntries(res.headers.entries())
  )

  if (res.ok) return res.json()
  if (res.status === 404) {
    console.log('JSON', await res.json())
    return
  }

  throw new Error(
    `Fetch for the embedded tweets of "${id}" failed with code: ${res.status}`
  )
}

export async function getEmbeddedTweetHtml(url: string) {
  const res = await fetch(`https://publish.twitter.com/oembed?url=${url}`)

  if (res.ok) return res.json()
  if (res.status === 404) return

  throw new Error(`Fetch for embedded tweet failed with code: ${res.status}`)
}
