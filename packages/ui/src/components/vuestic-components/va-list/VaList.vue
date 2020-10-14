<template>
  <div
    class="va-list"
    :class="computedClass"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'

import { makeConfigTransportMixin } from '../../../services/config-transport/makeConfigTransportMixin'

const ListPropsMixin = makeConfigTransportMixin({
  fit: { type: Boolean, default: false },
})
@Component({
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
