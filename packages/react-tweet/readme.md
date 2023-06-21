# react-tweet

Embedded and static tweet for React applications.

## Installation

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
- [Vite](/apps/vite-app/readme.md)
- [Create React App](/apps/create-react-app/readme.md)

## Choosing a theme

The [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) CSS media feature is used to select the theme of the tweet.

### Toggling theme manually

The closest `data-theme` attribute on a parent element can determine the theme of the tweet. You can set it to `light` or `dark`, like so:

```tsx
<div data-theme="dark">
  <Tweet id="1629307668568633344" />
</div>
```

Alternatively, a parent with the class `light` or `dark` will also work:

```tsx
<div className="dark">
  <Tweet id="1629307668568633344" />
</div>
```

### Updating the theme

In CSS Modules, you can use the `:global` selector to update the CSS variables used by themes:

```css
.my-class :global(.react-tweet-theme) {
  --tweet-body-font-size: 1rem;
}
```

For Global CSS the usage of `:global` is not necessary.

## API Reference

### `Tweet`

```tsx
import { Tweet } from 'react-tweet'
```

Fetches and renders the tweet. It accepts the following props:

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

Renders a tweet. It accepts the following props:

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

function getTweet(id: string): Promise<Tweet | undefined>
```

Fetches and returns the tweet data. It accepts the following params:

- **id** - `string`: the tweet ID. For example in `https://twitter.com/chibicode/status/1629307668568633344` the tweet ID is `1629307668568633344`. This is the only required prop.

If a tweet is not found it returns `undefined`.

## Custom tweet components

Default components used by [`Tweet`](#tweet) and [`EmbeddedTweet`](#embeddedtweet) can be replaced by passing a `components` prop. It extends the `TweetComponents` type exported from `react-tweet`:

```ts
type TweetComponents = {
  TweetNotFound?: (props: Props) => JSX.Element
  AvatarImg?: (props: AvatarImgProps) => JSX.Element
  MediaImg?: (props: MediaImgProps) => JSX.Element
}
```

For example, to replace the default `img` tag used for the avatar and media with `next/image` you can do the following:

```tsx
// tweet-components.tsx
import Image from 'next/image'
import type { TweetComponents } from 'react-tweet'

export const components: TweetComponents = {
  AvatarImg: (props) => <Image {...props} />,
  MediaImg: (props) => <Image {...props} fill unoptimized />,
}
```

And then pass the components to `Tweet` or `EmbeddedTweet`:

```tsx
import { components } from './tweet-components'

const MyTweet = ({ id }: { id: string }) => (
  <Tweet id={id} components={components} />
)
```

## Troubleshooting

Currently, `react-tweet` uses CSS Modules to scope the CSS of each component, so the bundler where it's used needs to support CSS Modules. If you get issues about your bundler not recognizing CSS Modules, please open an issue as we would like to know how well supported this is.
