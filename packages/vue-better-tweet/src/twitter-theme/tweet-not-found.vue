<script setup lang="ts">
import TweetContainer from './tweet-container.vue'
import styles from './tweet-not-found.module.css'

type Props = {
  error?: unknown
}

defineProps<Props>()
</script>

<template>
  <TweetContainer>
    <div :class="styles.root">
      <h3>Tweet not found</h3>
      <p>The embedded tweet could not be found…</p>
    </div>
  </TweetContainer>
</template>
