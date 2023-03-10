import { TweetNotFound } from './tweet-not-found.js'

/* eslint-disable jsx-a11y/alt-text */
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

export type TweetComponents = Partial<typeof defaultComponents>
// Export the not found component as it could be useful to manually import it for SSG
export { TweetNotFound }

const AvatarImg = (props: AvatarImgProps) => <img {...props} />
const MediaImg = (props: MediaImgProps) => <img {...props} />

export const defaultComponents = {
  TweetNotFound,
  AvatarImg,
  MediaImg,
}
