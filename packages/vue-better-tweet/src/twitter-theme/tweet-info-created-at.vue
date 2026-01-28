<script setup lang="ts">
import type { EnrichedTweet } from 'react-tweet'
import { computed } from 'vue'
import { formatDate } from 'react-tweet'
import s from './tweet-info-created-at.module.css'

type Props = {
  tweet: EnrichedTweet
}

const props = defineProps<Props>()
const createdAt = computed(() => new Date(props.tweet.created_at))
const formattedCreatedAtDate = computed(() => formatDate(createdAt.value))
</script>

<template>
  <a
    :class="s.root"
    :href="props.tweet.url"
    target="_blank"
    rel="noopener noreferrer"
    :aria-label="formattedCreatedAtDate"
  >
    <time :dateTime="createdAt.toISOString()">{{ formattedCreatedAtDate }}</time>
  </a>
</template>
