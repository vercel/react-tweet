'use client'

import { type FC, useState, useEffect } from 'react'
import type { Tweet } from './api'
import { getTweetUrl } from './utils'
import s from './tweet-actions.module.css'

export const TweetActionsCopy: FC<{ tweet: Tweet }> = ({ tweet }) => {
  const [copied, setCopied] = useState(false)
  const [copyAllText, setCopyAltText] = useState(false)
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
        {copied ? 'Copied!' : copyAllText ? 'Copy link to Tweet' : 'Copy link'}
      </span>
    </button>
  )
}
