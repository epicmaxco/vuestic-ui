<template>
  <div
    class="va-list-item-label"
    :class="computedClass"
    :style="computedStyle"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed, ComputedRef, StyleValue } from 'vue'
import { useNumericProp, useComponentPresetProp, makeNumericProp } from '../../composables'

defineOptions({
  name: 'VaListItemLabel',
})

const props = defineProps({
  ...useComponentPresetProp,
  caption: { type: Boolean, default: false },
  lines: makeNumericProp({ default: 1 }),
})

const linesComputed = useNumericProp('lines') as ComputedRef<number>
const computedClass = computed(() => ({ 'va-list-item-label--caption': props.caption }))
const computedStyle = computed(() => ({ '-webkit-line-clamp': linesComputed.value } as StyleValue))
</script>

<style lang="scss">
@import "variables";

.va-list-item-label {
  font-family: var(--va-font-family);
  color: var(--va-list-item-label-color);
  display: var(--va-list-item-label-display);
  -webkit-box-orient: var(--va-list-item-label-box-orient);
  overflow: var(--va-list-item-label-overflow);
  line-height: var(--va-list-item-label-line-height);

  &--caption {
    font-size: var(--va-list-item-label-caption-font-size);
    color: var(--va-list-item-label-caption-color);
  }
}
</style>
