<template>
  <va-button-group
    class="va-button-toggle"
    v-bind="buttonGroupPropsComputed"
  >
    <va-button
      v-for="option in options"
      :key="getTrackBy(option)"
      :aria-pressed="isToggled(option)"
      v-bind.prop="getButtonProps(option)"
      @click="changeValue(option)"
    >
      {{ getText(option) }}
    </va-button>
  </va-button-group>
</template>

<script lang="ts">
import { PropType, computed } from 'vue'
import { extractComponentProps, filterComponentProps } from '../../utils/component-options'
import { useComponentPresetProp, useColors, useSelectableList, useSelectableListProps } from '../../composables'

import { VaButton } from '../va-button'
import { VaButtonGroup } from '../va-button-group'

import type { ButtonOption } from './types'
import type { StringOrFunction } from '../../composables'

const VaButtonGroupProps = extractComponentProps(VaButtonGroup)
</script>

<script lang="ts" setup>

defineOptions({
  name: 'VaButtonToggle',
})

const props = defineProps({
  ...VaButtonGroupProps,
  ...useComponentPresetProp,
  ...useSelectableListProps,
  modelValue: { type: [String, Number, Boolean, Object], default: '' },
  options: {
    type: Array as PropType<ButtonOption[]>,
    required: true,
  },
  activeButtonTextColor: { type: String },
  toggleColor: { type: String, default: '' },

  textBy: { type: [String, Function] as PropType<StringOrFunction>, default: 'label' },
  valueBy: { type: [String, Function] as PropType<StringOrFunction>, default: 'value' },
})

const emit = defineEmits(['update:modelValue'])

const { getText, getTrackBy } = useSelectableList(props)
const { getColor, shiftHSLAColor } = useColors()
const colorComputed = computed(() => getColor(props.color))

const isToggled = (value: any) => getTrackBy(value) === props.modelValue

const activeButtonColor = computed(() => {
  if (props.toggleColor) { return getColor(props.toggleColor) }
  return shiftHSLAColor(colorComputed.value, { l: props.plain ? -16 : -6 })
})

const activeButtonBackgroundOpacityComputed = computed(() => {
  if (!props.preset || props.preset === 'default') { return {} }
  return { backgroundOpacity: props.pressedOpacity }
})

const activeButtonPropsComputed = computed(() => ({
  color: activeButtonColor.value,
  textColor: props.activeButtonTextColor,
  ...activeButtonBackgroundOpacityComputed.value,
}))

const getButtonProps = (option: ButtonOption = {} as ButtonOption) => {
  const iconsProps = { icon: option.icon, iconRight: option.iconRight }

  if (!isToggled(option)) { return iconsProps }
  return {
    ...(isToggled(option) && activeButtonPropsComputed.value),
    ...iconsProps,
  }
}

const buttonGroupPropsComputed = filterComponentProps(VaButtonGroupProps)

const changeValue = (value: any) => emit('update:modelValue', getTrackBy(value))
</script>

<style lang="scss">
@import '../../styles/resources';

.va-button-toggle {
  .va-button {
    @include keyboard-focus-outline($offset: -2px);

    height: auto;
  }
}
</style>
