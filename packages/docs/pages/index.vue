<template>
  <div class="landing">
    <LandingHeader v-model="isMobileMenuOpen" />
    <div v-show="!isMobileMenuOpen">
      <LandingPreview />
      <LandingPartners />
      <LandingFeatures />
      <LandingCustomize />
      <LandingSeamlessIntegration />
      <LandingOpenSource />
      <LandingAdmin />
      <LandingFooter />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeUnmount, onMounted } from 'vue'
import { useColors } from 'vuestic-ui'

const colorMode = useColorMode()
const cookie = useCookie('vuestic-theme')
const { applyPreset } = useColors()

definePageMeta({
  layout: 'landing',
})

useHead({
  title: 'Vuestic UI — Vue 3 UI framework',
  link: [
    { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" },
  ]
})

const isMobileMenuOpen = ref(false)

onMounted(() => {
  applyPreset('landing')
})

onBeforeUnmount(() => {
  applyPreset(cookie.value || colorMode.preference)
})
</script>

<style lang="scss">
@import "vuestic-ui/src/styles/typography/typography.scss";
@import "@/assets/variables.scss";

.landing {
  font-family: Source Sans Pro;

  a {
    @include link(2px);
  }
}
</style>
