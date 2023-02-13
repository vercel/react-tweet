import type { FC, ReactNode } from 'react'
import s from './layout.module.css'

const Layout: FC<{ children: ReactNode }> = ({ children }) => (
  <div className={s.root} data-theme="light">
    <main className={s.main}>{children}</main>
    <footer className={s.footer}>
      <p>🤯 This tweet was statically generated.</p>
    </footer>
  </div>
)

export default Layout
