import type { FC } from 'react'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { Tweet as TweetType } from 'next-tweet/lib/twitter/api'
import TweetSkeleton from 'next-tweet/tweet-skeleton'
import { Tweet } from 'next-tweet'
import s from './tweet-page.module.css'

const TweetPage: FC<{ tweet: TweetType; className: string }> = ({
  tweet,
  className,
}) => {
  const { isFallback } = useRouter()

  return (
    <div className={clsx(s.page, className)}>
      <main className={s.main}>
        {isFallback ? <TweetSkeleton /> : <Tweet data={tweet} />}
      </main>

      <footer className={s.footer}>
        <p>🤯 This tweet was statically generated.</p>
      </footer>
    </div>
  )
}

export default TweetPage
