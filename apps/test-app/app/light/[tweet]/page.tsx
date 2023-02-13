import { NextTweet } from 'next-tweet'

export const revalidate = 60

export default async function Page({ params }: { params: { tweet: string } }) {
  // TODO: Figure out why Next.js sends this value at build time
  if (params.tweet === '%5Btweet%5D') return null

  // @ts-ignore: Async components are valid in the app directory
  return <NextTweet id={params.tweet} priority />
}
