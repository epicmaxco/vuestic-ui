<template>
  <div class="va-accordion">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { useStateful, useStatefulProps, useStatefulEmits } from '../../composables/useStateful'
import { useAccordion } from './hooks/useAccordion'

export default defineComponent({
  name: 'VaAccordion',
  emits: useStatefulEmits,
  props: {
    ...useStatefulProps,
    modelValue: { type: Array as PropType<boolean[]>, default: () => [] as boolean[] },
    multiply: { type: Boolean, default: false },
    inset: { type: Boolean, default: false },
    popout: { type: Boolean, default: false },
  },

  setup (props, { emit }) {
    const { valueComputed } = useStateful(props, emit, [] as boolean[])

    const { items } = useAccordion(props, valueComputed)

    return { collapses: items, value: valueComputed }
  },
})
</script>

<style lang="scss">
.va-accordion {
  font-family: var(--va-font-family);
}
</style>
