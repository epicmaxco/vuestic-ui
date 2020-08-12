<template>
  <div
    class="va-list-item-label"
    :class="computedClass"
    :style="computedStyle"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'

import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'

const ItemLabelPropsMixin = makeContextablePropsMixin({
  caption: { type: Boolean, default: false },
  lines: { type: Number, default: 1 },
})

@Component({
  name: 'VaListItemLabel',
})
export default class VaListItemLabel extends Mixins(
  ItemLabelPropsMixin,
) {
  get computedClass () {
    return { 'va-list-item-label--caption': this.c_caption }
  }

  get computedStyle () {
    return {
      '-webkit-line-clamp': this.c_lines,
    }
  }
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

.va-list-item-label {
  color: $vue-darkest-blue;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;

  &--caption {
    font-size: $font-size-smaller;
    color: $brand-secondary;
    line-height: 1.3rem;
  }
}
</style>
