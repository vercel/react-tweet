<script setup lang="ts">
import type { EnrichedQuotedTweet } from 'react-tweet'
import s from './quoted-tweet-container.module.css'

type Props = {
  tweet: EnrichedQuotedTweet
}

const props = defineProps<Props>()

const handleClick = (event: MouseEvent) => {
  event.preventDefault()
  window.open(props.tweet.url, '_blank')
}
</script>

<template>
  <div :class="s.root" @click="handleClick">
    <article :class="s.article">
      <slot />
    </article>
  </div>
</template>
