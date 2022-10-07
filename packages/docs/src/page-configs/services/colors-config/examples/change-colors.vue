<template>
  <div class="d-flex align-center">
    <va-button>{{ buttonText }}</va-button>

    <va-color-palette v-model="primaryColor" :palette="colorsToChange" class="mx-4" />

    <span>{{ currentColorText }} {{ primaryColor }}</span>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useColors, useTheme } from 'vuestic-ui/src/main'

export default {
  props: {
    currentColorText: { type: String, default: 'Current primary color is' },
    buttonText: { type: String, default: 'Primary color button' },
  },
  setup () {
    const { presets } = useTheme()
    const { setColors, getColor } = useColors()

    const colorsToChange = [
      presets.value.light.primary,
      '#ef476f',
      '#ffd166',
      '#06d6a0',
      '#118ab2',
    ]

    const primaryColor = computed({
      get () { return getColor('primary') },
      set (value) { setColors({ primary: value }) },
    })

    return {
      primaryColor,
      colorsToChange,
    }
  },
}
</script>
