<template>
  <div v-if="!isHiddenLocal" class="event-banner">
    <a
      href="https://vuejsforge.com/?utm_source=Epicmax&utm_medium=banner&utm_campaign=community"
      target="_blank"
      title="Vue.js forge conference"
    >
      <VaAspectRatio
        :ratio="1600/72"
        :aria-hidden="true"
        :max-width="1350"
      >
        <img
          class="event-banner__img"
          src="/landing/forge-event-banner.png"
          alt=""
        >
        <div class="event-banner__close" @click.prevent="hide" />
      </VaAspectRatio>
    </a>
  </div>
</template>

<script setup lang="ts">
// @deprecated
// see VuejsNation.vue
import { ref } from 'vue'

const officialPartnerCookie = useCookie('banner-closed')

const bannerName = 'vueforge-082023'

const isHiddenLocal = ref(officialPartnerCookie.value?.includes(bannerName))

const hide = () => {
  isHiddenLocal.value = true

  if (officialPartnerCookie.value) {
    officialPartnerCookie.value += `,${bannerName}`
  } else {
    officialPartnerCookie.value = bannerName
  }
}
</script>

<style lang="scss" scoped>
.event-banner {
  position: relative;
  display: flex;
  justify-content: center;
  background-color: #200543;
  &__close {
    position: absolute;
    top: 30%;
    right: 1%;
    width: 4%;
    height: 40%;
    &:hover {
      background-color: rgba(201, 200, 200, 0.2);
    }
  }
  &__img {
    min-width: 100%;
    min-height: 100%;
  }
}
</style>
