import type { ReactNode } from 'react'
import clsx from 'clsx'
import s from './tweet-page.module.css'

type Props = { children?: ReactNode; footer?: boolean }

export const TweetPage = ({ children, footer }: Props) => (
  <div data-theme="dark">
    <div className={clsx(s.root, 'react-tweet-theme')}>
      <main className={s.main}>{children}</main>
      {footer && (
        <footer className={s.footer}>
          <p>🤯 This tweet was statically generated.</p>
        </footer>
      )}
    </div>
  </div>
)
