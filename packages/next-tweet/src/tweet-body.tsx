import type { FC } from 'react'
import type {
  Indices,
  Tweet,
  HashtagEntity,
  UserMentionEntity,
  UrlEntity,
  MediaEntity,
} from './lib/twitter/api'
import { getHashtagUrl, getUserUrl } from './utils'
import { TweetLink } from './tweet-link'
import s from './tweet-body.module.css'

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

function addEntities(
  result: Entity[],
  entities: (HashtagEntity | UserMentionEntity | MediaEntity)[],
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

function getEntities(tweet: Tweet) {
  const result: Entity[] = [{ indices: tweet.display_text_range, type: 'text' }]

  addEntities(result, tweet.entities.hashtags, 'hashtag')
  addEntities(result, tweet.entities.user_mentions, 'mention')
  addEntities(result, tweet.entities.urls, 'url')
  if (tweet.entities.media) {
    addEntities(result, tweet.entities.media, 'media')
  }

  return result
}

export const TweetBody: FC<{ tweet: Tweet }> = ({ tweet }) => {
  const entities = getEntities(tweet)

  return (
    <p className={s.root}>
      {entities.map((item, i) => {
        const text = tweet.text.slice(...item.indices)

        switch (item.type) {
          case 'hashtag':
            return (
              <TweetLink key={i} href={getHashtagUrl(item)}>
                {text}
              </TweetLink>
            )
          case 'mention':
            return (
              <TweetLink key={i} href={getUserUrl(item.screen_name)}>
                {text}
              </TweetLink>
            )
          case 'url':
            return (
              <TweetLink key={i} href={item.expanded_url}>
                {item.display_url}
              </TweetLink>
            )
          case 'media':
            // Media text is currently never displayed, some tweets however might have indices
            // that do match `display_text_range` so for those cases we ignore the content.
            return undefined
          default:
            return <span key={i}>{text}</span>
        }
      })}
    </p>
  )
}
