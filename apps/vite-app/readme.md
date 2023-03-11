# react-tweet for Vite

## Installation

Follow the [installation docs in the main README](/readme.md#installation).

## Usage

In any component, import [`Tweet`](/readme.md#tweet) from `react-tweet` and use it like so:

```tsx
import { Tweet } from 'react-tweet'

export const IndexPage = () => <Tweet id="1628832338187636740" />
```

To see the code in action go to: [/apps/vite-app/src/pages/index.tsx](/apps/vite-app/src/pages/index.tsx).

You can learn more about `react-tweet` in the [API Reference](/readme.md#api-reference).

## Running the test app

Clone this repository and run the following commands:

```bash
pnpm install && pnpm dev --filter=vite-app...
```

The app shows the usage of `react-tweet` in different scenarios:

- http://localhost:5173 renders a single tweet.
- http://localhost:5173/tweet/1629307668568633344 renders dynamic tweets with SWR. `Tweet` already uses SWR and this page shows how to implement it manually.

`react-tweet` is imported from the root directory, so you can make changes to the package and see the changes reflected in the app immediately.
