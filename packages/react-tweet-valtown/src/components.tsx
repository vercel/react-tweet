/** @jsxImportSource npm:react */
import type { ReactNode } from "npm:react";
import type { Tweet, EnrichedTweet, EnrichedQuotedTweet, TweetUser } from "./api/types/index.ts";
import { enrichTweet, formatNumber, formatDate, getMediaUrl } from "./utils.ts";

// =============================================================================
// Types
// =============================================================================

export type TwitterComponents = {
  TweetNotFound?: () => JSX.Element;
  AvatarImg?: (props: { src: string; alt: string; width: number; height: number }) => JSX.Element;
  MediaImg?: (props: { src: string; alt: string }) => JSX.Element;
};

// =============================================================================
// Helper Components
// =============================================================================

const TweetLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <a
    href={href}
    className="text-[rgb(29,155,240)] no-underline hover:underline"
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>
);

// =============================================================================
// Avatar Component
// =============================================================================

const AvatarImg = ({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) => (
  <img src={src} alt={alt} width={width} height={height} className="w-full h-full object-cover" />
);

const MediaImg = ({ src, alt }: { src: string; alt: string }) => (
  <img src={src} alt={alt} className="absolute top-0 left-0 bottom-0 h-full w-full m-0 object-cover object-center" loading="lazy" />
);

// =============================================================================
// Verified Badge Component
// =============================================================================

const VerifiedBadge = ({ user, className }: { user: TweetUser; className?: string }) => {
  if (!user.verified && !user.is_blue_verified && !user.verified_type) {
    return null;
  }

  const iconColor = user.is_blue_verified || user.verified_type === "Blue"
    ? "[rgb(29,155,240)]"
    : "[rgb(130,154,171)]";

  return (
    <span className={className}>
      <svg
        viewBox="0 0 22 22"
        aria-label="Verified account"
        role="img"
        className={`inline-block w-[1.25em] h-[1.25em] ml-[0.125rem] fill-current text-${iconColor}`}
      >
        <g>
          <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"></path>
        </g>
      </svg>
    </span>
  );
};

// =============================================================================
// Tweet Container Component
// =============================================================================

export const TweetContainer = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div
    className={`react-tweet w-full min-w-[250px] max-w-[550px] overflow-hidden text-[rgb(15,20,25)] dark:text-[rgb(247,249,249)] font-sans font-normal border border-[rgb(207,217,222)] dark:border-[rgb(66,83,100)] rounded-xl my-6 bg-[#fff] dark:bg-[rgb(21,32,43)] transition-[background-color,box-shadow] duration-200 hover:bg-[rgb(247,249,249)] dark:hover:bg-[rgb(30,39,50)] ${className || ""}`}
  >
    <article className="relative box-border p-3">{children}</article>
  </div>
);

// =============================================================================
// Tweet Header Component
// =============================================================================

export const TweetHeader = ({ tweet, components }: { tweet: EnrichedTweet; components?: TwitterComponents }) => {
  const Img = components?.AvatarImg ?? AvatarImg;
  const { user } = tweet;
  const isSquare = user.profile_image_shape === "Square";

  return (
    <div className="flex pb-3 leading-5 text-[0.9375rem] whitespace-nowrap break-words overflow-hidden">
      <a href={tweet.url} className="relative h-12 w-12" target="_blank" rel="noopener noreferrer">
        <div className={`h-full w-full absolute overflow-hidden ${isSquare ? "rounded" : "rounded-full"}`}>
          <Img src={user.profile_image_url_https} alt={user.name} width={48} height={48} />
        </div>
        <div className="h-full w-full absolute overflow-hidden rounded-full">
          <div className="h-full w-full transition-[background-color] duration-200 shadow-[rgb(0_0_0_/_3%)_0px_0px_2px_inset] hover:bg-[rgba(26,26,26,0.15)]"></div>
        </div>
      </a>
      <div className="max-w-[calc(100%-84px)] flex flex-col justify-center mx-2">
        <a href={tweet.url} className="no-underline text-inherit flex items-center hover:underline" target="_blank" rel="noopener noreferrer">
          <div className="font-bold text-ellipsis overflow-hidden whitespace-nowrap">
            <span title={user.name}>{user.name}</span>
          </div>
          <VerifiedBadge user={user} className="inline-flex" />
        </a>
        <div className="flex">
          <a href={tweet.url} className="text-[rgb(83,100,113)] dark:text-[rgb(139,152,165)] no-underline text-ellipsis" target="_blank" rel="noopener noreferrer">
            <span title={`@${user.screen_name}`}>@{user.screen_name}</span>
          </a>
          <div className="flex">
            <span className="px-1">·</span>
            <a href={user.follow_url} className="text-[rgb(0,111,214)] dark:text-[rgb(107,201,251)] no-underline font-bold hover:underline" target="_blank" rel="noopener noreferrer">
              Follow
            </a>
          </div>
        </div>
      </div>
      <a href={tweet.url} className="ml-auto" target="_blank" rel="noopener noreferrer" aria-label="View on Twitter">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="w-[23.75px] h-[23.75px] text-[rgb(15,20,25)] dark:text-[rgb(247,249,249)] fill-current select-none">
          <g>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
          </g>
        </svg>
      </a>
    </div>
  );
};

// =============================================================================
// Tweet In Reply To Component
// =============================================================================

export const TweetInReplyTo = ({ tweet }: { tweet: EnrichedTweet }) =>
  tweet.in_reply_to_url ? (
    <a href={tweet.in_reply_to_url} className="flex mb-2 items-center text-[rgb(83,100,113)] dark:text-[rgb(139,152,165)] text-[0.875rem] leading-4 no-underline hover:underline" target="_blank" rel="noopener noreferrer">
      <svg viewBox="0 0 24 24" className="w-5 mr-1 fill-current select-none" aria-hidden="true">
        <g>
          <path d="M12 8.05L11 9.05l-1-1L12.003 6 14 8.046l-1 1.004z"></path>
          <path d="M12 1.75c-5.66 0-10.25 4.59-10.25 10.25S6.34 22.25 12 22.25s10.25-4.59 10.25-10.25S17.66 1.75 12 1.75zm0 18c-4.28 0-7.75-3.47-7.75-7.75S7.72 4.25 12 4.25s7.75 3.47 7.75 7.75-3.47 7.75-7.75 7.75zm0-14.5c-.69 0-1.25.56-1.25 1.25v5.5c0 .69.56 1.25 1.25 1.25s1.25-.56 1.25-1.25v-5.5c0-.69-.56-1.25-1.25-1.25z"></path>
        </g>
      </svg>
      <span>Replying to @{tweet.in_reply_to_screen_name}</span>
    </a>
  ) : null;

// =============================================================================
// Tweet Body Component
// =============================================================================

export const TweetBody = ({ tweet }: { tweet: EnrichedTweet }) => (
  <p className="text-xl font-normal leading-6 m-0 break-words whitespace-pre-wrap" lang={tweet.lang} dir="auto">
    {tweet.entities.map((item, i) => {
      switch (item.type) {
        case "hashtag":
        case "mention":
        case "url":
        case "symbol":
          return (
            <TweetLink key={i} href={item.href}>
              {item.text}
            </TweetLink>
          );
        case "media":
          return null;
        default:
          return <span key={i} dangerouslySetInnerHTML={{ __html: item.text }} />;
      }
    })}
  </p>
);

// =============================================================================
// Tweet Media Component
// =============================================================================

export const TweetMedia = ({ tweet, components }: { tweet: EnrichedTweet; components?: TwitterComponents }) => {
  const Img = components?.MediaImg ?? MediaImg;
  const mediaDetails = tweet.mediaDetails ?? [];
  const mediaCount = mediaDetails.length;

  if (mediaCount === 0) return null;

  const gridClass =
    mediaCount === 1
      ? ""
      : mediaCount === 2
      ? "grid grid-cols-2 gap-0.5"
      : mediaCount === 3
      ? "grid grid-cols-2 gap-0.5 [&>a:first-child]:row-span-2"
      : "grid grid-cols-2 grid-rows-2 gap-0.5";

  return (
    <div className="mt-3 overflow-hidden relative border border-[rgb(207,217,222)] dark:border-[rgb(66,83,100)] rounded-xl">
      <div className={`${gridClass} h-full w-full`}>
        {mediaDetails.map((media, i) => (
          <a
            key={media.id_str}
            href={tweet.url}
            className="relative h-full w-full flex items-center justify-center no-underline outline-none"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="relative h-full w-full flex items-center justify-center">
              {media.type === "photo" ? (
                <Img src={getMediaUrl(media, "small")} alt={media.ext_alt_text || `Image ${i + 1}`} />
              ) : media.type === "video" || media.type === "animated_gif" ? (
                <div className="relative w-full pb-[56.25%]">
                  <Img src={media.media_url_https} alt="Video thumbnail" />
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-16 h-16 text-white fill-current opacity-90" aria-hidden="true">
                      <g>
                        <path d="M21 12L4 2v20l17-10z"></path>
                      </g>
                    </svg>
                  </div>
                </div>
              ) : null}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

// =============================================================================
// Tweet Info Component
// =============================================================================

export const TweetInfo = ({ tweet }: { tweet: EnrichedTweet }) => {
  const createdAt = new Date(tweet.created_at);
  const formattedDate = formatDate(createdAt);

  return (
    <div className="flex items-center text-[rgb(83,100,113)] dark:text-[rgb(139,152,165)] mt-0.5 break-words whitespace-nowrap text-ellipsis">
      <a href={tweet.url} className="text-inherit no-underline text-[0.9375rem] leading-5 hover:underline" target="_blank" rel="noopener noreferrer">
        <time dateTime={createdAt.toISOString()}>{formattedDate}</time>
      </a>
      <a href={tweet.url} className="text-inherit h-[calc(1.25em+0.75em)] w-[calc(1.25em+0.75em)] ml-auto flex justify-center items-center mr-[-4px] rounded-full transition-[background-color] duration-200 hover:bg-[rgba(0,111,214,0.1)] dark:hover:bg-[rgba(107,201,251,0.1)]" target="_blank" rel="noopener noreferrer" aria-label="View tweet details">
        <svg viewBox="0 0 24 24" className="text-inherit fill-current h-[1.25em] select-none" aria-hidden="true">
          <g>
            <path d="M12 8.75c-1.24 0-2.25 1.01-2.25 2.25s1.01 2.25 2.25 2.25 2.25-1.01 2.25-2.25S13.24 8.75 12 8.75zm0 3c-.414 0-.75-.336-.75-.75s.336-.75.75-.75.75.336.75.75-.336.75-.75.75z"></path>
            <path d="M19 12c0-.552-.448-1-1-1s-1 .448-1 1 .448 1 1 1 1-.448 1-1zm-12 0c0-.552-.448-1-1-1s-1 .448-1 1 .448 1 1 1 1-.448 1-1z"></path>
          </g>
        </svg>
      </a>
    </div>
  );
};

// =============================================================================
// Tweet Actions Component
// =============================================================================

export const TweetActions = ({ tweet }: { tweet: EnrichedTweet }) => (
  <div className="flex items-center text-[rgb(83,100,113)] dark:text-[rgb(139,152,165)] pt-1 mt-1 border-t border-[rgb(207,217,222)] dark:border-[rgb(66,83,100)] break-words whitespace-nowrap text-ellipsis">
    <a href={tweet.reply_url} className="no-underline text-inherit flex items-center mr-5 group" target="_blank" rel="noopener noreferrer" aria-label="Reply">
      <div className="w-[calc(1.25em+0.75em)] h-[calc(1.25em+0.75em)] flex justify-center items-center ml-[-0.25rem] rounded-full group-hover:bg-[rgba(0,111,214,0.1)] dark:group-hover:bg-[rgba(107,201,251,0.1)]">
        <svg viewBox="0 0 24 24" className="h-[1.25em] fill-current text-[rgb(29,155,240)] select-none" aria-hidden="true">
          <g>
            <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path>
          </g>
        </svg>
      </div>
      <span className="text-[0.875rem] font-bold leading-4 ml-1 group-hover:text-[rgb(0,111,214)] dark:group-hover:text-[rgb(107,201,251)] group-hover:underline">Reply</span>
    </a>
    <a href={tweet.like_url} className="no-underline text-inherit flex items-center mr-5 group" target="_blank" rel="noopener noreferrer" aria-label="Like">
      <div className="w-[calc(1.25em+0.75em)] h-[calc(1.25em+0.75em)] flex justify-center items-center ml-[-0.25rem] rounded-full group-hover:bg-[rgba(249,24,128,0.1)]">
        <svg viewBox="0 0 24 24" className="h-[1.25em] fill-current text-[rgb(249,24,128)] select-none" aria-hidden="true">
          <g>
            <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path>
          </g>
        </svg>
      </div>
      <span className="text-[0.875rem] font-bold leading-4 ml-1 group-hover:text-[rgb(249,24,128)] group-hover:underline">
        {tweet.favorite_count > 0 ? formatNumber(tweet.favorite_count) : "Like"}
      </span>
    </a>
  </div>
);

// =============================================================================
// Tweet Replies Component
// =============================================================================

export const TweetReplies = ({ tweet }: { tweet: EnrichedTweet }) =>
  tweet.conversation_count && tweet.conversation_count > 0 ? (
    <a href={tweet.url} className="flex items-center py-3 text-[rgb(29,155,240)] text-[0.875rem] font-bold leading-4 no-underline hover:underline" target="_blank" rel="noopener noreferrer">
      Read {formatNumber(tweet.conversation_count)} {tweet.conversation_count === 1 ? "reply" : "replies"}
    </a>
  ) : null;

// =============================================================================
// Tweet Not Found Component
// =============================================================================

export const TweetNotFound = () => (
  <TweetContainer>
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <svg viewBox="0 0 24 24" className="w-12 h-12 text-[rgb(83,100,113)] dark:text-[rgb(139,152,165)] fill-current mb-4" aria-hidden="true">
        <g>
          <path d="M12 7c-1.93 0-3.5 1.57-3.5 3.5S10.07 14 12 14s3.5-1.57 3.5-3.5S13.93 7 12 7zm0 5c-.827 0-1.5-.673-1.5-1.5S11.173 9 12 9s1.5.673 1.5 1.5S12.827 12 12 12zm0-10c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zm0 14c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z"></path>
        </g>
      </svg>
      <p className="text-[rgb(83,100,113)] dark:text-[rgb(139,152,165)] text-[0.9375rem] m-0">
        This tweet is unavailable
      </p>
    </div>
  </TweetContainer>
);

// =============================================================================
// Quoted Tweet Component
// =============================================================================

export const QuotedTweet = ({ tweet, components }: { tweet: EnrichedQuotedTweet; components?: TwitterComponents }) => {
  const Img = components?.MediaImg ?? MediaImg;

  return (
    <div className="mt-3 border border-[rgb(207,217,222)] dark:border-[rgb(66,83,100)] rounded-xl overflow-hidden hover:bg-[rgba(0,0,0,0.03)] dark:hover:bg-[rgba(255,255,255,0.03)] transition-[background-color] duration-200">
      <a href={tweet.url} className="block no-underline text-inherit p-3" target="_blank" rel="noopener noreferrer">
        <div className="flex items-center mb-1">
          <div className="flex items-center flex-1 overflow-hidden">
            <div className="relative h-5 w-5 mr-1">
              <div className="h-full w-full absolute overflow-hidden rounded-full">
                <img
                  src={tweet.user.profile_image_url_https}
                  alt={tweet.user.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex items-center flex-1 overflow-hidden text-[0.9375rem] leading-5">
              <span className="font-bold text-ellipsis overflow-hidden whitespace-nowrap mr-1">{tweet.user.name}</span>
              <VerifiedBadge user={tweet.user} className="inline-flex shrink-0" />
              <span className="text-[rgb(83,100,113)] dark:text-[rgb(139,152,165)] text-ellipsis overflow-hidden whitespace-nowrap ml-1">
                @{tweet.user.screen_name}
              </span>
            </div>
          </div>
        </div>
        <div className="text-[0.938rem] font-normal leading-5 my-1 break-words whitespace-pre-wrap">
          {tweet.entities.map((item, i) => {
            switch (item.type) {
              case "hashtag":
              case "mention":
              case "url":
              case "symbol":
                return (
                  <span key={i} className="text-[rgb(29,155,240)]">
                    {item.text}
                  </span>
                );
              case "media":
                return null;
              default:
                return <span key={i} dangerouslySetInnerHTML={{ __html: item.text }} />;
            }
          })}
        </div>
        {tweet.mediaDetails && tweet.mediaDetails.length > 0 && (
          <div className="mt-3 rounded-xl overflow-hidden border border-[rgb(207,217,222)] dark:border-[rgb(66,83,100)]">
            <div className="relative">
              <Img src={getMediaUrl(tweet.mediaDetails[0], "small")} alt={tweet.mediaDetails[0].ext_alt_text || "Quote tweet image"} />
            </div>
          </div>
        )}
      </a>
    </div>
  );
};

// =============================================================================
// Tweet Skeleton Component
// =============================================================================

export const TweetSkeleton = () => (
  <TweetContainer>
    <div className="animate-pulse">
      <div className="flex pb-3">
        <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        <div className="flex-1 ml-3 space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
      </div>
    </div>
  </TweetContainer>
);

// =============================================================================
// Embedded Tweet Component (Main Composition)
// =============================================================================

export const EmbeddedTweet = ({ tweet: t, components }: { tweet: Tweet; components?: Omit<TwitterComponents, "TweetNotFound"> }) => {
  const tweet = enrichTweet(t);
  return (
    <TweetContainer>
      <TweetHeader tweet={tweet} components={components} />
      {tweet.in_reply_to_status_id_str && <TweetInReplyTo tweet={tweet} />}
      <TweetBody tweet={tweet} />
      {tweet.mediaDetails?.length ? <TweetMedia tweet={tweet} components={components} /> : null}
      {tweet.quoted_tweet && <QuotedTweet tweet={tweet.quoted_tweet} components={components} />}
      <TweetInfo tweet={tweet} />
      <TweetActions tweet={tweet} />
      <TweetReplies tweet={tweet} />
    </TweetContainer>
  );
};
