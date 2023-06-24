import type { Tweet } from '../api/index.js'
import {
  getHashtagUrl,
  getUserUrl,
  getSymbolUrl,
  getEntities,
  getEntityText,
} from '../utils.js'
import { TweetLink } from './tweet-link.js'
import s from './tweet-body.module.css'

export const TweetBody = ({ tweet }: { tweet: Tweet }) => (
  <p className={s.root}>
    {getEntities(tweet).map((item, i) => {
      const text = getEntityText(tweet, item)
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
        case 'symbol':
          return (
            <TweetLink key={i} href={getSymbolUrl(item)}>
              {text}
            </TweetLink>
          )
        case 'media':
          // Media text is currently never displayed, some tweets however might have indices
          // that do match `display_text_range` so for those cases we ignore the content.
          return undefined
        default:
          // We use `dangerouslySetInnerHTML` to preserve the text encoding.
          // https://github.com/vercel-labs/react-tweet/issues/29
          return <span key={i} dangerouslySetInnerHTML={{ __html: text }} />
      }
    })}
  </p>
)
