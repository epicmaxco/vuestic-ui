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
  name: 'VaTest',
  props: propOptions,
})
export default class VaTest extends Vue {

}
</script>

<style lang="scss">
.va-test {

}
</style>
