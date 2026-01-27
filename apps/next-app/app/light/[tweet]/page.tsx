import { Tweet } from 'react-tweet'
import { getTweet } from 'react-tweet/api'
import { cacheLife } from 'next/cache'
import { components } from './tweet-components'

type Props = {
  params: Promise<{ tweet: string }>
}

export async function generateStaticParams() {
  return [{ tweet: '1969515038512926823' }]
}

export async function generateMetadata({ params }: Props) {
  'use cache'
  cacheLife('hours')

  const { tweet: id } = await params
  const tweet = await getTweet(id).catch(() => undefined)

  if (!tweet) return { title: 'Next Tweet' }

  const username = ` - @${tweet.user.screen_name}`
  const maxLength = 68 - username.length
  const text =
    tweet.text.length > maxLength
      ? `${tweet.text.slice(0, maxLength)}…`
      : tweet.text

  return { title: `${text}${username}` }
}

async function TweetContent({ params }: Props) {
  'use cache'
  cacheLife('hours')

  const { tweet } = await params
  return <Tweet id={tweet} components={components} />
}

export default function Page({ params }: Props) {
  return <TweetContent params={params} />
}
