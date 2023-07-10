import clsx from 'clsx'
import type { EnrichedTweet } from '../utils.js'
import type { TwitterComponents } from './types.js'
import { AvatarImg } from './avatar-img.js'
import {
  Verified,
  VerifiedGovernment,
  VerifiedBusiness,
} from './icons/index.js'
import s from './tweet-header.module.css'

type Props = {
  tweet: EnrichedTweet
  components?: TwitterComponents
}

export const TweetHeader = ({ tweet, components }: Props) => {
  const Img = components?.AvatarImg ?? AvatarImg
  const { user } = tweet
  const verified = user.verified || user.is_blue_verified || user.verified_type
  let icon = <Verified />
  let iconClassName: string | null = s.verifiedBlue

  if (verified) {
    if (!user.is_blue_verified) {
      iconClassName = s.verifiedOld
    }
    switch (user.verified_type) {
      case 'Government':
        icon = <VerifiedGovernment />
        iconClassName = s.verifiedGovernment
        break
      case 'Business':
        icon = <VerifiedBusiness />
        iconClassName = null
        break
    }
  }

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
          {verified && (
            <div className={clsx(s.authorVerified, iconClassName)}>{icon}</div>
          )}
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
            <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
          </g>
        </svg>
      </a>
    </div>
  )
}
