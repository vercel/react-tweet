/**
 * react-tweet-valtown
 *
 * A Val Town-optimized version of react-tweet for server-side rendering
 * in Deno environments without bundlers.
 *
 * @example
 * ```tsx
 * import { Tweet } from "./react-tweet-valtown/src/index.ts";
 *
 * export default async function() {
 *   return (
 *     <html>
 *       <head>
 *         <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
 *       </head>
 *       <body>
 *         <Tweet id="1234567890" />
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */

export * from "./tweet.tsx";
export * from "./api/index.ts";
export * from "./utils.ts";
export type * from "./api/types.ts";
