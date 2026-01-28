<script setup lang="ts">
import type { EnrichedQuotedTweet } from 'react-tweet'
import s from './quoted-tweet-body.module.css'

type Props = {
  tweet: EnrichedQuotedTweet
}

const props = defineProps<Props>()
</script>

<template>
  <p :class="s.root" :lang="props.tweet.lang" dir="auto">
    <span v-for="(item, index) in props.tweet.entities" :key="index" v-html="item.text" />
  </p>
</template>
