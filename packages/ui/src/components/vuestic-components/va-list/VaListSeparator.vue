<template>
  <div
    class="va-list-separator"
    :class="computedClass"
  />
</template>

<script lang="ts">
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { Component, Mixins } from 'vue-property-decorator'
const ListSeparatorPropsMixin = makeContextablePropsMixin({
  fit: { type: Boolean, default: false },
  spaced: { type: Boolean, default: false },
})
@Component({
  name: 'VaListSeparator',
})
export default class VaListSeparator extends Mixins(
  ListSeparatorPropsMixin,
) {
  get computedClass () {
    return {
      'va-list-separator--offset': !this.c_fit,
      'va-list-separator--spaced': this.c_spaced,
    }
  }
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

.va-list-separator {
  height: 1px;
  background-color: $separator-color;

  &--offset {
    margin-left: 1.5rem;
  }

  &--spaced {
    margin: 1.5rem 0;
  }
}
</style>
