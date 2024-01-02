import React, { useState, useEffect } from 'react';
import clsx from 'clsx'
import { Tweet } from 'react-tweet'
import styles from './app.module.css'
import './base.css'
// ya rab
export default function App() {
  const [tweetIds, setTweetIds] = useState([]);
  const [numTweetsToShow, setNumTweetsToShow] = useState(10);

  useEffect(() => {
    fetch('/tweets.json')
      .then(response => response.json())
      .then(data => setTweetIds(data.map(item => item.like.tweetId)));
  }, []);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    setNumTweetsToShow(numTweetsToShow + 10);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [numTweetsToShow]);

  return (
    <div className={clsx(styles.root, 'react-tweet-theme')}>
      <main className={styles.main}>
        {tweetIds.slice(0, numTweetsToShow).map((tweetId) => (
          <Tweet key={tweetId} id={tweetId} />
        ))}
      </main>
    </div>
  )
}