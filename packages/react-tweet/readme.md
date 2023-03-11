# react-tweet

Embedded and static tweet for React applications.

## Installation

> Next.js 13.2.1 or higher is required in order to use `react-tweet`.

Install `react-tweet` using your package manager of choice:

```bash
pnpm add react-tweet
```

```bash
yarn add react-tweet
```

```bash
npm install react-tweet
```

Now follow the usage instructions for your framework or builder:

- [Next.js](/apps/next-app/readme.md)

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

## API Reference

### `Tweet`

```tsx
import { Tweet } from 'react-tweet'
```

`Tweet` accepts the following props:

- **id** - `string`: the tweet ID. For example in `https://twitter.com/chibicode/status/1629307668568633344` the tweet ID is `1629307668568633344`. This is the only required prop.
- **fallback** - `ReactNode`: The fallback component to render while the tweet is loading. Defaults to `TweetSkeleton`.
- **onError** - `(error?: any) => any`: The returned error will be sent to the `TweetNotFound` component.
- **components** - `TweetComponents`: Components to replace the default tweet components. See the [custom tweet components](#custom-tweet-components) section for more details.

If the environment where `Tweet` is used does not support React Server Components then it will work with [SWR](https://swr.vercel.app/) instead and the tweet will be fetched from `https://react-tweet.vercel.app/api/tweet/:id`, which is CORS friendly.

We recommend adding your own API route to fetch the tweet in production. You can do it by using the `apiUrl` prop:

```tsx
<Tweet apiUrl={id && `/api/tweet/${id}`} />
```

> Note: `apiUrl` does nothing if the Tweet is rendered in a server component because it can fetch directly from Twitter's CDN.

To see it in action go to: [/apps/next-app/pages/dark/swr/[tweet].tsx](/apps/next-app/pages/dark/swr/[tweet].tsx). And here's a good example of how to setup your own API route: [/apps/vite-app/api/tweet/[tweet].ts](/apps/vite-app/api/tweet/[tweet].ts).

### `EmbeddedTweet`

```tsx
import { EmbeddedTweet } from 'react-tweet'
```

`EmbeddedTweet` accepts the following props:

- **tweet** - `Tweet`: the tweet data, as returned by `getTweet`. Required.
- **components** - `TweetComponents`: Components to replace the default tweet components. See the [custom tweet components](#custom-tweet-components) section for more details.

### `TweetSkeleton`

```tsx
import { TweetSkeleton } from 'react-tweet'
```

A tweet skeleton useful for loading states.

### `TweetNotFound`

```tsx
import { TweetNotFound } from 'react-tweet'
```

A tweet not found component. It accepts the following props:

- **error** - `any`: the error that was thrown when fetching the tweet. Not required.

### `getTweet`

```tsx
import { getTweet } from 'react-tweet/api'

await getTweet(id)
```

Fetches and returns the tweet data. It accepts the following params:

- **id** - `string`: the tweet ID. For example in `https://twitter.com/chibicode/status/1629307668568633344` the tweet ID is `1629307668568633344`. This is the only required prop.

## Running the test app

Clone this repository and run the following command:

```bash
pnpm install && pnpm dev
```

Now visit http://localhost:3000/light/1629307668568633344 to see the tweet in the app directory, and http://localhost:3000/dark/1629307668568633344 to see the tweet in the pages directory.

The test app uses the `react-tweet` package in the root directory, so you can make changes to the package and see the changes reflected in the test app immediately.
