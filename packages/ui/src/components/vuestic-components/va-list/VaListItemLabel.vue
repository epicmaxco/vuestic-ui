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
import { Options, Vue, prop, mixins } from 'vue-class-component'

class ListItemLabelProps {
  caption = prop<boolean>({ type: Boolean, default: false })
  lines = prop<number>({ type: Number, default: 1 })
}

const ListItemLabelPropsMixin = Vue.with(ListItemLabelProps)

@Options({
  name: 'VaListItemLabel',
})
export default class VaListItemLabel extends mixins(
  ListItemLabelPropsMixin,
) {
  get computedClass () {
    return { 'va-list-item-label--caption': this.caption }
  }

  get computedStyle () {
    return {
      '-webkit-line-clamp': this.lines,
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
