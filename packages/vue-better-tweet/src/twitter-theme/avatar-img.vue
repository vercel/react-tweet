<script setup lang="ts">
export type AvatarImgProps = {
  src: string
  alt: string
  width: number
  height: number
}

defineProps<AvatarImgProps>()
</script>

<template>
  <img v-bind="$attrs" :src="src" :alt="alt" :width="width" :height="height" />
</template>
