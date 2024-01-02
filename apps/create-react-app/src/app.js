import clsx from 'clsx'
import { Tweet } from 'react-tweet'
import styles from './app.module.css'
import './base.css'

export default function App() {
  const tweetIds = ["1741504498542023081", "1741504498542023082", "1741504498542023083"]; // Add your tweet IDs here

  return (
    <div className={clsx(styles.root, 'react-tweet-theme')}>
      <main className={styles.main}>
        {tweetIds.map((tweetId) => (
          <Tweet key={tweetId} id={tweetId} />
        ))}
      </main>
    </div>
  )
}
// import clsx from 'clsx'
// import { Tweet } from 'react-tweet'
// import styles from './app.module.css'
// import './base.css'

// export default function App() {
//   return (
//     <div className={clsx(styles.root, 'react-tweet-theme')}>
//       <main className={styles.main}>
//         <Tweet id="1741504498542023081" />
//       </main>
//     </div>
//   )
// }
// import clsx from 'clsx'
// import { Tweet } from 'react-tweet'
// import styles from './app.module.css'
// import './base.css'

// export default function App() {
//   const tweetIds = ["1741504498542023081", "1741504498542023082", "1741504498542023083"]; // Add your tweet IDs here

//   return (
//     <div className={clsx(styles.root, 'react-tweet-theme')}>
//       <main className={styles.main}>
//         {tweetIds.map((tweetId) => (
//           <Tweet key={tweetId} id={tweetId} />
//         ))}
//       </main>
//     </div>
//   )
// }