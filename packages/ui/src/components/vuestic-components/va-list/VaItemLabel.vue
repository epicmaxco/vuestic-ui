<template>
  <div
    class="va-item-label"
    :class="computedClass"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { Component, Mixins } from 'vue-property-decorator'
const ItemLabelPropsMixin = makeContextablePropsMixin({
  caption: { type: Boolean, default: false },
})
@Component({
  name: 'VaItemLabel',
})
export default class VaItemLabel extends Mixins(
  ItemLabelPropsMixin,
) {
  get computedClass () {
    return { 'va-item-label--caption': this.c_caption }
  }
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

.va-item-label {
  color: $vue-darkest-blue;

  &--caption {
    font-size: $font-size-smaller;
    color: $brand-secondary;
    line-height: 1.3rem;
  }
}
</style>
