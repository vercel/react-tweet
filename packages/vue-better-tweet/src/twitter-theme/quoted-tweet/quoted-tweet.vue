<script setup lang="ts">
import type { EnrichedQuotedTweet } from 'react-tweet'
import type { TwitterComponents } from '../types'
import QuotedTweetContainer from './quoted-tweet-container.vue'
import QuotedTweetHeader from './quoted-tweet-header.vue'
import QuotedTweetBody from './quoted-tweet-body.vue'
import TweetMedia from '../tweet-media.vue'

type Props = {
  tweet: EnrichedQuotedTweet
  components?: TwitterComponents
}

const props = defineProps<Props>()
</script>

<template>
  <QuotedTweetContainer :tweet="props.tweet">
    <QuotedTweetHeader :tweet="props.tweet" :components="props.components" />
    <QuotedTweetBody :tweet="props.tweet" />
    <TweetMedia
      v-if="props.tweet.mediaDetails?.length"
      :tweet="props.tweet"
      quoted
      :components="props.components"
    />
  </QuotedTweetContainer>
</template>
