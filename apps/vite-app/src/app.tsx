import clsx from 'clsx'
import { EmbeddedTweet, TweetSkeleton } from 'next-tweet'
import { type Tweet } from 'next-tweet/api'
import useSWR from 'swr'
import styles from './app.module.css'

async function fetcher(url: string) {
  const res = await fetch(url)
  const json = await res.json()
  return json.data
}

function App() {
  const tweetId = '1628832338187636740'
  const { data, error, isLoading } = useSWR<Tweet>(
    `/api/tweet/${tweetId}`,
    fetcher
  )

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
      </div>
    </div>
  )
}

export default App
