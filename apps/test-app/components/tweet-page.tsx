import type { FC } from 'react'
import { useRouter } from 'next/router'
import { EmbeddedTweet, TweetSkeleton } from 'next-tweet'
import type { Tweet } from 'next-tweet/api'
import clsx from 'clsx'
import s from './tweet-page.module.css'

const TweetPage: FC<{ tweet: Tweet; className: string }> = ({
  tweet,
  className,
}) => {
  const { isFallback } = useRouter()

  return (
    <div className={clsx(s.root, className)}>
      <main className={s.main}>
        {isFallback ? <TweetSkeleton /> : <EmbeddedTweet data={tweet} />}
      </main>

      <footer className={s.footer}>
        <p>🤯 This tweet was statically generated.</p>
      </footer>
    </div>
  )
}

export default TweetPage
