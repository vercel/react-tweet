import type { FC, AnchorHTMLAttributes } from 'react'
import clsx from 'clsx'
import s from './tweet-link.module.css'

type Props = AnchorHTMLAttributes<HTMLAnchorElement>

const TweetLink: FC<Props> = ({ href, className, children, ...props }) => (
  <a
    href={href}
    className={clsx(s.root, className)}
    target="_blank"
    rel="noopener noreferrer"
    {...props}
  >
    {children}
  </a>
)

export default TweetLink
