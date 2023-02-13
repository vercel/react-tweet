import { NextTweet } from 'next-tweet'
import theme from 'next-tweet/theme.module.css'

export const revalidate = 60

export async function generateStaticParams() {
  return []
}

export default async function Page({ params }: { params: { tweet: string } }) {
  // TODO: Figure out why Next.js sends this value at build time
  if (params.tweet === '%5Btweet%5D') return null

  return (
    <div className={theme.light}>
      {/* @ts-ignore: Async components are valid in the app directory */}
      <NextTweet id={params.tweet} priority />
    </div>
  )
}
