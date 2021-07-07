<template>
  <div v-for="(value, key) in colors" :key="key" :style="`color: ${value};`">{{ key }} (--va-{{ key }}): {{value}}</div>
</template>

<script>
import { colorsPresets } from 'vuestic-ui/src/services/color-config/color-theme-presets'
export default {
  setup () {
    const colors = colorsPresets.default
    return { colors }
  },
}
</script>
