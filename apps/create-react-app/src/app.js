import React, { useState, useEffect } from 'react';
import clsx from 'clsx'
import { Tweet } from 'react-tweet'
import styles from './app.module.css'
import './base.css'

export default function App() {
  const [Ids, setIds] = useState([]);
  const [numTweetsToShow, setNumTweetsToShow] = useState(10);

  useEffect(() => {
    fetch('/tweets.json')
      .then(response => response.json())
      .then(data => setIds(data.map(item => item.id)));
  }, []);

  const handleLoadMore = () => {
    setNumTweetsToShow(numTweetsToShow + 10);
  };

  return (
    <div className={clsx(styles.root, 'react-tweet-theme')}>
      <h1 style={{textAlign: 'center'}}>Twitter bookmarks to 2024-01-24 </h1>
      <main className={styles.main}>
        {Ids.slice(0, numTweetsToShow).map((id) => (
          <Tweet key={id} id={id} />
        ))}
        {numTweetsToShow < Ids.length && (
          <button 
          onClick={handleLoadMore} 
          style={{
            backgroundColor: '#26A7DE', 
            color: 'white', 
            fontFamily: 'inherit', 
            fontSize: '14px', 
            padding: '10px 20px', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer'
          }}
        >
          Load more
        </button>
        )}
      </main>
    </div>
  )
}
// import React, { useState, useEffect } from 'react';
// import clsx from 'clsx'
// import { Tweet } from 'react-tweet'
// import styles from './app.module.css'
// import './base.css'
// import * as franc from 'franc-min'


// export default function App() {
//   const [tweets, setTweets] = useState([]);
//   const [numTweetsToShow, setNumTweetsToShow] = useState(10);

//   useEffect(() => {
//     fetch('/tweets.json')
//       .then(response => response.json())
//       .then(data => setTweets(data));
//   }, []);

//   const handleLoadMore = () => {
//     setNumTweetsToShow(numTweetsToShow + 10);
//   };

//   const getDirection = (text) => {
//     const lang = franc(text);
//     return lang === 'ara' ? 'rtl' : 'ltr';
//   };

//   return (
//     <div className={clsx(styles.root, 'react-tweet-theme')}>
//       <main className={styles.main}>
//         {tweets.slice(0, numTweetsToShow).map((tweet) => (
//           <div key={tweet.id} dir={getDirection(tweet.text)}>
//             <Tweet id={tweet.id} />
//           </div>
//         ))}
//         {numTweetsToShow < tweets.length && (
//           <button 
//           onClick={handleLoadMore} 
//           style={{
//             backgroundColor: 'black', 
//             color: 'white', 
//             fontFamily: 'inherit', 
//             fontSize: '14px', 
//             padding: '10px 20px', 
//             border: 'none', 
//             borderRadius: '5px', 
//             cursor: 'pointer'
//           }}
//         >
//           Load more
//         </button>
//         )}
//       </main>
//     </div>
//   )
// }
