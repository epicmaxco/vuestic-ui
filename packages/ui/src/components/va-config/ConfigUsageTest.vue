<template>
  <div
    class="va-test"
    :style="{ color }"
  >
    <slot>{{ label }}</slot>
  </div>
</template>

<script lang="ts">

const propOptions = {
  color: { type: String, default: 'red' },
  label: { type: String, default: '' },
}

export default {
  name: 'ConfigUsageTest',
  props: propOptions,
}
</script>

<style lang="scss">
.va-test {
}
</style>
