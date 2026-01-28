<script setup lang="ts">
import type { Tweet } from 'react-tweet/api'
import type { TwitterComponents } from './types'
import { computed } from 'vue'
import TweetContainer from './tweet-container.vue'
import TweetHeader from './tweet-header.vue'
import TweetInReplyTo from './tweet-in-reply-to.vue'
import TweetBody from './tweet-body.vue'
import TweetMedia from './tweet-media.vue'
import TweetInfo from './tweet-info.vue'
import TweetActions from './tweet-actions.vue'
import TweetReplies from './tweet-replies.vue'
import { QuotedTweet } from './quoted-tweet'
import { enrichTweet } from 'react-tweet'

type Props = {
  tweet: Tweet
  components?: Omit<TwitterComponents, 'TweetNotFound'>
}

const props = defineProps<Props>()
const enrichedTweet = computed(() => enrichTweet(props.tweet))
</script>

<template>
  <TweetContainer>
    <TweetHeader :tweet="enrichedTweet" :components="props.components" />
    <TweetInReplyTo
      v-if="enrichedTweet.in_reply_to_status_id_str"
      :tweet="enrichedTweet"
    />
    <TweetBody :tweet="enrichedTweet" />
    <TweetMedia
      v-if="enrichedTweet.mediaDetails?.length"
      :tweet="enrichedTweet"
      :components="props.components"
    />
    <QuotedTweet
      v-if="enrichedTweet.quoted_tweet"
      :tweet="enrichedTweet.quoted_tweet"
      :components="props.components"
    />
    <TweetInfo :tweet="enrichedTweet" />
    <TweetActions :tweet="enrichedTweet" />
    <TweetReplies :tweet="enrichedTweet" />
  </TweetContainer>
</template>
