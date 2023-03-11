import type { ReactNode } from 'react'
import clsx from 'clsx'
import s from './tweet-page.module.css'

type Props = { children?: ReactNode }

export const TweetPage = ({ children }: Props) => (
  <div data-theme="dark">
    <div className={clsx(s.root, 'next-tweet-theme')}>
      <main className={s.main}>{children}</main>
      <footer className={s.footer}>
        <p>🤯 This tweet was statically generated.</p>
      </footer>
    </div>
  </div>
)
