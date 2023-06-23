/* eslint-disable jsx-a11y/alt-text */
import { TweetNotFound } from './tweet-not-found.jsx'

type AvatarImgProps = {
  src: string
  alt: string
  width: number
  height: number
}

type MediaImgProps = {
  src: string
  alt: string
  className?: string
  draggable?: boolean
}

const AvatarImg = (props: AvatarImgProps) => <img {...props} />
const MediaImg = (props: MediaImgProps) => <img {...props} />

// Note: these components can only be used by Server Components. Because the root `Tweet`
// component that uses them is a Server Component, and you can't pass down functions to a
// client component unless they're Server Actions.
export const defaultComponents = {
  TweetNotFound,
  AvatarImg,
  MediaImg,
}

export type TweetComponents = Partial<typeof defaultComponents>

// Export the not found component as it could be useful to manually import it for SSG
export { TweetNotFound }

// Also export every other component that's part of our default theme (the Twitter theme) as that
// can be useful for anyone that wans to do more deep edits in the default theme.
export * from './embedded-tweet.js'
// export * from './tweet-skeleton.js'
