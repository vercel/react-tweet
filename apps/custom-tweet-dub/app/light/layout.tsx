import type { ReactNode } from 'react'
import s from './layout.module.css'

const Layout = ({ children }: { children: ReactNode }) => (
  <div data-theme="light">
    <div className={s.root}>
      <main className={s.main}>
        <div className="max-w-[550px] min-w-[250px]">{children}</div>
      </main>
    </div>
  </div>
)

export default Layout
