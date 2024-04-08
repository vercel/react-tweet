# react-tweet

## 3.2.1

### Patch Changes

- 323e026: Added multiple improvements from community PRs:

  - https://github.com/vercel/react-tweet/pull/163: Removed the date-fns dependency and made the time component a server component.
  - https://github.com/vercel/react-tweet/pull/161: Updated media buttons to use X instead of Twitter.
  - https://github.com/vercel/react-tweet/pull/142: Added `Hexagon` to the API types.
  - https://github.com/vercel/react-tweet/pull/138: Add `nofollow` to tweet links.

## 3.2.0

### Minor Changes

- 261e72d: Updated docs on caching tweets and added fetchTweet function.

## 3.1.1

### Patch Changes

- dc5cadf: Added missing token to API requests to Twitter's CDN

## 3.1.0

### Minor Changes

- 27d98ab: Added quoted tweet support and updated logo

## 3.0.4

### Patch Changes

- 96e539a: - Fix position twitter icon for dir=rtl (#102)
  - Fix: bump author padding (#106)
  - Fix regression in media layout with multiple images (#103)

## 3.0.3

### Patch Changes

- 42d317f: Updated Twitter theme

## 3.0.2

### Patch Changes

- af50d09: Better CSS defaults to avoid external CSS conflicts

## 3.0.1

### Patch Changes

- cc13ec8: Allow fetch options to be customized

## 3.0.0

### Major Changes

- 7a92646: Theme support

## 2.0.2

### Patch Changes

- 938522d: Check for default export in swr import

## 2.0.1

### Patch Changes

- da92443: - Use `text-overflow: ellipsis` to truncate the user name when the width is small
  - Updated components type for `EmbeddedTweet` to exclude not found.
  - Added docs for CSS imports fix when importing the components in Next.js `pages`.
  - Use custom `MediaImg` component if provided.

## 2.0.0

### Major Changes

- 54525e6: - Renamed `next-tweet` to `react-tweet`.
  - The whole API has changed to be more flexible and work outside of Next.js.

## 0.8.1

### Patch Changes

- 2c38f71: Fix default theme not loading styles

## 0.8.0

### Minor Changes

- f5a987e: Improved accessibility, added support for symbols, improved decoding and improved theming.

## 0.7.2

### Patch Changes

- af479ea: Fixed theme in skeleton

## 0.7.1

### Patch Changes

- 531bb40: Updated docs

## 0.7.0

### Minor Changes

- b77efa2: Added video support and theme switching with class

## 0.6.1

### Patch Changes

- 82c9f9d: Added support for prefers-color-scheme

## 0.6.0

### Minor Changes

- 677d907: Added docs and improved theme support

## 0.5.0

### Minor Changes

- 3918e7c: Updated Next.js minimum version

## 0.4.0

### Minor Changes

- 91cf084: Use SWC for compilation, transpilePackages is no longer required for Next.js apps now

## 0.3.0

### Minor Changes

- 07bce2b: Improved theme support and error handling

## 0.2.1

### Patch Changes

- ec2e654: Moved use-mounted to typescript to avoid missing declaration error

## 0.2.0

### Minor Changes

- 2702828: Added NextTweet component, and priority prop for images

## 0.1.0

### Minor Changes

- b69303b: First version of next-tweet, with app directory support
