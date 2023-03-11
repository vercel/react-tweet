# react-tweet for Next.js

> Next.js 13.2.1 or higher is required in order to use `react-tweet`.

## Installation

> Next.js 13.2.1 or higher is required in order to use `react-tweet`.

Follow the [installation docs in the main README](/readme.md#installation).

## Usage

In any component, import [`Tweet`](/readme.md#tweet) from `react-tweet` and use it like so:

```tsx
import { Tweet } from 'react-tweet'

export default function Page() {
  return <Tweet id="1628832338187636740" />
}
```

To see the code in action go to: [/apps/next-app/app/light/[tweet]/page.tsx](/apps/next-app/app/light/[tweet]/page.tsx).

`Tweet` works differently depending on where it's used. If it's used in the App Router it will fetch the tweet in the server. If it's used in the pages directory it will fetch the tweet in the client with [SWR](https://swr.vercel.app/).

You can learn more about `react-tweet` in the [API Reference](/readme.md#api-reference).

## Advanced usage

### Manual data fetching

You can use the `getTweet` function from `react-tweet/api` to fetch the tweet manually. This is useful for SSG pages and for other [Next.js data fetching methods](https://nextjs.org/docs/basic-features/data-fetching/overview).

For example, using `getStaticProps` in `pages/[tweet].tsx` to fetch the tweet and send it as props to the page component:

```tsx
import { useRouter } from 'next/router'
import { getTweet, type Tweet } from 'react-tweet/api'
import { EmbeddedTweet, TweetSkeleton } from 'react-tweet'

export async function getStaticProps({
  params,
}: {
  params: { tweet: string }
}) {
  const tweetId = params.tweet

  try {
    const tweet = await getTweet(tweetId)
    return tweet ? { props: { tweet } } : { notFound: true }
  } catch (error) {
    return { notFound: true }
  }
}

export async function getStaticPaths() {
  return { paths: [], fallback: true }
}

export default function Page({ tweet }: { tweet: Tweet }) {
  const { isFallback } = useRouter()
  return isFallback ? <TweetSkeleton /> : <EmbeddedTweet tweet={tweet} />
}
```

To see the code in action go to: [/apps/next-app/pages/dark/[tweet].tsx](/apps/next-app/pages/dark/[tweet].tsx).

### Adding `next/image`

Add the domain URLs from Twitter to [`images.remotePatterns`](https://nextjs.org/docs/api-reference/next/image#remote-patterns) in `next.config.js`:

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

In `tweet-components.tsx` or elsewhere, import the `Image` component from `next/image` and use it to define custom image components for the tweet:

```tsx
import Image from 'next/image'
import type { TweetComponents } from 'react-tweet'

export const components: TweetComponents = {
  AvatarImg: (props) => <Image {...props} />,
  MediaImg: (props) => <Image {...props} fill unoptimized />,
}
```

Then pass the `components` prop to `Tweet`:

```tsx
import { Tweet } from 'react-tweet'
import { components } from './tweet-components'

export default function Page() {
  return <Tweet id="1628832338187636740" components={components} />
}
```

## Running the test app

Clone this repository and run the following commands:

```bash
pnpm install && pnpm dev --filter=apps/next-app...
```

The app shows the usage of `react-tweet` in different scenarios:

- http://localhost:3000/light/1629307668568633344 renders the tweet in the app router.
- http://localhost:3000/dark/1629307668568633344 renders the tweet using SSG in the pages directory.
- http://localhost:3000/light/mdx rendes the tweet in MDX (with the experimental `mdxRs` config enabled).
- http://localhost:3000/light/suspense/1629307668568633344 renders the tweet with a custom `Suspense` wrapper.
- http://localhost:3000/dark/swr/1629307668568633344 uses `apiUrl` to change the API endpoint from which the tweet is fetched in SWR mode.

The app uses the `react-tweet` package in the root directory, so you can make changes to the package and see the changes reflected in the app immediately.
