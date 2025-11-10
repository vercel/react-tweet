# react-tweet-valtown

A Val Town-optimized version of [react-tweet](https://github.com/vercel/react-tweet) for server-side rendering in Deno environments without bundlers.

## Features

- ✅ **No Build Step Required** - Works directly in Val Town's Deno runtime
- ✅ **Tailwind v4 Styling** - Uses Tailwind CDN for beautiful, responsive tweets
- ✅ **Server-Side Only** - Optimized for Val Town's server-side JSX rendering
- ✅ **Full TypeScript Support** - Complete type definitions included
- ✅ **Twitter API Integration** - Fetches tweets from Twitter's syndication API
- ✅ **Dark Mode Support** - Automatic dark mode via Tailwind
- ✅ **Verified Badges** - Shows verification status
- ✅ **Media Support** - Images, videos, and GIFs
- ✅ **Quoted Tweets** - Displays quoted tweets inline
- ✅ **Reply Threads** - Shows reply context

## Quick Start

### 1. Create a new HTTP Val in Val Town

```tsx
/** @jsxImportSource npm:react */
import { Tweet } from "./react-tweet-valtown/src/index.ts";

export default async function(req: Request) {
  const url = new URL(req.url);
  const tweetId = url.searchParams.get("id") || "1683899539984359424";

  return new Response(
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Tweet {tweetId}</title>

        {/* Required: Tailwind v4 CDN */}
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
      </head>
      <body>
        <Tweet id={tweetId} />
      </body>
    </html>,
    {
      headers: { "Content-Type": "text/html; charset=utf-8" }
    }
  );
}
```

### 2. That's it! 🎉

Your tweet will be fetched and rendered server-side with full styling.

## Usage

### Basic Tweet

```tsx
<Tweet id="1683899539984359424" />
```

### Multiple Tweets

```tsx
<div>
  <Tweet id="1683899539984359424" />
  <Tweet id="1234567890" />
</div>
```

### Custom Fallback

```tsx
<Tweet
  id="1683899539984359424"
  fallback={<div>Loading tweet...</div>}
/>
```

### Error Handling

```tsx
<Tweet
  id="1683899539984359424"
  onError={(error) => console.error("Failed to load tweet:", error)}
/>
```

### Custom Components

```tsx
<Tweet
  id="1683899539984359424"
  components={{
    TweetNotFound: () => <div>This tweet could not be found</div>,
    AvatarImg: (props) => <img {...props} loading="lazy" />,
    MediaImg: (props) => <img {...props} loading="lazy" />
  }}
/>
```

## API

### `<Tweet>`

Main component for rendering tweets.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | Required | The tweet ID to fetch and render |
| `components` | `TwitterComponents` | `undefined` | Custom component overrides |
| `fetchOptions` | `RequestInit` | `undefined` | Custom fetch options for the Twitter API |
| `fallback` | `JSX.Element` | `<TweetSkeleton />` | Fallback component while loading |
| `onError` | `(error: any) => any` | `undefined` | Error handler callback |

### `fetchTweet(id: string, fetchOptions?: RequestInit)`

Fetches a tweet from Twitter's syndication API.

```tsx
import { fetchTweet } from "./react-tweet-valtown/src/index.ts";

const result = await fetchTweet("1683899539984359424");
if (result.data) {
  console.log(result.data);
}
```

**Returns:**
```typescript
{
  data?: Tweet;        // Tweet data if found
  tombstone?: true;    // True if tweet is private
  notFound?: true;     // True if tweet doesn't exist
}
```

### `getTweet(id: string, fetchOptions?: RequestInit)`

Wrapper around `fetchTweet` that returns just the tweet data.

```tsx
import { getTweet } from "./react-tweet-valtown/src/index.ts";

const tweet = await getTweet("1683899539984359424");
if (tweet) {
  console.log(tweet.text);
}
```

**Returns:** `Promise<Tweet | undefined>`

### `enrichTweet(tweet: Tweet)`

Enriches a tweet with additional computed properties.

```tsx
import { enrichTweet, getTweet } from "./react-tweet-valtown/src/index.ts";

const tweet = await getTweet("1683899539984359424");
if (tweet) {
  const enriched = enrichTweet(tweet);
  console.log(enriched.url);           // https://x.com/user/status/123...
  console.log(enriched.user.url);      // https://x.com/user
  console.log(enriched.like_url);      // https://x.com/intent/like?tweet_id=123...
}
```

### Utility Functions

```tsx
import { formatNumber, formatDate, getMediaUrl } from "./react-tweet-valtown/src/index.ts";

formatNumber(1234567);     // "1.2M"
formatNumber(1234);        // "1.2K"

const date = new Date("2024-01-15T12:00:00Z");
formatDate(date);          // "12:00 PM · Jan 15, 2024"

getMediaUrl(media, "small");   // Formatted media URL
getMediaUrl(media, "medium");
getMediaUrl(media, "large");
```

## Styling

### Default Styling

The package uses Tailwind v4 for styling. Include the CDN in your HTML:

```html
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
```

### Dark Mode

Dark mode is automatically supported via Tailwind's dark mode:

```html
<html class="dark">
  <!-- Tweets will use dark mode colors -->
</html>
```

Or use system preference:

```html
<!-- Automatically uses user's system preference -->
<html>
  <head>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
  </head>
  <body>
    <Tweet id="123" />
  </body>
</html>
```

### Custom Theme

Customize colors using Tailwind's theme configuration:

```html
<style type="text/tailwindcss">
  @theme {
    --color-tweet-blue: #your-color;
    --color-tweet-red: #your-color;
  }
</style>
```

### Custom CSS

Add your own styles:

```html
<style>
  .react-tweet {
    /* Override tweet container styles */
    max-width: 700px;
  }
</style>
```

## Components

All components are exported and can be used individually:

```tsx
import {
  Tweet,                  // Main component
  EmbeddedTweet,         // Tweet without data fetching
  TweetContainer,        // Container wrapper
  TweetHeader,           // Author info and avatar
  TweetBody,             // Tweet text
  TweetMedia,            // Images/videos
  TweetActions,          // Like, reply buttons
  TweetInfo,             // Date and metadata
  TweetInReplyTo,        // Reply context
  TweetReplies,          // Reply count
  TweetNotFound,         // Error state
  TweetSkeleton,         // Loading state
  QuotedTweet,           // Quoted tweet component
} from "./react-tweet-valtown/src/index.ts";
```

### Custom Composition

```tsx
import { getTweet, enrichTweet, EmbeddedTweet } from "./react-tweet-valtown/src/index.ts";

export default async function() {
  const tweet = await getTweet("123");
  if (!tweet) return <div>Not found</div>;

  return <EmbeddedTweet tweet={tweet} />;
}
```

## TypeScript

Full TypeScript support with comprehensive type definitions:

```tsx
import type {
  Tweet,
  EnrichedTweet,
  TweetUser,
  TwitterComponents,
  TweetProps,
} from "./react-tweet-valtown/src/index.ts";

const customComponent: TwitterComponents = {
  TweetNotFound: () => <div>Custom not found</div>
};
```

## Differences from Original react-tweet

| Feature | react-tweet | react-tweet-valtown |
|---------|-------------|---------------------|
| **Build Step** | Required (SWC/Webpack) | Not required ✅ |
| **Styling** | CSS Modules | Tailwind v4 CDN |
| **Runtime** | Node.js/Browser | Deno (Val Town) |
| **Client-Side** | Supported (SWR) | Not supported ⚠️ |
| **Server-Side** | Supported (RSC) | Supported ✅ |
| **Import Syntax** | Standard npm | `npm:` prefix for npm packages |
| **Bundler** | Vite/Next/Webpack | None required |

### Not Supported

- ❌ **Client-side rendering** - Val Town's JSX is server-only
- ❌ **SWR variant** - No `useTweet()` hook
- ❌ **Interactive features** - No onClick handlers or client state
- ❌ **Custom fonts loading** - Use CDN fonts instead

## Examples

### Basic Example

See [`example.tsx`](./example.tsx) for a complete working example.

### With Dark Mode Toggle

```tsx
export default async function(req: Request) {
  const url = new URL(req.url);
  const theme = url.searchParams.get("theme") || "light";

  return new Response(
    <html className={theme}>
      <head>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
      </head>
      <body>
        <Tweet id="123" />
        <a href="?theme=dark">Dark</a> | <a href="?theme=light">Light</a>
      </body>
    </html>,
    { headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}
```

### With Custom Styling

```tsx
export default async function() {
  return new Response(
    <html>
      <head>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        <style type="text/tailwindcss">
          {`
            @theme {
              --color-tweet-blue: #8b5cf6;  /* Purple instead of blue */
            }
          `}
        </style>
      </head>
      <body className="bg-gradient-to-br from-purple-100 to-pink-100 min-h-screen p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">My Tweets</h1>
          <Tweet id="123" />
        </div>
      </body>
    </html>,
    { headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}
```

### Multiple Tweets from Search

```tsx
export default async function(req: Request) {
  const tweetIds = [
    "1683899539984359424",
    "1234567890",
    "9876543210",
  ];

  return new Response(
    <html>
      <head>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
      </head>
      <body>
        <div className="max-w-2xl mx-auto space-y-4 p-4">
          {tweetIds.map(id => (
            <Tweet key={id} id={id} />
          ))}
        </div>
      </body>
    </html>,
    { headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}
```

## Troubleshooting

### Tweet not loading

Make sure the tweet ID is correct and the tweet is public. Private or deleted tweets will show the "not found" component.

### Styling not working

Ensure you've included the Tailwind CDN script:

```html
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
```

### Import errors

Make sure you're using the correct import syntax for Val Town:

```tsx
/** @jsxImportSource npm:react */  // Required at top of file
import { Tweet } from "./react-tweet-valtown/src/index.ts";  // Local file
```

### Type errors

Ensure your Val Town is using TypeScript mode. Add the JSX pragma at the top of your file.

## Performance

- **Server-side rendering**: Fast initial load, no client-side JavaScript needed for display
- **Tailwind CDN**: ~50KB (cached across sites)
- **Tweet data**: Fetched once per render from Twitter's CDN
- **Caching**: Implement your own caching layer if needed

### Recommended Caching

```tsx
const tweetCache = new Map();

export default async function(req: Request) {
  const id = new URL(req.url).searchParams.get("id") || "123";

  if (!tweetCache.has(id)) {
    const tweet = await getTweet(id);
    tweetCache.set(id, tweet);
  }

  const tweet = tweetCache.get(id);
  // ... render tweet
}
```

## Contributing

This is an adaptation of the original [react-tweet](https://github.com/vercel/react-tweet) package. Please report Val Town-specific issues in this repository.

## License

MIT - Same as the original react-tweet package.

## Credits

- Original package: [react-tweet](https://github.com/vercel/react-tweet) by Vercel
- Adapted for Val Town by converting CSS Modules to Tailwind v4
- Twitter API integration maintained from original

## Links

- [Val Town](https://val.town)
- [Original react-tweet](https://github.com/vercel/react-tweet)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Deno](https://deno.land)
