import React, { useState, useEffect } from 'react';
import clsx from 'clsx'
import { Tweet } from 'react-tweet'
import styles from './app.module.css'
import './base.css'

export default function App2() {
  const [tweetIds, setIds] = useState([]);
  const [numTweetsToShow, setNumTweetsToShow] = useState(10);

  useEffect(() => {
    fetch('/tweets_2.json')
      .then(response => response.json())
      .then(data => setIds(data.map(item => item.like.tweetId)));
  }, []);

  const handleLoadMore = () => {
    setNumTweetsToShow(numTweetsToShow + 10);
  };

  return (
    <div className={clsx(styles.root, 'react-tweet-theme')}>
      <h1 style={{textAlign: 'center'}}>Twitter bookmarks to 2024-01-24</h1>
      <main className={styles.main}>
        {tweetIds.slice(0, numTweetsToShow).map((tweetId) => (
          <Tweet key={tweetId} id={tweetId} />
        ))}
        {numTweetsToShow < tweetIds.length && (
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