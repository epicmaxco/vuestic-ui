<template>
  <va-card
    no-padding
    class="va-list"
    :class="computedClass"
  >
    <slot />
  </va-card>
</template>

<script lang="ts">
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { Component, Mixins } from 'vue-property-decorator'
import VaCard from '../va-card/VaCard.vue'
const ListPropsMixin = makeContextablePropsMixin({
  fit: { type: Boolean, default: false },
})
@Component({
  name: 'VaList',
  components: { VaCard },
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

  &--fit {
    width: 100%;
  }
}
</style>
