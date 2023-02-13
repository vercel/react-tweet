import type { FC, ReactNode } from 'react'
import theme from 'next-tweet/theme.module.css'
import clsx from 'clsx'
import s from './layout.module.css'

const Layout: FC<{ children: ReactNode }> = ({ children }) => (
  <div className={clsx(s.root, theme.light)}>
    <main className={s.main}>{children}</main>
    <footer className={s.footer}>
      <p>🤯 This tweet was statically generated.</p>
    </footer>
  </div>
)

export default Layout
