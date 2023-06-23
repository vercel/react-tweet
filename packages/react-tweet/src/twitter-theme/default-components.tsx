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

/**
 * Custom components that the default Twitter theme allows.
 *
 * Note: We only use these components in Server Components, because the root `Tweet`
 * component that uses them is a Server Component and you can't pass down functions to a
 * client component unless they're Server Actions.
 */
export const defaultComponents = {
  TweetNotFound,
  AvatarImg,
  MediaImg,
}

/**
 * Custom components that the default Twitter theme allows.
 */
export type TwitterComponents = Partial<typeof defaultComponents>

/**
 * @deprecated Use `TwitterComponents` instead.
 */
export type TweetComponents = TwitterComponents
