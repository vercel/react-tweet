import type { DefineComponent } from 'vue'
import type { AvatarImgProps } from './avatar-img.vue'
import type { MediaImgProps } from './media-img.vue'

export type TwitterComponents = {
  TweetNotFound?: DefineComponent<{ error?: unknown }>
  AvatarImg?: DefineComponent<AvatarImgProps>
  MediaImg?: DefineComponent<MediaImgProps>
}

export type TweetComponents = TwitterComponents
