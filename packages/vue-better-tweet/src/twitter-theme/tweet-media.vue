<script setup lang="ts">
import { computed } from 'vue'
import type { EnrichedTweet, EnrichedQuotedTweet } from 'react-tweet'
import { getMediaUrl } from 'react-tweet'
import type { MediaDetails } from 'react-tweet/api'
import clsx from 'clsx'
import type { TwitterComponents } from './types'
import MediaImg from './media-img.vue'
import TweetMediaVideo from './tweet-media-video.vue'
import s from './tweet-media.module.css'

type Props = {
  tweet: EnrichedTweet | EnrichedQuotedTweet
  components?: TwitterComponents
  quoted?: boolean
}

const props = defineProps<Props>()
const Img = computed(() => props.components?.MediaImg ?? MediaImg)

const getSkeletonStyle = (media: MediaDetails, itemCount: number) => {
  // default of 16x9
  let paddingBottom = 56.25

  // if we only have 1 item, show at original ratio
  if (itemCount === 1) {
    paddingBottom = (100 / media.original_info.width) * media.original_info.height
  }

  // if we have 2 items, double the default to be 16x9 total
  if (itemCount === 2) paddingBottom = paddingBottom * 2

  return {
    width: media.type === 'photo' ? undefined : 'unset',
    paddingBottom: `${paddingBottom}%`,
  }
}
</script>

<template>
  <div :class="clsx(s.root, !props.quoted && s.rounded)">
    <div
      :class="clsx(
        s.mediaWrapper,
        (props.tweet.mediaDetails?.length ?? 0) > 1 && s.grid2Columns,
        (props.tweet.mediaDetails?.length ?? 0) === 3 && s.grid3,
        (props.tweet.mediaDetails?.length ?? 0) > 4 && s.grid2x2
      )"
    >
      <template v-for="media in props.tweet.mediaDetails" :key="media.media_url_https">
        <a
          v-if="media.type === 'photo'"
          :href="props.tweet.url"
          :class="clsx(s.mediaContainer, s.mediaLink)"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div :class="s.skeleton" :style="getSkeletonStyle(media, props.tweet.mediaDetails?.length ?? 0)" />
          <component
            :is="Img"
            :src="getMediaUrl(media, 'small')"
            :alt="media.ext_alt_text || 'Image'"
            :class="s.image"
            draggable
          />
        </a>
        <div v-else :class="s.mediaContainer">
          <div :class="s.skeleton" :style="getSkeletonStyle(media, props.tweet.mediaDetails?.length ?? 0)" />
          <TweetMediaVideo :tweet="props.tweet" :media="media" />
        </div>
      </template>
    </div>
  </div>
</template>
