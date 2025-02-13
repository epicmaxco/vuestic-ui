<template>
  <ul
    class="va-color-palette"
    role="listbox"
    :aria-label="tp($props.ariaLabel)"
  >
    <va-color-indicator
      v-for="(color, index) in palette"
      :key="index"
      role="option"
      :aria-label="tp($props.ariaIndicatorLabel, { color })"
      :aria-selected="isSelected(color)"
      tabindex="0"
      :modelValue="isSelected(color)"
      :color="color"
      :square="indicator === 'square'"
      @update:modelValue="valueComputed = color"
    />
  </ul>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'

import { useComponentPresetProp, useStateful, useStatefulProps, useStatefulEmits, useTranslation, useTranslationProp } from '../../composables'

import { VaColorIndicator } from '../va-color-indicator'

defineOptions({
  name: 'VaColorPalette',
})

const props = defineProps({
  ...useStatefulProps,
  ...useComponentPresetProp,
  modelValue: { type: String, default: null },
  palette: { type: Array as PropType<string[]>, default: () => [] },
  indicator: {
    type: String as PropType<'dot' | 'square'>,
    default: 'dot',
    validator: (value: string) => ['dot', 'square'].includes(value),
  },
  ariaLabel: useTranslationProp('$t:colorSelection'),
  ariaIndicatorLabel: useTranslationProp('$t:color'),
})

const emit = defineEmits([...useStatefulEmits])

const valueComputed = useStateful(props, emit)

const isSelected = (color: string) => valueComputed.value === color

const { tp } = useTranslation()
</script>

<style lang="scss">
.va-color-palette {
  display: flex;
  padding-left: 0;
  margin: 0;

  & > * {
    margin-right: 0.25rem;

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
