import clsx from 'clsx'
import type { TweetUser } from '../api/index.js'
import {
  Verified,
  VerifiedBusiness,
  VerifiedGovernment,
} from './icons/index.js'
import s from './verified-badge.module.css'

type Props = {
  user: TweetUser
  className?: string
}

export const VerifiedBadge = ({ user, className }: Props) => {
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

  return verified ? (
    <div className={clsx(className, iconClassName)}>{icon}</div>
  ) : null
}
