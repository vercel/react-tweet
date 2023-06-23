import type { HTMLAttributes } from 'react'
import styles from './skeleton.module.css'

export const Skeleton = ({ style }: HTMLAttributes<HTMLSpanElement>) => (
  <span className={styles.skeleton} style={style} />
)
