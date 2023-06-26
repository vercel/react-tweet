import type { FC, ReactNode } from 'react'
import clsx from 'clsx'
import s from './layout.module.css'

const Layout: FC<{ children: ReactNode }> = ({ children }) => (
  <div data-theme="light">
    <div className={clsx(s.root, 'react-tweet-theme')}>
      <main className={s.main}>{children}</main>
    </div>
  </div>
)

export default Layout
