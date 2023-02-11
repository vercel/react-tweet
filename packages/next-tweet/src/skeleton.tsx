import type { FC, HTMLAttributes } from 'react'
import styles from './skeleton.module.css'

export const Skeleton: FC<HTMLAttributes<HTMLSpanElement>> = ({ style }) => (
  <span className={styles.skeleton} style={style} />
)
