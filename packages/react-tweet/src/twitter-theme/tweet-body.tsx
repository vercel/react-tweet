import type { EnrichedTweet } from '../utils.js'
import { TweetLink } from './tweet-link.js'
import s from './tweet-body.module.css'

export const TweetBody = ({ tweet }: { tweet: EnrichedTweet }) => (
  <p className={s.root} lang={tweet.lang} dir="auto">
    {tweet.entities.map((item, i) => {
      switch (item.type) {
        case 'hashtag':
        case 'mention':
        case 'url':
        case 'symbol':
          return (
            <TweetLink key={i} href={item.href}>
              {item.text}
            </TweetLink>
          )
        case 'media':
          // Media text is currently never displayed, some tweets however might have indices
          // that do match `display_text_range` so for those cases we ignore the content.
          return
        default:
          // We use `dangerouslySetInnerHTML` to preserve the text encoding.
          // https://github.com/vercel/react-tweet/issues/29
          return (
            <span key={i} dangerouslySetInnerHTML={{ __html: item.text }} />
          )
      }
    })}
    {tweet.note_tweet ? <ShowMore tweet={tweet} /> : null}
  </p>
)

function ShowMore({ tweet }: { tweet: EnrichedTweet }) {
  return (
    <TweetLink href={tweet.url}>
      <span>&nbsp;</span>
      Show more
    </TweetLink>
  )
}
