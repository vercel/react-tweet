import express from 'express'
import { getTweet } from 'next-tweet/api'

const PORT = 4001

const app = express()

app.get('/api/tweet/:id', async (req, res) => {
  let tweet
  try {
    tweet = await getTweet(req.params.id)
  } catch (error) {
    console.error(error)
  }
  res.json({ data: tweet ?? null })
})

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`)
})
