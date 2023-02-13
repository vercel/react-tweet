import type { FC } from 'react'
import { useRouter } from 'next/router'
import { EmbeddedTweet, TweetSkeleton } from 'next-tweet'
import type { Tweet } from 'next-tweet/api'
import s from './tweet-page.module.css'

const TweetPage: FC<{ tweet: Tweet }> = ({ tweet }) => {
  const { isFallback } = useRouter()

  return (
    <div className={s.root} data-theme="dark">
      <main className={s.main}>
        {isFallback ? (
          <TweetSkeleton />
        ) : (
          <EmbeddedTweet tweet={tweet} priority />
        )}
      </main>

      <footer className={s.footer}>
        <p>🤯 This tweet was statically generated.</p>
      </footer>
    </div>
  )
}

export default TweetPage
