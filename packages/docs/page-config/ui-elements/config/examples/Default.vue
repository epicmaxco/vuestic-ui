<template>
  <div class="flex gap-6 flex-wrap justify-center">
    <example-card />

    <va-config :components="config1">
      <example-card />
    </va-config>

    <va-config :components="config2">
      <example-card />
    </va-config>
  </div>

  <div class="flex gap-2 mt-8 items-center flex-wrap">
    Select color
    <va-color-input
      v-model="color"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useColors } from 'vuestic-ui'
  import ExampleCard from './ExampleCard.vue'

  const color = ref('#ef476f')

  const { getTextColor } = useColors()
  const textColor = computed(() => getTextColor(color.value))

  const config1 = computed(() => ({
    VaButton: { preset: 'primary', color: color.value, round: true, block: true },
    VaInput: { color: color.value, bordered: true },
    VaSelect: { color: color.value, bordered: true },
    VaCard: { stripeColor: color.value, stripe: true },
  }))

  const config2 = computed(() => ({
    VaButton: { color: 'warning', block: true, icon: 'thumb_up' },
    VaCard: { color: color.value, gradient: true },
    VaInput: { color: textColor.value, outline: true },
    VaSelect: { color: textColor.value, outline: true },
  }))
</script>
