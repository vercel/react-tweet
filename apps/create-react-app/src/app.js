import clsx from 'clsx'
import { Tweet } from 'react-tweet'
import styles from './app.module.css'
import './base.css'

export default function App() {
  return (
    <div className={clsx(styles.root, 'react-tweet-theme')}>
      <main className={styles.main}>
        <Tweet id="1628832338187636740" />
      </main>
      <footer className={styles.footer}>
        <p>🤯 This tweet was statically generated.</p>
      </footer>
    </div>
  )
}
