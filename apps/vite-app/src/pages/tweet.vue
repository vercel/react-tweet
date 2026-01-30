<template>
  <TweetSkeleton v-if="isLoading" />
  <TweetNotFound v-else-if="error || !data" :error="errorValue" />
  <EmbeddedTweet v-else :tweet="data" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { EmbeddedTweet, TweetNotFound, TweetSkeleton, useTweet } from 'vue-better-tweet'

const route = useRoute()

const tweetId = computed(() => {
  const id = route.params.id
  return Array.isArray(id) ? id[0] : id
})

const apiUrl = computed(() => {
  if (!tweetId.value) return undefined
  return import.meta.env.PROD
    ? `/api/tweet/${tweetId.value}`
    : `https://react-tweet.vercel.app/api/tweet/${tweetId.value}`
})

const { data, error, isLoading } = useTweet(tweetId, apiUrl)

const errorValue = computed(() => error.value ?? undefined)
</script>
