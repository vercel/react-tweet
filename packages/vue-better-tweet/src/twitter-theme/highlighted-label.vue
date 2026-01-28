<script setup lang="ts">
import { computed } from 'vue'
import type { TweetUser } from 'react-tweet/api'
import clsx from 'clsx'
import styles from './highlighted-label.module.css'

type Props = {
  user: TweetUser
}

const props = defineProps<Props>()

const label = computed(() => props.user.highlighted_label)
const labelUrl = computed(() => label.value?.badge?.url)
</script>

<template>
  <div v-if="label && labelUrl" :class="clsx(styles.label)">
    <img :src="labelUrl" :alt="label.description" />
  </div>
</template>
