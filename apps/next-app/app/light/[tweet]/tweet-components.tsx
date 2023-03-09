/* eslint-disable jsx-a11y/alt-text */
import Image from 'next/image'
import type { TweetComponents } from 'next-tweet'

export const components: TweetComponents = {
  AvatarImg: (props) => <Image {...props} />,
  MediaImg: (props) => <Image {...props} fill draggable unoptimized />,
}
