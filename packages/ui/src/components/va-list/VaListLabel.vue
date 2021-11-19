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

import ColorMixin from '../../services/color-config/ColorMixin'

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
@import "../../styles/resources";
@import 'variables';

.va-list-label {
  font-family: var(--va-font-family);

  @include va-title();

  text-align: var(--va-list-label-text-align);
  padding: var(--va-list-label-padding);
}
</style>
