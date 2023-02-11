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
