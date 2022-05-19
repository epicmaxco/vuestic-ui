<template>
  <div class="va-button-toggle">
    <va-button-group
      :color="color"
      :textColor="textColor"
      :rounded="rounded"
      :outline="outline"
      :flat="flat"
      :gradient="gradient"
    >
      <va-button
        v-for="option in options"
        v-bind="getButtonProps(option)"
        :key="option.value"
        :disabled="disabled"
        :size="size"
        :class="getButtonClass(option.value)"
        @click="changeValue(option.value)"
      >
        {{ option.label }}
      </va-button>
    </va-button-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'

import { getTextColor, shiftHSLAColor } from '../../services/color-config/color-functions'
import { useColors } from '../../composables/useColor'
import VaButton from '../va-button'
import VaButtonGroup from '../va-button-group'
import { useTextColor } from '../../composables/useTextColor'

type ButtonOption = {
  value: any,
  label?: string,
  icon?: string,
  iconRight?: string
}

export default defineComponent({
  name: 'VaButtonToggle',
  components: {
    VaButtonGroup,
    VaButton,
  },
  emits: ['update:modelValue'],
  props: {
    options: {
      type: Array as PropType<ButtonOption[]>,
      required: true,
    },
    color: { type: String, default: 'primary' },
    textColor: { type: String, default: undefined },
    activeButtonTextColor: { type: String },
    modelValue: { type: [String, Number] as PropType<string | number>, default: '' },
    outline: { type: Boolean, default: false },
    flat: { type: Boolean, default: false },
    rounded: { type: Boolean, default: true },
    disabled: { type: Boolean, default: false },
    size: {
      type: String as PropType<'medium' | 'small' | 'large'>,
      default: 'medium',
      validator: (modelValue: 'medium' | 'small' | 'large') => ['medium', 'small', 'large'].includes(modelValue),
    },

    toggleColor: { type: String, default: '' },
    gradient: { type: Boolean, default: false },
  },
  setup (props, { emit }) {
    const { getColor } = useColors()
    const colorComputed = computed(() => getColor(props.color))

    const isFlatOrOutline = computed(() => props.outline || props.flat)
    const activeButtonColor = computed(() => {
      if (props.toggleColor) {
        return getColor(props.toggleColor)
      } else {
        return isFlatOrOutline.value ? colorComputed.value : shiftHSLAColor(colorComputed.value, { l: -6 })
      }
    })

    const { textColorComputed: activeButtonTextColor } = useTextColor(activeButtonColor)

    const getButtonProps = (option: ButtonOption = {} as ButtonOption) => {
      const iconsProps = {
        icon: option.icon,
        iconRight: option.iconRight,
      }

      if (option.value !== props.modelValue) { return iconsProps }

      return {
        color: activeButtonColor.value,
        textColor: props.activeButtonTextColor ?? activeButtonTextColor.value,
        ...iconsProps,
        ...(isFlatOrOutline.value && { outline: false, flat: false }),
      }
    }

    const getButtonClass = (buttonValue: any) => ({ 'va-button--active': buttonValue === props.modelValue })

    const changeValue = (value: any) => emit('update:modelValue', value)

    return {
      getButtonProps,
      getButtonClass,
      changeValue,
    }
  },
})
</script>

<style lang="scss">
.va-button-toggle {
  .va-button {
    &:focus,
    &:hover {
      box-shadow: none !important;
    }
  }
}
</style>
