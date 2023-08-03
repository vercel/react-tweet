import clsx from 'clsx'
import { AvatarImg } from './avatar-img.js'
import s from './tweet-quoted-tweet-header.module.css'
import type { EnrichedQuotedTweet } from '../utils'
import { TweetAuthorVerifiedBadge } from './tweet-author-verified-badge.js'

type Props = {
  tweet: EnrichedQuotedTweet
}

export const TweetQuotedTweetHeader = ({ tweet }: Props) => {
  const { user } = tweet

  return (
    <div className={s.header}>
      <a
        href={tweet.url}
        className={s.avatar}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div
          className={clsx(
            s.avatarOverflow,
            user.profile_image_shape === 'Square' && s.avatarSquare
          )}
        >
          <AvatarImg
            src={user.profile_image_url_https}
            alt={user.name}
            width={20}
            height={20}
          />
        </div>
      </a>
      <div className={s.author}>
        <div className={s.authorText}>
          <span title={user.name}>{user.name}</span>
        </div>
        <TweetAuthorVerifiedBadge className={s.authorVerified} user={user} />
        <div className={s.username}>
          <span title={`@${user.screen_name}`}>@{user.screen_name}</span>
        </div>
      </div>
    </div>
  )
}
