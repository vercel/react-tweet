<script setup lang="ts">
import { computed } from 'vue'
import type { EnrichedTweet } from 'react-tweet'
import clsx from 'clsx'
import type { TwitterComponents } from './types'
import AvatarImg from './avatar-img.vue'
import HighlightedLabel from './highlighted-label.vue'
import VerifiedBadge from './verified-badge.vue'
import s from './tweet-header.module.css'

type Props = {
  tweet: EnrichedTweet
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
          :width="48"
          :height="48"
        />
      </div>
      <div :class="s.avatarOverflow">
        <div :class="s.avatarShadow"></div>
      </div>
    </a>
    <div :class="s.author">
      <a :href="props.tweet.url" :class="s.authorLink" target="_blank" rel="noopener noreferrer">
        <div :class="s.authorLinkText">
          <span :title="props.tweet.user.name">{{ props.tweet.user.name }}</span>
        </div>
        <VerifiedBadge :user="props.tweet.user" :class="s.authorVerified" />
        <HighlightedLabel :user="props.tweet.user" />
      </a>
      <div :class="s.authorMeta">
        <a :href="props.tweet.url" :class="s.username" target="_blank" rel="noopener noreferrer">
          <span :title="`@${props.tweet.user.screen_name}`">@{{ props.tweet.user.screen_name }}</span>
        </a>
        <div :class="s.authorFollow">
          <span :class="s.separator">·</span>
          <a
            :href="props.tweet.user.follow_url"
            :class="s.follow"
            target="_blank"
            rel="noopener noreferrer"
          >
            Follow
          </a>
        </div>
      </div>
    </div>
    <a
      :href="props.tweet.url"
      :class="s.brand"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View on Twitter"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" :class="s.twitterIcon">
        <g>
          <path
            d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
          ></path>
        </g>
      </svg>
    </a>
  </div>
</template>
