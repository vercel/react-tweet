import clsx from 'clsx'
import { AvatarImg } from '../avatar-img.js'
import s from './quoted-tweet-header.module.css'
import type { EnrichedQuotedTweet } from '../../utils.js'
import { VerifiedBadge } from '../verified-badge.js'
import { HighlightedLabel } from '../highlighted-label.js'
import type { TwitterComponents } from '../types.js'

type Props = { tweet: EnrichedQuotedTweet; components?: TwitterComponents }

export const QuotedTweetHeader = ({ tweet, components }: Props) => {
  const { user } = tweet
  const Img = components?.AvatarImg ?? AvatarImg

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
          <Img
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
        <VerifiedBadge user={user} />
        <HighlightedLabel user={user} />
        <div className={s.username}>
          <span title={`@${user.screen_name}`}>@{user.screen_name}</span>
        </div>
      </div>
    </div>
  )
}
