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

import { ButtonOption } from './types'

import { VaButton } from '../va-button'
import { VaButtonGroup } from '../va-button-group'

import pick from 'lodash/pick.js'

export default defineComponent({
  name: 'VaButtonToggle',
  components: {
    VaButtonGroup,
    VaButton,
  },
  emits: ['update:modelValue'],
  props: {
    modelValue: { type: [String, Number] as PropType<string | number>, default: '' },
    options: {
      type: Array as PropType<ButtonOption[]>,
      required: true,
    },
    activeButtonTextColor: { type: String },
    toggleColor: { type: String, default: '' },

    size: {
      type: String as PropType<'small' | 'medium'>,
      default: 'medium',
      validator: (value: string) => ['small', 'medium'].includes(value),
    },
    color: { type: String, default: 'primary' },
    textColor: { type: String, default: undefined },
    gradient: { type: Boolean, default: false },
    plain: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    round: { type: Boolean, default: false },
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
      pick(props, ['color', 'textColor', 'round', 'plain', 'gradient', 'size', 'disabled']),
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
