<template>
  <div class="va-color-palette">
    <ul
      class="va-color-palette__colors"
      role="listbox"
      :aria-label="t('colorSelection')"
    >
      <va-color-indicator
        v-for="(color, index) in palette"
        :key="index"
        role="option"
        :aria-label="t('color', { color })"
        :aria-selected="isSelected(color)"
        tabindex="0"
        :modelValue="isSelected(color)"
        :color="color"
        :square="indicator === 'square'"
        @update:modelValue="valueComputed = color"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { useComponentPresetProp, useStateful, useStatefulProps, useStatefulEmits, useTranslation } from '../../composables'

import { VaColorIndicator } from '../va-color-indicator'

export default defineComponent({
  name: 'VaColorPalette',
  components: { VaColorIndicator },
  emits: useStatefulEmits,
  props: {
    ...useStatefulProps,
    ...useComponentPresetProp,
    modelValue: { type: String, default: null },
    palette: { type: Array as PropType<string[]>, default: () => [] },
    indicator: {
      type: String as PropType<'dot' | 'square'>,
      default: 'dot',
      validator: (value: string) => ['dot', 'square'].includes(value),
    },
  },
  setup (props, { emit }) {
    const { valueComputed } = useStateful(props, emit)

    return {
      ...useTranslation(),
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
