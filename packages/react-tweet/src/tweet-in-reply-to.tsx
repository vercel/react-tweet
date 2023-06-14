import type { Tweet } from './api/index.js'
import type { Locales } from './locales.js'
import { getInReplyToUrl } from './utils.js'
import s from './tweet-in-reply-to.module.css'

type Props = {
  tweet: Tweet
  locales: Locales['tweet']['inReply']
}

export const TweetInReplyTo = ({ tweet, locales }: Props) => (
  <a
    href={getInReplyToUrl(tweet)}
    className={s.root}
    target="_blank"
    rel="noopener noreferrer"
  >
    {locales.text(tweet.in_reply_to_screen_name)}
  </a>
)
