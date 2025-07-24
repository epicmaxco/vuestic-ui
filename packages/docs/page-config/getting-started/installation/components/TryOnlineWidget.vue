<template>
  <div class="flex justify-center gap-6 flex-wrap w-full">
    <VaCard
      class="hover:shadow-xl transition-all duration-300 cursor-pointer w-full md:w-[300px]"
      :to="option.link"
      :target="option.external ? '_blank' : undefined"
    >
      <VaCardContent class="flex flex-col items-center text-center p-6">
        <img :src="option.logo" alt="" class="w-16 h-16 mb-4" />
        <h3 class="text-xl font-semibold mb-2">{{ option.label }}</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">{{ option.description }}</p>
      </VaCardContent>
    </VaCard>

    <DocsOpenCodeSandbox />
  </div>
</template>

<script setup>
import DocsOpenCodeSandbox from './OpenCodeSandbox.vue'
import vuestic_logo from './vuestic.png'

const option = {
  label: 'Playground',
  description: 'Try Vuestic UI with Tailwind in our playground online',
  link: 'https://ui.vuestic.dev/play',
  logo: vuestic_logo,
}
</script>
