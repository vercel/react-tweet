<script lang="ts">
import type { TweetProps } from "./swr.vue"

export type { TweetProps };
</script>

<script setup lang="ts">
// import { Suspense } from 'vue'
import TweetContent from './tweet-content.vue'
import { TweetSkeleton } from './twitter-theme/components.ts'


const props = defineProps<TweetProps>()
</script>

<template>
  <Suspense>
    <template #default>
      <TweetContent v-bind="props" />
    </template>

    <template #fallback>
      <!-- React: fallback prop. Vue: slot is the cleanest equivalent. -->
      <slot name="fallback">
        <TweetSkeleton />
      </slot>
    </template>
  </Suspense>
</template>
