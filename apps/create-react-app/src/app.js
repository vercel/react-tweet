import clsx from 'clsx'
import { TweetSkeleton, EmbeddedTweet } from 'next-tweet'
import useSWR from 'swr'
import styles from './app.module.css'
import './base.css'

async function fetcher(url) {
  const res = await fetch(url)
  const json = await res.json()
  return json.data
}

export default function App() {
  const tweetId = '1628832338187636740'
  const { data, error, isLoading } = useSWR(`/api/tweet/${tweetId}`, fetcher)

  return (
    <div data-theme="dark">
      <div className={clsx(styles.root, 'next-tweet-theme')}>
        <main className={styles.main}>
          {isLoading || error || !data ? (
            <TweetSkeleton />
          ) : (
            <EmbeddedTweet tweet={data} />
          )}
        </main>
        <footer className={styles.footer}>
          <p>🤯 This tweet was statically generated.</p>
        </footer>
      </div>
    </div>
  )
}
