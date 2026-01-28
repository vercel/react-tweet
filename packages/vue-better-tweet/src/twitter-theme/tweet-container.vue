<script setup lang="ts">
import clsx from 'clsx'
import s from './tweet-container.module.css'
import './theme.css'
</script>

<template>
  <div :class="clsx('react-tweet-theme', s.root)">
    <article :class="s.article">
      <slot />
    </article>
  </div>
</template>
