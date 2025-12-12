import clsx from 'clsx'
import type { TweetUser } from '../api/index.js'
import styles from './highlighted-label.module.css'

type Props = {
  user: TweetUser
  className?: string
}

export const HighlightedLabel = ({ user, className }: Props) => {
  const label = user.highlighted_label
  if (!label) return null

  const url = label.badge?.url
  if (!url) return null

  return (
    <div className={clsx(styles.label, className)}>
      <img src={url} alt={label.description} />
    </div>
  )
}
