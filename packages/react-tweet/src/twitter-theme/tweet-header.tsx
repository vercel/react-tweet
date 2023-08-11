import clsx from 'clsx'
import type { EnrichedTweet } from '../utils.js'
import type { TwitterComponents } from './types.js'
import { AvatarImg } from './avatar-img.js'
import s from './tweet-header.module.css'
import { VerifiedBadge } from './verified-badge.js'

type Props = {
  tweet: EnrichedTweet
  components?: TwitterComponents
}

export const TweetHeader = ({ tweet, components }: Props) => {
  const Img = components?.AvatarImg ?? AvatarImg
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
          <Img
            src={user.profile_image_url_https}
            alt={user.name}
            width={48}
            height={48}
          />
        </div>
        <div className={s.avatarOverflow}>
          <div className={s.avatarShadow}></div>
        </div>
      </a>
      <div className={s.author}>
        <a
          href={tweet.url}
          className={s.authorLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className={s.authorLinkText}>
            <span title={user.name}>{user.name}</span>
          </div>
          <VerifiedBadge user={user} className={s.authorVerified} />
        </a>
        <div className={s.authorMeta}>
          <a
            href={tweet.url}
            className={s.username}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span title={`@${user.screen_name}`}>@{user.screen_name}</span>
          </a>
          <div className={s.authorFollow}>
            <span className={s.separator}>·</span>
            <a
              href={user.follow_url}
              className={s.follow}
              target="_blank"
              rel="noopener noreferrer"
            >
              Follow
            </a>
          </div>
        </div>
      </div>
      <a
        href={tweet.url}
        className={s.brand}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View on Twitter"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className={s.twitterIcon}>
          <g>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
          </g>
        </svg>
      </a>
    </div>
  )
}
