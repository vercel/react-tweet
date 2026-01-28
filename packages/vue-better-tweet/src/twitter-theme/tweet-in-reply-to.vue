<script setup lang="ts">
import type { EnrichedTweet } from 'react-tweet'
import s from './tweet-in-reply-to.module.css'

type Props = {
  tweet: EnrichedTweet
}

const props = defineProps<Props>()
</script>

<template>
  <a :href="props.tweet.in_reply_to_url" :class="s.root" target="_blank" rel="noopener noreferrer">
    Replying to @{{ props.tweet.in_reply_to_screen_name }}
  </a>
</template>
