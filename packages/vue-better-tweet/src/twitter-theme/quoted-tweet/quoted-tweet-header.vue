<script setup lang="ts">
import { computed } from 'vue'
import type { EnrichedQuotedTweet } from 'react-tweet'
import clsx from 'clsx'
import type { TwitterComponents } from '../types'
import AvatarImg from '../avatar-img.vue'
import HighlightedLabel from '../highlighted-label.vue'
import VerifiedBadge from '../verified-badge.vue'
import s from './quoted-tweet-header.module.css'

type Props = {
  tweet: EnrichedQuotedTweet
  components?: TwitterComponents
}

const props = defineProps<Props>()
const Img = computed(() => props.components?.AvatarImg ?? AvatarImg)
</script>

<template>
  <div :class="s.header">
    <a :href="props.tweet.url" :class="s.avatar" target="_blank" rel="noopener noreferrer">
      <div :class="clsx(s.avatarOverflow, props.tweet.user.profile_image_shape === 'Square' && s.avatarSquare)">
        <component
          :is="Img"
          :src="props.tweet.user.profile_image_url_https"
          :alt="props.tweet.user.name"
          :width="20"
          :height="20"
        />
      </div>
    </a>
    <div :class="s.author">
      <div :class="s.authorText">
        <span :title="props.tweet.user.name">{{ props.tweet.user.name }}</span>
      </div>
      <VerifiedBadge :user="props.tweet.user" />
      <HighlightedLabel :user="props.tweet.user" />
      <div :class="s.username">
        <span :title="`@${props.tweet.user.screen_name}`">@{{ props.tweet.user.screen_name }}</span>
      </div>
    </div>
  </div>
</template>
