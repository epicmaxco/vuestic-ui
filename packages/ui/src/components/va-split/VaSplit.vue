<template>
<section ref="splitContainer" aria-label="split panels">
  <slot name="start" />
  <div>|</div>
  <slot name="end" />
</section>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, shallowRef } from 'vue'

export default defineComponent({
  name: 'VaSplit',

  props: {
    direction: {
      type: String as PropType<'horizontal' | 'vertical'>,
      default: 'horizontal',
      validator: (v: string) => ['horizontal', 'vertical'].includes(v),
    },
    paneSize: {
      type: Number,
      default: 50,
      validator: (v: number) => v <= 100,
    },
    gutterSize: { type: Number, default: 15 },
    resizable: { type: Boolean, default: false },
    maximizeWithDblClick: { type: Boolean, default: false },
    leftPaneMaximization: { type: Boolean, default: false },
    limits: { type: Array as any as PropType<[number, number]>, default: undefined },
  },

  emits: ['update:modelValue'],

  setup: () => {
    const splitContainer = shallowRef<HTMLElement>()
    const isDrugging = ref(false)

    const startDrugging = (e: MouseEvent | TouchEvent) => {
      isDrugging.value = true
    }

    const stopDrugging = (e: MouseEvent | TouchEvent) => {
      isDrugging.value = false
    }

    return { splitContainer }
  },
})
</script>

<style lang="scss">

</style>
