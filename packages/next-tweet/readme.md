# next-tweet

Embedded and static tweet for Next.js applications.

## Installation

> Next.js 13.2.1 or higher is required in order to use `next-tweet`.

Install `next-tweet` using your package manager of choice:

```bash
pnpm add next-tweet
```

```bash
yarn add next-tweet
```

```bash
npm install next-tweet
```

Currently, `next-tweet` uses `next/image` behind the scenes. You can configure `next/image` to accept image URLs from Twitter, by using [`images.remotePatterns`](https://nextjs.org/docs/api-reference/next/image#remote-patterns) in `next.config.js`:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'pbs.twimg.com' },
      { protocol: 'https', hostname: 'abs.twimg.com' },
    ],
  },
}
```

Now follow the usage instructions below. No API keys are required.

## Usage with App Router

In any component, import `NextTweet` from `next-tweet` and use it like so:

```tsx
import { NextTweet } from 'next-tweet'

export default function Page({ params }: Props) {
  // @ts-ignore: Async components are valid in the app directory
  return <NextTweet id={params.tweet} />
}
```

`NextTweet` accepts the following props:

- `params.tweet` - `string`: the tweet ID. For example in `https://twitter.com/chibicode/status/1629307668568633344` the tweet ID is `1629307668568633344`.
- `priority` - `boolean`: sets the [`priority` prop](https://nextjs.org/docs/basic-features/image-optimization#priority) in the Tweet's images. Only enable this if the tweet is visible above the fold. Defaults to `false`.
- `notFoundOnError` - `boolean`: if `true`, the component will show a not found message if the tweet fails to load (invalid id, no longer exists, account went private, etc). Otherwise, it will throw an error. Defaults to `false`.

`NextTweet` takes care of fetching the tweet and rendering it. You can see it working in the [test app](/apps/test-app/app/light/[tweet]/page.tsx) that's part of this monorepo.

## Choosing a theme

The [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) CSS media feature is used to select the theme of the tweet.

### Toggling theme manually

The closest `data-theme` attribute on a parent element can determine the theme of the tweet. You can set it to `light` or `dark`, like so:

```tsx
<div data-theme="dark">
  <NextTweet id={params.tweet} />
</div>
```

Alternatively, a parent with the class `light` or `dark` will also work:

```tsx
<div className="dark">
  <NextTweet id={params.tweet} />
</div>
```

## Usage in pages directory

Use the `getTweet` function from `next-tweet` to fetch the tweet and send it as props to the page component:

```tsx
import { getTweet, type Tweet } from 'next-tweet/api'

export async function getStaticProps({
  params,
}: {
  params: { tweet: string }
}) {
  try {
    const tweet = await getTweet(params.tweet)
    return tweet ? { props: { tweet } } : { notFound: true }
  } catch (error) {
    return { notFound: true }
  }
}

export async function getStaticPaths() {
  return { paths: [], fallback: true }
}

export default function Page({ tweet }: { tweet: Tweet }) {
  return <TweetPage tweet={tweet} />
}
```

The `TweetPage` component uses `EmbeddedTweet` to render the tweet, and `TweetSkeleton` to render a skeleton in case you need a loading state (e.g. when using [`fallback: true`](https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#fallback-true) in `getStaticPaths`):

```tsx
import { useRouter } from 'next/router'
import { EmbeddedTweet, TweetSkeleton } from 'next-tweet'
import type { Tweet } from 'next-tweet/api'

const TweetPage = ({ tweet }: { tweet: Tweet }) => {
  const { isFallback } = useRouter()

  return (
    <div data-theme="dark">
      {isFallback ? (
        <TweetSkeleton />
      ) : (
        <EmbeddedTweet tweet={tweet} priority />
      )}
    </div>
  )
}

export default TweetPage
```

You can see it working in the [test app](/apps/test-app/pages/dark/[tweet].tsx) that's part of this monorepo.

## Running the test app

Clone this repository and run the following command:

```bash
pnpm install && pnpm dev
```

Now visit http://localhost:3000/light/1629307668568633344 to see the tweet in the app directory, and http://localhost:3000/dark/1629307668568633344 to see the tweet in the pages directory.

The test app uses the `next-tweet` package in the root directory, so you can make changes to the package and see the changes reflected in the test app immediately.
