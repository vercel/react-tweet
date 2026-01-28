<script setup lang="ts">
import s from './tweet-link.module.css'

type Props = {
  href: string
}

defineProps<Props>()
</script>

<template>
  <a :href="href" :class="s.root" target="_blank" rel="noopener noreferrer nofollow">
    <slot />
  </a>
</template>
