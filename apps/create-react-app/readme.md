# react-tweet for create-react-app

## Installation

Follow the [installation docs in the main README](/readme.md#installation).

## Usage

In any component, import [`Tweet`](/readme.md#tweet) from `react-tweet` and use it like so:

```tsx
import { Tweet } from 'react-tweet'

export default function App() {
  return <Tweet id="1628832338187636740" />
}
```

To see the code in action go to: [/apps/create-react-app/src/app.js](/apps/create-react-app/src/app.js).

You can learn more about `react-tweet` in the [API Reference](/readme.md#api-reference).

## Running the test app

Clone this repository and run the following commands:

```bash
pnpm install && pnpm dev --filter=create-react-app...
```

The app will be up and running at http://localhost:3001.

`react-tweet` is imported from the root directory, so you can make changes to the package and see the changes reflected in the app immediately.
