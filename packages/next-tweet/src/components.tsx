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

const AvatarImg = (props: AvatarImgProps) => <img {...props} />
const MediaImg = (props: MediaImgProps) => <img {...props} />

export const defaultComponents = {
  AvatarImg,
  MediaImg,
}
