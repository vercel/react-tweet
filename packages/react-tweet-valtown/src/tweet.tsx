/** @jsxImportSource npm:react */
import { getTweet } from "./api/get-tweet.ts";
import { EmbeddedTweet, TweetNotFound, TweetSkeleton } from "./components.tsx";
import type { TwitterComponents } from "./components.tsx";

export type TweetProps = {
  id: string;
  components?: TwitterComponents;
  fetchOptions?: RequestInit;
  fallback?: JSX.Element;
  onError?: (error: any) => any;
};

/**
 * Main Tweet component for Val Town (server-side only)
 *
 * Fetches and renders a tweet from Twitter's syndication API
 *
 * @example
 * ```tsx
 * <Tweet id="1234567890" />
 * ```
 */
export const Tweet = async ({
  id,
  components,
  fetchOptions,
  fallback = <TweetSkeleton />,
  onError,
}: TweetProps) => {
  try {
    const tweet = await getTweet(id, fetchOptions);

    if (!tweet) {
      const NotFound = components?.TweetNotFound || TweetNotFound;
      return <NotFound />;
    }

    return <EmbeddedTweet tweet={tweet} components={components} />;
  } catch (error) {
    if (onError) {
      onError(error);
    } else {
      console.error("Error fetching tweet:", error);
    }

    const NotFound = components?.TweetNotFound || TweetNotFound;
    return <NotFound />;
  }
};

/**
 * Export all components for custom usage
 */
export {
  EmbeddedTweet,
  TweetContainer,
  TweetHeader,
  TweetBody,
  TweetMedia,
  TweetActions,
  TweetInfo,
  TweetInReplyTo,
  TweetReplies,
  TweetNotFound,
  TweetSkeleton,
  QuotedTweet,
} from "./components.tsx";

/**
 * Export all API functions
 */
export { fetchTweet, getTweet, TwitterApiError } from "./api/index.ts";

/**
 * Export all types
 */
export type { Tweet as TweetData, EnrichedTweet, TweetUser, TwitterComponents } from "./components.tsx";
export type { Tweet as TweetType, QuotedTweet as QuotedTweetType } from "./api/types.ts";

/**
 * Export utilities
 */
export { enrichTweet, formatNumber, formatDate, getMediaUrl } from "./utils.ts";
