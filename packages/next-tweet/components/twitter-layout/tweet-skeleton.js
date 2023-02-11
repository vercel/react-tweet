import Skeleton from './skeleton'
import styles from './tweet-skeleton.module.css'

export default function TweetSkeleton({ simple = false }) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Skeleton style={{ height: '3rem', marginBottom: '0.75rem' }} />
        <Skeleton style={{ height: '6rem', margin: '0.5rem 0' }} />
        <div style={{ borderTop: 'var(--tweet-border)', margin: '0.5rem 0' }} />
        <Skeleton
          style={{
            height: '2rem',
          }}
        />
        <Skeleton
          style={{
            height: '2rem',
            borderRadius: '9999px',
            marginTop: '0.5rem',
          }}
        />
      </div>
      {/* {simple ? null : (
        <div className={styles.footer}>
          <Skeleton style={{ height: '1.25rem' }} />
        </div>
      )} */}
    </div>
  )
}
