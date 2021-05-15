<template>
  <div
    class="va-list-separator"
    :class="computedClass"
  />
</template>

<script lang="ts">
import { Options, Vue, prop, mixins } from 'vue-class-component'

class ListSeparatorProps {
  fit = prop<boolean>({ type: Boolean, default: false })
  spaced = prop<boolean>({ type: Boolean, default: false })
}

const ListSeparatorPropsMixin = Vue.with(ListSeparatorProps)

@Options({
  name: 'VaListSeparator',
})
export default class VaListSeparator extends mixins(
  ListSeparatorPropsMixin,
) {
  get computedClass () {
    return {
      'va-list-separator--offset': !this.fit,
      'va-list-separator--spaced': this.spaced,
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
