import type { AnchorHTMLAttributes } from 'react'
import clsx from 'clsx'
import s from './tweet-link.module.css'

type Props = AnchorHTMLAttributes<HTMLAnchorElement>

export const TweetLink = ({ href, className, children, ...props }: Props) => (
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
