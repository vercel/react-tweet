'use client'
import React from 'react'
import { EmbeddedTweet } from 'react-tweet'
import { type Tweet } from 'react-tweet/api'

interface TweetsProps {
  tweets: Tweet[]
}

const Tweets = ({ tweets }: TweetsProps) => {
  return (
    <ul style={{ listStyle: 'none' }}>
      {tweets.map((tweet) => (
        <li key={tweet.id_str}>
          <EmbeddedTweet tweet={tweet} />
        </li>
      ))}
    </ul>
  )
}

export default Tweets
