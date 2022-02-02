<template>
  <div class="va-color-palette">
    <ul class="va-color-palette__colors">
      <va-color-indicator
        v-for="(color, index) in palette"
        :modelValue="valueComputed === color"
        :key="index"
        :color="color"
        :square="indicator === 'square'"
        @update:modelValue="valueComputed = color"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { useStatefulProps, useStateful, useStatefulEmits } from '../../composables/useStateful'
import VaColorIndicator from '../va-color-indicator'

export default defineComponent({
  name: 'VaColorPalette',
  components: { VaColorIndicator },
  emits: useStatefulEmits,
  props: {
    ...useStatefulProps,
    modelValue: { type: String as PropType<string>, default: null },
    palette: { type: Array as PropType<Array<string>>, default: () => [] },
    indicator: {
      type: String as PropType<'dot' | 'square'>,
      default: 'dot',
      validator: (value: string) => ['dot', 'square'].includes(value),
    },
  },
  setup (props, { emit }) {
    const { valueComputed } = useStateful(props, emit)

    return {
      valueComputed,
      isSelected: (color: string) => valueComputed.value === color,
    }
  },
})
</script>

<style lang="scss">
.va-color-palette {
  padding-top: 3px;

  &__colors {
    display: flex;

    & > * {
      margin-right: 0.25rem;

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
