import type { FC } from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { EmbeddedTweet, TweetSkeleton, Tweet } from 'next-tweet'
import type { Tweet as ITweet } from 'next-tweet/api'
import s from './tweet-page.module.css'

const TweetPage: FC<{ tweet: ITweet }> = ({ tweet }) => {
  const { isFallback } = useRouter()

  return (
    <div data-theme="dark">
      <div className={clsx(s.root, 'next-tweet-theme')}>
        <main className={s.main}>
          {isFallback ? <TweetSkeleton /> : <EmbeddedTweet tweet={tweet} />}
        </main>

        <footer className={s.footer}>
          <p>🤯 This tweet was statically generated.</p>
        </footer>
      </div>
    </div>
  )
}

export default TweetPage
