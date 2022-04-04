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
import { defineComponent, PropType, computed, StyleValue } from 'vue'

export default defineComponent({
  name: 'VaListItemLabel',
  props: {
    caption: { type: Boolean as PropType<boolean>, default: false },
    lines: { type: Number as PropType<number>, default: 1 },
  },
  setup: (props) => ({
    computedClass: computed(() => ({ 'va-list-item-label--caption': props.caption })),
    computedStyle: computed(() => ({ '-webkit-line-clamp': props.lines } as StyleValue)),
  }),
})
</script>

<style lang="scss">
@import "variables";

.va-list-item-label {
  font-family: var(--va-font-family);
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
