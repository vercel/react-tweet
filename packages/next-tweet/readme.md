# next-tweet

Embedded and static tweet for Next.js applications.

## Installation

> Next.js 13.2.1 or higher is required in order to use `next-tweet`. I have not yet tested it outside Next.js.

Install `next-tweet` using your package manager of choice:

```bash
pnpm add next-tweet

# or

yarn add next-tweet

# or

npm install next-tweet
```

## How to use in the app directory

In any component, import `NextTweet` from `next-tweet` and use it like so:

```tsx
import { NextTweet } from 'next-tweet'

export default async function Page({ params }: Props) {
  // @ts-ignore: Async components are valid in the app directory
  return (
    <div data-theme="light">
      <NextTweet id={params.tweet} priority />
    </div>
  )
}
```

- `params.tweet` - `string`: the tweet ID. For example in `https://twitter.com/chibicode/status/1629307668568633344` the tweet ID is `1629307668568633344`.
- `priority` - `boolean`: sets the [`priority` prop](https://nextjs.org/docs/basic-features/image-optimization#priority) in the Tweet's images. Only enable this if the tweet is visible above the fold. Defaults to `false`.
- `notFoundOnError` - `boolean`: if `true`, the component will show a not found message if the tweet fails to load (invalid id, no longer exists, account went private, etc). Otherwise, it will throw an error. Defaults to `false`.

`NextTweet` takes care of fetching the tweet and rendering it. You can see it working in the [test app](/apps/test-app/app/light/[tweet]/page.tsx) that's part of this monorepo.

## Choosing a theme

The closest `data-theme` attribute on a parent element determines the theme of the tweet. You can set it to `light` or `dark`.

## How to use in the pages directory

First, use the `getTweet` function from `next-tweet` to fetch the tweet and send it as props to the page component:

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

export default function Page({ tweet }: { tweet: Tweet }) {
  return <TweetPage tweet={tweet} />
}
```

The `TweetPage` component uses `EmbeddedTweet` to render the tweet, and `TweetSkeleton` to render a skeleton in case you need a loading state (e.g. when using [`fallback: true`](https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#fallback-true) in `getStaticProps`):

```tsx
import type { FC } from 'react'
import { useRouter } from 'next/router'
import { EmbeddedTweet, TweetSkeleton } from 'next-tweet'
import type { Tweet } from 'next-tweet/api'

const TweetPage: FC<{ tweet: Tweet }> = ({ tweet }) => {
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
