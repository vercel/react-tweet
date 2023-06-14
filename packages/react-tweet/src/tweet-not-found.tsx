import type { Locales } from './locales.js'
import { TweetContainer } from './tweet-container.js'
import styles from './tweet-not-found.module.css'

type Props = {
  error?: any
  locales: Locales['notFound']
}

export const TweetNotFound = ({ error, locales }: Props) => (
  <TweetContainer>
    <div className={styles.root}>
      <h3>{locales.heading(error)}</h3>
      <p>{locales.text(error)}</p>
    </div>
  </TweetContainer>
)
