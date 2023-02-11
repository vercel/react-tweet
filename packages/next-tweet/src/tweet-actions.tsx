import { type FC, useState, useEffect } from 'react'
import type { Tweet } from './lib/twitter/api'
import formatNumber from './lib/format-number'
import { getLikeUrl, getReplyUrl, getTweetUrl } from './utils'
import s from './tweet-actions.module.css'

export const TweetActions: FC<{ tweet: Tweet }> = ({ tweet }) => {
  const [copied, setCopied] = useState(false)
  const [copyAllText, setCopyAltText] = useState(false)
  const favoriteCount = formatNumber(tweet.favorite_count)
  const handleCopy = () => {
    navigator.clipboard.writeText(getTweetUrl(tweet))
    setCopied(true)
  }

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false)
        setCopyAltText(true)
      }, 6000)

      return () => clearTimeout(timeout)
    }
  }, [copied])

  return (
    <div className={s.actions}>
      <a
        className={s.like}
        href={getLikeUrl(tweet)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Like. This Tweet has ${favoriteCount} likes`}
      >
        <div className={s.likeIconWrapper}>
          <svg viewBox="0 0 24 24" className={s.likeIcon} aria-hidden="true">
            <g>
              <path d="M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path>
            </g>
          </svg>
        </div>
        <span className={s.likeCount}>{favoriteCount}</span>
      </a>
      <a
        className={s.reply}
        href={getReplyUrl(tweet)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Reply to this Tweet on Twitter"
      >
        <div className={s.replyIconWrapper}>
          <svg viewBox="0 0 24 24" className={s.replyIcon} aria-hidden="true">
            <g>
              <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01z"></path>
            </g>
          </svg>
        </div>
        <span className={s.replyText}>Reply</span>
      </a>
      <button
        type="button"
        className={s.copy}
        aria-label="Copy link"
        onClick={handleCopy}
      >
        <div className={s.copyIconWrapper}>
          {copied ? (
            <svg viewBox="0 0 24 24" className={s.copyIcon} aria-hidden="true">
              <g>
                <path d="M9.64 18.952l-5.55-4.861 1.317-1.504 3.951 3.459 8.459-10.948L19.4 6.32 9.64 18.952z"></path>
              </g>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className={s.copyIcon} aria-hidden="true">
              <g>
                <path d="M18.36 5.64c-1.95-1.96-5.11-1.96-7.07 0L9.88 7.05 8.46 5.64l1.42-1.42c2.73-2.73 7.16-2.73 9.9 0 2.73 2.74 2.73 7.17 0 9.9l-1.42 1.42-1.41-1.42 1.41-1.41c1.96-1.96 1.96-5.12 0-7.07zm-2.12 3.53l-7.07 7.07-1.41-1.41 7.07-7.07 1.41 1.41zm-12.02.71l1.42-1.42 1.41 1.42-1.41 1.41c-1.96 1.96-1.96 5.12 0 7.07 1.95 1.96 5.11 1.96 7.07 0l1.41-1.41 1.42 1.41-1.42 1.42c-2.73 2.73-7.16 2.73-9.9 0-2.73-2.74-2.73-7.17 0-9.9z"></path>
              </g>
            </svg>
          )}
        </div>
        <span className={s.copyText}>
          {copied
            ? 'Copied!'
            : copyAllText
            ? 'Copy link to Tweet'
            : 'Copy link'}
        </span>
      </button>
    </div>
  )
}
