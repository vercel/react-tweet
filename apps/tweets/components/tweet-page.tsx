import type { FC } from 'react'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import type { Tweet as TweetType } from 'lib/twitter/api'
import TweetSkeleton from './twitter-layout/tweet-skeleton'
import TweetMeta from './tweet-meta'
import Tweet from './twitter-layout/tweet'
import { A } from './landing/core'
import s from './tweet-page.module.css'

const TweetPage: FC<{ tweet: TweetType; className: string }> = ({
  tweet,
  className,
}) => {
  const { isFallback } = useRouter()

  return (
    <div className={clsx(s.page, className)}>
      <TweetMeta />

      <main className={s.main}>
        {isFallback ? <TweetSkeleton /> : <Tweet data={tweet} />}
      </main>

      <footer className={s.footer}>
        <p>
          🤯 This tweet was statically generated. <A href="/">See how</A>
        </p>
      </footer>
    </div>
  )
}

export default TweetPage
