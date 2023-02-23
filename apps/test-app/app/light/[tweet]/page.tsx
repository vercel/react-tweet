import { NextTweet } from 'next-tweet'
import { getTweet } from 'next-tweet/api'

type Props = {
  params: { tweet: string }
}

export const revalidate = 1800

export async function generateMetadata({ params }: Props) {
  const tweet = await getTweet(params.tweet).catch(() => undefined)

  if (!tweet) return { title: 'Next Tweet' }

  const username = ` - @${tweet.user.screen_name}`
  const maxLength = 68 - username.length
  const text =
    tweet.text.length > maxLength
      ? `${tweet.text.slice(0, maxLength)}…`
      : tweet.text

  return { title: `${text}${username}` }
}

export default async function Page({ params }: Props) {
  // TODO: Figure out why Next.js sends this value at build time
  if (params.tweet === '%5Btweet%5D') return null

  // @ts-ignore: Async components are valid in the app directory
  return <NextTweet id={params.tweet} priority />
}
