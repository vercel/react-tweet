import { NextResponse } from 'next/server'
import { getTweet } from 'react-tweet/api'
import { cacheLife } from 'next/cache'

export async function GET(
  _req: Request,
  { params }: RouteContext<'/api/tweet/[id]'>
) {
  'use cache'
  cacheLife('days')

  try {
    const { id } = await params
    const tweet = await getTweet(id)
    return NextResponse.json(
      { data: tweet ?? null },
      { status: tweet ? 200 : 404 }
    )
  } catch (error: any) {
    console.error(error)
    return NextResponse.json(
      { error: error.message ?? 'Bad request.' },
      { status: 400 }
    )
  }
}
