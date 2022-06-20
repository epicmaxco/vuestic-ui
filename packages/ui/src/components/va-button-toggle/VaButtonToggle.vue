<template>
  <div class="va-button-toggle">
    <va-button-group v-bind="buttonGroupPropsComputed">
      <va-button
        v-for="option in options"
        :key="option.value"
        :aria-pressed="isToggled(option.value)"
        v-bind="getButtonProps(option)"
        @click="changeValue(option.value)"
      >
        {{ option.label }}
      </va-button>
    </va-button-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'

import { shiftHSLAColor } from '../../services/color-config/color-functions'
import { useColors } from '../../composables/useColor'
import { extractComponentProps } from '../../utils/child-props'

import { ButtonOption } from './types'

import { VaButton } from '../va-button'
import { VaButtonGroup } from '../va-button-group'

import omit from 'lodash/omit.js'

const VaButtonProps = extractComponentProps(VaButton)

export default defineComponent({
  name: 'VaButtonToggle',
  components: {
    VaButtonGroup,
    VaButton,
  },
  emits: ['update:modelValue'],
  props: {
    ...VaButtonProps,
    modelValue: { type: [String, Number], default: '' },
    options: {
      type: Array as PropType<ButtonOption[]>,
      required: true,
    },
    activeButtonTextColor: { type: String },
    toggleColor: { type: String, default: '' },
  },

  setup (props, { emit }) {
    const { getColor } = useColors()
    const colorComputed = computed(() => getColor(props.color))

    const isToggled = (value: any) => value === props.modelValue

    const activeButtonColor = computed(() => {
      if (props.toggleColor) {
        return getColor(props.toggleColor)
      } else {
        return props.plain ? colorComputed.value : shiftHSLAColor(colorComputed.value, { l: -6 })
      }
    })

    const activeButtonPropsComputed = computed(() => ({
      color: activeButtonColor.value,
      textColor: props.activeButtonTextColor,
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
