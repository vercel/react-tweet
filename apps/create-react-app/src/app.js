import clsx from 'clsx'
import styles from './app.module.css'
import './base.css'

export default function App() {
  return (
    <div data-theme="dark">
      <div className={clsx(styles.root, 'next-tweet-theme')}>
        <main className={styles.main}>
          <h1>Welcome to next-tweet!</h1>
        </main>
        <footer className={styles.footer}>
          <p>🤯 This tweet was statically generated.</p>
        </footer>
      </div>
    </div>
  )
}
