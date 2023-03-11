import type { PropsWithChildren } from 'react'
import clsx from 'clsx'
import s from './tweet-container.module.css'
import './theme.css'

type Props = PropsWithChildren<{ className?: string }>

export const TweetContainer = ({ className, children }: Props) => (
  <div className={clsx('react-tweet-theme', s.root, className)}>
    <article className={s.article}>{children}</article>
  </div>
)
