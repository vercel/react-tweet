import format from 'date-fns/format/index.js'
import { formatNumber } from './utils.js'

export const defaultLocales = {
  actions: {
    copy: {
      ariaLabel: 'Copy link',
      text: 'Copy link',
      altText: 'Copy link to Tweet',
      done: 'Copied!',
    },
    like: {
      ariaLabel: (favoriteCount: number) => `Like. This Tweet has ${favoriteCount} likes`,
      text: (favoriteCount: number) => formatNumber(favoriteCount),
    },
    reply: {
      ariaLabel: 'Reply to this Tweet on Twitter',
      text: 'Reply'
    },
  },
  header: {
    author: {
      verified: {
        ariaLabel: 'Verified account',
      },
    },
    authorMeta: {
      followText: 'Follow',
    },
    brand: {
      ariaLabel: 'View on Twitter',
    },
  },
  tweet: {
    inReply: {
      text: (screenName?: string) => `Replying to @${screenName}`,
    },
    info: {
      ariaLabel: 'Twitter for Websites, Ads Information and Privacy',
      createdAt: {
        ariaLabel: (createdAt: Date) => format(createdAt, 'h:mm a · MMM d, y'),
        text: (createdAt: Date) => format(createdAt, 'h:mm a · MMM d, y'),
      },
    },
    media: {
      video: {
        play: {
          ariaLabel: 'View video on Twitter',
        },
      },
    },
  },
  notFound: {
    heading: (_error: any) => 'Tweet not found',
    text: (_error: any) => 'Tweet not found',
  },
  readMore: {
    text: (conversationCount: number) => {
      if (conversationCount === 0) return 'Read more on Twitter'

      return conversationCount === 1
        ? `Read ${formatNumber(conversationCount)} reply`
        : `Read ${formatNumber(conversationCount)} replies`
    },
  },
}

export type Locales = typeof defaultLocales;
