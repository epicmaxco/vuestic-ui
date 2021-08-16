<template>
  <div
    class="va-list"
    :class="computedClass"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { Options, prop, mixins, Vue } from 'vue-class-component'

class ListProps {
  fit = prop<boolean>({ type: Boolean, default: false })
}

const ListPropsMixin = Vue.with(ListProps)

@Options({
  name: 'VaList',
})
export default class VaList extends mixins(
  ListPropsMixin,
) {
  get computedClass () {
    return { 'va-list--fit': this.fit }
  }
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";
@import 'variables';

.va-list {
  padding: var(--va-list-padding);
  width: var(--va-list-width);

  &--fit {
    width: fit-content;
  }
}
</style>
