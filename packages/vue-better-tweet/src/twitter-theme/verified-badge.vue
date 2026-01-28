<script setup lang="ts">
import { computed, ref, shallowRef, watchEffect } from 'vue'
import type { TweetUser } from 'react-tweet/api'
import clsx from 'clsx'
import { Verified, VerifiedBusiness, VerifiedGovernment } from './icons'
import s from './verified-badge.module.css'

type Props = {
  user: TweetUser
}

const props = defineProps<Props>()

const verified = computed(() =>
  Boolean(props.user.verified || props.user.is_blue_verified || props.user.verified_type)
)

const icon = shallowRef(Verified)
const iconClassName = ref<string | null>(s.verifiedBlue)

watchEffect(() => {
  icon.value = Verified
  iconClassName.value = s.verifiedBlue

  if (verified.value) {
    if (!props.user.is_blue_verified) {
      iconClassName.value = s.verifiedOld
    }
    switch (props.user.verified_type) {
      case 'Government':
        icon.value = VerifiedGovernment
        iconClassName.value = s.verifiedGovernment
        break
      case 'Business':
        icon.value = VerifiedBusiness
        iconClassName.value = null
        break
    }
  }
})
</script>

<template>
  <div v-if="verified" :class="clsx(iconClassName)">
    <component :is="icon" />
  </div>
</template>
