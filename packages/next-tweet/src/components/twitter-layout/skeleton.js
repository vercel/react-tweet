import styles from './skeleton.module.css'

export default function Skeleton({ children, style }) {
  return (
    <span className={styles.skeleton} style={style}>
      {children}
    </span>
  )
}
