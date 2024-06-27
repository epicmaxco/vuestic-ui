<template>
  <div v-if="!isHiddenLocal && breakpoint.current !== undefined" class="relative flex justify-center border-y-2 border-[#42b883]">
    <div class="absolute flex h-full w-full inset-0">
      <div class="bg-whit grow" />
      <div class="bg-[#42b883] grow" />
    </div>
    <a
      href="https://conf.vuejs.de/tickets/?voucher=EPICMAX24"
      target="_blank"
      title="Buy your ticket for Germany's only community-driven Vue.js conference in Bonn"
      class="relative w-full"
    >
      <div class="flex">
        <div class="relative w-full max-w-[1350px] px-8 mx-auto">
          <div class="flex">
            <VaAspectRatio
              v-if="breakpoint.smUp"
              :ratio="800/100"
              :aria-hidden="true"
              :max-width="1350"
              class="mx-auto"
            >
              <img class="min-w-full min-h-full" src="/landing/vuejsde-conf-banner.png" alt="">
            </VaAspectRatio>
            <VaAspectRatio
              v-else
              :ratio="295/60"
              :aria-hidden="true"
              :max-width="1350"
              class="mx-auto"
            >
              <img class="min-w-full min-h-full" src="/landing/vuejsde-conf-banner-mobile.png" alt="">
            </VaAspectRatio>
          </div>
          <div :class="iconWrapperClass" @click.prevent="hide">
            <VaIcon name="close" />
          </div>
        </div>
      </div>
    </a>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { useBreakpoint } from "vuestic-ui";

const breakpoint = useBreakpoint();
watchEffect(() => {
  console.log(breakpoint.current)
})

const officialPartnerCookie = useCookie('banner-closed')

const bannerName = 'vuejsde-071024'

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
