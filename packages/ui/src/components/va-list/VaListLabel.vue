<template>
  <div
    class="va-list-label"
    :style="computedStyle"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { Options, mixins, Vue, prop } from 'vue-class-component'

import ColorMixin from '../../services/color-config/ColorMixin'

class ListLabelProps {
  color = prop<string>({ type: String, default: 'primary' })
}

const ListLabelPropsMixin = Vue.with(ListLabelProps)

@Options({
  name: 'VaListLabel',
})
export default class VaListLabel extends mixins(
  ColorMixin,
  ListLabelPropsMixin,
) {
  get computedStyle () {
    return {
      color: this.computeColor(this.color),
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
