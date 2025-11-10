# Adapting react-tweet for Val Town

## Executive Summary

**react-tweet** is currently designed for traditional bundler-based React environments (Next.js, Vite, CRA). Adapting it for **Val Town** is feasible but requires addressing several key differences in the runtime environment.

## Current State of react-tweet

### Architecture
- **Monorepo Structure**: Turborepo-based with pnpm workspaces
- **Build System**: SWC transpilation + TypeScript type generation
- **Output Format**: ES modules with explicit `.js` extensions
- **Module Exports**: Dual exports for React Server Components (RSC) and client-side
- **Styling**: CSS Modules (19 files) + global theme CSS with CSS custom properties

### Two Component Variants

1. **Server-Side RSC** (`tweet.tsx`):
   - Async component using `getTweet()`
   - Fetches from Twitter Syndication API at request/build time
   - Wrapped in `<Suspense>` boundary
   - **No client-side JavaScript required**

2. **Client-Side SWR** (`swr.tsx`):
   - Uses `useTweet()` hook with SWR library
   - Client-side data fetching and caching
   - Requires React hooks, state, and effects
   - **Needs browser JavaScript runtime**

### Key Dependencies
```json
{
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0"
  },
  "dependencies": {
    "@swc/helpers": "^0.5.3",
    "clsx": "^2.0.0",
    "swr": "^2.2.4"
  }
}
```

## Val Town Environment

### What Val Town Provides

✅ **Supported:**
- **Deno Runtime**: Modern JavaScript runtime with Web APIs
- **TypeScript/TSX**: Native transpilation (v5.8.3)
- **JSX Support**: Via `@jsxImportSource` pragma
- **npm Imports**: Using `npm:` prefix (e.g., `import React from "npm:react"`)
- **CDN Imports**: Direct HTTPS imports (e.g., `https://esm.sh/react`)
- **fetch API**: Standard Web Fetch for HTTP requests
- **ES Modules**: Full ESM support with explicit extensions

❌ **Not Supported:**
- **Client-Side React**: No hooks, refs, useState, useEffect in browser
- **Bundlers**: No Vite, Webpack, Rollup, or build step
- **Filesystem**: Sandboxed environment (no fs access)
- **CSS Modules**: No bundler to process `.module.css` imports

⚠️ **Limited Support:**
- **JSX is Server-Side Only**: Renders to HTML strings, not interactive components
- **Styling**: Must use inline styles, style tags, or external stylesheets

### Val Town JSX Pattern

```typescript
/** @jsxImportSource https://esm.sh/react */

export default async function() {
  return (
    <html>
      <head>
        <title>My Page</title>
      </head>
      <body>
        <h1>Hello from Val Town!</h1>
      </body>
    </html>
  );
}
```

## Compatibility Analysis

### What Works ✅

1. **Server-Side Tweet Rendering**
   - The RSC `tweet.tsx` component should work with modifications
   - `fetchTweet()` and `getTweet()` API functions are compatible (use standard fetch)
   - All tweet utility functions (`enrichTweet`, formatters, etc.)
   - TypeScript types for Tweet, User, Media entities

2. **Core JavaScript Logic**
   - ES module imports with `.js` extensions (Deno-compatible)
   - No Node.js-specific APIs used
   - Standard Web APIs (fetch, URL, etc.)
   - Date utilities and text formatting

3. **React Components (Server-Only)**
   - All UI components in `twitter-theme/` folder
   - Component composition and props
   - SVG icon components
   - Conditional rendering logic

### What Doesn't Work ❌

1. **Client-Side Components**
   - `swr.tsx` component (uses hooks)
   - `useTweet()` hook (client-side state)
   - `useMounted()` hook
   - SWR library dependency
   - Any interactive features requiring browser JavaScript

2. **CSS Modules**
   - `.module.css` imports (e.g., `import s from './tweet.module.css'`)
   - CSS modules are compiled to JS objects by bundlers
   - No bundler in Val Town to process these

3. **Build-Time Dependencies**
   - `@swc/helpers` (only needed for transpilation)
   - Assuming Val Town's JSX transformer handles this differently

### What Needs Adaptation ⚠️

1. **Styling System**
   - Convert CSS modules to inline styles or CSS-in-JS
   - OR bundle all CSS into single stylesheet string
   - OR use Deno-compatible CSS solution

2. **Import Paths**
   - Change npm imports from relative to `npm:` prefix
   - Example: `import React from "npm:react"`
   - Example: `import { clsx } from "npm:clsx"`

3. **JSX Configuration**
   - Add `@jsxImportSource` pragma to each file
   - May need to adjust JSX factory/fragment settings

4. **Module Resolution**
   - Ensure all imports use explicit `.js` extensions (already done)
   - Verify Deno can resolve the module graph

## Proposed Adaptation Strategy

### Phase 1: Create Val Town-Compatible Fork

Create a new package structure optimized for Val Town:

```
packages/
  react-tweet-valtown/
    src/
      index.ts              # Single entry point
      api.ts                # Tweet fetching (already compatible)
      components.tsx        # All UI components (inline styles)
      types.ts              # TypeScript definitions
      utils.ts              # Utility functions
      styles.ts             # Embedded CSS as template strings
```

### Phase 2: Address CSS Modules

**Option A: Inline Styles (Recommended for MVP)**
- Convert each CSS module to JavaScript style objects
- Use React's `style` prop: `<div style={styles.container}>`
- Loses CSS features (pseudo-classes, media queries, animations)
- Simplest migration path

**Option B: CSS-in-JS with Template Strings**
- Embed all CSS as strings in a single module
- Inject into `<style>` tag in HTML head
- Preserves all CSS features
- Example:
  ```typescript
  const styles = `
    .react-tweet-theme { /* styles */ }
    .tweet-container { /* styles */ }
  `;

  export const TweetWithStyles = ({ id }) => (
    <>
      <style>{styles}</style>
      <Tweet id={id} />
    </>
  );
  ```

**Option C: External Stylesheet CDN**
- Host compiled CSS on CDN (esm.sh, jsDelivr, unpkg)
- Reference in HTML head
- Requires deploying CSS separately
- Most similar to original behavior

### Phase 3: Modify Import Statements

Transform all imports to Val Town format:

**Before:**
```typescript
import React from 'react'
import { clsx } from 'clsx'
import { enrichTweet } from './utils.js'
```

**After:**
```typescript
/** @jsxImportSource https://esm.sh/react */
import { clsx } from "npm:clsx"
import { enrichTweet } from './utils.ts'
```

### Phase 4: Remove Client-Side Code

- Remove `swr.tsx` component entirely
- Remove `useTweet()` and `useMounted()` hooks
- Remove `swr` dependency
- Keep only server-side `tweet.tsx` component
- Document that interactive features aren't supported

### Phase 5: Create Val Town Example

Create a working Val Town "val" demonstrating usage:

```typescript
/** @jsxImportSource https://esm.sh/react */

import { Tweet } from "./react-tweet-valtown/index.ts"

export default async function(req: Request) {
  const url = new URL(req.url)
  const tweetId = url.searchParams.get("id") || "1234567890"

  return new Response(
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Tweet {tweetId}</title>
      </head>
      <body>
        <Tweet id={tweetId} />
      </body>
    </html>,
    {
      headers: { "Content-Type": "text/html; charset=utf-8" }
    }
  )
}
```

## Technical Challenges & Solutions

### Challenge 1: CSS Module Transformation

**Problem**: CSS modules like `tweet-container.module.css` are imported as JS objects:
```typescript
import s from './tweet-container.module.css'
// s = { root: 'tweet-container_root__abc123', ... }
```

**Solution**: Create a build script that:
1. Parses all CSS modules
2. Generates scoped class names
3. Outputs a single CSS string
4. Creates a JavaScript object mapping original names to scoped names
5. Embeds both in the Val Town package

Example output:
```typescript
// generated-styles.ts
export const CSS = `
  .tweet-container_root__abc123 { /* styles */ }
  .tweet-header_header__def456 { /* styles */ }
`

export const classNames = {
  'tweet-container': { root: 'tweet-container_root__abc123' },
  'tweet-header': { header: 'tweet-header_header__def456' }
}
```

### Challenge 2: External Dependencies Compatibility

**Problem**: Need to verify `@swc/helpers` and `clsx` work in Deno.

**Solution**:
- `clsx`: Pure JavaScript, no special runtime needs → ✅ Will work via npm:
- `@swc/helpers`: Only needed for SWC transpilation → ❌ Remove, Val Town handles transpilation
- `swr`: Client-side only → ❌ Remove entirely

### Challenge 3: Tweet Fetching API

**Problem**: `fetchTweet()` uses Twitter's syndication API. Need to ensure CORS and auth work.

**Solution**: Server-side fetch in Val Town bypasses CORS. Should work as-is since Val Town vals are server-side.

Test:
```typescript
import { fetchTweet } from "npm:react-tweet/api"

const tweet = await fetchTweet("1234567890")
console.log(tweet)
```

### Challenge 4: Suspense Boundaries

**Problem**: Original component uses `<Suspense>` for async data loading.

**Solution**: Val Town's JSX is evaluated server-side, so `async`/`await` works directly:

**Before (RSC):**
```typescript
export const Tweet = ({ id }) => (
  <Suspense fallback={<TweetSkeleton />}>
    <TweetContent id={id} />
  </Suspense>
)

const TweetContent = async ({ id }) => {
  const tweet = await getTweet(id)
  return <EmbeddedTweet tweet={tweet} />
}
```

**After (Val Town):**
```typescript
export const Tweet = async ({ id }) => {
  const tweet = await getTweet(id)
  if (!tweet) return <TweetNotFound />
  return <EmbeddedTweet tweet={tweet} />
}
```

## Implementation Roadmap

### Milestone 1: Proof of Concept (1-2 days)
- [ ] Create minimal Val Town val that imports `react-tweet/api`
- [ ] Test `fetchTweet()` function works in Val Town
- [ ] Render a basic tweet using inline styles
- [ ] Verify JSX rendering works end-to-end

### Milestone 2: Style System (2-3 days)
- [ ] Build script to extract all CSS from modules
- [ ] Combine into single CSS string with scoped classes
- [ ] Generate class name mapping object
- [ ] Test styling matches original

### Milestone 3: Component Adaptation (3-4 days)
- [ ] Port all components from `twitter-theme/` folder
- [ ] Replace CSS module imports with generated class names
- [ ] Remove client-side hooks and state
- [ ] Add `@jsxImportSource` pragmas
- [ ] Change imports to `npm:` format

### Milestone 4: Package & Documentation (2-3 days)
- [ ] Create `react-tweet-valtown` package structure
- [ ] Write Val Town-specific README
- [ ] Create example vals demonstrating usage
- [ ] Document limitations (no client-side interactivity)
- [ ] Publish to npm (optional) or distribute as val

### Milestone 5: Testing & Refinement (2-3 days)
- [ ] Test with various tweet types (images, videos, polls, quotes)
- [ ] Test with private/deleted tweets (tombstones)
- [ ] Verify performance (Val Town has execution time limits)
- [ ] Add error handling for Val Town specific edge cases
- [ ] Optimize bundle size if needed

**Total Estimated Time**: 10-15 days for complete adaptation

## Alternative Approach: Minimal Wrapper

If full adaptation is too complex, create a lightweight wrapper:

```typescript
/** @jsxImportSource https://esm.sh/react */

// Import only the API functions
import { fetchTweet } from "npm:react-tweet/api"
import { clsx } from "npm:clsx"

// Inline minimal styles
const styles = `
  .tweet { /* minimal styling */ }
`

// Rebuild a simplified Tweet component
export async function SimpleTweet({ id }: { id: string }) {
  const tweet = await fetchTweet(id)

  if (!tweet) {
    return <div>Tweet not found</div>
  }

  return (
    <>
      <style>{styles}</style>
      <div className="tweet">
        <div className="tweet-header">
          <img src={tweet.user.profile_image_url_https} alt={tweet.user.name} />
          <span>{tweet.user.name}</span>
          <span>@{tweet.user.screen_name}</span>
        </div>
        <div className="tweet-body">
          <p>{tweet.text}</p>
        </div>
      </div>
    </>
  )
}
```

This gives basic functionality quickly but loses:
- Advanced layout and styling
- Media handling (images, videos)
- Quote tweets
- Threading indicators
- Accessibility features
- Dark mode support

## Recommendations

### For Val Town Users (Short Term)
1. **Use the API-only approach**: Import `react-tweet/api` for `fetchTweet()` and build custom UI
2. **Start with simplified component**: Render basic tweet structure with inline styles
3. **Iterate on styling**: Add CSS gradually as needed
4. **Skip client-side features**: Embrace server-only rendering

### For react-tweet Maintainers (Long Term)
1. **Create official Val Town adapter**: Maintain as separate package
2. **Extract API into standalone package**: Make `react-tweet/api` framework-agnostic
3. **Provide CSS-in-JS option**: Alternative to CSS modules for environments without bundlers
4. **Document serverless usage**: Add guide for Deno, Cloudflare Workers, Val Town

## Conclusion

**react-tweet CAN work in Val Town**, but requires:
1. **Using only the server-side component** (no client-side SWR variant)
2. **Solving the CSS modules problem** (inline styles, embedded CSS, or external stylesheet)
3. **Adapting imports** to Val Town's `npm:` prefix pattern
4. **Removing build tool dependencies**

The **recommended approach** is:
- Start with a **Proof of Concept** using the API functions
- Build a **simplified Tweet component** with inline styles
- **Incrementally add** features and styling as needed
- Consider creating a **dedicated Val Town package** if there's demand

The **biggest challenge** is CSS modules. The **biggest opportunity** is that Val Town's server-side JSX model actually aligns well with React Server Components, which react-tweet already supports!
