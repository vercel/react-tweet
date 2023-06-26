import type { ReactNode } from 'react'
import type { Tweet } from 'react-tweet/api'
import {
  getEntities,
  getEntityText,
  getHashtagUrl,
  getSymbolUrl,
  getUserUrl,
} from 'react-tweet'

const Link = ({ href, children }: { href: string; children: ReactNode }) => (
  <a
    className="text-[rgb(29,161,242)] font-normal no-underline"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>
)

export const TweetText = ({ tweet }: { tweet: Tweet }) => (
  <div className="mb-2 mt-4 truncate whitespace-pre-wrap text-[15px] text-gray-700">
    {getEntities(tweet).map((item, i) => {
      const text = getEntityText(tweet, item)
      switch (item.type) {
        case 'hashtag':
          return (
            <Link key={i} href={getHashtagUrl(item)}>
              {text}
            </Link>
          )
        case 'mention':
          return (
            <Link key={i} href={getUserUrl(item.screen_name)}>
              {text}
            </Link>
          )
        case 'url':
          return (
            <Link key={i} href={item.expanded_url}>
              {item.display_url}
            </Link>
          )
        case 'symbol':
          return (
            <Link key={i} href={getSymbolUrl(item)}>
              {text}
            </Link>
          )
        case 'media':
          return
        default:
          // We use `dangerouslySetInnerHTML` to preserve the text encoding.
          // https://github.com/vercel-labs/react-tweet/issues/29
          return <span key={i} dangerouslySetInnerHTML={{ __html: text }} />
      }
    })}
  </div>
)
