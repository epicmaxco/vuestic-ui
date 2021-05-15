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
@import 'variables';

.va-list-item-label {
  color: var(--va-list-item-label-color);
  display: var(--va-list-item-label-display);
  -webkit-box-orient: var(--va-list-item-label-box-orient);
  overflow: var(--va-list-item-label-overflow);

  &--caption {
    font-size: var(--va-list-item-label-caption-font-size);
    color: var(--va-list-item-label-caption-color);
    line-height: var(--va-list-item-label-caption-line-height);
  }
}
</style>
