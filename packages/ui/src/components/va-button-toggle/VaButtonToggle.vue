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

export default defineComponent({
  name: 'VaButtonToggle',
  components: {
    VaButtonGroup,
    VaButton,
  },
  emits: ['update:modelValue'],
  props: {
    options: { type: Array, default: () => [] },
    color: { type: String, default: 'primary' },
    textColor: { type: String, default: undefined },
    activeButtonTextColor: { type: String, default: 'white' },
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
    const toggleColorComputed = computed(() => getColor(props.toggleColor))

    const isFlatOrOutline = computed(() => props.outline || props.flat)
    const color = computed(() => {
      if (props.toggleColor) {
        return toggleColorComputed.value
      } else {
        return isFlatOrOutline.value ? colorComputed.value : shiftHSLAColor(colorComputed.value, { l: -6 })
      }
    })
    const textColor = computed(() => props.activeButtonTextColor || getTextColor(colorComputed.value))

    const getButtonProps = (option: Record<string, any> = {}) => {
      const iconsProps = {
        icon: option.icon,
        iconRight: option.iconRight,
      }

      if (option.value !== props.modelValue) { return iconsProps }

      const buttonProps = {
        textColor: textColor.value,
        color: color.value,
        ...iconsProps,
      }

      isFlatOrOutline.value && Object.assign(buttonProps, {
        outline: false,
        flat: false,
      })

      return buttonProps
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
