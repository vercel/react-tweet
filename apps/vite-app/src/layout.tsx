import { Outlet } from 'react-router-dom'
import clsx from 'clsx'
import styles from './layout.module.css'
import './base.css'

export const Layout = () => (
  <div className={clsx(styles.root, 'next-tweet-theme')}>
    <main className={styles.main}>
      <Outlet />
    </main>
  </div>
)
