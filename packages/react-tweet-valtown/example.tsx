/**
 * Example Val Town Val using react-tweet-valtown
 *
 * This demonstrates how to use react-tweet-valtown in a Val Town HTTP handler.
 * Copy this code to your Val Town val to get started.
 *
 * @example
 * In Val Town, create a new HTTP val and paste this code
 */

/** @jsxImportSource npm:react */
import { Tweet } from "./src/index.ts";

export default async function (req: Request): Promise<Response> {
  // Get tweet ID from URL query parameter or use default
  const url = new URL(req.url);
  const tweetId = url.searchParams.get("id") || "1683899539984359424";

  // You can also get multiple tweet IDs
  const tweets = url.searchParams.getAll("tweets");

  const html = (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Tweet {tweetId} - react-tweet-valtown</title>

        {/* Tailwind v4 CDN - Required for styling */}
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>

        {/* Optional: Custom Tailwind theme */}
        <style type="text/tailwindcss">
          {`
            @theme {
              --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            }

            body {
              font-family: var(--font-sans);
            }
          `}
        </style>

        {/* Optional: Additional page styles */}
        <style>
          {`
            body {
              margin: 0;
              padding: 20px;
              background: #f5f5f5;
              display: flex;
              flex-direction: column;
              align-items: center;
              min-height: 100vh;
            }

            .container {
              width: 100%;
              max-width: 600px;
            }

            h1 {
              color: #1d9bf0;
              margin-bottom: 1rem;
            }

            .dark body {
              background: #000;
              color: #fff;
            }
          `}
        </style>
      </head>
      <body>
        <div className="container">
          <h1>react-tweet-valtown Example</h1>

          {/* Single Tweet */}
          <Tweet id={tweetId} />

          {/* Multiple Tweets */}
          {tweets.length > 0 && (
            <>
              <h2>Multiple Tweets</h2>
              {tweets.map((id) => (
                <Tweet key={id} id={id} />
              ))}
            </>
          )}

          {/* Instructions */}
          <div style={{ marginTop: "2rem", padding: "1rem", background: "#fff", borderRadius: "8px", border: "1px solid #ccc" }}>
            <h3>Try different tweets:</h3>
            <ul>
              <li>
                <a href="?id=1683899539984359424">Example Tweet 1</a>
              </li>
              <li>
                <a href="?id=1234567890">Example Tweet 2 (Not Found)</a>
              </li>
              <li>
                <a href="?tweets=1683899539984359424&tweets=1683899539984359424">Multiple Tweets</a>
              </li>
            </ul>
            <p>
              <strong>Add your own:</strong> <code>?id=YOUR_TWEET_ID</code>
            </p>
          </div>
        </div>
      </body>
    </html>
  );

  return new Response(html as any, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
