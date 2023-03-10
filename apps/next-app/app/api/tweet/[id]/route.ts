import { NextResponse } from 'next/server'
import { getTweet } from 'next-tweet/api'
import cors from 'edge-cors'

type RouteSegment = { params: { id: string } }

export async function GET(req: Request, { params }: RouteSegment) {
  let tweet
  try {
    tweet = await getTweet(params.id)
  } catch (error) {
    console.error(error)
  }
  return cors(req, NextResponse.json({ data: tweet ?? null }))
}
