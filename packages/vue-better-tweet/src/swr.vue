<script lang="ts">
export type TweetProps = Omit<TweetCoreProps, 'id'> & {
  components?: TwitterComponents
  fetchOptions?: RequestInit
} & (
    | {
        id: string
        apiUrl?: string
      }
    | {
        id?: string
        apiUrl: string | undefined
      }
  )
</script>

<script setup lang="ts">
import { computed } from "vue";
import {
  EmbeddedTweet,
  TweetNotFound,
  TweetSkeleton,
  type TwitterComponents,
} from "./twitter-theme/components";
import type { TweetCoreProps } from "react-tweet";
import { useTweet } from "./hooks";



const props = defineProps<TweetProps>();

const { data, error, isLoading } = useTweet(
  computed(() => props.id),
  computed(() => props.apiUrl),
  computed(() => props.fetchOptions)
);

const NotFoundComponent = computed(() => props.components?.TweetNotFound || TweetNotFound);

const notFoundError = computed(() => {
  if (!error.value) return error.value;
  return props.onError ? props.onError(error.value) : error.value;
});
</script>


<template>
  <!-- Loading -->
  <template v-if="isLoading">
    <slot name="fallback">
      <TweetSkeleton />
    </slot>
  </template>

  <!-- Error / Not Found -->
  <component
    v-else-if="error || !data"
    :is="NotFoundComponent"
    :error="notFoundError"
  />

  <!-- Success -->
  <EmbeddedTweet
    v-else
    :tweet="data"
    :components="components"
  />
</template>