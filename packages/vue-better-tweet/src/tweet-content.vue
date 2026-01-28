<script setup lang="ts" async>
import { computed, shallowRef } from 'vue'
import { getTweet } from 'react-tweet/api'
import {
  EmbeddedTweet,
  TweetNotFound,
} from './twitter-theme/components'
import type { TweetProps } from './swr.vue'

type TweetContentProps = Omit<TweetProps, 'fallback'>

const props = defineProps<TweetContentProps>()

const error = shallowRef<unknown>(null)

const tweet =
  props.id
    ? await getTweet(props.id, props.fetchOptions).catch((err) => {
        if (props.onError) {
          error.value = props.onError(err)
        } else {
          console.error(err)
          error.value = err
        }
        return undefined
      })
    : undefined

const NotFoundComponent = computed(() => props.components?.TweetNotFound ?? TweetNotFound)
</script>

<template>
  <component
    v-if="!tweet"
    :is="NotFoundComponent"
    :error="error"
  />
  <EmbeddedTweet
    v-else
    :tweet="tweet"
    :components="components"
  />
</template>