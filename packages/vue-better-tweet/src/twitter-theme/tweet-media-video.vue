<script setup lang="ts">
import { computed, ref, useTemplateRef, watch } from 'vue'
import type { EnrichedTweet, EnrichedQuotedTweet } from 'react-tweet'
import { getMediaUrl, getMp4Video } from 'react-tweet'
import type { MediaAnimatedGif, MediaVideo } from 'react-tweet/api'
import clsx from 'clsx'
import mediaStyles from './tweet-media.module.css'
import s from './tweet-media-video.module.css'

type Props = {
  tweet: EnrichedTweet | EnrichedQuotedTweet
  media: MediaAnimatedGif | MediaVideo
}

const props = defineProps<Props>()
const playButton = ref(true)
const isPlaying = ref(false)
const ended = ref(false)
const videoRef = useTemplateRef('videoRef')
const mp4Video = computed(() => getMp4Video(props.media))
const timeoutId = ref<number | undefined>(undefined)

const clearTimeoutId = () => {
  if (timeoutId.value) {
    window.clearTimeout(timeoutId.value)
    timeoutId.value = undefined
  }
}

watch(timeoutId, (value, _, onCleanup) => {
  if (!value) return
  onCleanup(() => {
    window.clearTimeout(value)
  })
})

const handlePlay = (event: Event) => {
  const video = videoRef.value
  if (!video) return

  event.preventDefault()
  playButton.value = false
  video.load()
  video
    .play()
    .then(() => {
      isPlaying.value = true
      video.focus()
    })
    .catch((error) => {
      console.error('Error playing video:', error)
      playButton.value = true
      isPlaying.value = false
    })
}

const handlePlayState = () => {
  clearTimeoutId()
  if (!isPlaying.value) isPlaying.value = true
  if (ended.value) ended.value = false
}

const handlePause = () => {
  clearTimeoutId()
  // When the video is seeked (moved to a different timestamp), it will pause for a moment
  // before resuming. We don't want to show the message in that case so we wait a bit.
  timeoutId.value = window.setTimeout(() => {
    if (isPlaying.value) isPlaying.value = false
    timeoutId.value = undefined
  }, 100)
}

const handleEnded = () => {
  ended.value = true
}
</script>

<template>
  <video
    ref="videoRef"
    :class="mediaStyles.image"
    :poster="getMediaUrl(props.media, 'small')"
    :controls="!playButton"
    playsInline
    preload="none"
    :tabIndex="playButton ? -1 : 0"
    @play="handlePlayState"
    @pause="handlePause"
    @ended="handleEnded"
  >
    <source :src="mp4Video.url" :type="mp4Video.content_type" />
  </video>

  <button
    v-if="playButton"
    type="button"
    :class="s.videoButton"
    aria-label="View video on X"
    @click="handlePlay"
  >
    <svg viewBox="0 0 24 24" :class="s.videoButtonIcon" aria-hidden="true">
      <g>
        <path d="M21 12L4 2v20l17-10z"></path>
      </g>
    </svg>
  </button>

  <div v-if="!isPlaying && !ended" :class="s.watchOnTwitter">
    <a :href="props.tweet.url" :class="s.anchor" target="_blank" rel="noopener noreferrer">
      {{ playButton ? 'Watch on X' : 'Continue watching on X' }}
    </a>
  </div>

    <a v-if="ended" :href="props.tweet.url" :class="clsx(s.anchor, s.viewReplies)" target="_blank" rel="noopener noreferrer">
      View replies
    </a>
</template>
