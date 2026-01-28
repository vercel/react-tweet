<script setup lang="ts">
export type MediaImgProps = {
  src: string
  alt: string
  draggable?: boolean
}

defineProps<MediaImgProps>()
</script>

<template>
  <img v-bind="$attrs" :src="src" :alt="alt" :draggable="draggable" />
</template>
