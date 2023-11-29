import { type ReactNode } from 'react'
import { type EnrichedTweet } from 'react-tweet'

const Link = ({ href, children }: { href: string; children: ReactNode }) => (
  <a
    className="text-[rgb(29,161,242)] font-normal no-underline"
    href={href}
    target="_blank"
    rel="noopener noreferrer nofollow"
  >
    {children}
  </a>
)

export const TweetText = ({ tweet }: { tweet: EnrichedTweet }) => (
  <div className="mb-2 mt-4 truncate whitespace-pre-wrap text-[15px] text-gray-700">
    {tweet.entities.map((item, i) => {
      switch (item.type) {
        case 'hashtag':
        case 'mention':
        case 'url':
        case 'symbol':
          return (
            <Link key={i} href={item.href}>
              {item.text}
            </Link>
          )
        case 'media':
          return
        default:
          // We use `dangerouslySetInnerHTML` to preserve the text encoding.
          // https://github.com/vercel-labs/react-tweet/issues/29
          return (
            <span key={i} dangerouslySetInnerHTML={{ __html: item.text }} />
          )
      }
    })}
  </div>
)
