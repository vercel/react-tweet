import clsx from 'clsx'
import { TweetSkeleton } from 'next-tweet'
import styles from './app.module.css'
import './base.css'

export default function App() {
  return (
    <div data-theme="dark">
      <div className={clsx(styles.root, 'next-tweet-theme')}>
        <main className={styles.main}>
          <TweetSkeleton />
        </main>
        <footer className={styles.footer}>
          <p>🤯 This tweet was statically generated.</p>
        </footer>
      </div>
    </div>
  )
}
