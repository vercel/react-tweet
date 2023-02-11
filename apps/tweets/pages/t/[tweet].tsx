import { fetchTweet, type Tweet } from 'next-tweet/lib/twitter/api'
import TweetPage from '../../components/tweet-page'
import styles from 'next-tweet/dark.module.css'

// Regex to test a valid username, you should also test for a max length of 15, but we're not using
// the user to get the tweet
// const USERNAME = /^[a-zA-Z0-9_]+$/;
const TWEET_ID = /^[0-9]+$/

export async function getStaticPaths() {
  return { paths: [], fallback: true }
}

export async function getStaticProps({
  params,
}: {
  params: { tweet: string }
}) {
  const tweetId = params.tweet

  if (tweetId.length > 40 || !TWEET_ID.test(tweetId)) {
    return { notFound: true }
  }

  try {
    const tweet = await fetchTweet(tweetId)
    return tweet ? { props: { tweet } } : { notFound: true }
  } catch (error) {
    // The Twitter API most likely died
    console.error(error)
    return { notFound: true }
  }
}

export default function Page({ tweet }: { tweet: Tweet }) {
  // return <h1>Hello World!</h1>
  return <TweetPage className={styles.theme} tweet={tweet} />
}
