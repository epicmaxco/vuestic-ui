<template>
  <div
    class="va-list-label"
    :style="computedStyle"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { Options, mixins } from 'vue-class-component'

import ColorMixin from '../../../services/color-config/ColorMixin'

@Options({
  name: 'VaListLabel',
})
export default class VaListLabel extends mixins(
  ColorMixin,
) {
  get computedStyle () {
    return {
      color: this.colorComputed,
    }
  }
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

.va-list-label {
  @include va-title();

  text-align: center;
  padding: 0.3rem 0;
}
</style>
