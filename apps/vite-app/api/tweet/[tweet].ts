import type { VercelRequest, VercelResponse } from '@vercel/node'
import { getTweet } from 'next-tweet/api'

const handler = async (req: VercelRequest, res: VercelResponse) => {
  const tweetId = req.query.tweet

  if (typeof tweetId !== 'string') {
    res.status(400).json({ error: 'Invalid tweet ID' })
    return
  }

  let tweet
  try {
    tweet = await getTweet(tweetId)
  } catch (error) {
    console.error(error)
  }
  res.json({ data: tweet ?? null })
}

export default handler
