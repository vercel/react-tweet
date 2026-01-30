<template>
  <div :class="rootClass">
    <main :class="styles.main">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, useCssModule } from 'vue'
import clsx from 'clsx'
import { RouterView } from 'vue-router'
import './base.css'

const styles = useCssModule()

const rootClass = computed(() => clsx(styles.root, 'react-tweet-theme'))
</script>

<style module src="./layout.module.css"></style>
