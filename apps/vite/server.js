import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import { getTweet } from 'next-tweet/api'

const PORT = 5173
const isTest = process.env.NODE_ENV === 'test'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === 'production'
) {
  const resolve = (p) => path.resolve(__dirname, p)

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

  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite
  if (isProd) {
    // Recommended: app.use(await import('compression')());
    app.use(express.static(resolve('./dist')))
  } else {
    vite = await (
      await import('vite')
    ).createServer({
      root,
      logLevel: isTest ? 'error' : 'info',
      server: {
        middlewareMode: true,
        watch: {
          // During tests we edit the files too fast and sometimes chokidar
          // misses change events, so enforce polling for consistency
          usePolling: true,
          interval: 100,
        },
      },
    })
    // use vite's connect instance as middleware
    app.use(vite.middlewares)
  }

  app.use('*', async (req, res) => {
    const url = req.originalUrl

    const template = fs.readFileSync(
      resolve(isProd ? './dist/index.js' : './index.html'),
      'utf-8'
    )

    res.status(200).set({ 'Content-Type': 'text/html' }).end(template)
  })

  return { app, vite }
}

if (!isTest) {
  createServer().then(({ app }) =>
    app.listen(PORT, () => {
      console.log(`Listening on http://localhost:${PORT}`)
    })
  )
}
