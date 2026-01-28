<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import styles from './skeleton.module.css'

type Props = {
  style?: HTMLAttributes['style']
}

defineProps<Props>()
</script>

<template>
  <span :class="styles.skeleton" :style="style" />
</template>
