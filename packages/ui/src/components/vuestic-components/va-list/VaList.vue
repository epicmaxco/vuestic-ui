<template>
  <div
    class="va-list"
    :class="computedClass"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { Options } from 'vue-class-component'
import { Mixins } from 'vue-property-decorator'

import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'

const ListPropsMixin = makeContextablePropsMixin({
  fit: { type: Boolean, default: false },
})
@Options({
  name: 'VaList',
})
export default class VaList extends Mixins(
  ListPropsMixin,
) {
  get computedClass () {
    return { 'va-list--fit': this.c_fit }
  }
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

.va-list {
  padding: $list-padding;
  background-color: #ffffff;
  width: 100%;

  &--fit {
    width: fit-content;
  }
}
</style>
