<script setup lang="ts">
import Components from './Components.vue'
import ColorInput from './theme-designer/ColorInput.vue'

const { colors } = useColors()

const localColors = reactive({} as Record<string, string>)
const threshold = ref(170)

onMounted(() => {
  Object.keys(colors).forEach((colorName) => {
    localColors[colorName] = colors[colorName]
  })
})

const colorNames = {
  accent: ['primary', 'secondary', 'warning', 'danger', 'info', 'success'],
  background: ['backgroundPrimary', 'backgroundSecondary', 'backgroundElement', 'backgroundBorder'],
  text: ['textPrimary', 'textInverted'],
  utils: ['shadow', 'focus']
}

const code = computed(() => {
  return JSON
    .stringify(localColors, null, 0.1)
    .replace(/{|}/gm, '')
    .replace(/"(\w*)":/gm, '$1:')
    .trim()
})
</script>

<template>
  <VaModal
    fullscreen
    stateful
  >
    <template #anchor="{ toggle }">
      <VaButton @click="toggle">
        Theme designer
      </VaButton>
    </template>

    <VaConfig
      :colors="{
        variables: localColors,
        threshold,
      }"
    >
      <Components class="p-8" />
    </VaConfig>
    <div class="my-4">
      <VaAlert
        color="background-element"
        icon="info"
      >
        <p>We calculate color lightness using WCAG contrast formula to correctly apply text color on components background</p>
        <p>Sometimes you want to tweak this behavior, you can change threshold property in colors config</p>
      </VaAlert>
      <VaSlider
        v-model="threshold"
        label="threshold"
        :max="255"
        :min="0"
        class="mt-2"
      >
        <template #append>
          <VaCounter
            v-model.number="threshold"
            class="w-[140px]"
            type="number"
          />
        </template>
      </VaSlider>
    </div>

    <VaConfig
      :colors="{
        threshold,
      }"
    >
      <div
        v-for="colors, colorName in colorNames"
        :key="colorName"
      >
        <p class="va-title mt-8 mb-2">
          {{ colorName }}
        </p>

        <div class="grid grid-cols-4 gap-2">
          <ColorInput
            v-for="color in colors"
            :key="color"
            v-model="localColors[color]"
            :label="color"
          />
        </div>
      </div>
    </VaConfig>

    <div class="mt-4 bg-[var(--va-background-element)] p-4 rounded-sm">
      <pre class="va-code__pre"><code class="va-code__code">{{ code }}</code></pre>
    </div>
  </VaModal>
</template>
