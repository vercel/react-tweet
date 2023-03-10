import { NextResponse } from 'next/server'
import { getTweet } from 'next-tweet/api'

type RouteSegment = { params: { id: string } }

export async function GET(_req: Request, { params }: RouteSegment) {
  let tweet
  try {
    tweet = await getTweet(params.id)
  } catch (error) {
    console.error(error)
  }
  return NextResponse.json({ data: tweet ?? null })
}
