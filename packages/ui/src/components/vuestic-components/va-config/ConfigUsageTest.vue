<template>
  <div
    class="va-test"
    :style="{ color }"
  >
    <slot>{{ label }}</slot>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

const propOptions = {
  color: { type: String, default: 'red' },
  label: { type: String, default: '' },
}

@Options({
  name: 'ConfigUsageTest',
  props: propOptions,
})
export default class ConfigUsageTest extends Vue {

}
</script>

<style lang="scss">
.va-test {

}
</style>
