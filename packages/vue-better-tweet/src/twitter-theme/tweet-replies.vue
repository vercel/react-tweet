<script setup lang="ts">
import type { EnrichedTweet } from 'react-tweet'
import { computed } from 'vue'
import { formatNumber } from 'react-tweet'
import s from './tweet-replies.module.css'

type Props = {
  tweet: EnrichedTweet
}

const props = defineProps<Props>()

const label = computed(() => {
  const count = props.tweet.conversation_count
  if (count === 0) return 'Read more on X'
  if (count === 1) return `Read ${formatNumber(count)} reply`
  return `Read ${formatNumber(count)} replies`
})
</script>

<template>
  <div :class="s.replies">
    <a :class="s.link" :href="props.tweet.url" target="_blank" rel="noopener noreferrer">
      <span :class="s.text">{{ label }}</span>
    </a>
  </div>
</template>
