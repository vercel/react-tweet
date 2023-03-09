import * as React from 'react'
import clsx from 'clsx'
import { NextTweet } from 'next-tweet'
import styles from './index.module.css'
// @ts-ignore - this is a workaround for https://github.com/gatsbyjs/gatsby/issues/19446
import s from 'next-tweet/theme.css'
console.log(s) // Don't remove this console log unless the workaround is not needed anymore
import './base.css'

const IndexPage = () => (
  <div data-theme="dark">
    <div className={clsx(styles.root, 'next-tweet-theme')}>
      <main className={styles.main}>
        <NextTweet id={'1628832338187636740'} priority />
      </main>
    </div>
  </div>
)

export default IndexPage
