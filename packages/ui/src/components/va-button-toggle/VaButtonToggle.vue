<template>
  <va-button-group
    class="va-button-toggle"
    v-bind="buttonGroupPropsComputed"
  >
    <va-button
      v-for="option in options"
      :key="option.value"
      :aria-pressed="isToggled(option.value)"
      v-bind.prop="getButtonProps(option)"
      @click="changeValue(option.value)"
    >
      {{ option.label }}
    </va-button>
  </va-button-group>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { extractComponentProps } from '../../utils/child-props'

import { useDeprecatedProps, useComponentPresetProp, useColors } from '../../composables'

import { ButtonOption } from './types'

import { VaButton } from '../va-button'
import { VaButtonGroup } from '../va-button-group'

import omit from 'lodash/omit.js'

const VaButtonProps = omit(extractComponentProps(VaButton), ['block'])

export default defineComponent({
  name: 'VaButtonToggle',
  components: {
    VaButtonGroup,
    VaButton,
  },
  emits: ['update:modelValue'],
  props: {
    ...VaButtonProps,
    ...useComponentPresetProp,
    modelValue: { type: [String, Number], default: '' },
    options: {
      type: Array as PropType<ButtonOption[]>,
      required: true,
    },
    activeButtonTextColor: { type: String },
    toggleColor: { type: String, default: '' },
  },

  setup (props, { emit }) {
    // TODO(1.6.0): Remove deprecated props
    useDeprecatedProps(['flat', 'outline'])

    const { getColor, shiftHSLAColor } = useColors()
    const colorComputed = computed(() => getColor(props.color))

    const isToggled = (value: any) => value === props.modelValue

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

      if (!isToggled(option.value)) { return iconsProps }
      return {
        ...(isToggled(option.value) && activeButtonPropsComputed.value),
        ...iconsProps,
      }
    }

    const buttonGroupPropsComputed = computed(() =>
      omit(props, ['modelValue', 'options', 'activeButtonTextColor', 'toggleColor']),
    )

    const changeValue = (value: any) => emit('update:modelValue', value)

    return {
      buttonGroupPropsComputed,
      getButtonProps,
      changeValue,
      isToggled,
    }
  },
})
</script>

<style lang="scss">
@import '../../styles/resources';

.va-button-toggle {
  .va-button {
    @include keyboard-focus($radius: 'inherit', $offset: -2px);
  }
}
</style>
