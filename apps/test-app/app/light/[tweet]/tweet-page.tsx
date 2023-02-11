import { notFound } from 'next/navigation'
import { getTweet } from 'next-tweet/api'
import { EmbeddedTweet } from 'next-tweet'
import clsx from 'clsx'
import s from './tweet-page.module.css'

type Props = {
  id: string
  className: string
}

const TweetPage = async ({ id, className }: Props) => {
  const tweet = await getTweet(id)
  if (!tweet) notFound()

  return (
    <div className={clsx(s.root, className)}>
      <main className={s.main}>
        <EmbeddedTweet data={tweet} />
      </main>
      <footer className={s.footer}>
        <p>🤯 This tweet was statically generated.</p>
      </footer>
    </div>
  )
}

export default TweetPage
