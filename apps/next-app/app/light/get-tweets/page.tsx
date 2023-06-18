import { getTweets, type Tweet } from 'react-tweet/api'
import Tweets from './Tweets'

export default async function Page() {
  const tweets = await getTweets([
    '1628832338187636740',
    '1669012014381912066',
    '1669852655974268934',
  ])
  return <Tweets tweets={tweets.filter(isTweet)} />
}

function isTweet(tweet: Tweet | undefined): tweet is Tweet {
  return (tweet as Tweet) !== undefined
}
