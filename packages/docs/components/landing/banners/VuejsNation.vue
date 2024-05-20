<template>
  <div v-if="!isHiddenLocal" class="relative flex justify-center bg-[#212c32]">
    <a href="https://vue.school/vuejsnation-vuesticui" target="_blank" title="Vue.js Nation 2024: The largest and only 100% FREE Vue.js conference in the world">
      <VaAspectRatio v-if="breakpoint.smUp" :ratio="1367/72" :aria-hidden="true" :max-width="1350">
        <img class="min-w-full min-h-full" src="/landing/vuejsnation-event-banner.png" alt="">
        <div :class="iconWrapperClass" @click.prevent="hide">
          <VaIcon name="close" />
        </div>
      </VaAspectRatio>
      <VaAspectRatio v-else :ratio="1500/500" :aria-hidden="true" :max-width="1350">
        <img class="min-w-full min-h-full" src="/landing/vuejsnation-event-banner-mobile.png" alt="">
        <div :class="iconWrapperClass" @click.prevent="hide">
          <VaIcon name="close" />
        </div>
      </VaAspectRatio>
    </a>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { useBreakpoint } from "vuestic-ui";

const breakpoint = useBreakpoint();

const officialPartnerCookie = useCookie('banner-closed')

const bannerName = 'vuejsnation-012024'

const isHiddenLocal = ref(officialPartnerCookie.value?.includes(bannerName))

const iconWrapperClass = 'absolute top-1.5 right-1 w-7 h-7 flex justify-center items-center text-white cursor-pointer hover:bg-[rgba(201,200,200,0.2)] rounded-sm sm:top-1/2 sm:right-2 sm:transform sm:-translate-y-1/2';

const hide = () => {
  isHiddenLocal.value = true

  if (officialPartnerCookie.value) {
    officialPartnerCookie.value += `,${bannerName}`
  } else {
    officialPartnerCookie.value = bannerName
  }
}
</script>
