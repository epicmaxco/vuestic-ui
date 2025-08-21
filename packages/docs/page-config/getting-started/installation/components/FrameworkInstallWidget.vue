<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <VaCard
      v-for="option in options"
      :key="option.label"
      class="hover:shadow-xl transition-all duration-300 cursor-pointer"
      :to="option.link"
      :target="option.external ? '_blank' : undefined"
    >
      <VaCardContent class="flex flex-col items-center text-center p-6">
        <img :src="option.logo" alt="" class="w-24 h-16 mb-4" />
        <h3 class="text-xl font-semibold mb-2">{{ option.label }}</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">{{ option.description }}</p>
      </VaCardContent>
    </VaCard>
  </div>
</template>

<script setup>
import NuxtLogo from './nuxt_logotype.svg'
import ViteLogo from './Vite_logotype.svg'
import VueLogo from './Vue_logotype.svg'
import WebComponentsLogo from './web-components-logo.svg'

const options = [
  {
    label: 'Nuxt',
    description: 'Use @vuestic/nuxt with Nuxt for seamless SSR and modular setup.',
    link: '/getting-started/nuxt',
    logo: NuxtLogo,
  },
  {
    label: 'Vite',
    description: 'Try @vuestic/compiler with Vite for great development experience.',
    link: '/getting-started/vite',
    logo: ViteLogo,
  },
  {
    label: 'Manual',
    description: 'Manually add vuestic-ui to any existing Vue project.',
    link: '/getting-started/manual',
    logo: VueLogo,
  },
  {
    label: "Web components",
    description: "Use web-components build for framework-agnostic usage.",
    link: '/getting-started/web-components',
    logo: WebComponentsLogo,
  }
]
</script>
