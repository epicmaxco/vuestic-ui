<template>
  <div class="d-flex align--center">
    <va-button>{{ $t(buttonText) }}</va-button>

    <va-color-palette
      v-model="primaryColor"
      :palette="colorsToChange"
      class="mx-4"
    />

    <span>{{ $t(currentColorText) }} {{ primaryColor }}</span>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useColors } from 'vuestic-ui/src/main'

export default {
  props: {
    currentColorText: {
      type: String,
      default: 'colorsConfig.example.code.currentColorText',
    },
    buttonText: {
      type: String,
      default: 'colorsConfig.example.code.buttonText',
    },
  },
  setup() {
    const { setColors, getColor } = useColors()

    const colorsToChange = [
      getColor('primary'),
      '#ef476f',
      '#ffd166',
      '#06d6a0',
      '#118ab2',
    ]

    const primaryColor = computed({
      get() {
        return getColor('primary')
      },
      set(value) {
        setColors({ primary: value })
      },
    })

    return {
      primaryColor,
      colorsToChange,
    }
  },
}
</script>
