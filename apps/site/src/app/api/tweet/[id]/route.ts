import { NextResponse } from 'next/server'
import { getTweet } from 'react-tweet/api'
import cors from 'edge-cors'

export const fetchCache = 'only-cache'

export async function GET(req: Request, { params }: any) {
  try {
    const tweet = await getTweet(params.id)
    return cors(
      req,
      NextResponse.json({ data: tweet ?? null }, { status: tweet ? 200 : 404 })
    )
  } catch (error: any) {
    console.error(error)
    return cors(
      req,
      NextResponse.json(
        { error: error.message ?? 'Bad request.' },
        { status: 400 }
      )
    )
  }
}
