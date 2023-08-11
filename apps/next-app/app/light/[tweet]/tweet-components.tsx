/* eslint-disable jsx-a11y/alt-text */
import Image from 'next/image'
import type { TwitterComponents } from 'react-tweet'

export const components: TwitterComponents = {
  AvatarImg: (props) => <Image {...props} />,
  MediaImg: (props) => <Image {...props} fill unoptimized />,
}
