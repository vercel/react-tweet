import type { FC, HTMLAttributes } from 'react'
import styles from './skeleton.module.css'

const Skeleton: FC<HTMLAttributes<HTMLSpanElement>> = ({ style }) => (
  <span className={styles.skeleton} style={style} />
)

export default Skeleton
