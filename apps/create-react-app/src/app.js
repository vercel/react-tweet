// import React, { useState, useEffect } from 'react';
// import clsx from 'clsx'
// import { Tweet } from 'react-tweet'
// import styles from './app.module.css'
// import './base.css'

// export default function App() {
//   const [tweetIds, setTweetIds] = useState([]);
//   const [numTweetsToShow, setNumTweetsToShow] = useState(10);

//   useEffect(() => {
//     fetch('/tweets.json')
//       .then(response => response.json())
//       .then(data => setTweetIds(data.map(item => item.like.tweetId)));
//   }, []);

//   const handleLoadMore = () => {
//     setNumTweetsToShow(numTweetsToShow + 10);
//   };

//   return (
//     <div className={clsx(styles.root, 'react-tweet-theme')}>
//       <main className={styles.main}>
//         {tweetIds.slice(0, numTweetsToShow).map((tweetId) => (
//           <Tweet key={tweetId} id={tweetId} />
//         ))}
//         {numTweetsToShow < tweetIds.length && (
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
import React, { useState, useEffect } from 'react';
import clsx from 'clsx'
import { Tweet } from 'react-tweet'
import styles from './app.module.css'
import './base.css'

export default function App() {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    fetch('/tweets.json')
      .then(response => response.json())
      .then(data => setBlocks(data));
  }, []);

  return (
    <div>
      {blocks.map((block, index) => (
        <div key={index} dir={block.language === 'ar' ? 'rtl' : 'ltr'}>
          {/* Render your block content here */}
        </div>
      ))}
    </div>
  );
}