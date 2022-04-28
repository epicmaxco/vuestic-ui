<template>
  <div
    class="va-test"
    :style="{ color }"
  >
    <slot>{{ label }}</slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const propOptions = {
  color: { type: String, default: 'red' },
  label: { type: String, default: '' },
}

export default defineComponent({
  name: 'ConfigUsageTest',
  props: propOptions,
})
</script>

<style lang="scss">
</style>
