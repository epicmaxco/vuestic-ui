<template>
  <div v-for="(value, key) in colors" :key="key" class="color-description">{{ key }} (--va-{{ key }}): {{ value }} <va-color-indicator :color="value" /></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { colorsPresets } from 'vuestic-ui/src/services/color-config/color-theme-presets'
export default defineComponent({
  name: 'DefaultColors',
  setup () {
    const colors = colorsPresets.default
    return { colors }
  },
})
</script>

<style lang="scss">
  .color-description {
    display: flex;
    align-items: center;

    .color-indicator {
      margin-left: 0.5rem;
    }
  }
</style>
