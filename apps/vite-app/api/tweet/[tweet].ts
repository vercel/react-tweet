import type { VercelRequest, VercelResponse } from '@vercel/node'
import { getTweet } from 'next-tweet/api'

const handler = async (req: VercelRequest, res: VercelResponse) => {
  const tweetId = req.query.tweet

  if (typeof tweetId !== 'string') {
    res.status(400).json({ error: 'Invalid tweet ID' })
    return
  }

  try {
    const tweet = await getTweet(tweetId)
    res.status(tweet ? 200 : 404).json({ data: tweet ?? null })
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: error.message ?? 'Bad request.' })
  }
}

export default handler
