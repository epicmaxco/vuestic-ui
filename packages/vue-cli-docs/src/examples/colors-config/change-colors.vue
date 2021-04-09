<template>
  <div class="demo d-flex align--center">
    <va-button>{{ buttonText }}</va-button>
    <va-color-palette v-model="primaryColor" :palette="colorsToChange" />
    <span>{{ currentColorText }} {{ primaryColor }}</span>
  </div>
</template>

<script>
import { computed, ref, toRefs } from 'vue'
import { useColors } from 'vuestic-ui/src/main'

export default {
  props: {
    currentColorText: {
      type: String,
      default: 'Current primary color is',
    },
    buttonText: {
      type: String,
      default: 'Primary color button',
    },
  },
  setup () {
    const { setColors, getColor } = useColors()

    const colorsToChange = [
      getColor('primary'),
      '#ef476f',
      '#ffd166',
      '#06d6a0',
      '#118ab2',
    ]

    const primaryColor = computed({
      get () {
        return getColor('primary')
      },
      set (value) {
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

<style lang="scss" scoped>
.demo {
  .va-color-palette  {
    margin: 0 1rem;
  }
}
</style>
